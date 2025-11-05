// app/page.jsx o pages/index.jsx
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div>
          <h1>Launch your store in minutes.</h1>
          <p>Stripe-native. Built for AI.</p>
          <button>Try it today</button>
        </div>
        <img src="/" alt="Product" />
      </section>

      <section className={styles.products}>
        <div className={styles.card}>Horizon Gaze Sunglasses - $50.00</div>
        <div className={styles.card}>Sunbeam Tote - $99.00</div>
        <div className={styles.card}>Shadow Stride Shoes - $120.00</div>
        <div className={styles.card}>Zebra Blend T-Shirt - $45.00</div>
      </section>
    </div>
  );
}
