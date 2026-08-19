import { useState } from 'react';
import './Footer.css';

const LINKS = {
  Product: [
    { label: 'AI Loan Approval', href: '#' },
    { label: 'Credit Card Picks', href: '#' },
    { label: 'My Applications', href: '#' },
    { label: 'EMI Calculator', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  const [active, setActive] = useState(false);

  return (
    <footer
      className={`footer ${active ? 'is-active' : ''}`}
      onClick={() => setActive((v) => !v)}
      role="region"
      aria-label="Footer"
    >
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="footer-brand-link" onClick={(e) => e.stopPropagation()}>
            <img src="/logo.png" alt="Credence logo" className="footer-brand-img" />
            <span className="footer-brand-name">credence</span>
          </a>
          <p className="footer-tagline">
            Your personal AI financial advisor. Track everything, ask anything.
          </p>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Credence. All rights reserved.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} className="footer-nav-col">
              <span className="footer-nav-heading">{group}</span>
              <ul className="footer-nav-list">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="footer-nav-link" onClick={(e) => e.stopPropagation()}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* ── EASTER EGG NOTE ── */}
      <div className="footer-easter-egg" aria-hidden="true">
        <svg viewBox="0 0 320 60" className="easter-egg-svg">
          <defs>
            <path id="note-curve" d="M 20 48 Q 160 12 300 45" fill="none" />
          </defs>
          <text className="easter-egg-text">
            <textPath href="#note-curve" startOffset="50%" textAnchor="middle">
              ← hover or click me
            </textPath>
          </text>
        </svg>
      </div>

      {/* ── BLEEDING WORDMARK ── */}
      <div className="footer-wordmark" aria-hidden="true">
        credence
      </div>
    </footer>
  );
}
