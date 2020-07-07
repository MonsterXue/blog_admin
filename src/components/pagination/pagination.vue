<template>
  <div class="pagination">
    <el-pagination
      :background="background"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30]
    },
    background: {
      type: Boolean,
      default: true
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper"
    },
    total: Number
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('sizeChange',val)
    },
    handlePageChange (val) {
      this.$emit('pageChange',val)
    }
  }
};
</script>

<style lang="scss">
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>