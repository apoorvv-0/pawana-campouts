'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart, Users, Coffee, Wind, Mountain, ChevronRight } from 'lucide-react';
import styles from './PropertyCard.module.css';
import { Property } from '@/lib/supabase';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { name, type, location, image_url, pricing, amenities, slug } = property;

  // Type-specific colors and labels
  const typeConfig = {
    camping: { label: 'Camping', color: 'var(--color-camping)' },
    cottage: { label: 'Cottage', color: 'var(--color-cottage)' },
    villa: { label: 'Villa', color: 'var(--color-villa)' },
    activity: { label: 'Activity', color: 'var(--color-activity)' },
  };

  const config = typeConfig[type] || typeConfig.camping;

  // Format pricing display
  const renderPrice = () => {
    if (!pricing || !pricing.type) {
      return <span className={styles.price}>Contact for Price</span>;
    }

    switch (pricing.type) {
      case 'villa':
        return (
          <>
            <span className={styles.price}>₹{pricing.base_price?.toLocaleString()}</span>
            <span className={styles.unit}> / night</span>
          </>
        );
      case 'cottage':
        return (
          <>
            <span className={styles.price}>₹{pricing.price_per_couple?.toLocaleString()}</span>
            <span className={styles.unit}> / couple</span>
          </>
        );
      case 'camping':
        return (
          <>
            <span className={styles.price}>₹{pricing.price_per_person?.toLocaleString()}</span>
            <span className={styles.unit}> / person</span>
          </>
        );
      case 'activity':
        return (
          <>
            <span className={styles.price}>₹{pricing.price?.toLocaleString()}</span>
            <span className={styles.unit}> / {pricing.unit}</span>
          </>
        );
      default:
        return <span className={styles.price}>Contact for Price</span>;
    }
  };

  // Map amenities to icons (max 4)
  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wind size={14} />,
    'Breakfast': <Coffee size={14} />,
    'Lake View': <Mountain size={14} />,
    'Parking': <MapPin size={14} />,
  };

  return (
    <Link href={`/properties/${slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <div 
          className={styles.badge} 
          style={{ backgroundColor: config.color }}
        >
          {config.label}
        </div>
        <button 
          className={styles.wishlistBtn}
          onClick={(e) => {
            e.preventDefault();
            // Handle wishlist
          }}
        >
          <Heart size={18} />
        </button>
        <Image
          src={image_url}
          alt={name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.location}>
            <MapPin size={12} />
            <span>{location}</span>
          </div>
          <h3 className={styles.title}>{name}</h3>
        </div>

        <div className={styles.amenities}>
          <div className={styles.amenity}>
            <Users size={14} />
            <span>{property.max_guests ? `Up to ${property.max_guests} guests` : 'Flexible occupancy'}</span>
          </div>
          {amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className={styles.amenity}>
              {amenityIcons[amenity] || <Wind size={14} />}
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.startingAt}>Starting from</span>
            <div className={styles.priceWrapper}>
              {renderPrice()}
            </div>
          </div>
          <div className={styles.viewBtn}>
            View <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
