import { supabase } from "@/lib/supabase";
import type { Property, Activity } from "@/lib/supabase";
import FeaturedCard, { FeaturedCardSkeleton } from "./FeaturedCard";
import styles from "./FeaturedSection.module.css";

export default async function FeaturedSection() {
  const [propRes, actRes] = await Promise.all([
    supabase
      .from("properties")
      .select("*")
      .eq("is_featured", true)
      .limit(3),
    supabase
      .from("activities")
      .select("*")
      .eq("is_featured", true)
      .limit(3),
  ]);

  const properties: Property[] = propRes.data ?? [];
  const activities: Activity[] = actRes.data ?? [];

  const items = [
    ...properties.map((p) => ({ ...p, _kind: "property" as const })),
    ...activities.map((a) => ({ ...a, _kind: "activity" as const })),
  ];

  const hasData = items.length > 0;

  return (
    <section className={`section ${styles.featured}`} id="featured">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Explore</span>
          <h2 className="section-title">What&apos;s Waiting for You</h2>
          <p className="section-subtitle">
            Handpicked stays and experiences curated for the perfect Pawana getaway.
          </p>
        </div>

        <div className={`${styles.grid} stagger`}>
          {hasData
            ? items.map((item) => (
                <FeaturedCard key={item.id} item={item} />
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <FeaturedCardSkeleton key={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
