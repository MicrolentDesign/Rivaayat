import { EditorialSplit } from '@/components/sections/EditorialSplit';
import { ValueProps } from '@/components/sections/ValueProps';
import { Marquee } from '@/components/sections/Marquee';
import { Manifesto } from '@/components/sections/Manifesto';
import { Button } from '@/components/primitives/Button';
import { SectionHead } from '@/components/primitives/SectionHead';
import { Reveal } from '@/components/primitives/Reveal';
import { asset } from '@/lib/image';

const STEPS = [
  ['01', 'The measurements', 'Six numbers for a kurta, taken here or sent from wherever you are. There is a video that walks you through it and a person who will get on a call if it does not.'],
  ['02', 'The toile', 'A cotton mock-up, cut to your numbers and photographed on a form. You see it before a single metre of silk is touched.'],
  ['03', 'The frame', 'Embroidery goes on a wooden frame and stays there for as long as it takes. Six weeks for a kurta, ninety days for a sherwani.'],
  ['04', 'The finish', 'Hand-rolled edges, hidden seams, a final press. Then the muslin bag, the order card, and the names of everyone who touched it.'],
];

export function AtelierPage() {
  return (
    <>
      <header style={{ position: 'relative' }}>
        <div className="media scrim" style={{ aspectRatio: '16 / 7', minHeight: '22rem' }}>
          <img src={asset('/img/atelier.svg')} alt="" />
        </div>
        <div className="overlay-content overlay-bl">
          <div className="container" style={{ paddingInline: 0 }}>
            <p className="eyebrow">Since 1974</p>
            <h1 className="t-hero" style={{ color: 'var(--color-canvas)', maxWidth: '16ch', marginTop: '0.75rem' }}>The Atelier</h1>
          </div>
        </div>
      </header>

      <section className="section-lg">
        <div className="container-reading" style={{ textAlign: 'center' }}>
          <p className="eyebrow">Our story</p>
          <p className="t-lead" style={{ marginTop: '1.5rem' }}>
            Rivaayat began as a single room above a fabric shop in Jaipur, with one loom, two people, and an argument
            about whether machine embroidery counted. Fifty-two years later the argument is settled and the room is
            bigger, but the answer is the same one.
          </p>
        </div>
      </section>

      <Marquee items={['Seventy-one artisan families', 'Eight Indian states', 'Fifty-two years', 'Natural fibres only']} />

      <EditorialSplit
        image="/img/editorial-01.svg"
        eyebrow="How a piece is made"
        title="Nothing here is finished in a week."
        body={[
          'Every commission runs the same four stages, whether it is an ₹8,900 kurta or a sherwani that takes three months.',
          'We tell you which stage you are at, by name, with a photograph. Nobody has to email us to ask.',
        ]}
        scheme="scheme-alabaster"
      />

      <section className="section-lg" id="measure">
        <div className="container">
          <SectionHead eyebrow="The process" title="Four stages, no surprises" />
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

      <Manifesto
        eyebrow="Why we name the maker"
        quote="If a piece is good enough to carry our name, it is good enough to carry theirs."
        attribution="Ira Sengupta · Founder"
      />

      <div id="artisans"><ValueProps /></div>

      {/* appointment form */}
      <section className="section-xl scheme-bone" id="appointment">
        <div className="container">
          <div className="split">
            <div className="stack-md">
              <p className="eyebrow">Book an appointment</p>
              <h2 className="t-display">Come in, or bring us to you.</h2>
              <p className="t-lead measure">
                Fittings at the Jaipur atelier, trunk shows in Delhi, Mumbai, London and Dubai, or a video
                consultation with a tape measure and an hour. All three cost nothing.
              </p>
            </div>
            <form className="stack-md" onSubmit={(e) => { e.preventDefault(); alert('Demo form — wire to your booking backend.'); }}>
              <div className="pdp__spec" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))' }}>
                <div><label className="field-label" htmlFor="fn">First name</label><input id="fn" className="input" required /></div>
                <div><label className="field-label" htmlFor="ln">Last name</label><input id="ln" className="input" required /></div>
              </div>
              <div><label className="field-label" htmlFor="em">Email</label><input id="em" type="email" className="input" required /></div>
              <div>
                <label className="field-label" htmlFor="ty">What are you after</label>
                <select id="ty" className="select">
                  <option>Sherwani commission</option><option>Bandhgala or suiting</option>
                  <option>Kurta sets</option><option>Alteration of an existing piece</option>
                </select>
              </div>
              <div><label className="field-label" htmlFor="ms">Anything we should know</label><textarea id="ms" className="textarea" placeholder="The date, the city, the piece you have in mind…" /></div>
              <Button type="submit">Request an appointment</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
