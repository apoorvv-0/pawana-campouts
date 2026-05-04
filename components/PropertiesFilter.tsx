'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal, Check } from 'lucide-react';
import styles from './PropertiesFilter.module.css';

const propertyTypes = [
  { id: 'all', label: 'All Stays' },
  { id: 'camping', label: 'Camping' },
  { id: 'cottage', label: 'Cottages' },
  { id: 'villa', label: 'Villas' },
  { id: 'activity', label: 'Activities' },
];

const categories = [
  'Lakefront',
  'Pet Friendly',
  'Private Pool',
  'Couples',
  'Adventure',
];

const PropertiesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentType = searchParams.get('type') || 'all';
  const currentCategory = searchParams.get('category');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'all' || !value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleTypeChange = (typeId: string) => {
    const queryString = createQueryString('type', typeId);
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    const newValue = currentCategory === category ? '' : category;
    const queryString = createQueryString('category', newValue);
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  };

  return (
    <div className={styles.stickyContainer}>
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              className={`${styles.filterChip} ${
                currentType === type.id ? styles.filterChipActive : ''
              }`}
              onClick={() => handleTypeChange(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--color-border)', flexShrink: 0, margin: '0 var(--space-sm)' }} />

        <div className={styles.filterGroup}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterChip} ${
                currentCategory === category ? styles.filterChipActive : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {currentCategory === category && <Check size={14} style={{ marginRight: '4px' }} />}
              {category}
            </button>
          ))}
        </div>

        <div className={styles.moreFilters}>
          <button className={styles.filterBtn}>
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesFilter;
