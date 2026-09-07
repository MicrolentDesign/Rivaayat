import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Rating } from '@/components/primitives/Rating';
import { Price } from '@/components/primitives/Price';
import { SwatchRow } from '@/components/primitives/Swatch';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import * as Icons from '@/components/primitives/Icon';

/* Living reference for the system. Everything on this page reads its values
   from tokens.css at runtime, so it can never drift from the real theme.   */

const COLORS: [string, string, string][] = [
  ['--color-ink', 'Ink', 'Headings, buttons, footer ground'],
  ['--color-ink-soft', 'Ink Soft', 'Secondary copy'],
  ['--color-ink-muted', 'Ink Muted', 'Meta, captions'],
  ['--color-ink-faint', 'Ink Faint', 'Placeholders'],
  ['--color-canvas', 'Canvas', 'Scheme: default'],
  ['--color-alabaster', 'Alabaster', 'Scheme: 1'],
  ['--color-bone', 'Bone', 'Scheme: 2 · product tiles'],
  ['--color-clay', 'Clay', 'Scheme: 3 · editorial'],
  ['--color-line', 'Line', 'Default hairline'],
  ['--color-line-soft', 'Line Soft', 'Hairline on tint'],
  ['--color-accent', 'Accent · Henna', 'Links, sale, stars, focus'],
  ['--color-accent-hover', 'Accent Hover', 'Accent pressed'],
  ['--color-marigold', 'Marigold', 'Heritage support ≤5%'],
  ['--color-indigo', 'Indigo', 'Heritage support ≤5%'],
  ['--color-success', 'Success', 'In stock, confirmed'],
  ['--color-danger', 'Danger', 'Errors, sold out'],
];

const TYPE: [string, string, string][] = [
  ['t-hero', 'Hero', '44 → 88px · Calone 400 · -0.012em'],
  ['t-display', 'Display', '36 → 64px · Calone 400'],
  ['t-h1', 'Heading 1', '30 → 48px · Calone 400'],
  ['t-h2', 'Heading 2', '24 → 34px · Calone 400'],
  ['t-h3', 'Heading 3', '20 → 24px · Calone 400'],
  ['t-h4', 'Heading 4', '18px · Calone 400'],
  ['t-lead', 'Lead', '16 → 18px · Manrope 400'],
  ['t-body', 'Body', '15px · Manrope 400 · 1.6'],
  ['t-sm', 'Small', '14px · Manrope 400'],
  ['t-meta', 'Meta', '12px · Manrope 400 · muted'],
  ['eyebrow', 'Eyebrow', '11px · Manrope 500 · 0.18em · uppercase'],
];

const SPACING: [string, string][] = [
  ['--section-y', 'Section · 44 → 50px'],
  ['--section-y-lg', 'Section LG · 60 → 80px'],
  ['--section-y-xl', 'Section XL · 72 → 110px'],
  ['--gutter', 'Gutter mobile · 16px'],
  ['--gutter-md', 'Gutter tablet · 20px'],
  ['--gutter-lg', 'Gutter desktop · 30px'],
];

