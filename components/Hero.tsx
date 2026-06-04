"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, CalendarDays, Users } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const router = useRouter();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests && guests !== "2") params.set("guests", guests);
    router.push(`/properties?${params.toString()}`);
  };

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
          Lakeside camping, cozy cottages, luxury villas, and adventure activities — all in one place.
        </p>

        {/* Search Widget */}
        <form className={styles.searchWidget} onSubmit={handleSearch}>
          <div className={styles.searchField}>
            <CalendarDays size={18} className={styles.searchIcon} />
            <div className={styles.searchFieldInner}>
              <label className={styles.searchLabel}>Check-in</label>
              <input
                type="date"
                className={styles.searchInput}
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.searchDivider} />
          <div className={styles.searchField}>
            <CalendarDays size={18} className={styles.searchIcon} />
            <div className={styles.searchFieldInner}>
              <label className={styles.searchLabel}>Check-out</label>
              <input
                type="date"
                className={styles.searchInput}
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.searchDivider} />
          <div className={styles.searchField}>
            <Users size={18} className={styles.searchIcon} />
            <div className={styles.searchFieldInner}>
              <label className={styles.searchLabel}>Guests</label>
              <select
                className={styles.searchInput}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className={styles.searchBtn}>
            <Search size={20} />
            <span>Search</span>
          </button>
        </form>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
}
