import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { type Setting, DefaultSetting } from './d'

function checkParsedSetting(parsed: any, setting: Setting): void {
  if (!parsed) return

  const keys = Object.keys(DefaultSetting) as Array<keyof Setting>

  for (const key of keys) {
    if (key in parsed) setting[key] = parsed[key]
  }
}

export const useSettingStore = defineStore('setting', () => {
  const STORAGE_KEY = 'setting'

  const setting = ref<Setting>(DefaultSetting)
  /*
  DefaultSetting = {
    N: 100,
    Speed: 1,
    Scale: 1,
    CircleStrokeWidth: 1,
    CircleStrokeOpacity: 1,
    VectorStrokeWidth: 1,
    VectorStrokeOpacity: 1,
    PathStrokeWidth: 1,
    PathStrokeOpacity: 1,
  }
  */

  const storedSetting = localStorage.getItem(STORAGE_KEY) // get locally stored setting

  if (storedSetting) {
    const parsed = JSON.parse(storedSetting)
    checkParsedSetting(parsed, setting.value)
  }

  watchEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(setting.value)))

  const applyConstraint = {
    N: (val: number): number => Math.max(0, val),
    Speed: (val: number): number => Math.max(0, val),
    Scale: (val: number): number => Math.max(0, val),
    CircleStrokeWidth: (val: number): number => Math.max(0, val),
    CircleStrokeOpacity: (val: number): number => Math.max(0, Math.min(1, val)),
    VectorStrokeWidth: (val: number): number => Math.max(0, val),
    VectorStrokeOpacity: (val: number): number => Math.max(0, Math.min(1, val)),
    PathStrokeWidth: (val: number): number => Math.max(0, val),
    PathStrokeOpacity: (val: number): number => Math.max(0, Math.min(1, val)),
  }

  function changeSetting(target: keyof Setting, val: number): void {
    setting.value[target] = applyConstraint[target](val)
  }

  return { setting, changeSetting }
})
