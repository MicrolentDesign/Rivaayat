# Garment technical flats

Vector outlines used by the custom-fitment measurement step. One per category.

| File | Category | Status |
|---|---|---|
| `kurta.svg` | Kurta | Drawn — awaiting client sign-off |
| `sherwani.svg` | Sherwani | Not started |
| `shalwar-kameez.svg` | Shalwar Kameez | Not started |
| `waistcoat.svg` | Waistcoat | Not started |

## Conventions

- **viewBox `0 0 620 860`**, centred on x=310. Keep this grid across all four so
  marker coordinates stay comparable and the diagrams sit at the same scale.
- **No fixed colours in the consuming component.** The standalone files carry
  literal hex so they preview on their own; when inlined for the measurement
  step, `stroke="#1A1714"` → `var(--flat-line)`, `fill="#FFFFFF"` →
  `var(--flat-fill)`, `fill="#F2EDE4"` → `var(--flat-lining)` so the drawing
  follows the theme.
- **Stroke 2.4**, round joins and caps.
- **No buttons, no badges, no branding** — a measurement diagram should carry
  only the landmarks a customer measures from. The placket stays because people
  measure from it; the buttons on it do not.
- Marker positions live in the measurement schema in code, **not** in the SVG,
  so replacing artwork never means rewiring the flow.

## Landmarks kept in `kurta.svg`

Mandarin collar band with fold line · front placket · cuffed sleeves · side
slits with the lining visible through them · curved hem.
