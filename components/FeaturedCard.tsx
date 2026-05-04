import Image from "next/image";
import Link from "next/link";
import type { Property, Activity } from "@/lib/supabase";
import styles from "./FeaturedCard.module.css";

type CardItem =
  | (Property & { _kind: "property" })
  | (Activity & { _kind: "activity" });

interface Props {
  item: CardItem;
}

const TYPE_COLORS: Record<string, string> = {
  camping: styles.tagCamping,
  cottage: styles.tagCottage,
  villa: styles.tagVilla,
  activity: styles.tagActivity,
};

function tagLabel(item: CardItem): string {
  if (item._kind === "activity") return "Activity";
  return item.type.charAt(0).toUpperCase() + item.type.slice(1);
}

function tagClass(item: CardItem): string {
  if (item._kind === "activity") return TYPE_COLORS.activity ?? "";
  return TYPE_COLORS[item.type] ?? "";
}

function detailHref(item: CardItem): string {
  if (item._kind === "activity") return `/activities/${item.slug}`;
  return `/properties/${item.slug}`;
}

export default function FeaturedCard({ item }: Props) {
  const renderPrice = () => {
    const { pricing } = item;
    if (!pricing) return "Contact for Price";

    switch (pricing.type) {
      case "villa":
        return `₹${pricing.base_price?.toLocaleString("en-IN")} / night`;
      case "cottage":
        return `₹${pricing.price_per_couple?.toLocaleString("en-IN")} / couple`;
      case "camping":
        return `₹${pricing.price_per_person?.toLocaleString("en-IN")} / person`;
      case "activity":
        return `₹${pricing.price?.toLocaleString("en-IN")} / ${pricing.unit}`;
      default:
        return "Contact for Price";
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className={styles.image}
        />
        <span className={`${styles.tag} ${tagClass(item)}`}>
          {tagLabel(item)}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.desc}>{item.short_description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>
            {renderPrice()}
          </span>
          <Link href={detailHref(item)} className={`btn btn-outline btn-sm`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Skeleton card for loading state */
export function FeaturedCardSkeleton() {
  return (
    <article className={styles.card}>
      <div className={`${styles.imageWrap} skeleton`} />
      <div className={styles.body}>
        <div className="skeleton" style={{ height: 22, width: "70%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, width: "100%", marginBottom: 4 }} />
        <div className="skeleton" style={{ height: 16, width: "60%", marginBottom: 16 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="skeleton" style={{ height: 20, width: 80 }} />
          <div className="skeleton" style={{ height: 32, width: 100, borderRadius: 999 }} />
        </div>
      </div>
    </article>
  );
}
