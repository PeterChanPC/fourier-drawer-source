<template>
  <nav class="fixed r-0 flex flex-col w-180 h-auto pt-50 pr-10 pl-10 z-99 bg-glassy">
    <router-link class="relative flex w-180 h-50" to="/">Home</router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'settings',
  components: {},
  props: {},
  setup() {},
})
</script>

<style scoped lang="scss"></style>
