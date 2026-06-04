import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
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

  // Build pricing for JSON-LD
  const getPrice = () => {
    if (!property.pricing) return 0;
    switch (property.pricing.type) {
      case 'villa': return property.pricing.base_price || 0;
      case 'cottage': return property.pricing.price_per_couple || 0;
      case 'camping': return property.pricing.price_per_person || 0;
      default: return 0;
    }
  };

  const testimonialsList = testimonials || [];
  const avgRating = testimonialsList.length > 0
    ? (testimonialsList.reduce((sum: number, t: { rating: number }) => sum + t.rating, 0) / testimonialsList.length).toFixed(1)
    : "4.8";

  // JSON-LD Product schema
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.name,
    description: property.description,
    image: property.image_url.startsWith('/') ? `https://pawanacampouts.com${property.image_url}` : property.image_url,
    offers: {
      "@type": "Offer",
      price: getPrice(),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: Math.max(testimonialsList.length, 1).toString(),
      bestRating: "5",
    },
    review: testimonialsList.slice(0, 3).map((t: { reviewer_name: string; rating: number; review_text: string; date: string }) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.reviewer_name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating },
      reviewBody: t.review_text,
      datePublished: t.date,
    })),
  };

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pawanacampouts.com" },
      { "@type": "ListItem", position: 2, name: "Properties", item: "https://pawanacampouts.com/properties" },
      { "@type": "ListItem", position: 3, name: property.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-sm))' }}>
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Properties', href: '/properties' },
            { label: property.name },
          ]} />
        </div>
        <PropertyDetailView 
          property={property}
          activities={activities}
          bundles={bundles || []}
          testimonials={testimonialsList}
        />
      </main>
      <Footer />
    </>
  );
}
