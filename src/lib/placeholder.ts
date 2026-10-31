// Labeled gray placeholder until real images are supplied.
import { placeholderColors } from '@/theme'

const RTL_SCRIPT = /[؀-ۿ]/

export function placeholderImage(label = 'Placeholder image', width = 1240, height = 760, dark = false) {
  // Persian labels need RTL direction inside the SVG, or the glyphs come out reversed.
  const rtl = RTL_SCRIPT.test(label)
  const text = rtl ? label : label.toUpperCase()
  const font = rtl ? 'Tahoma, sans-serif' : 'ui-monospace, Menlo, monospace'
  const spacing = rtl ? 0 : 3
  // Scale text down on small images so the label stays inside the frame.
  const fontSize = Math.min(22, Math.round(width / 22))
  const palette = dark ? placeholderColors.dark : placeholderColors.light
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${palette.fill}"/><text x="50%" y="50%" fill="${palette.text}" font-family="${font}" font-size="${fontSize}" letter-spacing="${spacing}" text-anchor="middle" dominant-baseline="middle"${rtl ? ' direction="rtl" unicode-bidi="embed"' : ''}>${escaped}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
