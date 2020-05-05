<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="Chainstay length"
          type="number"
          v-model="chainstay"
        ></el-input>
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
  name: 'Calculator',
  data() {
    return {
      chainstay: undefined
    }
  },
  computed: {
    variations() {
      return compute(this.chainstay)
    }
  }
}
</script>

<style lang="scss">

</style>