import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { Setting } from './d'

function clip(val: number, min: number, max: number): number {
  // round to 2 decimal places and clip to min and max
  return Math.round(Math.max(min, Math.min(max, val)) * 100) / 100
}

const clipper = {
  N: (val: number): number => clip(val, Setting.N.min, Setting.N.max),
  Speed: (val: number): number => clip(val, Setting.Speed.min, Setting.Speed.max),
  Scale: (val: number): number => clip(val, Setting.Scale.min, Setting.Scale.max),
  CircleStrokeWidth: (val: number): number =>
    clip(val, Setting.CircleStrokeWidth.min, Setting.CircleStrokeWidth.max),
  CircleStrokeOpacity: (val: number): number =>
    clip(val, Setting.CircleStrokeOpacity.min, Setting.CircleStrokeOpacity.max),
  VectorStrokeWidth: (val: number): number =>
    clip(val, Setting.VectorStrokeWidth.min, Setting.VectorStrokeWidth.max),
  VectorStrokeOpacity: (val: number): number =>
    clip(val, Setting.VectorStrokeOpacity.min, Setting.VectorStrokeOpacity.max),
  PathStrokeWidth: (val: number): number =>
    clip(val, Setting.PathStrokeWidth.min, Setting.PathStrokeWidth.max),
  PathStrokeOpacity: (val: number): number =>
    clip(val, Setting.PathStrokeOpacity.min, Setting.PathStrokeOpacity.max),
}

function checkParsedSetting(parsed: any, setting: Setting): void {
  if (!parsed) return

  const keys = Object.keys(Setting) as Array<keyof Setting>

  for (const key of keys) {
    if (key in parsed) {
      if (parsed[key].val) {
        setting[key].val = clipper[key](parsed[key].val)
      }
    }
  }
}

export const useSettingStore = defineStore('setting', () => {
  const STORAGE_KEY = 'setting'

  const setting = ref<Setting>(Setting)

  const storedSetting = localStorage.getItem(STORAGE_KEY) // get locally stored setting

  if (storedSetting) {
    const parsed = JSON.parse(storedSetting)
    checkParsedSetting(parsed, setting.value)
  }

  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(setting.value))
  })

  function changeSetting(target: keyof Setting, val: number): void {
    setting.value[target].val = clipper[target](val)
  }

  return { setting, changeSetting }
})
