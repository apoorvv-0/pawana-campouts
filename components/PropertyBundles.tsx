'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import styles from './PropertyBundles.module.css';
import { Bundle } from '@/lib/supabase';

interface PropertyBundlesProps {
  bundles: Bundle[];
  propertySlug: string;
}

const PropertyBundles: React.FC<PropertyBundlesProps> = ({ bundles, propertySlug }) => {
  if (!bundles || bundles.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Complete Packages</h2>
      <div className={styles.grid}>
        {bundles.map((bundle) => (
          <div key={bundle.id} className={styles.card}>
            <div className={styles.badge}>Save {bundle.discount_percent}%</div>
            <h3 className={styles.name}>{bundle.name}</h3>
            
            <div className={styles.included}>
              <div className={styles.includedTitle}>What&apos;s included</div>
              <div className={styles.itemList}>
                <div className={styles.item}>
                  <CheckCircle2 size={16} color="var(--color-primary)" />
                  <span>Stay for group</span>
                </div>
                {bundle.included_activities.map((act) => (
                  <div key={act} className={styles.item}>
                    <CheckCircle2 size={16} color="var(--color-primary)" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.pricing}>
              <span className={styles.original}>₹{bundle.original_price.toLocaleString()}</span>
              <span className={styles.bundlePrice}>₹{bundle.bundle_price.toLocaleString()}</span>
            </div>

            <Link 
              href={`/booking?property=${propertySlug}&bundle=${bundle.id}`}
              className={styles.bookBtn}
            >
              Book this Bundle
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyBundles;
