<template>
  <Transition name="scale" mode="out-in">
    <nav v-if="toggled"
      class="fixed r-0 flex flex-col w-auto h-auto max-h-80dvh mt-50 mr-10 ml-10 pt-20 pr-10 pb-20 pl-10 z-99 overflow-s no-scrollbar transform-origin-top-right border-radius-15 bg-glassy border">
      <span class="pl-10 pb-15 font-size-lg uppercase">Settings</span>
      <Slider :text="setting.N.name" :min="setting.N.min" :max="setting.N.max" :val="setting.N.val"
        :step="setting.N.step" :applyChange="changeN" />
      <Slider :text="setting.Speed.name" :min="setting.Speed.min" :max="setting.Speed.max" :val="setting.Speed.val"
        :step="setting.Speed.step" :applyChange="changeSpeed" />
      <Slider :text="setting.Scale.name" :min="setting.Scale.min" :max="setting.Scale.max" :val="setting.Scale.val"
        :step="setting.Scale.step" :applyChange="changeScale" />
      <Slider :text="setting.CircleStrokeWidth.name" :min="setting.CircleStrokeWidth.min"
        :max="setting.CircleStrokeWidth.max" :val="setting.CircleStrokeWidth.val" :step="setting.CircleStrokeWidth.step"
        :applyChange="changeCircleStrokeWidth" />
      <Slider :text="setting.CircleStrokeOpacity.name" :min="setting.CircleStrokeOpacity.min"
        :max="setting.CircleStrokeOpacity.max" :val="setting.CircleStrokeOpacity.val"
        :step="setting.CircleStrokeOpacity.step" :applyChange="changeCircleStrokeOpacity" />
      <Slider :text="setting.VectorStrokeWidth.name" :min="setting.VectorStrokeWidth.min"
        :max="setting.VectorStrokeWidth.max" :val="setting.VectorStrokeWidth.val" :step="setting.VectorStrokeWidth.step"
        :applyChange="changeVectorStrokeWidth" />
      <Slider :text="setting.VectorStrokeOpacity.name" :min="setting.VectorStrokeOpacity.min"
        :max="setting.VectorStrokeOpacity.max" :val="setting.VectorStrokeOpacity.val"
        :step="setting.VectorStrokeOpacity.step" :applyChange="changeVectorStrokeOpacity" />
      <Slider :text="setting.PathStrokeWidth.name" :min="setting.PathStrokeWidth.min" :max="setting.PathStrokeWidth.max"
        :val="setting.PathStrokeWidth.val" :step="setting.PathStrokeWidth.step" :applyChange="changePathStrokeWidth" />
      <Slider :text="setting.PathStrokeOpacity.name" :min="setting.PathStrokeOpacity.min"
        :max="setting.PathStrokeOpacity.max" :val="setting.PathStrokeOpacity.val" :step="setting.PathStrokeOpacity.step"
        :applyChange="changePathStrokeOpacity" />
    </nav>
  </Transition>
</template>

<script lang="ts">
import { useSettingStore } from '@/stores/setting.store'
import { defineComponent } from 'vue'
import Slider from '@/components/slider.vue'

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
      changeN,
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
