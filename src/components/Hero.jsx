import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="/hero-bg.webp" alt="" aria-hidden="true" />
      </div>

      <div className="hero-content">
        <h1 className="hero-headline">Unearth the Hidden Wealth.</h1>
        <div className="hero-sub">
          <p className="hero-sub-primary">
            Find the winning trades everyone else is walking right past.
          </p>
        </div>

        <button className="hero-cta">
          <span className="hero-cta-label">GET STARTED</span>
          <svg
            className="hero-cta-arrow"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <line x1="2" y1="8" x2="13" y2="8" strokeLinecap="round" />
            <polyline points="8,3 13,8 8,13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
