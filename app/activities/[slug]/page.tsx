import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { supabase, Activity } from '@/lib/supabase';
import { Clock, Mountain, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './ActivityDetail.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: activity } = await supabase
    .from('activities')
    .select('name, description')
    .eq('slug', slug)
    .single();

  if (!activity) return { title: 'Activity Not Found' };

  return {
    title: `${activity.name} near Pawana Lake | Pawana Campouts`,
    description: activity.description.substring(0, 150) + '...',
  };
}

export default async function ActivityPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: activity, error } = await supabase
    .from('activities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !activity) {
    notFound();
  }

  const a = activity as Activity;
  const PHONE = '918329649001';
  const waMessage = `Hi! I'm interested in "${a.name}" at Pawana Campouts. Could you share availability?`;
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(waMessage)}`;

  const difficultyColors: Record<string, string> = {
    easy: 'var(--color-primary)',
    moderate: 'var(--color-accent)',
    hard: '#E74C3C',
  };

  // JSON-LD Product schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: a.name,
    description: a.description,
    image: a.image_url.startsWith('/') ? `https://pawanacampouts.com${a.image_url}` : a.image_url,
    offers: {
      '@type': 'Offer',
      price: a.pricing.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        {/* Hero Image */}
        <div className={styles.heroWrap}>
          <Image
            src={a.image_url}
            alt={a.name}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <span
              className={styles.difficultyBadge}
              style={{ background: difficultyColors[a.difficulty] || 'var(--color-primary)' }}
            >
              {a.difficulty.charAt(0).toUpperCase() + a.difficulty.slice(1)}
            </span>
            <h1 className={styles.title}>{a.name}</h1>
          </div>
        </div>

        <div className={`container ${styles.layout}`}>
          <div className={styles.breadcrumbWrap}>
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Activities', href: '/properties?type=activity' },
              { label: a.name },
            ]} />
          </div>

          <div className={styles.grid}>
            {/* Left: Content */}
            <div className={styles.content}>
              <div className={styles.metaRow}>
                <div className={styles.meta}>
                  <Clock size={18} />
                  <span>{a.duration}</span>
                </div>
                <div className={styles.meta}>
                  <Mountain size={18} />
                  <span>{a.difficulty.charAt(0).toUpperCase() + a.difficulty.slice(1)} Difficulty</span>
                </div>
              </div>

              <section className={styles.descSection}>
                <h2 className={styles.sectionTitle}>About This Activity</h2>
                <p className={styles.description}>{a.description}</p>
              </section>

              <section className={styles.includesSection}>
                <h2 className={styles.sectionTitle}>What&apos;s Included</h2>
                <ul className={styles.includesList}>
                  <li><ShieldCheck size={16} /> Professional guide & safety equipment</li>
                  <li><ShieldCheck size={16} /> All necessary gear provided</li>
                  <li><Users size={16} /> Small group sizes (max 12)</li>
                </ul>
              </section>
            </div>

            {/* Right: Booking Card */}
            <aside className={styles.sidebar}>
              <div className={styles.bookingCard}>
                <div className={styles.priceRow}>
                  <span className={styles.priceAmount}>₹{a.pricing.price.toLocaleString()}</span>
                  <span className={styles.priceUnit}>/ {a.pricing.unit}</span>
                </div>

                <div className={styles.guarantees}>
                  <div className={styles.guarantee}>
                    <ShieldCheck size={14} />
                    <span>Free cancellation up to 7 days</span>
                  </div>
                  <div className={styles.guarantee}>
                    <Users size={14} />
                    <span>Instant confirmation on WhatsApp</span>
                  </div>
                </div>

                <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
                  Book on WhatsApp <ArrowRight size={18} />
                </a>

                <Link href={`/booking?activity=${a.slug}`} className={styles.altBtn}>
                  Or book online
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
