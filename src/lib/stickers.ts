// Sticker artwork for the cursor trail, drawn in the brand palette.
// Each sticker has a thick white edge so it reads like a die-cut sticker.
import { colors } from '@/theme'

const { primary: P, secondary: C, tertiary: S } = colors
const edge = 'stroke="#FFFFFF" stroke-width="8" stroke-linejoin="round" paint-order="stroke"'
const label = `font-family="Arial, Helvetica, sans-serif" font-weight="900" text-anchor="middle"`

const svg = (inner: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${inner}</svg>`,
  )}`

const petals = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3
  return `<circle cx="${(50 + 22 * Math.cos(a)).toFixed(1)}" cy="${(50 + 22 * Math.sin(a)).toFixed(1)}" r="17"/>`
}).join('')

export const stickers: string[] = [
  // Star
  svg(`<path d="M50 6l12.9 26.2 28.9 4.2-20.9 20.4 4.9 28.8L50 72l-25.8 13.6 4.9-28.8L8.2 36.4l28.9-4.2z" fill="${P}" ${edge}/>`),
  // Heart
  svg(`<path d="M50 88S9 63 9 36a20 20 0 0 1 41-6 20 20 0 0 1 41 6c0 27-41 52-41 52z" fill="${S}" ${edge}/>`),
  // Smiley
  svg(
    `<circle cx="50" cy="50" r="42" fill="${C}" ${edge}/><circle cx="50" cy="50" r="38" fill="none" stroke="${P}" stroke-width="3"/>` +
      `<circle cx="37" cy="43" r="5" fill="${P}"/><circle cx="63" cy="43" r="5" fill="${P}"/>` +
      `<path d="M33 58q17 17 34 0" fill="none" stroke="${P}" stroke-width="6" stroke-linecap="round"/>`,
  ),
  // Sparkle
  svg(`<path d="M50 6c4 26 18 40 44 44-26 4-40 18-44 44-4-26-18-40-44-44 26-4 40-18 44-44z" fill="${P}" ${edge}/>`),
  // "HI!" speech bubble
  svg(
    `<path d="M16 18h68a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H42L24 88V72h-8A10 10 0 0 1 6 62V28a10 10 0 0 1 10-10z" fill="${C}" ${edge}/>` +
      `<text x="50" y="56" ${label} font-size="28" fill="${P}">HI!</text>`,
  ),
  // Flower
  svg(
    `<g fill="#FFFFFF" stroke="#FFFFFF" stroke-width="8">${petals}</g><g fill="${S}">${petals}</g>` +
      `<circle cx="50" cy="50" r="14" fill="${C}" stroke="${P}" stroke-width="3"/>`,
  ),
  // Lightning bolt
  svg(
    `<path d="M58 6L18 56h27l-7 38 45-55H55z" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linejoin="round"/>` +
      `<path d="M58 6L18 56h27l-7 38 45-55H55z" fill="${C}" stroke="${P}" stroke-width="4" stroke-linejoin="round"/>`,
  ),
  // "UX" pill
  svg(
    `<rect x="7" y="27" width="86" height="46" rx="23" fill="${P}" ${edge}/>` +
      `<text x="50" y="59" ${label} font-size="26" fill="${C}">UX</text>`,
  ),
  // Cursor arrow
  svg(
    `<path d="M24 10l58 38-27 6-12 27z" fill="none" stroke="#FFFFFF" stroke-width="13" stroke-linejoin="round"/>` +
      `<path d="M24 10l58 38-27 6-12 27z" fill="#FFFFFF" stroke="${P}" stroke-width="5" stroke-linejoin="round"/>`,
  ),
]
