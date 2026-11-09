<template>
  <header class="fixed flex a-center j-end t-0 w-dvw h-50 z-100">
    <h1 class="absolute l-0 w-38 ml-16 mr-16 mt-auto mb-auto font-size-36 italic user-select-none">
      Pc
    </h1>
    <div class="relative flex row a-center j-around h-50 pr-16">
      <SwitchBtn class="w-50 h-50" :on-switch="themeStore.switchTheme" :is-active="themeStore.isDark"
        :img-left="icons.sun" :img-right="icons.moonStars" />
      <button class="relative w-50 h-50 bg-none border-none pointer user-select-none" @click="toggleSetting">
        <img :src="icons.cog" />
      </button>
    </div>
  </header>
  <Settings :toggled="toggled" />
</template>

<script lang="ts">
import SwitchBtn from '@/components/switch-btn.vue'
import Settings from '@/layout/settings.vue'
import * as icons from '@/assets/img/d'
import { useThemeStore } from '@/stores/theme.store'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'global-header',
  components: {
    SwitchBtn,
    Settings,
  },
  setup() {
    const themeStore = useThemeStore()
    const toggled = ref<boolean>(false)

    function toggleSetting(): void {
      toggled.value = !toggled.value
    }

    return { icons, themeStore, toggled, toggleSetting }
  },
})
</script>

<style scoped lang="scss"></style>
