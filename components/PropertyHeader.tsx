'use client';

import React from 'react';
import { MapPin, Wifi, Waves, Dog, Signal, Star, Tent, BedDouble, Plug, ShowerHead, Car, Cross, Flame, Wind, Coffee, Tv, Music, Gamepad2, Lock, UtensilsCrossed, Bath, TreePine, Eye, Snowflake, ChefHat, Sofa, Sparkles } from 'lucide-react';
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
    'Wi-Fi': <Wifi size={18} />,
    'WiFi': <Wifi size={18} />,
    'Pool': <Waves size={18} />,
    'Infinity Pool': <Waves size={18} />,
    'Private Pool': <Waves size={18} />,
    'Mobile Connectivity': <Signal size={18} />,
    'Lake Touch': <Waves size={18} />,
    'Pet Friendly': <Dog size={18} />,
    'Lakeside View': <Eye size={18} />,
    'Waterproof Tents': <Tent size={18} />,
    'Mattress & Blanket': <BedDouble size={18} />,
    'Charging Points': <Plug size={18} />,
    'Clean Washrooms': <ShowerHead size={18} />,
    'Parking': <Car size={18} />,
    'Secure Parking': <Lock size={18} />,
    'First Aid': <Cross size={18} />,
    'BBQ & Dinner': <Flame size={18} />,
    'Private Balcony': <Wind size={18} />,
    'AC & Geyser': <Snowflake size={18} />,
    'Queen Bed': <BedDouble size={18} />,
    'Attached Bathroom': <Bath size={18} />,
    'Private Lawn': <TreePine size={18} />,
    'In-room Dining': <UtensilsCrossed size={18} />,
    'Tea/Coffee Maker': <Coffee size={18} />,
    '4 AC Bedrooms': <Snowflake size={18} />,
    'Private Chef Available': <ChefHat size={18} />,
    'Open Deck Lounge': <Sofa size={18} />,
    'Wi-Fi & Smart TV': <Tv size={18} />,
    'Smart TV': <Tv size={18} />,
    'Music System': <Music size={18} />,
    'Indoor Games': <Gamepad2 size={18} />,
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
          <div key={amenity} className={styles.amenity}>
            {amenityIconMap[amenity] || <Sparkles size={18} />}
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default PropertyHeader;