export function DesignSystemPage() {
  const [tone, setTone] = useState('Henna');
  const iconEntries = Object.entries(Icons).filter(([k]) => k.startsWith('Icon'));

  return (
    <>
      <header className="scheme-alabaster" style={{ paddingBlock: 'clamp(2.5rem, 6vw, 4.5rem)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container">
          <p className="eyebrow">Design system · v1.0</p>
          <h1 className="t-display" style={{ marginTop: '0.75rem' }}>The Rivaayat system</h1>
          <p className="t-lead measure" style={{ marginTop: '1rem' }}>
            Derived from <em>echoesofindiastudio.com</em> (warm-neutral gallery minimalism) and{' '}
            <em>chantilly.myshopify.com</em> (ultra-light display type, hard edges, tinted section schemes),
            then rebuilt on the client’s own faces — Calone prime, Manrope secondary — and warmed with one heritage accent for couture rather than resort.
          </p>
        </div>
      </header>

      <Section n="01" title="Colour" note="Both references are functionally monochrome: a white canvas, one near-black ink, a warm stone hairline, one accent used sparingly. We keep that discipline and warm every neutral toward the textile.">
        <div className="ds-swatches">
          {COLORS.map(([token, name, use]) => (
            <div key={token}>
              <div style={{ height: '5rem', background: `var(${token})`, border: '1px solid var(--color-line)' }} />
              <p className="t-sm" style={{ marginTop: '0.6rem', color: 'var(--color-ink)' }}>{name}</p>
              <p className="t-meta"><code>{token}</code></p>
              <p className="t-meta">{use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="02" title="Typography" note="Calone is the client’s prime face and carries every heading and the wordmark; Manrope is the secondary and carries body, UI, buttons and eyebrows. Calone ships a single weight, so the airy display quality the Chantilly reference got from Montserrat 200 is reproduced here through size, leading and a light −0.012em tracking instead — font-synthesis is off so no browser fakes a weight the family does not have.">
        <div className="stack-lg">
          {TYPE.map(([cls, label, spec]) => (
            <div key={cls} style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1.25rem' }}>
              <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <code className="t-meta">.{cls}</code><span className="t-meta">{spec}</span>
              </div>
              <p className={cls}>{label} — Rivaayat, carried forward</p>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1.25rem' }}>
            <div className="cluster" style={{ justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <code className="t-meta">.t-quote</code><span className="t-meta">Calone 400 · pull-quotes only</span>
            </div>
            <p className="t-quote">A garment worth keeping is worth signing.</p>
          </div>
        </div>
      </Section>

      <Section n="03" title="Buttons" note="Radius 0 everywhere, uppercase at 12px / 0.08em, 1.15em block padding — Chantilly's button contract, unchanged.">
        <div className="stack-lg">
          <Row label="Variants">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button><Button>Medium</Button><Button size="lg">Large</Button>
          </Row>
          <Row label="On imagery">
            <div className="media" style={{ padding: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <img src="/img/editorial-03.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                <Button variant="overlay">Overlay</Button>
              </span>
            </div>
          </Row>
        </div>
      </Section>

      <Section n="04" title="Form controls" note="Hairline boxes at radius 0, active state is a 1px ink inset. Only swatches round, at the pill radius — the one curved element in the whole system.">
        <div className="ds-grid">
          <div className="stack-sm">
            <label className="field-label" htmlFor="ds-i">Text input</label>
            <input id="ds-i" className="input" placeholder="you@example.com" />
            <p className="field-hint">Helper text sits at 12px, muted.</p>
          </div>
          <div className="stack-sm">
            <label className="field-label" htmlFor="ds-e">Error state</label>
            <input id="ds-e" className="input input-error" defaultValue="not-an-email" />
            <p className="field-error">Enter a valid email address.</p>
          </div>
          <div className="stack-sm">
            <label className="field-label" htmlFor="ds-s">Select</label>
            <select id="ds-s" className="select"><option>Bridal commission</option><option>Made to measure</option></select>
          </div>
          <div className="stack-sm">
            <label className="field-label" htmlFor="ds-u">Underline field</label>
            <input id="ds-u" className="input input-underline" placeholder="Newsletter / search" />
          </div>
          <div className="stack-sm">
            <p className="field-label">Checkbox &amp; radio</p>
            <label className="cluster t-sm" style={{ gap: '0.65rem' }}><input type="checkbox" className="checkbox" defaultChecked /> Selected</label>
            <label className="cluster t-sm" style={{ gap: '0.65rem' }}><input type="checkbox" className="checkbox" /> Unselected</label>
            <label className="cluster t-sm" style={{ gap: '0.65rem' }}><input type="radio" name="ds-r" className="radio" defaultChecked /> Radio on</label>
          </div>
          <div className="stack-sm">
            <p className="field-label">Colour swatch · {tone}</p>
            <SwatchRow large selected={tone} onSelect={setTone}
              colors={[{ name: 'Henna', hex: '#9C4A21' }, { name: 'Marigold', hex: '#C08A2E' }, { name: 'Indigo', hex: '#2B3A4A' }, { name: 'Ivory', hex: '#F2EDE4' }, { name: 'Two-tone', hex: '#9C4A21', hex2: '#C08A2E' }]} />
          </div>
          <div className="stack-sm">
            <p className="field-label">Variant chips</p>
            <div className="cluster" style={{ gap: '0.5rem' }}>
              <button className="variant-chip" aria-pressed="true">S</button>
              <button className="variant-chip">M</button>
              <button className="variant-chip">L</button>
              <button className="variant-chip" disabled>XL</button>
            </div>
          </div>
        </div>
      </Section>

      <Section n="05" title="Badges, price & rating" note="Product labels carry the Chantilly vocabulary — New, Bestseller, % off, Sold out — as hairline boxes rather than filled pills.">
        <div className="stack-lg">
          <Row label="Badges">
            <span className="badge">New</span>
            <span className="badge badge-solid">One of one</span>
            <span className="badge badge-accent">Made to order</span>
            <span className="badge badge-sale">14% off</span>
            <span className="badge badge-sold">Sold out</span>
          </Row>
          <Row label="Price">
            <Price price={48500} />
            <Price price={48500} from />
            <Price price={42000} compareAt={52000} />
          </Row>
          <Row label="Rating"><Rating value={4.9} count={38} /><Rating value={3} count={12} /></Row>
        </div>
      </Section>

      <Section n="06" title="Product card" note="Media, labels top-left, wishlist top-right, quick view on hover, then title / price / swatches / rating. Hover cross-fades to the second shot and zooms the first by 1.04.">
        <div className="grid-products">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} onQuickView={() => {}} />)}
        </div>
      </Section>

      <Section n="07" title="Section schemes" note="Chantilly ships three tinted grounds plus a dark footer. Ours are the same four roles, warmed toward the cloth.">
        <div className="ds-schemes">
          {[['scheme-default', 'Default'], ['scheme-alabaster', 'Alabaster'], ['scheme-bone', 'Bone'], ['scheme-clay', 'Clay'], ['scheme-dark', 'Dark']].map(([cls, name]) => (
            <div key={cls} className={cls} style={{ padding: '2rem', border: '1px solid var(--color-line)' }}>
              <p className="eyebrow">Scheme</p>
              <h3 className="t-h3" style={{ marginTop: '0.5rem' }}>{name}</h3>
              <p className="t-sm" style={{ marginTop: '0.5rem' }}>Body copy renders at the right contrast on every ground.</p>
              <code className="t-meta" style={{ display: 'block', marginTop: '0.75rem' }}>.{cls}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section n="08" title="Space & measure" note="Chantilly's 50 / 80 / 110px section rhythm and 16 / 20 / 30px gutters, fluid-interpolated. Page width 1600px, reading width 720px.">
        <div className="stack-sm">
          {SPACING.map(([token, label]) => (
            <div key={token} className="cluster" style={{ gap: '1rem', flexWrap: 'nowrap' }}>
              <code className="t-meta" style={{ minWidth: '11rem' }}>{token}</code>
              <div style={{ height: 10, width: `var(${token})`, background: 'var(--color-accent)', flex: 'none' }} />
              <span className="t-meta">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section n="09" title="Icons" note="Hairline set at 1.25px stroke to match the border language. Never filled except stars and an active wishlist heart.">
        <div className="ds-icons">
          {iconEntries.map(([name, Cmp]) => {
            const C = Cmp as React.ComponentType<{ size?: number }>;
            return (
              <div key={name} className="stack-xs" style={{ alignItems: 'center', textAlign: 'center' }}>
                <C size={22} />
                <span className="t-meta">{name.replace('Icon', '')}</span>
              </div>
            );
          })}
        </div>
      </Section>

      <Section n="10" title="Motion" note="Echoes of India's timings, verbatim: 250ms hovers, 360ms panels, ease-out. Media zooms 1.04 over 700ms. Everything collapses under prefers-reduced-motion.">
        <div className="ds-grid">
          {[['--dur-fast', '160ms', 'Colour changes'], ['--dur-base', '250ms', 'Hover states'],
            ['--dur-slow', '360ms', 'Drawers, menus'], ['--dur-editorial', '700ms', 'Media zoom, reveals']].map(([token, val, use]) => (
            <div key={token} className="stack-xs" style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1rem' }}>
              <code className="t-meta">{token}</code>
              <p className="t-h3">{val}</p>
              <p className="t-meta">{use}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Section({ n, title, note, children }: { n: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="container section-lg" style={{ borderTop: '1px solid var(--color-line)' }}>
      <header className="stack-sm" style={{ marginBottom: '2.5rem' }}>
        <p className="eyebrow">{n}</p>
        <h2 className="t-h1">{title}</h2>
        <p className="t-sm measure" style={{ color: 'var(--color-ink-soft)' }}>{note}</p>
      </header>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1.25rem' }}>
      <p className="eyebrow" style={{ marginBottom: '1rem' }}>{label}</p>
      <div className="cluster" style={{ gap: '1rem' }}>{children}</div>
    </div>
  );
}
