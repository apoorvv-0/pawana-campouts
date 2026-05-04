import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertiesFilter from '@/components/PropertiesFilter';
import PropertyCard from '@/components/PropertyCard';
import { supabase, Property } from '@/lib/supabase';
import styles from './PropertiesPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Stays & Activities | Pawana Campouts',
  description: 'Find the perfect stay or activity near Pawana Lake. Filter by type, category, and more.',
};

interface SearchParams {
  type?: string;
  category?: string;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { type, category } = params;

  // Build query
  let query = supabase.from('properties').select('*');

  if (type && type !== 'all') {
    query = query.eq('type', type);
  }

  if (category) {
    // Assuming category is a JSONB array or similar
    query = query.contains('category', [category]);
  }

  // Execute query
  const { data: properties, error } = await query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
  }

  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>
            {type && type !== 'all' 
              ? `${type.charAt(0).toUpperCase() + type.slice(1)}s` 
              : 'Explore Stays & Activities'}
          </h1>
          <p className={styles.subtitle}>
            Handpicked escapes and adventures curated for you.
          </p>
        </div>
      </header>

      <PropertiesFilter />

      <main className="section">
        <div className="container">
          {properties && properties.length > 0 ? (
            <div className={styles.grid}>
              {properties.map((property: Property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No results found</h3>
              <p>Try adjusting your filters or search criteria.</p>
              <Link href="/properties" className="btn btn-outline" style={{ marginTop: 'var(--space-md)' }}>
                Clear all filters
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
