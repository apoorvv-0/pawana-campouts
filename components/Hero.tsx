import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      {/* Background image */}
      <div className={styles.bgWrap}>
        <Image
          src="/images/hero-landscape.png"
          alt="Pawana Lake landscape at golden hour"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgIBBAMBAAAAAAAAAAAAAQIAAwQREiExBRNBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAT/xAAZEQADAAMAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEQA/ALoXk8q2u9lKELuI0B5+TKz+R+REVckxnY//2Q=="
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={`${styles.content} container`}>
        <span className={styles.badge}>Near Pawana Lake, Pune</span>
        <h1 className={styles.headline}>
          Escape. Explore.
          <br />
          <span className={styles.headlineAccent}>Unwind.</span>
        </h1>
        <p className={styles.subheadline}>
          Stays, activities, and complete weekend bundles near Pawana Lake.
        </p>
        <div className={styles.ctas}>
          <Link href="/properties?type=stay" className="btn btn-primary">
            Browse Stays
          </Link>
          <Link href="/properties?type=activity" className="btn btn-secondary">
            Browse Activities
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
}
