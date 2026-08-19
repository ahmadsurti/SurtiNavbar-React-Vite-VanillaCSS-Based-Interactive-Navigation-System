import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, X, Plus, Trash2, ChevronUp, ChevronDown, Copy, Check } from 'lucide-react';
import Navbar, { DEFAULT_PROPS } from './Navbar';
import './NavbarPlayground.css';

const initialConfig = {
  ...DEFAULT_PROPS,
  links: DEFAULT_PROPS.links.filter((l) => l.label !== 'Security'),
};

function generateCode(config, format = 'component') {
  const formattedLinks = config.links
    .map((l) => `    { label: '${l.label}', href: '${l.href}' }`)
    .join(',\n');

  const configObj = `const navbarConfig = {
  links: [
${formattedLinks}
  ],
  logo: {
    img: '${config.logo.img}',
    text: '${config.logo.text}',
    showText: ${config.logo.showText}
  },
  cta: {
    signin: { label: '${config.cta.signin.label}', href: '${config.cta.signin.href}', show: ${config.cta.signin.show} },
    primary: { label: '${config.cta.primary.label}', href: '${config.cta.primary.href}', show: ${config.cta.primary.show} }
  },
  scrollBehavior: '${config.scrollBehavior}', // 'pill-on-scroll' | 'always-pill' | 'static'
  glass: '${config.glass}', // 'subtle' | 'strong' | 'solid'
  borderRadius: '${config.borderRadius}', // 'pill' | 'rounded' | 'sharp'
  linkHover: '${config.linkHover}', // 'underline-grow' | 'color-only' | 'bg-pill'
  negativeText: ${config.negativeText},
  noise: ${config.noise}
};`;

  if (format === 'config') return configObj;

  if (format === 'jsx') {
    return `<Navbar
  links={[
${formattedLinks}
  ]}
  logo={{ img: '${config.logo.img}', text: '${config.logo.text}', showText: ${config.logo.showText} }}
  cta={{
    signin: { label: '${config.cta.signin.label}', href: '${config.cta.signin.href}', show: ${config.cta.signin.show} },
    primary: { label: '${config.cta.primary.label}', href: '${config.cta.primary.href}', show: ${config.cta.primary.show} }
  }}
  scrollBehavior="${config.scrollBehavior}"
  glass="${config.glass}"
  borderRadius="${config.borderRadius}"
  linkHover="${config.linkHover}"
  negativeText={${config.negativeText}}
  noise={${config.noise}}
/>`;
  }

  return `import Navbar from './Navbar';

${configObj}

export default function Header() {
  return <Navbar {...navbarConfig} />;
}`;
}

