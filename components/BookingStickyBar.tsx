'use client';

import React from 'react';
import { Flame, ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './BookingStickyBar.module.css';

interface BookingStickyBarProps {
  propertySlug: string;
  propertyName?: string;
  basePrice: number;
  selectedActivityIds: string[];
}

const PHONE = '918329649001';

const BookingStickyBar: React.FC<BookingStickyBarProps> = ({ 
  propertySlug, 
  propertyName,
  basePrice,
  selectedActivityIds
}) => {
  const activitiesCount = selectedActivityIds.length;
  const actPart = activitiesCount > 0 ? ` with ${activitiesCount} activities` : '';
  const waMessage = `Hi! I'd like to book "${propertyName || propertySlug}"${actPart} at Pawana Campouts. Could you confirm availability?`;
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className={styles.stickyBar}>
      <div className={styles.priceInfo}>
        <span className={styles.label}>Starting from</span>
        <div className={styles.price}>
          ₹{basePrice.toLocaleString()} 
          <span className={styles.unit}> / person</span>
        </div>
      </div>

      <div className={styles.urgencyRow}>
        <Flame size={14} className={styles.urgencyIcon} />
        <span className={styles.urgencyText}>Booked 8 times this week</span>
      </div>

      <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.bookBtn}>
        Book on WhatsApp {activitiesCount > 0 && `(+${activitiesCount})`}
        <ArrowRight size={16} />
      </a>
      
      <div className={styles.guarantee}>
        <ShieldCheck size={12} />
        <span>Free cancellation up to 7 days</span>
      </div>
    </div>
  );
};

export default BookingStickyBar;
