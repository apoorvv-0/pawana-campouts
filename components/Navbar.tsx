"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Stays", href: "/properties?type=stay" },
  { label: "Activities", href: "/properties?type=activity" },
  { label: "Bundles", href: "/properties?type=bundle" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`${styles.inner} container`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🏕️</span>
          <span className={styles.logoText}>Pawana Campouts</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={styles.link}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/booking" className={`btn btn-primary btn-sm ${styles.cta}`}>
          Book Now
        </Link>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={styles.drawerLink}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/booking"
              className={`btn btn-primary ${styles.drawerCta}`}
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
