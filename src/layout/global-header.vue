<template>
  <header class="fixed flex a-center j-end t-0 w-dvw h-50 z-100">
    <h1 class="absolute l-0 w-38 ml-16 mr-16 mt-auto mb-auto font-size-36 italic user-select-none">
      Pc
    </h1>
    <div class="relative flex row a-center j-around w-132 h-32 pr-16">
      <SwitchBtn @switch="themeStore.switchTheme" :is-active="themeStore.isDark" :img-left="icons.sun"
        :img-right="icons.moonStars" />
      <Settings />
    </div>
  </header>
</template>

<script setup lang="ts">
import SwitchBtn from '@/components/switch-btn.vue'
import Settings from '@/layout/settings.vue'
import * as icons from '@/assets/img/d'
import { useThemeStore } from '@/stores/theme.store'

const themeStore = useThemeStore()
</script>

<style scoped lang="scss"></style>
