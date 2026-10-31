import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { stickers } from '@/lib/stickers'

// Distance (px) the cursor travels before the next sticker drops.
const SPACING = 48
// Rendered sticker size (px).
const STICKER_SIZE = 32
// Most stickers on screen at once; the oldest is removed first.
const MAX_STICKERS = 24

/**
 * Drops a random, randomly tilted sticker along the cursor path. Each one pops in,
 * holds for a moment, then falls and fades away.
 *
 * Built on the same GSAP approach as ReactBits Image Trail, but listens on the
 * window and never takes pointer events, so the page stays clickable underneath.
 * Off for touch screens and for people who prefer reduced motion.
 */
export function StickerTrail() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduceMotion) return

    let last: { x: number; y: number } | null = null
    let previous = -1

    const drop = (x: number, y: number) => {
      // Random sticker, never the same one twice in a row.
      let index = previous
      while (index === previous) index = Math.floor(Math.random() * stickers.length)
      previous = index

      const size = STICKER_SIZE
      const tilt = gsap.utils.random(-28, 28)
      const img = document.createElement('img')
      img.src = stickers[index]
      img.alt = ''
      img.draggable = false
      img.className = 'absolute top-0 left-0 select-none drop-shadow-[0_3px_5px_rgba(84,23,144,0.25)]'
      img.style.width = `${size}px`
      img.style.height = `${size}px`
      layer.appendChild(img)
      while (layer.childElementCount > MAX_STICKERS) layer.firstElementChild?.remove()

      gsap.set(img, { x: x - size / 2, y: y - size / 2, rotation: tilt - 40, scale: 0 })
      gsap
        .timeline({ onComplete: () => img.remove() })
        .to(img, { scale: 1, rotation: tilt, duration: 0.45, ease: 'back.out(2.2)' })
        .to(img, { opacity: 0, scale: 0.7, y: '+=14', duration: 0.5, ease: 'power2.in' }, '+=0.8')
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const point = { x: event.clientX, y: event.clientY }
      if (last && Math.hypot(point.x - last.x, point.y - last.y) < SPACING) return
      last = point
      drop(point.x, point.y)
    }

    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.killTweensOf(layer.children)
      layer.replaceChildren()
    }
  }, [])

  // Below the dock (z-50) so stickers never cover navigation.
  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden" />
}
