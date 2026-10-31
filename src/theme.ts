// Brand palette. Components that draw to canvas or take color props
// (DotGrid, Dock, SpotlightCard) need raw hex values, so they read from here.
// CSS tokens with the same values live in index.css.
export const colors = {
  primary: '#541790',
  secondary: '#FEF9CE',
  tertiary: '#8264A0',
  white: '#FFFFFF',
  // Light tint of the tertiary purple for resting dots on the background.
  dot: '#D9D0E3',
} as const

// Dark-theme counterparts: lighter purples so accents stay readable on a dark background.
export const darkColors = {
  dot: '#3A3047',
  dotActive: '#C3A8E6',
  spotlight: '#A88BCB',
} as const

/** Gray placeholder colors for image slots, per theme. */
export const placeholderColors = {
  light: { fill: '#EDEDEA', text: '#6F6F6B' },
  dark: { fill: '#221A2C', text: '#8C7FA0' },
} as const
