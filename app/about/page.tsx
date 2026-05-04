import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Heart, MapPin, Users } from 'lucide-react';
import styles from './AboutPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Pawana Campouts',
  description: 'Learn about the journey of Pawana Campouts and our mission to provide authentic outdoor experiences.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image 
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=2070" 
            alt="Camping at Pawana Lake" 
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="container">
          <h1 className={styles.heroTitle}>Our Story</h1>
          <p className={styles.heroSubtitle}>
            Connecting souls with the serene landscapes of Pawana since 2018.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <span className="section-label">The Beginning</span>
              <h2>How it all started</h2>
              <p>
                Pawana Campouts was born from a simple idea: that everyone deserves a break from the digital noise to reconnect with nature and themselves.
              </p>
              <p>
                What started as a small group of friends organizing weekend treks has grown into a premier outdoor hospitality brand, offering curated stays and authentic experiences around the majestic Pawana Lake.
              </p>
              <p>
                Today, we host thousands of guests every year, helping them create memories that last a lifetime through our blend of adventure and comfort.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image 
                src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2070" 
                alt="Friends camping" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`${styles.section} section-alt`} style={{ background: 'var(--color-primary-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Our Values</span>
            <h2>What drives us</h2>
            <p>
              We believe in more than just providing a place to sleep. We believe in crafting experiences that respect the land and its people.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><Heart size={24} /></div>
              <h3 className={styles.valueTitle}>Authenticity</h3>
              <p className={styles.valueDesc}>We provide real, raw experiences that capture the true essence of Pawana's natural beauty.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><Shield size={24} /></div>
              <h3 className={styles.valueTitle}>Safety First</h3>
              <p className={styles.valueDesc}>Your well-being is our top priority. All our activities and stays follow rigorous safety protocols.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><MapPin size={24} /></div>
              <h3 className={styles.valueTitle}>Local Roots</h3>
              <p className={styles.valueDesc}>We work closely with local communities to provide employment and support sustainable tourism.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}><Users size={24} /></div>
              <h3 className={styles.valueTitle}>Community</h3>
              <p className={styles.valueDesc}>We foster a spirit of togetherness, bringing people from all walks of life together under the stars.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
