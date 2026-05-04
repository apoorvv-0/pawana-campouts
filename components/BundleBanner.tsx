import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./BundleBanner.module.css";

export default function BundleBanner() {
  return (
    <section className={styles.banner} id="bundles-cta">
      <div className={`${styles.inner} container`}>
        <div className={styles.content}>
          <h2 className={styles.headline}>
            Stay + Activities.
            <br />
            One price. <span className={styles.accent}>Zero hassle.</span>
          </h2>
          <p className={styles.desc}>
            Bundle your stay with activities and save up to 30%. Everything
            planned, everything included.
          </p>
          <Link href="/properties?type=bundle" className={`btn ${styles.cta}`}>
            See Bundles
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Decorative shapes */}
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
      </div>
    </section>
  );
}
