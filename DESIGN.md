---
name: Digital Ecosystem
colors:
  surface: '#101411'
  surface-dim: '#101411'
  surface-bright: '#363a36'
  surface-container-lowest: '#0b0f0c'
  surface-container-low: '#191d19'
  surface-container: '#1d211d'
  surface-container-high: '#272b27'
  surface-container-highest: '#323632'
  on-surface: '#e0e3de'
  on-surface-variant: '#c3c9b0'
  inverse-surface: '#e0e3de'
  inverse-on-surface: '#2d312e'
  outline: '#8d937d'
  outline-variant: '#434936'
  surface-tint: '#9ed830'
  primary: '#fbffeb'
  on-primary: '#233600'
  primary-container: '#b7f34a'
  on-primary-container: '#4b6d00'
  inverse-primary: '#476800'
  secondary: '#a2d665'
  on-secondary: '#1e3700'
  secondary-container: '#436f01'
  on-secondary-container: '#bbf07c'
  tertiary: '#f9fff6'
  on-tertiary: '#2b322b'
  tertiary-container: '#dbe3d9'
  on-tertiary-container: '#5e655d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b9f54c'
  primary-fixed-dim: '#9ed830'
  on-primary-fixed: '#131f00'
  on-primary-fixed-variant: '#354e00'
  secondary-fixed: '#bdf37e'
  secondary-fixed-dim: '#a2d665'
  on-secondary-fixed: '#102000'
  on-secondary-fixed-variant: '#2e4f00'
  tertiary-fixed: '#dde5da'
  tertiary-fixed-dim: '#c1c9bf'
  on-tertiary-fixed: '#161d17'
  on-tertiary-fixed-variant: '#414941'
  background: '#101411'
  on-background: '#e0e3de'
  surface-variant: '#323632'
typography:
  display:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
The design system operates at the intersection of high-end technology and organic vitality. It targets a sophisticated audience looking for technical excellence through a refined, cinematic lens. The aesthetic is characterized by "Techno-Organic Minimalism"—a blend of precision-engineered layouts and atmospheric, nature-inspired depth.

The interface utilizes a dark-mode-first approach to create a focused, immersive environment. Key visual drivers include thin architectural lines (1px strokes), subtle noise textures to emulate high-end film grain or organic earth, and localized luminous "glows" that suggest bio-luminescence or high-performance hardware. The overall tone is professional, forward-leaning, and meticulously organized.

## Colors
This design system uses a high-contrast palette rooted in a "Deep Forest Night" spectrum. 

- **Primary (Accent):** A high-vibrancy Lime Green (#B7F34A) used sparingly for calls to action, active states, and critical highlights. It represents digital energy.
- **Secondary Green:** A muted, organic Moss Green (#6F9F35) for secondary interactions and decorative gradients, bridging the gap between the accent and the dark background.
- **Neutrals:** The background layers move from a near-black void (#050807) to a structured surface (#0B110E). Text adheres to a slightly off-white (#F2F5EF) to reduce eye strain while maintaining a premium feel.
- **Accent Glows:** When using glows or blurs, use the primary color at 5-10% opacity to create "atmospheric light" rather than solid shapes.

## Typography
The typographic system emphasizes clarity and technical precision.

- **Headlines:** Use **Geist** for its clean, geometric, and developer-centric profile. Display sizes should use tight letter spacing to create a high-impact, editorial look.
- **Body:** **Inter** is the workhorse for all long-form content, providing maximum legibility and a neutral, professional character.
- **Technical Metadata:** **JetBrains Mono** is reserved for small labels, tags, and code snippets, reinforcing the "Web Developer" identity. 

Always maintain a strict vertical rhythm. Large headlines should be balanced with ample whitespace above and below to signify "premium" breathing room.

## Layout & Spacing
The layout follows a 12-column fluid grid system that prioritizes negative space. 

- **Grid:** Use a 12-column grid for desktop (max-width 1440px) with 24px gutters. Elements should often span 6 or 8 columns to avoid edge-to-edge crowding, maintaining a "centered" focus.
- **Rhythm:** Spacing is strictly based on an 8px scale. Use `lg` (48px) and `xl` (80px) for section vertical padding to emphasize the minimal, airy aesthetic.
- **Mobile:** On mobile, collapse to a 4-column grid with 20px side margins. 
- **Grain Overlay:** A subtle, fixed-position grain/noise texture (opacity 0.03) should be applied globally to the background to break up flat digital blacks and add a tactile, organic feel.

## Elevation & Depth
Depth is created through "Luminous Layering" rather than traditional shadows.

1. **The Void (Base):** The #050807 background serves as the deepest layer.
2. **Plates (Surfaces):** Cards and containers use #101711 with a 1px border of #263322. These should have a slight "Glassmorphism" effect: `backdrop-filter: blur(12px)`.
3. **Inner Glow:** Interactive cards should feature a very subtle inner-top stroke (0.5px) in a lighter green or white at 10% opacity to simulate light catching the edge of a glass pane.
4. **Atmospheric Depth:** Large, blurred radial gradients of #B7F34A (at 2-5% opacity) should be placed behind key content sections to create a sense of environmental depth.

## Shapes
The shape language is "Soft-Tech." While the grid is rigid and professional, the corners are softened to feel approachable and organic.

- **Standard Elements:** Buttons and input fields use a `0.5rem` (8px) radius.
- **Containers:** Large sections or cards use `1rem` (16px) radius.
- **Decorative Elements:** Use perfectly circular shapes for status indicators or "bio-nodes" to contrast the architectural lines of the layout.

## Components
Consistent component styling reinforces the "Digital Ecosystem" narrative.

- **Buttons:** 
  - **Primary:** Solid #B7F34A background with black text. On hover, add a subtle outer glow of the same color. 
  - **Ghost:** Transparent background with a 1px #263322 border and white text.
- **Cards:** Use #101711 background. Borders are mandatory (#263322). For featured projects, a very faint green gradient (top-left to bottom-right) can be used within the card background.
- **Inputs:** Dark backgrounds (#050807) with 1px borders. Focus state should change the border color to #B7F34A and add a tiny green dot/label indicator.
- **Chips/Tags:** Use the `label-mono` typography. Backgrounds should be a semi-transparent #263322 with moss green text.
- **Lists:** Use custom "Node" bullets—small green circles with a thin vertical line connecting them to represent a linked ecosystem or timeline.
- **Grain/Noise:** Ensure all card surfaces have a consistent noise texture inherited from the base layer to maintain the tactile theme.