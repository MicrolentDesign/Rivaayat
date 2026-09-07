# Rivaayat — Design System

The system lives in `src/styles/`. It used to also ship as a `/design-system`
page on the site; that was removed from the frontend, so this file is now the
reference. Every value below is read from `src/styles/tokens.css`, which is the
only place to change them.

```
src/styles/
  tokens.css       every design decision, with provenance notes
  base.css         @font-face, element defaults, containers, colour schemes
  components.css   component classes, all built from tokens
```

**Never write a literal colour, size or duration in a component.**

```tsx
// yes
<h2 className="t-display">…</h2>
<section className="section-lg scheme-bone">…</section>
<Button variant="secondary">Shop the collection</Button>

// no
<h2 style={{ fontSize: 48, color: '#1A1714' }}>…</h2>
```

To reskin the whole site, edit the `@theme static` block in `tokens.css` and
nothing else. **`static` is required** — a plain `@theme` makes Tailwind v4
tree-shake tokens nothing references yet, and they silently resolve to nothing
the first time a component asks for one.

---

## 1. Colour

Both references are functionally monochrome: a white canvas, one near-black
ink, a warm stone hairline, and one accent used sparingly. We keep that
discipline and warm every neutral toward the textile.

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#1A1714` | Headings, buttons, footer ground |
| `--color-ink-soft` | `#4A443C` | Secondary copy |
| `--color-ink-muted` | `#675F53` | Meta, captions, eyebrows |
| `--color-ink-faint` | `#9A9081` | Placeholders and disabled **only** |
| `--color-body` | `ink @ 76%` | Body copy — the Echoes of India treatment |
| `--color-canvas` | `#FFFFFF` | Scheme: default |
| `--color-alabaster` | `#FAF8F4` | Scheme: 1 |
| `--color-bone` | `#F2EDE4` | Scheme: 2 · product tiles |
| `--color-clay` | `#E7DFD2` | Scheme: 3 · editorial |
| `--color-obsidian` | `#1A1714` | Scheme: dark · footer |
| `--color-line` | `#DDD6CA` | Default hairline |
| `--color-line-soft` | `#EBE5DA` | Hairline on tint |
| `--color-accent` | `#9C4A21` | Links, sale price, stars, focus |
| `--color-accent-hover` | `#7E3A18` | Accent pressed |
| `--color-marigold` | `#C08A2E` | Heritage support, ≤5% of a screen |
| `--color-indigo` | `#2B3A4A` | Heritage support, ≤5% of a screen |

Status colours (`success`, `danger`, `notice`) are deliberately muted so they
sit inside the palette rather than reading as traffic lights.

### Contrast

`ink`, `ink-soft`, `ink-muted`, `accent` and body copy all clear WCAG AA
(≥4.5:1) on **all four** light grounds. `ink-muted` was originally set by eye
at `#857D71` and measured 4.06:1 on white — below AA for the 11px eyebrows
using it — and was darkened to `#675F53` (4.76:1 on the worst ground, clay).

`ink-faint` is placeholders and disabled states only, and must never carry
body copy.

---

## 2. Typography

Two faces, both client-specified.

- **Calone** (prime) — self-hosted from `public/fonts/calone.otf`. A geometric
  display sans, **single weight (400)**, 214 glyphs, Latin only. Every heading
  and the wordmark.
- **Manrope** (secondary) — variable 200–800, Google Fonts. Body, UI, buttons,
  eyebrows, navigation, prices, and any non-Latin fallback.

Chantilly's display signature is Montserrat at **weight 200** — the airiness
comes from the stem. Calone ships one weight, so that cannot be copied. It is
reproduced through size, leading and tracking, and `font-synthesis: none` is
set on every display class so no browser fakes a weight the family does not
have. Tracking was retuned from Chantilly's −0.04em to **−0.012em**: the
original was measured on a condensed 200-weight sans and closes Calone's
counters up.

The fallback stack is geometric (`Futura, Avenir Next, Century Gothic`), not a
serif, so a failed webfont degrades to the same species.

