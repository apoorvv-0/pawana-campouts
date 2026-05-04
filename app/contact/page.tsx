import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import styles from './ContactPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Pawana Campouts',
  description: 'Get in touch with us for inquiries, bookings, or support. We are here to help you plan your perfect Pawana getaway.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1 className={styles.title}>We&apos;d love to hear from you</h1>
          <p className={styles.subtitle}>
            Have questions about a stay or activity? Our team is ready to assist you.
          </p>
        </div>
      </header>

      <section className="container">
        <div className={styles.grid}>
          {/* Info Side */}
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Phone size={24} /></div>
              <div>
                <h3 className={styles.infoTitle}>Call or WhatsApp</h3>
                <p className={styles.infoValue}>+91 99999 99999</p>
                <p className={styles.infoValue}>Mon-Sun, 9am - 9pm</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Mail size={24} /></div>
              <div>
                <h3 className={styles.infoTitle}>Email Us</h3>
                <p className={styles.infoValue}>hello@pawanacampouts.com</p>
                <p className={styles.infoValue}>We usually reply within 24 hours.</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><MapPin size={24} /></div>
              <div>
                <h3 className={styles.infoTitle}>Our Location</h3>
                <p className={styles.infoValue}>Near Pawana Lake, Thakursai Village</p>
                <p className={styles.infoValue}>Lonavala, Maharashtra 410406</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><MessageSquare size={24} /></div>
              <div>
                <h3 className={styles.infoTitle}>Social Media</h3>
                <p className={styles.infoValue}>@pawanacampouts on Instagram</p>
                <p className={styles.infoValue}>/pawanacampouts on Facebook</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Full Name</label>
                <input type="text" id="name" className={styles.input} placeholder="John Doe" required />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input type="email" id="email" className={styles.input} placeholder="john@example.com" required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="subject">Subject</label>
                <input type="text" id="subject" className={styles.input} placeholder="Inquiry about Camping" required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea id="message" className={styles.textarea} placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className={styles.map}>
          <div style={{ textAlign: 'center' }}>
            <MapPin size={48} style={{ marginBottom: 'var(--space-md)', opacity: 0.5 }} />
            <p>Interactive Map Coming Soon</p>
          </div>
        </div>
      </section>

      <div className="section"></div>
      <Footer />
    </div>
  );
}
