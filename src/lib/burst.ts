import { gsap } from 'gsap'
import { colors } from '@/theme'

const SPARK_COLORS = [colors.primary, colors.tertiary, colors.secondary, '#C3A8E6']
const SPARK_COUNT = 18

/**
 * Sprays sparks out from a point. The layer has its own view-transition-name so the sparks
 * stay visible on top while the theme switch's circular reveal plays (see index.css).
 */
export function burst(x: number, y: number) {
  const layer = document.createElement('div')
  layer.setAttribute('aria-hidden', 'true')
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:60;view-transition-name:theme-sparks'
  document.body.appendChild(layer)

  const sparks = Array.from({ length: SPARK_COUNT }, (_, i) => {
    const spark = document.createElement('span')
    const size = gsap.utils.random(5, 11, 1)
    spark.style.cssText = `position:absolute;left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;border-radius:${i % 3 === 0 ? '2px' : '9999px'};background:${SPARK_COLORS[i % SPARK_COLORS.length]};box-shadow:0 0 0 1.5px rgb(255 255 255 / 0.7)`
    layer.appendChild(spark)
    return spark
  })

  const timeline = gsap.timeline({ onComplete: () => layer.remove() })
  sparks.forEach((spark, i) => {
    // Evenly spread angles with a little jitter so it reads as an explosion, not a pattern.
    const angle = (i / SPARK_COUNT) * Math.PI * 2 + gsap.utils.random(-0.25, 0.25)
    const distance = gsap.utils.random(70, 160)
    timeline.to(
      spark,
      {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: gsap.utils.random(-180, 180),
        scale: 0,
        opacity: 0,
        duration: gsap.utils.random(0.55, 0.85),
        ease: 'power3.out',
      },
      0,
    )
  })
}
