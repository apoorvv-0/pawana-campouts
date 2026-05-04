import { Package, BadgeDollarSign, Sparkles } from "lucide-react";
import styles from "./WhyUs.module.css";

const ITEMS = [
  {
    icon: <Package size={28} strokeWidth={1.8} />,
    title: "Complete Bundles",
    desc: "Stay + activities in one booking — no juggling multiple vendors.",
  },
  {
    icon: <BadgeDollarSign size={28} strokeWidth={1.8} />,
    title: "Better Prices",
    desc: "Cheaper than booking stays and activities separately.",
  },
  {
    icon: <Sparkles size={28} strokeWidth={1.8} />,
    title: "Curated Properties",
    desc: "Every property handpicked and verified near Pawana Lake.",
  },
];

export default function WhyUs() {
  return (
    <section className={`section ${styles.whyUs}`} id="why-us">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Why Us</span>
          <h2 className="section-title">Why Pawana Campouts</h2>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.iconWrap}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
