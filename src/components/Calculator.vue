<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="Chainstay length"
          v-model="chainstay"
        ></el-input>
      </el-col>
      <el-col :span="20">
        <el-button
          :disabled="!chainstay"
          @click="computeVariations()"
        >
          Compute configurations
        </el-button>
      </el-col>
    </el-row>

    <el-table
      v-if="chainstay && variations"
      :data="variations"
      stripe
      style="width: 100%"
      empty-text="There is no working configuration for this value :-("
    >
      <el-table-column
        prop="t1"
        label="Front gear"
        width="180">
      </el-table-column>
      <el-table-column
        prop="t2"
        label="Rear gear"
        width="180">
      </el-table-column>
      <el-table-column
        prop="links"
        label="Links">
      </el-table-column>
      <el-table-column
        prop="tension"
        label="Tension indicator (lower is better)">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { compute } from '@/helpers/engine'

export default {
  // props: {
  //   chainstay: {
  //     type: Number,
  //     required: true
  //   }
  // },
  data() {
    return {
      chainstay: undefined,
      variations: undefined
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