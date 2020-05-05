<template>
  <div>
    <!-- form -->
    <div class="input-label">Chainstay length in CM</div>
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

    <div class="input-label">Ratio limits</div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          v-model="ratioMin"
          type="number"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-input
          v-model="ratioMax"
          type="number"
        ></el-input>
      </el-col>
    </el-row>

    <!-- results -->
    <el-table
      v-if="chainstay && variations"
      :data="variations"
      :default-sort = "{
        prop: 'tensionIndicator',
        order: 'descending'
      }"
      stripe
      style="width: 100%"
      empty-text="There is no working configuration for this value :-("
    >
      <el-table-column
        prop="t1"
        label="Front gear"
        sortable
        min-width="120px"
      >
      </el-table-column>
      <el-table-column
        prop="t2"
        label="Rear gear"
        sortable
        min-width="120px"
      >
      </el-table-column>
      <el-table-column
        prop="ratio"
        label="Ratio"
        sortable
        min-width="100px"
      >
        <template slot-scope="scope">
          <el-tag
            :type="ratioTag(scope.row.ratio)"
            disable-transitions
          >
            {{ scope.row.ratio }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="links"
        :label="halfLink ? 'Half links' : 'Links'"
        sortable
        min-width="110px"
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
        sortable
        min-width="150px"
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
      halfLink: false,
      ratioMin: 1.9,
      ratioMax: 4
    }
  },
  computed: {
    variations() {
      return compute(this.chainstay, this.halfLink).filter(variation => {
        if (this.ratioMin && variation.ratio < this.ratioMin) {
          return false
        }

        if (this.ratioMax && variation.ratio > this.ratioMax) {
          return false
        }

        return true
      })
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
    },
    ratioTag(ratio) {
      if (ratio > 3.7) {
        return 'danger'
      }

      if (ratio > 2.9) {
        return 'warning'
      }

      if (ratio > 2.4) {
        return 'success'
      }

      if (ratio > 1.90) {
        return 'primary'
      }

      return 'info'
    }
  }
}
</script>

<style lang="scss">
  .input-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
</style>