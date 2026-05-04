'use client';

import React from 'react';
import { MapPin, Wifi, Waves, Dog, Signal, Star } from 'lucide-react';
import styles from './PropertyHeader.module.css';

interface PropertyHeaderProps {
  name: string;
  type: 'camping' | 'cottage' | 'villa' | 'activity';
  location: string;
  amenities: string[];
  averageRating?: number;
  reviewCount?: number;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ 
  name, 
  type, 
  location, 
  amenities,
  averageRating,
  reviewCount
}) => {
  const typeConfig = {
    camping: { label: 'Camping', color: 'var(--color-camping)' },
    cottage: { label: 'Cottage', color: 'var(--color-cottage)' },
    villa: { label: 'Villa', color: 'var(--color-villa)' },
    activity: { label: 'Activity', color: 'var(--color-activity)' },
  };

  const config = typeConfig[type];

  const amenityIconMap: Record<string, React.ReactNode> = {
    'WiFi': <Wifi size={18} />,
    'Pool': <Waves size={18} />,
    'Mobile Connectivity': <Signal size={18} />,
    'Lake Touch': <Waves size={18} />,
    'Pet Friendly': <Dog size={18} />,
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{name}</h1>
        <div 
          className={styles.typeBadge} 
          style={{ backgroundColor: config.color }}
        >
          {config.label}
        </div>
      </div>

      <div className={styles.location}>
        <MapPin size={16} />
        <span>{location}</span>
      </div>

      {averageRating && (
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill={i < Math.floor(averageRating) ? "currentColor" : "none"} 
              />
            ))}
          </div>
          <span>{averageRating.toFixed(1)} ({reviewCount} reviews)</span>
        </div>
      )}

      <div className={styles.amenitiesRow}>
        {amenities.map((amenity) => (
          amenityIconMap[amenity] && (
            <div key={amenity} className={styles.amenity}>
              {amenityIconMap[amenity]}
              <span>{amenity}</span>
            </div>
          )
        ))}
      </div>
    </header>
  );
};

export default PropertyHeader;
