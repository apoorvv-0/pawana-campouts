import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://pawanacampouts.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/properties`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/cancellation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // Dynamic property pages
  const { data: properties } = await supabase.from('properties').select('slug, created_at');
  const propertyPages: MetadataRoute.Sitemap = (properties || []).map((p) => ({
    url: `${BASE_URL}/properties/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic activity pages
  const { data: activities } = await supabase.from('activities').select('slug, created_at');
  const activityPages: MetadataRoute.Sitemap = (activities || []).map((a) => ({
    url: `${BASE_URL}/activities/${a.slug}`,
    lastModified: new Date(a.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...propertyPages, ...activityPages];
}
