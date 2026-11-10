<template>
  <div class="page flex a-center j-center">
    <div ref="svgContainer" v-html="noteSvg" v-show="false"></div>
    <Drawer ref="drawer" :svgPath="svgPath" :viewboxWidth="200" :viewboxHeight="200" />
  </div>
</template>

<script setup lang="ts">
import noteSvg from '@/assets/img/music-note.svg?raw'
import Drawer from '@/components/drawer.vue'
import { ref, useTemplateRef, onMounted } from 'vue'

const svgContainer = useTemplateRef<HTMLDivElement>('svgContainer')
const svgPath = ref<SVGPathElement | undefined>()

onMounted(() => {
  const path = svgContainer.value?.querySelector('path')
  svgPath.value = path ? path : undefined
})
</script>

<style scoped></style>
