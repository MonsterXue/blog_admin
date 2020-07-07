<template>
  <div class="containerList">
    <div class="title">{{title}}</div>
    <div class="container">
      <el-tag v-for="(item, index) in tagList" :key="index" closable @close="close(index)">{{item.name}}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "containerList",
  props: {
    tagList: {
      type: Array,
      default: () => []
    },
    title: String
  },
  methods: {
    close(index) {
      this.$emit("close", index);
    }
  }
};
</script>

<style lang="scss">
.containerList {
  position: relative;
  height: 100%;
  margin-top: 40px;
  .title {
    position: absolute;
    z-index: 2;
    left: 25px;
    margin-left: 15px;
    padding: 0 5px;
    background-color: white;
  }
  .container {
    margin-top: 10px;
    z-index: 1;
    padding: 10px;
    overflow-y: auto;
    position: absolute;
    border: 1px solid #dddfe7;
    height: 92px;
    width: 95%;
    .el-tag {
      margin: 0 5px 10px 0;
    }
  }
}
</style>