<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          v-model="chainstay"
          placeholder="Chainstay length"
          type="number"
        ></el-input>
      </el-col>
      <el-col :span="8">
       <el-checkbox
        v-model="halfLink"
        label="Half link"
        border
       ></el-checkbox>
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
      >
      </el-table-column>
      <el-table-column
        prop="t2"
        label="Rear gear"
      >
      </el-table-column>
      <el-table-column
        prop="ratio"
        label="Ratio"
      >
      </el-table-column>
      <el-table-column
        prop="links"
        :label="halfLink ? 'Half links' : 'Links'"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="tension"
        label="Tension"
      >
      </el-table-column> -->
      <el-table-column
        prop="tensionIndicator"
        label="Tension quality"
      >
        <template slot-scope="scope">
          <el-tag
            :type="tensionQuality(scope.row.tensionIndicator).tag"
            disable-transitions
          >
            {{ tensionQuality(scope.row.tensionIndicator).label }} ({{ scope.row.tensionIndicator }} %)
          </el-tag>
        </template>
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
      chainstay: undefined,
      halfLink: false
    }
  },
  computed: {
    variations() {
      return compute(this.chainstay, this.halfLink)
    }
  },
  methods: {
    tensionQuality(tensionIndicator) {
      if (tensionIndicator > 90) {
        return {
          label: 'Ideal',
          tag: 'primary'
        }
      }

      if (tensionIndicator > 70) {
        return {
          label: 'Good',
          tag: 'success'
        }
      }

      return {
        label: 'Acceptable',
        tag: 'info'
      }
    }
  }
}
</script>

<style lang="scss">

</style>