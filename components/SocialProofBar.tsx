import { Star, Tent, MapPin, ShieldCheck } from 'lucide-react';
import styles from './SocialProofBar.module.css';

const STATS = [
  { icon: <Star size={18} />, label: '4.8 Avg Rating' },
  { icon: <Tent size={18} />, label: '2,000+ Guests Hosted' },
  { icon: <MapPin size={18} />, label: '#1 in Pawana' },
  { icon: <ShieldCheck size={18} />, label: 'Free Cancellation' },
];

export default function SocialProofBar() {
  return (
    <div className={styles.bar} id="social-proof">
      <div className={`container ${styles.inner}`}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.icon}>{stat.icon}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
