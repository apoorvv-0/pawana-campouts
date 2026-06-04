import { Package, BadgeDollarSign, Sparkles, ShieldCheck } from "lucide-react";
import styles from "./WhyUs.module.css";

const ITEMS = [
  {
    icon: <Package size={28} strokeWidth={1.8} />,
    title: "Stay + Activities, One Price",
    desc: "Book your entire Pawana weekend in one go — stay, kayaking, bonfire, trek — no juggling vendors.",
  },
  {
    icon: <BadgeDollarSign size={28} strokeWidth={1.8} />,
    title: "Up to 30% Cheaper",
    desc: "Our bundles cost up to 30% less than booking stays and activities separately. We cut the middlemen.",
  },
  {
    icon: <Sparkles size={28} strokeWidth={1.8} />,
    title: "Handpicked & Verified by Locals",
    desc: "Every property is personally inspected by our team. We live here — we know the best spots.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.8} />,
    title: "Free Cancellation",
    desc: "Changed your mind? Full refund up to 7 days before check-in. No questions asked.",
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
