'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PropertyGallery.module.css';

interface PropertyGalleryProps {
  photos: string[];
  name: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ photos, name }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, goNext, goPrev]);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      <div className={styles.galleryWrapper}>
        <div className={styles.scrollStrip}>
          {photos.map((photo, index) => (
            <div
              key={index}
              className={index === 0 ? styles.heroImage : styles.thumbnail}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${name} photo ${index + 1}`}
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
              {index === 0 && photos.length > 1 && (
                <div className={styles.photoCount}>
                  📷 {photos.length} photos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close lightbox">
            <X size={24} />
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={photos[activeIndex]}
                alt={`${name} - Photo ${activeIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="90vw"
                quality={90}
              />
            </div>
          </div>

          <div className={styles.lightboxCounter}>
            {activeIndex + 1} / {photos.length}
          </div>

          {photos.length > 1 && (
            <>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
