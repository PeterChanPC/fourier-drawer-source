<template>
  <button @click="toggle" class="relative w-32 h-32 bg-none border-none pointer user-select-none">
    <img :src="icons.cog" />
  </button>
  <Transition name="scale" mode="out-in">
    <nav v-if="isToggled"
      class="fixed t-0 r-0 flex flex-col w-auto h-auto max-h-80dvh mt-50 mr-10 ml-10 pt-20 pr-10 pb-20 pl-10 z-99 overflow-s no-scrollbar transform-origin-top-right border-radius-15 bg-glassy border">
      <span class="pl-10 pb-15 font-size-lg uppercase">Settings</span>
      <Slider :text="setting.N.name" :min="setting.N.min" :max="setting.N.max" :val="setting.N.val"
        :step="setting.N.step" @slide="changeN" />
      <Slider :text="setting.Speed.name" :min="setting.Speed.min" :max="setting.Speed.max" :val="setting.Speed.val"
        :step="setting.Speed.step" @slide="changeSpeed" />
      <Slider :text="setting.Scale.name" :min="setting.Scale.min" :max="setting.Scale.max" :val="setting.Scale.val"
        :step="setting.Scale.step" @slide="changeScale" />
      <Slider :text="setting.CircleStrokeWidth.name" :min="setting.CircleStrokeWidth.min"
        :max="setting.CircleStrokeWidth.max" :val="setting.CircleStrokeWidth.val" :step="setting.CircleStrokeWidth.step"
        @slide="changeCircleStrokeWidth" />
      <Slider :text="setting.CircleStrokeOpacity.name" :min="setting.CircleStrokeOpacity.min"
        :max="setting.CircleStrokeOpacity.max" :val="setting.CircleStrokeOpacity.val"
        :step="setting.CircleStrokeOpacity.step" @slide="changeCircleStrokeOpacity" />
      <Slider :text="setting.VectorStrokeWidth.name" :min="setting.VectorStrokeWidth.min"
        :max="setting.VectorStrokeWidth.max" :val="setting.VectorStrokeWidth.val" :step="setting.VectorStrokeWidth.step"
        @slide="changeVectorStrokeWidth" />
      <Slider :text="setting.VectorStrokeOpacity.name" :min="setting.VectorStrokeOpacity.min"
        :max="setting.VectorStrokeOpacity.max" :val="setting.VectorStrokeOpacity.val"
        :step="setting.VectorStrokeOpacity.step" @slide="changeVectorStrokeOpacity" />
      <Slider :text="setting.PathStrokeWidth.name" :min="setting.PathStrokeWidth.min" :max="setting.PathStrokeWidth.max"
        :val="setting.PathStrokeWidth.val" :step="setting.PathStrokeWidth.step" @slide="changePathStrokeWidth" />
      <Slider :text="setting.PathStrokeOpacity.name" :min="setting.PathStrokeOpacity.min"
        :max="setting.PathStrokeOpacity.max" :val="setting.PathStrokeOpacity.val" :step="setting.PathStrokeOpacity.step"
        @slide="changePathStrokeOpacity" />
    </nav>
  </Transition>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/stores/setting.store'
import { ref } from 'vue'
import Slider from '@/components/slider.vue'
import * as icons from '@/assets/img/d'

const settingStore = useSettingStore()
const setting = settingStore.setting

let isToggled = ref<boolean>(false)

function toggle(): void {
  isToggled.value = !isToggled.value
}

function changeN(val: number): void {
  settingStore.changeSetting('N', val)
}

function changeSpeed(val: number): void {
  settingStore.changeSetting('Speed', val)
}

function changeScale(val: number): void {
  settingStore.changeSetting('Scale', val)
}

function changeCircleStrokeWidth(val: number): void {
  settingStore.changeSetting('CircleStrokeWidth', val)
}

function changeCircleStrokeOpacity(val: number): void {
  settingStore.changeSetting('CircleStrokeOpacity', val)
}

function changeVectorStrokeWidth(val: number): void {
  settingStore.changeSetting('VectorStrokeWidth', val)
}

function changeVectorStrokeOpacity(val: number): void {
  settingStore.changeSetting('VectorStrokeOpacity', val)
}

function changePathStrokeWidth(val: number): void {
  settingStore.changeSetting('PathStrokeWidth', val)
}

function changePathStrokeOpacity(val: number): void {
  settingStore.changeSetting('PathStrokeOpacity', val)
}
</script>

<style scoped lang="scss"></style>
