import { GlowingEffect } from './GlowingEffect';
import './Features.css';

const CARDS = [
  {
    area: 'card-a',
    tag: '01',
    title: 'AI Loan Approval',
    description:
      'Submit once. Our model reads your full financial fingerprint and returns an eligibility verdict in seconds — no branch visit, no paperwork pile.',
  },
  {
    area: 'card-b',
    tag: '02',
    title: 'Smart Credit Card Picks',
    description:
      'Ranked recommendations built from your spending DNA. Cashback, travel miles, or low APR — matched to how you actually spend.',
  },
  {
    area: 'card-c',
    tag: '03',
    title: 'Loan Application Manager',
    description:
      'Every application, every lender, every status update — unified in a single live dashboard so nothing slips through the cracks.',
  },
  {
    area: 'card-d',
    tag: '04',
    title: 'AI Assistance',
    description:
      'Ask anything. Your personal finance co-pilot answers in plain language, flags risks before they cost you, and guides every decision.',
  },
];

export default function Features() {
  return (
    <section className="features-section" aria-labelledby="features-heading">
      <div className="features-header">
        <p className="features-eyebrow">WHAT CREDENCE DOES</p>
        <h2 className="features-heading" id="features-heading">
          Four tools.<br />One financial edge.
        </h2>
      </div>

      <ul className="features-grid">
        {CARDS.map(({ area, tag, title, description }) => (
          <li key={area} className={`features-item features-item--${area}`}>
            <div className="features-outer">
              <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={3} />
              <div className="features-inner">
                <div className="features-tag">{tag}</div>
                <div className="features-body">
                  <h3 className="features-title">{title}</h3>
                  <p className="features-desc">{description}</p>
                </div>
                <div className="features-corner-mark" aria-hidden="true" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
