---
name: Academic Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#444651'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  metadata:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar_width: 64px
  topbar_height: 64px
  container_max_width: 1440px
  gutter: 24px
  base_unit: 8px
  card_padding: 24px
---

## Brand & Style

This design system is engineered for the Virtual Research Match Maker (VRMM), prioritizing intellectual rigor and institutional trust. The aesthetic sits at the intersection of traditional academic stability and modern digital efficiency. The personality is professional, authoritative, and focused, designed to reduce cognitive load for researchers and administrators.

The style leverages **Minimalism** with a **Corporate/Modern** backbone. It relies on structural integrity through alignment and whitespace rather than decorative effects. The emotional response should be one of confidence and clarity—mimicking the organized nature of a high-quality research publication or a prestigious university portal.

## Colors

The palette is anchored by a sophisticated Deep Blue, evoking the stability of institutional identity. In light mode, white primary backgrounds provide a clean "paper" feel, while light gray surfaces denote secondary areas like sidebars and containers.

In dark mode, the environment shifts to a deep charcoal, utilizing subtle shifts in gray to define surface elevation rather than relying on pure black. Interactive elements—links, primary buttons, and active states—consistently use the deep blue accent to guide the user's eye through the research workflow. Semantic colors follow industry standards but are calibrated for high legibility against both light and dark backgrounds.

## Typography

This design system utilizes **Inter** exclusively to ensure a systematic and utilitarian feel. The typographic hierarchy is strict:
- **Headings** use tighter tracking and heavier weights to create a strong visual anchor for content sections.
- **Body text** utilizes a generous line height (1.6) to facilitate long-form reading of research abstracts and proposals.
- **Labels and Metadata** are reduced in size and often muted in color to ensure they remain peripheral to the primary data.
- **Uppercase** is reserved for small labels and table headers to provide a structural, "cataloged" feel.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid grid**. The core navigation is anchored by a 64px fixed-width sidebar (icon-only or collapsed state) and a 64px topbar for global actions and breadcrumbs. 

The main content area uses a fluid 12-column grid system with 24px gutters. Spacing follows an 8px rhythmic scale to maintain mathematical consistency. Whitespace is used aggressively to separate disparate research categories, replacing the need for heavy decorative elements. Margins around the primary content container should be at least 32px on desktop to maintain a spacious, institutional feel.

## Elevation & Depth

This system avoids heavy shadows and skeuomorphism. Depth is achieved through **Tonal Layering** and **Low-Contrast Outlines**. 

- **Primary Surface:** Pure white (Light) or #111827 (Dark).
- **Secondary Surface:** Slight gray offset to define sidebars and background areas.
- **Tertiary Surface (Cards):** Defined by a 1px border (#E2E8F0 in light, #374151 in dark) rather than a shadow.
- **Interactive Elevation:** Only primary buttons and active modals may use a subtle, highly-diffused ambient shadow (0px 4px 12px, 5% opacity) to signify their presence above the content plane.

## Shapes

The shape language is "Soft" (0.25rem / 4px) for most functional components like form fields and cards to maintain a crisp, professional edge. 

However, **Pill-shapes** are used strategically for status indicators and tags. This contrast between the structured rectangular grid of the dashboard and the organic, rounded badges helps status information stand out immediately as a distinct category of metadata.

## Components

- **Buttons:** Primary buttons are solid Deep Blue with white text. Secondary buttons are outlined (1px) with blue text. Tertiary buttons are ghost-style, using text color only until hover, where a light gray background appears.
- **Status Badges:** Fully rounded "pills." Backgrounds are low-opacity versions of semantic colors with high-contrast text:
  - *Open:* Blue background, Navy text.
  - *Closed:* Light Gray background, Dark Gray text.
  - *Pending:* Amber background, Brown text.
  - *Accepted:* Green background, Dark Green text.
  - *Rejected:* Red background, Dark Red text.
- **Tags/Chips:** Outlined pills with 1px borders, used for research categories or skills.
- **Form Fields:** Rectangular with 4px radius. 1px border defaults to light gray, turning Deep Blue on focus. No inner shadows.
- **Metric Cards:** Large-format typography for primary numbers, paired with a small 20px icon in the top right and a descriptive label below the value.
- **Tables:** No vertical lines. 1px horizontal dividers only. Row hover state uses a subtle surface color shift.