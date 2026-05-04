'use client';

import React from 'react';
import { Image as ImageIcon, Plus, Check } from 'lucide-react';
import styles from './PropertyActivities.module.css';
import { Activity } from '@/lib/supabase';

interface PropertyActivitiesProps {
  activities: Activity[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const PropertyActivities: React.FC<PropertyActivitiesProps> = ({ 
  activities, 
  selectedIds,
  onToggle 
}) => {
  if (!activities || activities.length === 0) return null;

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Add to your stay</h3>
      <div className={styles.scrollArea}>
        {activities.map((activity) => {
          const isSelected = selectedIds.includes(activity.id);
          return (
            <div 
              key={activity.id} 
              className={`${styles.card} ${isSelected ? styles.cardActive : ''}`}
            >
              <div className={styles.imagePlaceholder}>
                <ImageIcon size={32} />
              </div>
              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>{activity.name}</span>
                  <span className={styles.price}>₹{activity.pricing.price.toLocaleString()}</span>
                </div>
                <p className={styles.description}>{activity.short_description}</p>
                <button 
                  className={`${styles.toggleBtn} ${isSelected ? styles.toggleBtnActive : ''}`}
                  onClick={() => onToggle(activity.id)}
                >
                  {isSelected ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} /> Added
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Plus size={14} /> Add to booking
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PropertyActivities;
