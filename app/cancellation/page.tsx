import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Pawana Campouts',
  description: 'Read our policies regarding booking cancellations, rescheduling, and refunds.',
};

export default function CancellationPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <Navbar />
      
      <header style={{ padding: 'var(--space-4xl) 0 var(--space-2xl)', background: 'var(--color-primary-50)' }}>
        <div className="container">
          <span className="section-label">Policies</span>
          <h1>Cancellation & Refund</h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px' }}>
            Everything you need to know about modifying or cancelling your booking.
          </p>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <section style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>Standard Cancellation Policy</h2>
              <p style={{ marginBottom: 'var(--space-md)' }}>
                We understand that plans can change. To ensure we can manage our campsites and resources effectively, we have implemented the following cancellation policy:
              </p>
              <ul style={{ listStyle: 'disc', paddingLeft: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
                <li style={{ marginBottom: 'var(--space-sm)' }}><strong>7 days or more before check-in:</strong> 100% refund of the booking amount.</li>
                <li style={{ marginBottom: 'var(--space-sm)' }}><strong>3 to 7 days before check-in:</strong> 50% refund of the booking amount.</li>
                <li style={{ marginBottom: 'var(--space-sm)' }}><strong>Less than 72 hours before check-in:</strong> No refund will be provided.</li>
              </ul>
            </section>

            <section style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>Rescheduling</h2>
              <p>
                You may request to reschedule your booking up to 48 hours before the check-in time, subject to availability. A rescheduling fee of 10% of the booking amount may apply. Rescheduling is not permitted within 48 hours of check-in.
              </p>
            </section>

            <section style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>Weather & Force Majeure</h2>
              <p>
                In case of extreme weather conditions or government-mandated lockdowns, Pawana Campouts reserves the right to cancel or postpone the event. In such cases, guests will be offered a full credit note valid for 6 months or a full refund.
              </p>
            </section>

            <section style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>No-Show</h2>
              <p>
                Failure to arrive at the campsite by the designated check-in time without prior notice will be treated as a "No-Show," and no refund or rescheduling will be permitted.
              </p>
            </section>

            <div style={{ padding: 'var(--space-xl)', background: 'var(--color-bg-dark)', color: '#fff', borderRadius: 'var(--radius-lg)', marginTop: 'var(--space-4xl)' }}>
              <h3 style={{ color: '#fff', marginBottom: 'var(--space-sm)' }}>Need help with a cancellation?</h3>
              <p style={{ opacity: 0.8, marginBottom: 'var(--space-lg)' }}>
                Contact our support team with your booking ID and we will assist you as soon as possible.
              </p>
              <a href="/contact" className="btn btn-secondary">Contact Support</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
