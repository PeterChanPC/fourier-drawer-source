<template>
  <button @click="togglePlay" class="fixed bdvh-1/10 ldvw-5/10 font-size-md bold underline-l">
    <span v-if="!isPlaying">Play</span>
    <span v-if="isPlaying">Pause</span>
  </button>
  <div class="page flex a-center j-center z--1">
    <div ref="svgContainer" v-html="noteSvg" v-show="false"></div>
    <Drawer ref="drawer" :svgPath="svgPath" :viewboxWidth="200" :viewboxHeight="200" :N="setting.N.val"
      :speed="setting.Speed.val" :scale="setting.Scale.val" :circleStrokeWidth="setting.CircleStrokeWidth.val"
      :circleStrokeOpacity="setting.CircleStrokeOpacity.val" :vectorStrokeWidth="setting.VectorStrokeWidth.val"
      :vectorStrokeOpacity="setting.VectorStrokeOpacity.val" :pathStrokeWidth="setting.PathStrokeWidth.val"
      :pathStrokeOpacity="setting.PathStrokeOpacity.val" :isPlaying="isPlaying" />
  </div>
</template>

<script setup lang="ts">
import noteSvg from '@/assets/img/music-note.svg?raw'
import Drawer from '@/components/drawer.vue'
import { useSettingStore } from '@/stores/setting.store'
import { ref, useTemplateRef, onMounted } from 'vue'

const setting = useSettingStore().setting
const svgContainer = useTemplateRef<HTMLDivElement>('svgContainer')
const svgPath = ref<SVGPathElement | undefined>()

onMounted(() => {
  const path = svgContainer.value?.querySelector('path')
  svgPath.value = path ? path : undefined
})

const isPlaying = ref<boolean>(false)
function togglePlay(): void {
  isPlaying.value = !isPlaying.value
}
</script>

<style scoped></style>
