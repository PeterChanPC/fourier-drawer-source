<template>
  <Transition name="scale" mode="out-in">
    <nav v-if="toggled"
      class="fixed r-0 flex flex-col w-auto h-auto max-h-80dvh mt-50 mr-10 ml-10 pt-20 pr-10 pb-20 pl-10 z-99 overflow-s no-scrollbar transform-origin-top-right border-radius-15 bg-glassy">
      <span class="pl-10 pb-15 font-size-lg uppercase">Settings</span>
      <Slider :text="setting.Speed.name" :min="0.1" :max="setting.Speed.max" :val="setting.Speed.val" :step="0.1"
        :applyChange="changeSpeed" />
      <Slider :text="setting.Scale.name" :min="0.1" :max="setting.Scale.max" :val="setting.Scale.val" :step="0.1"
        :applyChange="changeScale" />
      <Slider :text="setting.CircleStrokeWidth.name" :min="0.1" :max="setting.CircleStrokeWidth.max"
        :val="setting.CircleStrokeWidth.val" :step="0.1" :applyChange="changeCircleStrokeWidth" />
      <Slider :text="setting.CircleStrokeOpacity.name" :min="0.1" :max="setting.CircleStrokeOpacity.max"
        :val="setting.CircleStrokeOpacity.val" :step="0.1" :applyChange="changeCircleStrokeOpacity" />
      <Slider :text="setting.VectorStrokeWidth.name" :min="0.1" :max="setting.VectorStrokeWidth.max"
        :val="setting.VectorStrokeWidth.val" :step="0.1" :applyChange="changeVectorStrokeWidth" />
      <Slider :text="setting.VectorStrokeOpacity.name" :min="0.1" :max="setting.VectorStrokeOpacity.max"
        :val="setting.VectorStrokeOpacity.val" :step="0.1" :applyChange="changeVectorStrokeOpacity" />
      <Slider :text="setting.PathStrokeWidth.name" :min="0.1" :max="setting.PathStrokeWidth.max"
        :val="setting.PathStrokeWidth.val" :step="0.1" :applyChange="changePathStrokeWidth" />
      <Slider :text="setting.PathStrokeOpacity.name" :min="0.1" :max="setting.PathStrokeOpacity.max"
        :val="setting.PathStrokeOpacity.val" :step="0.1" :applyChange="changePathStrokeOpacity" />
    </nav>
  </Transition>
</template>

<script lang="ts">
import { useSettingStore } from '@/stores/setting.store'
import { defineComponent } from 'vue'
import Slider from './slider.vue'

export default defineComponent({
  name: 'settings',
  components: { Slider },
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const settingStore = useSettingStore()
    const setting = settingStore.setting

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

    return {
      setting,
      changeSpeed,
      changeScale,
      changeCircleStrokeWidth,
      changeCircleStrokeOpacity,
      changeVectorStrokeWidth,
      changeVectorStrokeOpacity,
      changePathStrokeWidth,
      changePathStrokeOpacity,
    }
  },
})
</script>

<style scoped lang="scss"></style>
