<template>
  <div class="baseAuthDialog">
    <el-dialog :visible="visible" :title="title" v-on:close="close" ref="treeDialog">
      <span class="current_role">当前角色：{{currentRole}}</span>
      <div class="tree_wrapper">
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :ref="dialogRef"
        ></el-tree>
      </div>
      <div class="btn_box">
        <el-button @click="close">取消</el-button>
        <el-button class="deep" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "baseAuthDialog",
  props: {
    visible: {
      //是否可见
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {}
    },
    title: String, //标题
    currentRole: String, //当前角色名
    dialogRef: String
  },
  data() {
    return {
      treeData: []
    };
  },
  methods: {
    handleMenuTree(menu) {
      const newMenuTree = [];
      menu.forEach((ele, index) => {
        newMenuTree.push({
          label: ele.menuName,
          id: ele.menuId,
          children: []
        });
        if (ele.children && ele.children.length) {
          newMenuTree[index].children = this.handleMenuTree(ele.children);
        }
      });
      return newMenuTree;
    },
    confirm() {
      this.$emit("confirm");
    }
  },
  computed: {
    ...mapGetters(["menu"])
  },
  mounted() {
    if (this.menu) {
      this.treeData = this.handleMenuTree(this.menu);
    }
  }
};
</script>

<style lang="scss">
.baseAuthDialog {
  .el-dialog {
    width: 660px;
    height: 600px;
    position: relative;
    .tree_wrapper {
      overflow: hidden;
    }
    .el-dialog__header {
      border-bottom: 1px solid #dddfe7;
    }
    .el-dialog__body {
      padding-top: 10px;
      box-sizing: border-box;
      .current_role {
        display: inline-block;
        margin-bottom: 10px;
      }
    }
    .btn_box {
      position: absolute;
      bottom: 30px;
      left: 30%;
    }
  }
  .el-tree {
    overflow-y: auto;
  }
}
</style>