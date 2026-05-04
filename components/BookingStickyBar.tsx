'use client';

import React from 'react';
import Link from 'next/link';
import styles from './BookingStickyBar.module.css';

interface BookingStickyBarProps {
  propertySlug: string;
  basePrice: number;
  selectedActivityIds: string[];
}

const BookingStickyBar: React.FC<BookingStickyBarProps> = ({ 
  propertySlug, 
  basePrice,
  selectedActivityIds
}) => {
  const activitiesCount = selectedActivityIds.length;
  const bookingUrl = activitiesCount > 0 
    ? `/booking?property=${propertySlug}&activities=${selectedActivityIds.join(',')}`
    : `/booking?property=${propertySlug}`;

  return (
    <div className={styles.stickyBar}>
      <div className={styles.priceInfo}>
        <span className={styles.label}>Starting from</span>
        <div className={styles.price}>
          ₹{basePrice.toLocaleString()} 
          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}> / person</span>
        </div>
      </div>
      
      <Link href={bookingUrl} className={styles.bookBtn}>
        Book Now {activitiesCount > 0 && `(+${activitiesCount} activities)`}
      </Link>
    </div>
  );
};

export default BookingStickyBar;
