import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Scroll-scrubbed entrance: the content rises, scales up, and fades in as its top
 * travels from the bottom of the viewport to 80% height, and reverses on the way back up.
 * A light spring smooths out wheel and trackpad jitter.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 100%', 'start 80%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })
  const opacity = useTransform(progress, [0, 1], [0, 1])
  const y = useTransform(progress, [0, 1], [56, 0])
  const scale = useTransform(progress, [0, 1], [0.96, 1])

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { opacity, y, scale }}>
      {children}
    </motion.div>
  )
}