function Seg({ label, value, options, onChange }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((opt) => (
        <button key={opt} className={value === opt ? 'active' : ''} onClick={() => onChange(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function NavbarPlayground() {
  const [config, setConfig] = useState(initialConfig);
  const [noiseEnabled, setNoiseEnabled] = useState(initialConfig.noise > 0);
  const [exportFormat, setExportFormat] = useState('component');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!panelRef.current?.contains(e.target) && !e.target.closest('#site-header')) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const set = (key, val) => setConfig((c) => ({ ...c, [key]: val }));
  const setLogo = (patch) => setConfig((c) => ({ ...c, logo: { ...c.logo, ...patch } }));
  const setCta = (which, patch) => setConfig((c) => ({ ...c, cta: { ...c.cta, [which]: { ...c.cta[which], ...patch } } }));
  const updLink = (i, patch) => setConfig((c) => ({ ...c, links: c.links.map((l, j) => (j === i ? { ...l, ...patch } : l)) }));
  const addLink = () => setConfig((c) => ({ ...c, links: [...c.links, { label: 'New link', href: '#' }] }));
  const removeLink = (i) => setConfig((c) => ({ ...c, links: c.links.filter((_, j) => j !== i) }));
  const moveLink = (i, dir) =>
    setConfig((c) => {
      const links = [...c.links];
      const j = i + dir;
      if (j < 0 || j >= links.length) return c;
      [links[i], links[j]] = [links[j], links[i]];
      return { ...c, links };
    });

  const exportConfig = { ...config, noise: noiseEnabled ? config.noise : 0 };
  const settingsLink = { label: 'Settings', href: '#', onClick: () => setOpen((v) => !v) };

  const generatedCode = generateCode(exportConfig, exportFormat);

  const copyCode = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar {...exportConfig} links={[...config.links, settingsLink]} />
      <div ref={panelRef} className={`playground-panel ${open ? 'open' : ''}`} role="dialog" aria-label="Navbar settings">
        <div className="panel-header">
          <div className="panel-title">
            <SlidersHorizontal />
            Navbar settings
          </div>
          <button className="panel-close" aria-label="Close settings" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="panel-body">
          <div className="panel-section">
            <div className="section-label">Links</div>
            {config.links.map((link, i) => (
              <div key={i} className="link-row">
                <input className="pg-input" value={link.label} placeholder="Label" onChange={(e) => updLink(i, { label: e.target.value })} />
                <input className="pg-input" value={link.href} placeholder="Href" onChange={(e) => updLink(i, { href: e.target.value })} />
                <div className="link-row-actions">
                  <button className="btn-icon" aria-label="Move up" disabled={i === 0} onClick={() => moveLink(i, -1)}>
                    <ChevronUp />
                  </button>
                  <button className="btn-icon" aria-label="Move down" disabled={i === config.links.length - 1} onClick={() => moveLink(i, 1)}>
                    <ChevronDown />
                  </button>
                  <button className="btn-icon danger" aria-label="Remove link" onClick={() => removeLink(i)}>
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
            <button className="btn-add-link" onClick={addLink}>
              <Plus /> Add link
            </button>
          </div>

          <div className="panel-section">
            <div className="section-label">Logo</div>
            <label className="pg-field">
              <span>Image URL</span>
              <input className="pg-input" value={config.logo.img} onChange={(e) => setLogo({ img: e.target.value })} />
            </label>
            <label className="pg-field">
              <span>Text</span>
              <input className="pg-input" value={config.logo.text} onChange={(e) => setLogo({ text: e.target.value })} />
            </label>
            <label className="pg-toggle">
              <span>Show text</span>
              <input type="checkbox" checked={config.logo.showText} onChange={(e) => setLogo({ showText: e.target.checked })} />
              <span className="track" />
            </label>
          </div>

          <div className="panel-section">
            <div className="section-label">CTAs</div>
            <label className="pg-field">
              <span>Sign in label</span>
              <input className="pg-input" value={config.cta.signin.label} onChange={(e) => setCta('signin', { label: e.target.value })} />
            </label>
            <label className="pg-toggle">
              <span>Show sign in</span>
              <input type="checkbox" checked={config.cta.signin.show} onChange={(e) => setCta('signin', { show: e.target.checked })} />
              <span className="track" />
            </label>
            <label className="pg-field">
              <span>Primary label</span>
              <input className="pg-input" value={config.cta.primary.label} onChange={(e) => setCta('primary', { label: e.target.value })} />
            </label>
            <label className="pg-toggle">
              <span>Show primary</span>
              <input type="checkbox" checked={config.cta.primary.show} onChange={(e) => setCta('primary', { show: e.target.checked })} />
              <span className="track" />
            </label>
          </div>

          <div className="panel-section">
            <div className="section-label">Style</div>
            <Seg
              label="Scroll behavior"
              value={config.scrollBehavior}
              options={['pill-on-scroll', 'always-pill', 'static']}
              onChange={(v) => {
                setConfig((c) => ({ ...c, scrollBehavior: v, negativeText: v === 'static' && c.negativeText }));
                if (v === 'static') setNoiseEnabled(false);
              }}
            />
            <Seg label="Glass" value={config.glass} options={['subtle', 'strong', 'solid']} onChange={(v) => set('glass', v)} />
            <Seg label="Border radius" value={config.borderRadius} options={['pill', 'rounded', 'sharp']} onChange={(v) => set('borderRadius', v)} />
            <Seg label="Link hover" value={config.linkHover} options={['underline-grow', 'color-only', 'bg-pill']} onChange={(v) => set('linkHover', v)} />
            {config.scrollBehavior !== 'static' && (
              <div className={`pg-slider ${noiseEnabled ? '' : 'is-disabled'}`}>
                <label className="pg-toggle">
                  <span>Noise texture</span>
                  <input type="checkbox" checked={noiseEnabled} onChange={(e) => setNoiseEnabled(e.target.checked)} />
                  <span className="track" />
                </label>
                <div className="pg-slider-head">
                  <span>Intensity</span>
                  <span className="pg-slider-value">{config.noise}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={config.noise}
                  disabled={!noiseEnabled}
                  aria-label="Noise intensity"
                  onChange={(e) => set('noise', Number(e.target.value))}
                />
              </div>
            )}
            {config.scrollBehavior === 'static' && (
              <label className="pg-toggle">
                <span>Negative text</span>
                <input type="checkbox" checked={config.negativeText} onChange={(e) => set('negativeText', e.target.checked)} />
                <span className="track" />
              </label>
            )}
          </div>

          <div className="panel-section">
            <div className="section-label">Export Code</div>
            <Seg
              label="Export Format"
              value={exportFormat}
              options={['component', 'config', 'jsx']}
              onChange={setExportFormat}
            />
            <pre className="code-block">{generatedCode}</pre>
            <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={copyCode}>
              {copied ? <Check /> : <Copy />}
              {copied ? 'Copied to Clipboard!' : `Copy ${exportFormat === 'component' ? 'Full Component' : exportFormat.toUpperCase()}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
