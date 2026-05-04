'use client';

import React, { useState } from 'react';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyHeader from '@/components/PropertyHeader';
import PropertyPricing from '@/components/PropertyPricing';
import PropertyActivities from '@/components/PropertyActivities';
import PropertyBundles from '@/components/PropertyBundles';
import BookingStickyBar from '@/components/BookingStickyBar';
import GuestReviews from '@/components/GuestReviews';
import { Property, Activity, Bundle, Testimonial } from '@/lib/supabase';
import styles from './PropertyDetail.module.css';

interface PropertyDetailViewProps {
  property: Property;
  activities: Activity[];
  bundles: Bundle[];
  testimonials: Testimonial[];
}

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ 
  property, 
  activities,
  bundles,
  testimonials 
}) => {
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);

  const handleToggleActivity = (id: string) => {
    setSelectedActivityIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const averageRating = testimonials.length > 0 
    ? testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length
    : undefined;

  // Base price for the sticky bar
  const getBasePrice = () => {
    if (!property.pricing || !property.pricing.type) return 0;
    
    switch (property.pricing.type) {
      case 'villa': return (property.pricing.base_price || 0) / (property.pricing.max_guests || 1);
      case 'cottage': return (property.pricing.price_per_couple || 0) / 2;
      case 'camping': return property.pricing.price_per_person || 0;
      default: return 0;
    }
  };

  return (
    <div className={styles.mainContent}>
      <PropertyGallery photos={property.photos || [property.image_url]} name={property.name} />
      
      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <PropertyHeader 
            name={property.name}
            type={property.type}
            location={property.location}
            amenities={property.amenities}
            averageRating={averageRating}
            reviewCount={testimonials.length}
          />

          <div className={styles.descriptionSection}>
            <h3 className={styles.descriptionHeading}>About this stay</h3>
            <p className={styles.descriptionText}>{property.description}</p>
          </div>

          <PropertyPricing 
            pricing={property.pricing}
            groupDiscountPercent={property.group_discount_percent}
            weekdayPricing={property.weekday_pricing}
            weekendPricing={property.weekend_pricing}
          />

          <PropertyActivities 
            activities={activities}
            selectedIds={selectedActivityIds}
            onToggle={handleToggleActivity}
          />

          <PropertyBundles 
            bundles={bundles}
            propertySlug={property.slug}
          />

          <GuestReviews testimonials={testimonials} />
        </div>

        <div className={styles.rightColumn}>
          <BookingStickyBar 
            propertySlug={property.slug}
            basePrice={getBasePrice()}
            selectedActivityIds={selectedActivityIds}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;