| Class | Size | Face |
|---|---|---|
| `.t-hero` | 34 → 72px | Calone 400 · −0.012em |
| `.t-display` | 28 → 52px | Calone 400 |
| `.t-h1` | 26 → 40px | Calone 400 |
| `.t-h2` | 22 → 30px | Calone 400 |
| `.t-h3` | 20 → 24px | Calone 400 |
| `.t-h4` | 18px | Calone 400 |
| `.t-quote` | 28 → 52px | Calone 400 · pull-quotes only |
| `.t-lead` | 16 → 18px | Manrope 400 |
| `.t-body` | 15px | Manrope 400 · 1.6 |
| `.t-sm` | 14px | Manrope 400 |
| `.t-meta` | 12px | Manrope 400 · muted |
| `.eyebrow` | 11px | Manrope 500 · 0.18em · uppercase |

---

## 3. Shape, space, motion

**Radius is 0 everywhere.** Both references are hard-edged. The only rounded
element in the entire system is the colour swatch, at the pill radius — that
is Chantilly's one exception and we keep it as the one exception.

Depth comes from hairlines, not shadow. Shadows exist only for drawers and
popovers.

| Token | Value | Note |
|---|---|---|
| `--section-y` | 44 → 50px | Chantilly's `--section-padding` |
| `--section-y-lg` | 60 → 80px | `--larger-section-padding` |
| `--section-y-xl` | 72 → 110px | `--largest-section-padding` |
| `--gutter` / `-md` / `-lg` | 16 / 20 / 30px | Chantilly's gutter set |
| `--width-page` | 1600px | `--page-container-width` |
| `--width-reading` | 720px | `--reading-container-width` |
| `--dur-fast` | 160ms | Colour changes |
| `--dur-base` | 250ms | Hover states (Echoes of India) |
| `--dur-slow` | 360ms | Drawers, menus (Echoes of India) |
| `--dur-editorial` | 700ms | Media zoom, reveals |
| `--zoom-media` | 1.04 | Product/gallery hover |

Everything collapses under `prefers-reduced-motion`, including reveal
entrances and the marquee.

---

## 4. Colour schemes

Chantilly ships three tinted grounds plus a dark footer. Ours are the same four
roles, warmed, plus a fourth tint for editorial bands. Apply one class to a
`<section>` and body, headings, eyebrows and rules all adjust:

`.scheme-default` · `.scheme-alabaster` · `.scheme-bone` · `.scheme-clay` ·
`.scheme-dark`

---

## 5. Component notes worth knowing

**Product card.** The overlays (labels, wishlist, quick view) are positioned
against `.product-card__frame`, **not** `.product-card` — the card also
contains the title and price rows, so a `bottom`-anchored overlay measured from
the card lands on top of them instead of on the image. The frame exists because
the media is an `<a>` and a `<button>` cannot be nested inside one.

Anything that fades in must also set `pointer-events: none` while invisible, or
a transparent control sits over the card swallowing clicks meant for the
product link. Both the wishlist and quick view reveal on `:hover` **and**
`:focus-within` so they stay keyboard-reachable.

On touch (`hover: none`) quick view is dropped entirely and the wishlist is
pinned open, rather than leaving either behind an unreachable hover state.

**Reveal animations fail open.** Anything already in view on mount shows
immediately, and a timeout backstop reveals content even if the observer never
fires. A reveal that silently fails should never hide real content.

**`ch` units resolve against the element's own font.** Putting a `max-width` in
`ch` on a body-sized wrapper clamps a 72px headline to a fifth of the intended
width. Measure caps belong on the heading itself.

---

## 6. Section library

Each homepage band maps to a section on one of the two references and can be
reordered or dropped without touching any other:

`Hero` (Chantilly slideshow) · `Marquee` (EOI statement band) · `FeaturedRail`
(Trending Styles carousel) · `EditorialSplit` (image + copy feature) ·
`CategoryTiles` (EOI Shop the Look) · `Manifesto` (Chantilly brand quote) ·
`Countdown` · `PromoTrio` (three-up cards) · `ValueProps` (Our Values) ·
`Testimonials` · `JournalGrid` (Blog posts) · `SocialStrip` (Instagram footer).
