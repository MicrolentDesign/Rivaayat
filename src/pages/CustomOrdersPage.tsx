import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ButtonLink } from '@/components/primitives/Button';
import { SectionHead } from '@/components/primitives/SectionHead';
import { Reveal } from '@/components/primitives/Reveal';
import { Img } from '@/components/primitives/Img';
import { categoryArt } from '@/data/categoryImages';
import { SIZES, asset } from '@/lib/image';
import { Marquee } from '@/components/sections/Marquee';
import { IconRuler, IconNeedle, IconReturn, IconTruck } from '@/components/primitives/Icon';

const STEPS = [
  ['01', 'Choose the garment', 'Pick any piece in the collection. Every one of them can be made to your measurements instead of to a chest size.'],
  ['02', 'Take your measurements', 'A labelled diagram walks you through each one, in inches by default or centimetres if you prefer. Six numbers for a kurta.'],
  ['03', 'We check them', 'A cutter reads every set before anything is cut. If a number looks wrong against the others, we call you rather than guess.'],
  ['04', 'It gets made', 'Cut to your numbers, finished by hand, and shipped with the order card naming everyone who worked on it.'],
];

export function CustomOrdersPage() {
  return (
    <>
      <header style={{ position: 'relative' }}>
        <div className="media scrim" style={{ aspectRatio: '16 / 7', minHeight: '20rem' }}>
          <img src={asset('/img/cat-custom.svg')} alt="" />
        </div>
        <div className="overlay-content overlay-bl">
          <div className="container" style={{ paddingInline: 0 }}>
            <p className="eyebrow">Made to measure, no surcharge</p>
            <h1 className="t-hero" style={{ color: 'var(--color-canvas)', maxWidth: '15ch', marginTop: '0.75rem' }}>
              Custom Orders
            </h1>
          </div>
        </div>
      </header>

      <section className="section-lg">
        <div className="container-reading" style={{ textAlign: 'center' }}>
          <p className="t-lead">
            Off-the-peg menswear was cut for a standard chest, and almost nobody has one. Every piece in the
            collection can be made to your own numbers instead — for the same price as the sized version.
          </p>
        </div>
      </section>

      <Marquee items={['No surcharge for made to measure', 'Six measurements for a kurta', 'Checked by a cutter before anything is cut', 'Free alterations on the first fitting']} />

      <section className="section-lg">
        <div className="container">
          <SectionHead eyebrow="How it works" title="Four steps, no surprises" />
          <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))' }}>
            {STEPS.map(([n, title, body], i) => (
              <Reveal key={n} delay={i * 80}>
                <div className="stack-sm" style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1.25rem' }}>
                  <p className="t-display" style={{ color: 'var(--color-line)', lineHeight: 1 }}>{n}</p>
                  <h3 className="t-h4">{title}</h3>
                  <p className="t-sm" style={{ color: 'var(--color-ink-soft)' }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg scheme-alabaster">
        <div className="container">
          <SectionHead eyebrow="Start here" title="Choose a garment" center
            intro="Each one has its own measurement diagram — the numbers a sherwani needs are not the numbers a waistcoat needs." />
          <div className="grid-tiles-4">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 90}>
                <Link to={c.slug === 'kurta' ? '/custom/zafar-kurta-set' : `/shop/${c.slug}`}
                      className="group" style={{ display: 'block', position: 'relative' }}>
                  <div className="media media-portrait media-zoom scrim">
                    <Img {...categoryArt(c.slug)} sizes={SIZES.third} alt="" />
                  </div>
                  <div className="overlay-content overlay-bl" style={{ padding: '1.5rem' }}>
                    <h3 className="t-h3" style={{ color: 'var(--color-canvas)' }}>{c.name}</h3>
                    <p className="eyebrow" style={{ marginTop: '0.4rem' }}>
                      {c.slug === 'kurta' ? 'Take measurements' : 'Start a custom order'}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg">
        <div className="container">
          <div style={{ display: 'grid', gap: '2.5rem clamp(1.5rem, 4vw, 3.5rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 17rem), 1fr))' }}>
            {[
              { Icon: IconRuler,  title: 'No surcharge', body: 'Made to measure costs what the sized version costs. It always has.' },
              { Icon: IconNeedle, title: 'Checked by a cutter', body: 'Every set of numbers is read by a person before cloth is cut.' },
              { Icon: IconReturn, title: 'First fitting is free', body: 'If it needs adjusting when it arrives, we alter it at no cost.' },
              { Icon: IconTruck,  title: 'Same lead time', body: 'Custom does not mean slower. The frame takes as long as it takes.' },
            ].map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={(i % 4) * 70}>
                <div className="stack-sm">
                  <span style={{ color: 'var(--color-accent)' }}><Icon size={22} /></span>
                  <h3 className="t-h4">{title}</h3>
                  <p className="t-sm" style={{ color: 'var(--color-ink-soft)' }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-xl scheme-dark">
        <div className="container-reading" style={{ textAlign: 'center' }}>
          <p className="eyebrow">Rather come in?</p>
          <h2 className="t-display" style={{ margin: '0.75rem 0 1rem', color: 'var(--color-on-dark)' }}>
            We will take the measurements for you.
          </h2>
          <p className="t-lead" style={{ color: 'var(--color-on-dark-muted)', marginBottom: '2rem' }}>
            Fittings at the Jaipur atelier, trunk shows in Delhi, Mumbai, London and Dubai, or a video call with a
            tape measure and an hour. All three cost nothing.
          </p>
          <ButtonLink to="/atelier#appointment" variant="on-dark">Book an appointment</ButtonLink>
        </div>
      </section>
    </>
  );
}
