import { useState, useEffect } from 'react';
import { MenuToggleIcon } from './MenuToggleIcon';
import './Navbar.css';

const DEFAULT_PROPS = {
  links: [
    { label: 'Capabilities', href: '#features' },
    { label: 'Process', href: '#how-it-works' },
    { label: 'Infra', href: '#infra' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Security', href: '#security' },
  ],
  logo: { img: '/logo.png', text: 'credence', showText: true },
  cta: {
    signin:  { label: 'Sign in',       href: '#', show: true },
    primary: { label: 'Deploy agent',  href: '#', show: true },
  },
  scrollBehavior: 'pill-on-scroll',
  glass: 'strong',
  borderRadius: 'pill',
  linkHover: 'underline-grow',
  negativeText: false,
  noise: 7,
};

export default function Navbar(props) {
  const links = props.links ?? DEFAULT_PROPS.links;
  const logo = { ...DEFAULT_PROPS.logo, ...props.logo };
  const cta = {
    signin: { ...DEFAULT_PROPS.cta.signin, ...props.cta?.signin },
    primary: { ...DEFAULT_PROPS.cta.primary, ...props.cta?.primary },
  };
  const scrollBehavior = props.scrollBehavior ?? DEFAULT_PROPS.scrollBehavior;
  const glass = props.glass ?? DEFAULT_PROPS.glass;
  const borderRadius = props.borderRadius ?? DEFAULT_PROPS.borderRadius;
  const linkHover = props.linkHover ?? DEFAULT_PROPS.linkHover;
  const negativeText = props.negativeText ?? DEFAULT_PROPS.negativeText;
  const noise = props.noise ?? DEFAULT_PROPS.noise;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);
  const isPill = scrollBehavior === 'always-pill' || (scrollBehavior === 'pill-on-scroll' && scrolled);

  return (
    <header
      id="site-header"
      data-glass={glass}
      data-radius={borderRadius}
      data-hover={linkHover}
      style={{ '--noise-opacity': `${noise / 100}` }}
      {...(negativeText ? { 'data-negative': 'on' } : {})}
      className={`${isPill ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
    >
      <nav id="main-nav">
        <div id="nav-inner">
          <a href="#" className="nav-logo" aria-label="Credence home">
            {logo.img && <img src={logo.img} alt="" className="nav-logo-img" />}
            {logo.showText && logo.text && <span className="nav-logo-text">{logo.text}</span>}
          </a>

          <div className="nav-links">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="nav-link"
                onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick(e); } : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-cta">
            {cta.signin.show && (
              <a href={cta.signin.href} className="nav-signin">
                {cta.signin.label}
              </a>
            )}
            {cta.primary.show && (
              <button className="btn-deploy-nav">{cta.primary.label}</button>
            )}
          </div>

          <button
            id="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <MenuToggleIcon open={menuOpen} size={24} duration={400} />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-nav-links">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="mobile-nav-link"
                style={{ transitionDelay: `${i * 60}ms` }}
                onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick(e); closeMenu(); } : closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mobile-menu-cta">
            {cta.signin.show && (
              <button className="btn-mobile-signin" onClick={closeMenu}>{cta.signin.label}</button>
            )}
            {cta.primary.show && (
              <button className="btn-mobile-deploy" onClick={closeMenu}>{cta.primary.label}</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export { DEFAULT_PROPS };
