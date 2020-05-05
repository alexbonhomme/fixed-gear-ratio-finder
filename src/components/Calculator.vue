<template>
  <div>
    <div
      v-for="(value, index) in variations"
      :key="index"
    >
      T1: {{ value.t1 }} | T2: {{ value.t1 }} | Links: {{ value.links }} | Tension: {{ value.tension }}
    </div>

    <button @click="computeVariations()">
      Update
    </button>
  </div>

</template>

<script>
import { compute } from '@/helpers/engine'

export default {
  props: {
    chainstay: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      variations: []
    }
  },
  methods: {
    computeVariations() {
      this.variations = compute(this.chainstay)

      console.debug(this.variations)
    }
  }
}
</script>

<style lang="scss">

</style>