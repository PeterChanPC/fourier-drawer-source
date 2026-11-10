import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { Setting } from './d'

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
            setting[key].val = setting[key].clipper(parsed[key].val)
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
    setting.value[target].val = setting.value[target].clipper(val)
  }

  return { setting, changeSetting }
})
