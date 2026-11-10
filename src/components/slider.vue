<template>
  <div class="relative flex flex-col a-start j-between pt-15 pr-5 pb-15 mr-5 ml-5 font-size-sm top-line">
    <div class="flex a-center j-between w-full pb-5">
      <span v-if="text" class="pr-30">{{ text }}:</span>
      <div class="relative flex a-center j-between">
        <button @click="minus" class="relative l-0">
          <img :src="icons.minus" alt="Minus" />
        </button>
        <input v-model.number="input" type="number" :min="min" :max="max" :step="step"
          class="wem-20 ml-5 mr-5 border-bottom txt-center no-spin-btn" />
        <button @click="add" class="relative r-0 w-20 h-20">
          <img :src="icons.plus" alt="Plus" />
        </button>
      </div>
    </div>
    <input type="range" :min="min" :max="max" v-model.number="input" :step="step" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as icons from '@/assets/img/d'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
  val: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['slide'])

const input = ref<number>(props.val)

function add(): void {
  input.value += props.step
}

function minus(): void {
  input.value -= props.step
}

watch(input, () => emit('slide', input.value))
</script>

<style lang="scss" scoped></style>
