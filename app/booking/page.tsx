import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Users, CreditCard, ShoppingBag } from 'lucide-react';
import styles from './BookingPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Booking | Pawana Campouts',
  description: 'Complete your booking for a perfect getaway at Pawana Lake.',
};

export default function BookingPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Complete Your Booking</h1>
          <p className={styles.subtitle}>Secure your spot for an unforgettable experience.</p>
        </div>
      </header>

      <main className="container">
        <div className={styles.bookingGrid}>
          {/* Left Column: Form */}
          <div className={styles.steps}>
            <section className={styles.card} style={{ marginBottom: 'var(--space-xl)' }}>
              <div className={styles.stepTitle}>
                <div className={styles.stepNumber}>1</div>
                <h2>Select Dates & Guests</h2>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}><Calendar size={14} style={{ marginRight: 6 }} /> Check-in</label>
                  <input type="date" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}><Calendar size={14} style={{ marginRight: 6 }} /> Check-out</label>
                  <input type="date" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}><Users size={14} style={{ marginRight: 6 }} /> Adults</label>
                  <input type="number" className={styles.input} min="1" defaultValue="2" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}><Users size={14} style={{ marginRight: 6 }} /> Children (under 12)</label>
                  <input type="number" className={styles.input} min="0" defaultValue="0" />
                </div>
              </div>
            </section>

            <section className={styles.card} style={{ marginBottom: 'var(--space-xl)' }}>
              <div className={styles.stepTitle}>
                <div className={styles.stepNumber}>2</div>
                <h2>Guest Information</h2>
              </div>
              <div className={styles.formGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Full Name</label>
                  <input type="text" className={styles.input} placeholder="John Doe" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} placeholder="john@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input type="tel" className={styles.input} placeholder="+91 99999 99999" />
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.stepTitle}>
                <div className={styles.stepNumber}>3</div>
                <h2>Payment Method</h2>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                You will be redirected to our secure payment gateway to complete the transaction.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <div style={{ padding: 'var(--space-md)', border: '1.5px solid var(--color-primary)', borderRadius: 'var(--radius-md)', flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <CreditCard size={20} color="var(--color-primary)" />
                  <span style={{ fontWeight: 600 }}>UPI / Cards / NetBanking</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <aside>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Booking Summary</h3>
              
              <div className={styles.emptyState}>
                <ShoppingBag size={48} style={{ marginBottom: 'var(--space-md)', opacity: 0.3 }} />
                <p>No property selected yet.</p>
                <a href="/properties" className="btn btn-secondary btn-sm" style={{ marginTop: 'var(--space-md)' }}>Browse Stays</a>
              </div>

              {/* This would be shown when a property is selected */}
              {/* 
              <div className={styles.summaryRow}>
                <span>Lakeside Camping x 2 Nights</span>
                <span>₹4,000</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Guests (2 Adults)</span>
                <span>Included</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Taxes & Fees</span>
                <span>₹720</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>₹4,720</span>
              </div>
              */}

              <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-xl)' }} disabled>
                Confirm Booking
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: 'var(--space-md)', opacity: 0.6 }}>
                By clicking "Confirm Booking", you agree to our <a href="/cancellation" style={{ textDecoration: 'underline' }}>Cancellation Policy</a>.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
