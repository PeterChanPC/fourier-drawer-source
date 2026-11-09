<template>
  <svg class="overflow-v" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
    :viewBox="`0 0 ${viewboxWidth} ${viewboxHeight}`">
    <g :transform="`scale(${scale})`" class="transform-origin-center">
      <defs>
        <marker id="arrow" :view-box="`0
          0
          ${vectorStrokeWidth}
          ${vectorStrokeWidth}`" :refX="vectorStrokeWidth + 3" :refY="(vectorStrokeWidth + 3) / 2"
          :markerWidth="vectorStrokeWidth + 3" :markerHeight="vectorStrokeWidth + 3" orient="auto-start-reverse"
          fill="currentColor" stroke-opacity="vectorStrokeOpacity">
          <path :d="`M 0 0 L ${vectorStrokeWidth + 3} ${(vectorStrokeWidth + 3) / 2} L 0 ${vectorStrokeWidth + 3} z`" />
        </marker>
      </defs>
      <circle v-for="(prop, index) in circles" :r="prop.r" :cx="prop.cx" :cy="prop.cy" :key="`c${index}`" fill="none"
        stroke="currentColor" :stroke-width="circleStrokeWidth" :stroke-opacity="circleStrokeOpacity" />
      <line v-for="(prop, index) in vectors" :x1="prop.x1" :x2="prop.x2" :y1="prop.y1" :y2="prop.y2" :key="`v${index}`"
        stroke="currentColor" :stroke-width="vectorStrokeWidth" :stroke-opacity="vectorStrokeOpacity"
        marker-end="url(#arrow)" />
      <path fill="none" stroke="currentColor" :stroke-width="pathStrokeWidth" :stroke-opacity="pathStrokeOpacity"
        :d="d" />
    </g>
  </svg>
</template>

<script lang="ts">
import { ref, defineComponent, computed, watch, watchEffect } from 'vue'

export default defineComponent({
  name: 'drawer',
  props: {
    svgPath: {
      type: SVGPathElement,
      default: undefined,
    },
    viewboxWidth: {
      type: Number,
      default: 200,
    },
    viewboxHeight: {
      type: Number,
      default: 200,
    },
    N: {
      type: Number,
      default: 100,
    },
    speed: {
      type: Number,
      default: 1,
    },
    scale: {
      type: Number,
      default: 1,
    },
    circleStrokeWidth: {
      type: Number,
      default: 1,
    },
    circleStrokeOpacity: {
      type: Number,
      default: 1,
    },
    vectorStrokeWidth: {
      type: Number,
      default: 1,
    },
    vectorStrokeOpacity: {
      type: Number,
      default: 1,
    },
    pathStrokeWidth: {
      type: Number,
      default: 1,
    },
    pathStrokeOpacity: {
      type: Number,
      default: 1,
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const viewboxCenterX = props.viewboxWidth / 2
    const viewboxCenterY = props.viewboxHeight / 2

    const xn = ref<{ x: number; y: number }[]>([])

    function calXn(): void {
      if (!props.svgPath) return

      // extract Xn out of svg path element into a list of N elements
      for (let t = 0; t <= 1; t += 1 / props.N) {
        const pathLength = props.svgPath.getTotalLength()
        const dist = t * pathLength
        const point = props.svgPath.getPointAtLength(dist)
        xn.value.push({ x: point.x - viewboxCenterX, y: point.y - viewboxCenterY })
      }
    }

    const xk = ref<{ A: number; re: number; im: number; phase: number }[]>([])

    // Xk = (1 / N) * Sum(xn * exp(i * 2 * pi * k * n / N)) from n = 0 to N - 1
    // Amplitude = |Xk| = sqrt(real part ** 2 + imaginary part ** 2)
    // Phase = arctan(imaginary part, real part)
    function dft(): void {
      // Discrete Fourier Transform
      for (let k = -props.N / 2; k < props.N / 2; k++) {
        let re = 0 // Real part
        let im = 0 // Imaginary part
        let A = 0 // Amplitude
        let phase = 0 // Phase

        // Summing over n = 0 to N - 1
        for (let n = 0; n < props.N; n++) {
          const phi = -(2 * Math.PI * k * n) / props.N
          const x = xn.value[n]!.x
          const y = xn.value[n]!.y
          re += x * Math.cos(phi) + y * Math.sin(phi)
          im += y * Math.cos(phi) - x * Math.sin(phi)
        }

        // devided by N
        re /= props.N
        im /= props.N

        A = Math.sqrt(re * re + im * im)
        phase = Math.atan2(im, re)
        xk.value.push({ A, re, im, phase })
      }
    }

    const circles = ref<{ r: number; cx: number; cy: number; phase: number }[]>([])
    const vectors = ref<{ x1: number; y1: number; x2: number; y2: number }[]>([])
    const dt = computed(() => (2 * Math.PI * props.speed) / props.N)
    const d = ref<string>(`M `)

    let t = 0

    function animate(): void {
      let prevCx = viewboxCenterX
      let prevCy = viewboxCenterY

      for (let k = -props.N / 2; k < props.N / 2; k++) {
        const index = k + props.N / 2
        const r = xk.value[index]!.A
        const phase = k * t + xk.value[index]!.phase

        circles.value[index] = { r: r, cx: prevCx, cy: prevCy, phase: phase }

        const currCx = prevCx + r * Math.cos(phase)
        const currCy = prevCy + r * Math.sin(phase)

        vectors.value[index] = { x1: prevCx, y1: prevCy, x2: currCx, y2: currCy }

        prevCx = currCx
        prevCy = currCy
      }

      t += dt.value

      if (t <= 4 * Math.PI) {
        d.value += `${prevCx} ${prevCy} `
      }

      if (props.isPlaying) {
        requestAnimationFrame(animate)
      }
    }

    function startAnimation(): void {
      calXn()
      dft()
      animate()
    }

    const isAnimationStarted = ref<boolean>(false)
    watchEffect(() => {
      if (props.isPlaying && !isAnimationStarted.value) {
        startAnimation()
        isAnimationStarted.value = true
      }
    })

    return { circles, vectors, d }
  },
})
</script>

<style scoped lang="scss"></style>
