import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { Setting } from './d'

function checkParsedSetting(parsed: any, setting: Setting): void {
  if (!parsed) return

  const keys = Object.keys(Setting) as Array<keyof Setting>

  for (const key of keys) {
    if (key in parsed) {
      if (parsed[key].val) setting[key].val = parsed[key].val
    }
  }
}

const applyConstraints = {
  N: (val: number): number => Math.max(0.1, Math.min(Setting.N.max, val)),
  Speed: (val: number): number => Math.max(0.1, Math.min(Setting.Speed.max, val)),
  Scale: (val: number): number => Math.max(0.1, Math.min(Setting.Scale.max, val)),
  CircleStrokeWidth: (val: number): number =>
    Math.max(0.1, Math.min(Setting.CircleStrokeWidth.max, val)),
  CircleStrokeOpacity: (val: number): number =>
    Math.max(0.1, Math.min(Setting.CircleStrokeOpacity.max, val)),
  VectorStrokeWidth: (val: number): number =>
    Math.max(0.1, Math.min(Setting.VectorStrokeWidth.max, val)),
  VectorStrokeOpacity: (val: number): number =>
    Math.max(0.1, Math.min(Setting.VectorStrokeOpacity.max, val)),
  PathStrokeWidth: (val: number): number =>
    Math.max(0.1, Math.min(Setting.PathStrokeWidth.max, val)),
  PathStrokeOpacity: (val: number): number =>
    Math.max(0.1, Math.min(Setting.PathStrokeOpacity.max, val)),
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
    setting.value[target].val =
      Math.round((applyConstraints[target](val) + Number.EPSILON) * 100) / 100
  }

  return { setting, changeSetting }
})
