<template>
  <button @click="togglePlay" class="fixed bdvh-1/10 ldvw-5/10 font-size-md bold underline-l">
    <span v-if="!isPlaying">Play</span>
    <span v-if="isPlaying">Pause</span>
  </button>
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" :viewBox="`0 0 ${viewboxWidth} ${viewboxHeight}`">
    <g :transform="`scale(${setting.Scale.val})`" class="transform-origin-center">
      <defs>
        <marker id="arrow" :view-box="`0
          0
          ${setting.VectorStrokeWidth.val}
          ${setting.VectorStrokeWidth.val}`" :refX="setting.VectorStrokeWidth.val + 3"
          :refY="(setting.VectorStrokeWidth.val + 3) / 2" :markerWidth="setting.VectorStrokeWidth.val + 3"
          :markerHeight="setting.VectorStrokeWidth.val + 3" orient="auto-start-reverse" fill="currentColor"
          stroke-opacity="vectorStrokeOpacity">
          <path
            :d="`M 0 0 L ${setting.VectorStrokeWidth.val + 3} ${(setting.VectorStrokeWidth.val + 3) / 2} L 0 ${setting.VectorStrokeWidth.val + 3} z`" />
        </marker>
      </defs>
      <circle v-for="(prop, index) in circles" :r="prop.r" :cx="prop.cx" :cy="prop.cy" :key="`c${index}`" fill="none"
        stroke="currentColor" :stroke-width="setting.CircleStrokeWidth.val"
        :stroke-opacity="setting.CircleStrokeOpacity.val" />
      <line v-for="(prop, index) in vectors" :x1="prop.x1" :x2="prop.x2" :y1="prop.y1" :y2="prop.y2" :key="`v${index}`"
        stroke="currentColor" :stroke-width="setting.VectorStrokeWidth.val"
        :stroke-opacity="setting.VectorStrokeOpacity.val" marker-end="url(#arrow)" />
      <path fill="none" stroke="currentColor" :stroke-width="setting.PathStrokeWidth.val"
        :stroke-opacity="setting.PathStrokeOpacity.val" :d="d" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/stores/setting.store';
import { ref, computed, watch, onUpdated } from 'vue'

const props = defineProps({
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
})

const settingStore = useSettingStore()
const setting = settingStore.setting

const viewboxCenterX: number = props.viewboxWidth / 2
const viewboxCenterY: number = props.viewboxHeight / 2
const xn = ref<Array<{ x: number; y: number }>>([])
const xk = ref<Array<{ A: number; re: number; im: number; phase: number }>>([])

function calXn(): void {
  if (!props.svgPath) return

  // extract Xn out of svg path element into a list of N elements
  for (let t = 0; t <= 1; t += 1 / setting.N.val) {
    const pathLength: number = props.svgPath.getTotalLength()
    const dist: number = t * pathLength
    const point: DOMPoint = props.svgPath.getPointAtLength(dist)
    xn.value!.push({ x: point.x - viewboxCenterX, y: point.y - viewboxCenterY })
  }
}

// Discrete Fourier Transform
// Xk = (1 / N) * Sum(xn * exp(i * 2 * pi * k * n / N)) from n = 0 to N - 1
// Amplitude = |Xk| = sqrt(real part ** 2 + imaginary part ** 2)
// Phase = arctan(imaginary part, real part)
function calXk(): void {
  for (let k = -setting.N.val / 2; k < setting.N.val / 2; k++) {
    let re: number = 0 // Real part
    let im: number = 0 // Imaginary part
    let A: number = 0 // Amplitude
    let phase: number = 0 // Phase

    // Summing over n = 0 to N - 1
    for (let n = 0; n < setting.N.val; n++) {
      const phi = -(2 * Math.PI * k * n) / setting.N.val
      const x = xn.value[n]!.x
      const y = xn.value[n]!.y
      re += x * Math.cos(phi) + y * Math.sin(phi)
      im += y * Math.cos(phi) - x * Math.sin(phi)
    }

    // devided by N
    re /= setting.N.val
    im /= setting.N.val

    A = Math.sqrt(re * re + im * im)
    phase = Math.atan2(im, re)
    xk.value.push({ A, re, im, phase })
  }
}

const circles = ref<Array<{ r: number; cx: number; cy: number; phase: number }>>([])
const vectors = ref<Array<{ x1: number; y1: number; x2: number; y2: number }>>([])
const dt = computed<number>(() => (2 * Math.PI * setting.Speed.val) / setting.N.val)
const d = ref<string>("M ")

let t: number = 0
let isPlaying = ref<boolean>(false)

function animate(): void {
  let prevCx: number = viewboxCenterX
  let prevCy: number = viewboxCenterY

  for (let k = -setting.N.val / 2; k < setting.N.val / 2; k++) {
    const index: number = k + setting.N.val / 2
    const r: number = xk.value[index]!.A
    const phase: number = k * t + xk.value[index]!.phase

    circles.value[index] = { r: r, cx: prevCx, cy: prevCy, phase: phase }

    const currCx: number = prevCx + r * Math.cos(phase)
    const currCy: number = prevCy + r * Math.sin(phase)

    vectors.value[index] = { x1: prevCx, y1: prevCy, x2: currCx, y2: currCy }

    prevCx = currCx
    prevCy = currCy
  }

  t += dt.value

  if (t <= 20 * Math.PI) {
    d.value += `${prevCx} ${prevCy} `
  }

  if (isPlaying.value) {
    requestAnimationFrame(animate)
  }
}

function togglePlay(): void {
  isPlaying.value = !isPlaying.value
}

function resetAnimation(): void {
  xn.value = []
  xk.value = []
  circles.value = []
  vectors.value = []
  t = 0
  d.value = "M "
}

watch(isPlaying, () => {
  if (isPlaying.value) requestAnimationFrame(animate)
})

watch(setting.N, () => {
  resetAnimation()
  calXn()
  calXk()
})

onUpdated(() => {
  if (!isPlaying.value) {
    calXn()
    calXk()
  }
})
</script>

<style scoped lang="scss"></style>
