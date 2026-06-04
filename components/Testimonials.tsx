import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@/lib/supabase";
import styles from "./Testimonials.module.css";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "var(--color-accent)" : "none"}
          stroke={i < rating ? "var(--color-accent)" : "var(--color-border)"}
          strokeWidth={1.8}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.reviewer_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <article className={styles.card}>
      <StarRating rating={t.rating} />
      <blockquote className={styles.review}>&ldquo;{t.review_text}&rdquo;</blockquote>
      <div className={styles.author}>
        <div className={styles.avatar}>{initials}</div>
        <div>
          <div className={styles.authorName}>{t.reviewer_name}</div>
          {t.verified_guest && (
            <div className={styles.verifiedBadge}>✓ Verified Guest</div>
          )}
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <article className={styles.card}>
      <div className="skeleton" style={{ height: 18, width: 100, marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 14, width: "60%", marginBottom: 20 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="skeleton" style={{ height: 40, width: 40, borderRadius: "50%" }} />
        <div>
          <div className="skeleton" style={{ height: 14, width: 100, marginBottom: 4 }} />
          <div className="skeleton" style={{ height: 12, width: 130 }} />
        </div>
      </div>
    </article>
  );
}

export default async function Testimonials() {
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const testimonials: Testimonial[] = data ?? [];
  const hasData = testimonials.length > 0;

  // Calculate aggregate rating
  const avgRating = hasData
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : null;

  return (
    <section className={`section ${styles.testimonials}`} id="testimonials">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Reviews</span>
          <h2 className="section-title">What Our Guests Say</h2>
          {avgRating && (
            <div className={styles.aggregate}>
              <Star size={20} fill="var(--color-accent)" stroke="var(--color-accent)" />
              <span className={styles.aggRating}>{avgRating}</span>
              <span className={styles.aggCount}>out of 5 based on {testimonials.length} reviews</span>
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {hasData
            ? testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)
            : Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
