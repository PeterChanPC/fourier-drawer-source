<template>
  <button @click="start" class="fixed bdvh-5/10 ldvw-5/10">Play</button>
  <div class="page flex a-center j-center z--1">
    <div ref="svgContainer" v-html="noteSvg" v-show="false"></div>
    <Drawer ref="drawer" :svgPath="svgPath" :viewboxWidth="200" :viewboxHeight="200" :N="setting.N.val"
      :speed="setting.Speed.val" :scale="setting.Scale.val" :circleStrokeWidth="setting.CircleStrokeWidth.val"
      :circleStrokeOpacity="setting.CircleStrokeOpacity.val" :vectorStrokeWidth="setting.VectorStrokeWidth.val"
      :vectorStrokeOpacity="setting.VectorStrokeOpacity.val" :pathStrokeWidth="setting.PathStrokeWidth.val"
      :pathStrokeOpacity="setting.PathStrokeOpacity.val" />
  </div>
</template>

<script setup lang="ts">
import noteSvg from '@/assets/img/music-note.svg?raw'
import Drawer from '@/components/drawer.vue'
import { useSettingStore } from '@/stores/setting.store'
import { onMounted, ref, useTemplateRef } from 'vue'

const setting = useSettingStore().setting

const drawer = useTemplateRef<typeof Drawer>('drawer')
const svgContainer = useTemplateRef<HTMLDivElement>('svgContainer')
const svgPath = ref<SVGPathElement | undefined>()

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
