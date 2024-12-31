<template>
    <div      
      class="sun-rays-overlay"
      ref="sunRayContainer"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <g>
          <line
            v-for="(l, i) in lines"
            :key="i"
            :x1="l.x"
            y1="0"
            :x2="l.x"
            y2="120"
            :stroke="l.color"
            stroke-width="0.1"
            :transform="`rotate(${l.angle}, ${l.x}, 0)`"
          />
        </g>
      </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { gsap } from 'gsap'

export default defineComponent({

  setup() {
    const sunRayContainer = ref<HTMLElement | null>(null)

    const lineCount = 13
    const angleSpread = 90
    const centerIndex = (lineCount - 1) / 2

    const lines = ref(
      [...Array(lineCount)].map((_, i) => {
        const x = (i * 100) / (lineCount - 1)

        //angles
        const angleOffset = centerIndex - i
        const angle = (angleOffset * angleSpread) / (lineCount - 1)

        //randomize colour
        const randomHue = 55 + (Math.random() - 0.5) * 20
        const color = `hsl(${randomHue}, 100%, 50%)`

        return { x, angle, color }
      })
    )

    onMounted(() => {
      if (sunRayContainer.value) {
        const lineEls = sunRayContainer.value.querySelectorAll('line')
        lineEls.forEach((line, index) => {
          const totalLength = (line as SVGGeometryElement).getTotalLength()

          const tl = gsap.timeline({ repeat: -1 })

          tl.set(line, {
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength
          })

          const randomDelay = Math.random() * 3

          //draw line
          tl.to(line, {
            strokeDashoffset: 0,
            duration: 5,
            delay: randomDelay,
            ease: 'power1.inOut'
          })

          //keep visible
          tl.to(line, {
            duration: 2
          })

          //hide line
          tl.to(line, {
            strokeDashoffset: -totalLength,
            duration: 5,
            ease: 'power1.inOut'
          })
        })
      }
    })

    return {
      sunRayContainer,
      lines
    }
  }
})
</script>

<style scoped>
.sun-rays-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>