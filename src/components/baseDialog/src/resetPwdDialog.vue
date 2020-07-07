<template>
  <div class="resetPwdDialog">
    <el-dialog :visible="visible" :title="title" v-on:close="close">
      <div class="form_wrapper">
        <p class="item">
          <label>请输入初始密码</label>
          <el-input v-model="modleForm.oldPwd" type="password"></el-input>
        </p>
        <p class="item">
          <label>请再次输入初始密码</label>
          <el-input v-model="modleForm.oldPwdSec" type="password"></el-input>
        </p>
        <p class="item">
          <label>请输入新密码</label>
          <el-input v-model="modleForm.newPwd" type="password"></el-input>
        </p>
      </div>
      <div class="btn_box">
        <el-button @click="close">取消</el-button>
        <el-button class="deep" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "resetPwdDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {}
    },
    modleForm: {
      type: Object,
      default: () => {}
    },
    title: String
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    }
  }
}
</script>

<style lang="scss">
.resetPwdDialog {
  .el-dialog {
    height: 340px;
    width: 600px;
    .form_wrapper {
      p {
        display: flex;
        flex: 1;
        margin-bottom: 20px;
        label {
          flex-shrink: 0;
          width: 70px;
          line-height: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  .el-dialog__body {
    padding-top: 20px;
    box-sizing: border-box;
  }
}
</style>