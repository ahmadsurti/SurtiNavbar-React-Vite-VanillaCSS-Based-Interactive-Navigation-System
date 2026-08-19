import { useEffect, useRef, useMemo } from 'react';
import { Style, Avatar } from '@dicebear/core';
import notionists from '@dicebear/styles/notionists.json' with { type: 'json' };
import './Testimonials.css';

const AVATAR_STYLE = new Style(notionists);

const TESTIMONIALS = [
  {
    name: 'Amara Chen',
    role: 'CFO, Meridian Capital',
    quote: (
      <>
        We deployed our first <strong>credence</strong> agent on a Friday. By Monday it
        had reconciled a full quarter of ledgers — zero exceptions, zero hand-holding.
      </>
    ),
  },
  {
    name: 'Daniel Okafor',
    role: 'Head of Risk, Northgate Bank',
    quote: (
      <>
        The audit trail sold our compliance team on day one. Every decision the agent
        makes is explainable, replayable, and cryptographically signed.
      </>
    ),
  },
  {
    name: 'Sofia Marchetti',
    role: 'Founder, Ledgerline',
    quote: (
      <>
        <strong>credence</strong> replaced three vendors and a spreadsheet ritual nobody
        will miss. Our finance ops team got their Fridays back.
      </>
    ),
  },
  {
    name: 'Viktor Hale',
    role: 'CTO, Apex Treasury',
    quote: (
      <>
        It is the first agent platform to pass our security review with{' '}
        <strong>zero findings</strong>. That has literally never happened before.
      </>
    ),
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const avatarUris = useMemo(
    () =>
      TESTIMONIALS.map(
        (item) =>
          new Avatar(AVATAR_STYLE, { seed: item.name }).toDataUri()
      ),
    []
  );

  useEffect(() => {
    let raf = 0;
    let inView = false;

    const update = () => {
      raf = 0;
      if (!inView) return;
      const vh = window.innerHeight;
      itemsRef.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height * 0.5 - vh * 0.5);
        const t = Math.max(0, 1 - dist / (vh * 0.62));
        const eased = t * t * (3 - 2 * t);
        el.style.opacity = (0.1 + 0.9 * eased).toFixed(3);
        el.style.transform = `translateY(${((1 - eased) * 1.25).toFixed(2)}rem) scale(${(0.97 + 0.03 * eased).toFixed(3)})`;
      });
    };

    const schedule = () => {
      if (!raf && inView) raf = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) update();
    }, { rootMargin: '100px 0px' });

    if (sectionRef.current) observer.observe(sectionRef.current);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section ref={sectionRef} className="tst-section" aria-labelledby="tst-heading">
      <div className="tst-layout">
        <header className="tst-header">
          <p className="tst-eyebrow">WHAT PEOPLE ARE SAYING</p>
          <h2 className="tst-heading" id="tst-heading">
            Trusted where the numbers matter.
          </h2>
        </header>

        <div className="tst-list">
          {TESTIMONIALS.map((item, i) => (
            <figure key={item.name} className="tst-item" ref={(el) => (itemsRef.current[i] = el)}>
              <div className="tst-avatar-wrap">
                <div className="tst-avatar-blur" aria-hidden="true" />
                <img
                  className="tst-avatar"
                  src={avatarUris[i]}
                  alt={`Portrait of ${item.name}`}
                  aria-label={item.name}
                />
              </div>
              <figcaption className="tst-caption">
                <blockquote className="tst-quote">{item.quote}</blockquote>
                <div>
                  <cite className="tst-name">{item.name}</cite>
                  <div className="tst-role">{item.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
