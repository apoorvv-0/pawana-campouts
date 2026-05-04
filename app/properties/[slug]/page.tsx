import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyDetailView from './PropertyDetailView';
import { supabase, Activity } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: property } = await supabase
    .from('properties')
    .select('name, description')
    .eq('slug', slug)
    .single();

  if (!property) return { title: 'Property Not Found' };

  return {
    title: `${property.name} near Pawana Lake | Pawana Campouts`,
    description: property.description.substring(0, 150) + '...',
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch Property
  const { data: property, error: propError } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (propError || !property) {
    notFound();
  }

  // 2. Fetch Activities (via join table property_activities)
  const { data: activityJoins } = await supabase
    .from('property_activities')
    .select('activities(*)')
    .eq('property_id', property.id);
  
  const activities = (activityJoins as { activities: Activity | null }[] | null)?.map((j) => j.activities).filter((a): a is Activity => a !== null) || [];

  // 3. Fetch Bundles
  const { data: bundles } = await supabase
    .from('property_bundles')
    .select('*')
    .eq('property_id', property.id);

  // 4. Fetch Testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('property_id', property.id)
    .order('date', { ascending: false });

  return (
    <>
      <Navbar />
      <main>
        <PropertyDetailView 
          property={property}
          activities={activities}
          bundles={bundles || []}
          testimonials={testimonials || []}
        />
      </main>
      <Footer />
    </>
  );
}
