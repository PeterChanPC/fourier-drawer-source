<template>
  <div class="relative flex flex-col a-start j-between pt-15 pr-5 pb-15 mr-5 ml-5 font-size-sm top-line">
    <div class="flex a-center j-between w-full pb-5">
      <span v-if="text" class="pr-30">{{ text }}:</span>
      <div class="relative flex a-center j-between">
        <button class="relative l-0" @click="minus()">
          <img :src="icons.minus" alt="Minus" />
        </button>
        <input class="wem-20 ml-5 mr-5 border-bottom txt-center no-spin-btn" type="number" :min="min" :max="max"
          v-model.number="input" :step="step" />
        <button class="relative r-0 w-20 h-20" @click="add()">
          <img :src="icons.plus" alt="Plus" />
        </button>
      </div>
    </div>
    <input class="w-full" type="range" :min="min" :max="max" v-model.number="input" :step="step" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue'
import * as icons from '@/assets/img/d'

export default defineComponent({
  name: 'slider',
  props: {
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
    applyChange: {
      type: Function as PropType<(arg: number) => void>,
      default: () => { },
    },
  },
  setup(props, { expose }) {
    const input = ref<number>(props.val)

    function add() {
      input.value += props.step
    }

    function minus() {
      input.value -= props.step
    }

    watch(input, () => {
      props.applyChange(input.value)
      input.value = props.val
    })

    expose()

    return { icons, input, add, minus }
  },
})
</script>

<style lang="scss" scoped></style>
