'use client';

import React from 'react';
import Image from 'next/image';
import styles from './PropertyGallery.module.css';

interface PropertyGalleryProps {
  photos: string[];
  name: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ photos, name }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.scrollStrip}>
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className={index === 0 ? styles.heroImage : styles.thumbnail}
          >
            <Image
              src={photo}
              alt={`${name} - Photo ${index + 1}`}
              fill
              className="object-cover"
              sizes={index === 0 ? "(max-width: 768px) 85vw, 700px" : "(max-width: 768px) 40vw, 250px"}
              priority={index === 0}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXwM496XlygAAAABJRU5ErkJggg=="
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
