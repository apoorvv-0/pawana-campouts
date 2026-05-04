'use client';

import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import styles from './GuestReviews.module.css';
import { Testimonial } from '@/lib/supabase';

interface GuestReviewsProps {
  testimonials: Testimonial[];
}

const GuestReviews: React.FC<GuestReviewsProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What guests say</h2>
      <div className={styles.scrollRow}>
        {testimonials.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewerRow}>
              <div className={styles.avatar}>
                {review.reviewer_name.charAt(0)}
              </div>
              <div className={styles.nameInfo}>
                <span className={styles.name}>{review.reviewer_name}</span>
                {review.verified_guest && (
                  <span className={styles.verifiedBadge}>
                    <CheckCircle size={10} /> Verified Guest
                  </span>
                )}
              </div>
            </div>

            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < review.rating ? "currentColor" : "none"} 
                />
              ))}
            </div>

            <p className={styles.text}>{review.review_text}</p>
            
            <div className={styles.date}>
              {new Date(review.date).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuestReviews;
