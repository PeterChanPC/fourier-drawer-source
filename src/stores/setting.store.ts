import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { Setting } from './d'
import * as utils from '@/utils/utils'

const settingClipper = {
  N: (val: number): number => utils.clip(val, Setting.N.min, Setting.N.max),
  Speed: (val: number): number => utils.clip(val, Setting.Speed.min, Setting.Speed.max),
  Scale: (val: number): number => utils.clip(val, Setting.Scale.min, Setting.Scale.max),
  CircleStrokeWidth: (val: number): number =>
    utils.clip(val, Setting.CircleStrokeWidth.min, Setting.CircleStrokeWidth.max),
  CircleStrokeOpacity: (val: number): number =>
    utils.clip(val, Setting.CircleStrokeOpacity.min, Setting.CircleStrokeOpacity.max),
  VectorStrokeWidth: (val: number): number =>
    utils.clip(val, Setting.VectorStrokeWidth.min, Setting.VectorStrokeWidth.max),
  VectorStrokeOpacity: (val: number): number =>
    utils.clip(val, Setting.VectorStrokeOpacity.min, Setting.VectorStrokeOpacity.max),
  PathStrokeWidth: (val: number): number =>
    utils.clip(val, Setting.PathStrokeWidth.min, Setting.PathStrokeWidth.max),
  PathStrokeOpacity: (val: number): number =>
    utils.clip(val, Setting.PathStrokeOpacity.min, Setting.PathStrokeOpacity.max),
}

function loadStoredSetting(storageKey: string): Setting {
  const setting = Setting
  const stored = localStorage.getItem(storageKey)

  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const keys = Object.keys(Setting) as Array<keyof Setting>

      for (const key of keys) {
        if (key in parsed) {
          if (typeof parsed[key].val === typeof Setting[key].val) {
            setting[key].val = settingClipper[key](parsed[key].val)
          }
        }
      }
    } catch (error) {
      console.error('Error parsing stored setting:', error, '\n- Fallback to Default Setting')
    }
  }

  return setting
}

function saveSetting(key: string, setting: Setting): void {
  localStorage.setItem(key, JSON.stringify(setting))
}

export const useSettingStore = defineStore('setting', () => {
  const STORAGE_KEY = 'setting'
  const setting = ref<Setting>(loadStoredSetting(STORAGE_KEY))
  watchEffect(() => saveSetting(STORAGE_KEY, setting.value))

  function changeSetting(target: keyof Setting, val: number): void {
    setting.value[target].val = settingClipper[target](val)
  }

  return { setting, changeSetting }
})
