<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <span class="label">当前位置:</span>
      <el-breadcrumb-item v-for="(item, index) in breadItem" :key="index">{{item.menuName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  props: {
    breadItem: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
.breadcrumb {
  height: 30px;
  cursor: default;
  .label {
    float: left;
    color: #5c5c5c;
    margin-right: 12px;
  }
  .el-breadcrumb {
    line-height: 30px;
    margin-left: 5px;
  }
}
</style>