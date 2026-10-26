<template>
  <button @click="start" class="fixed bdvh-5/10 ldvw-5/10">Play</button>
  <div class="page flex a-center j-center z--1">
    <div ref="svgContainer" v-html="noteSvg" v-show="false"></div>
    <Drawer
      ref="drawer"
      :svgPath="svgPath"
      :viewboxWidth="200"
      :viewboxHeight="200"
      :N="N"
      :speed="speed"
      :scale="scale"
      :circle-stroke-width="0.3"
      :circle-stroke-opacity="0.3"
      :vector-stroke-width="0.6"
      :vector-stroke-opacity="0.6"
      :path-stroke-width="1"
      :path-stroke-opacity="1"
    />
  </div>
</template>

<script setup lang="ts">
import noteSvg from '@/assets/img/music-note.svg?raw'
import Drawer from '@/components/drawer.vue'
import { onMounted, ref, useTemplateRef } from 'vue'

const drawer = useTemplateRef<typeof Drawer>('drawer')
const svgContainer = useTemplateRef<HTMLDivElement>('svgContainer')
const svgPath = ref<SVGPathElement | undefined>()
const N = ref<number>(500)
const speed = ref<number>(0.3)
const scale = ref<number>(1)

const isStarted = ref<boolean>(false)
function start(): void {
  if (isStarted.value || !drawer.value) return
  isStarted.value = true

  drawer.value.startAnimation()
}

onMounted(() => {
  const path = svgContainer.value?.querySelector('path')
  svgPath.value = path ? path : undefined
})
</script>

<style scoped></style>
