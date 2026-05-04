'use client';

import React from 'react';
import { Info, Baby, Percent } from 'lucide-react';
import styles from './PropertyPricing.module.css';
import { Pricing } from '@/lib/supabase';

interface PropertyPricingProps {
  pricing: Pricing;
  groupDiscountPercent?: number;
  weekdayPricing?: Pricing;
  weekendPricing?: Pricing;
}

const PropertyPricing: React.FC<PropertyPricingProps> = ({ 
  pricing, 
  groupDiscountPercent,
  weekdayPricing,
  weekendPricing
}) => {
  const renderPricingDetail = (p: Pricing) => {
    if (!p || !p.type) {
      return (
        <div className={styles.priceDetail}>
          <div className={styles.mainPrice}>
            <span className={styles.amount}>Contact</span>
            <span className={styles.unit}>/ night</span>
          </div>
        </div>
      );
    }

    switch (p.type) {
      case 'villa':
        return (
          <div className={styles.priceDetail}>
            <div className={styles.mainPrice}>
              <span className={styles.amount}>₹{p.base_price?.toLocaleString() || '0'}</span>
              <span className={styles.unit}>/ night</span>
            </div>
            <div className={styles.extraGuest}>
              For up to {p.max_guests} guests + ₹{p.extra_guest_price?.toLocaleString() || '0'} per extra guest
            </div>
          </div>
        );
      case 'cottage':
        return (
          <div className={styles.priceDetail}>
            <div className={styles.mainPrice}>
              <span className={styles.amount}>₹{p.price_per_couple?.toLocaleString() || '0'}</span>
              <span className={styles.unit}>/ night</span>
            </div>
            <div className={styles.extraGuest}>
              For 2 guests + ₹{p.extra_guest_price?.toLocaleString() || '0'} per extra guest
            </div>
          </div>
        );
      case 'camping':
        return (
          <div className={styles.priceDetail}>
            <div className={styles.mainPrice}>
              <span className={styles.amount}>₹{p.price_per_person?.toLocaleString() || '0'}</span>
              <span className={styles.unit}>/ person</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className={styles.pricingBlock}>
      <h3 className={styles.heading}>Stay Pricing</h3>
      
      {weekdayPricing && weekendPricing ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--color-text-muted)' }}>Weekday</div>
            {renderPricingDetail(weekdayPricing)}
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px', color: 'var(--color-text-muted)' }}>Weekend</div>
            {renderPricingDetail(weekendPricing)}
          </div>
        </div>
      ) : (
        renderPricingDetail(pricing)
      )}

      <div className={styles.notes}>
        {groupDiscountPercent && (
          <div className={styles.note}>
            <Percent size={16} />
            <span>Groups of 10+ get <strong>{groupDiscountPercent}% off</strong></span>
          </div>
        )}
        <div className={styles.note}>
          <Baby size={16} />
          <span>Children under 5 stay free</span>
        </div>
        <div className={styles.note}>
          <Info size={16} />
          <span>Taxes and service fees calculated at checkout</span>
        </div>
      </div>
    </section>
  );
};

export default PropertyPricing;
