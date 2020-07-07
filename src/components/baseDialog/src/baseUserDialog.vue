<template>
  <div class="baseUserDialog">
    <el-dialog :visible="visible" :title="title" v-on:close="close">
      <div class="form_wrapper">
        <p class="item">
          <label>用户名</label>
          <el-input v-model="modleForm.userName" :disabled="type === 'add' ? false : true"></el-input>
        </p>
        <p class="item">
          <label>姓名</label>
          <el-input v-model="modleForm.name"></el-input>
        </p>
        <p class="item">
          <label>电话</label>
          <el-input v-model="modleForm.tel"></el-input>
        </p>
        <p class="item">
          <label>角色</label>
          <el-select v-model="modleForm.roleId">
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p class="item tips" v-if="type === 'add'">
          <label>提示：初始密码为6个8！！！</label>
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
  name: "baseUserDialog",
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
    type: {
      type: String,
      default: "add"
    },
    title: String
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    }
  },
  data() {
    return {
      roleList: []
    };
  },
  mounted() {
    this.$api.userAPI.getSysRole().then(res => {
      if (res.data.code == 200) {
        res.data.data.roleList.forEach(ele => {
          this.roleList.push({
            label: ele.roleName,
            value: ele.roleId
          })
        })
      }
    })
  }
};
</script>

<style lang="scss">
.baseUserDialog {
  .el-dialog {
    height: 410px;
    width: 600px;
    .form_wrapper {
      p {
        display: flex;
        flex: 1;
        margin-bottom: 20px;
        label {
          flex-shrink: 0;
          width: 70px;
          line-height: 32px;
        }
        .el-input__icon {
          line-height: 32px;
        }
      }
      .tips {
        display: inline;
        color: #FF4500;
        font-size: 12px;
      }
    }
  }
  .el-dialog__body {
    padding-top: 20px;
    box-sizing: border-box;
  }
  .btn_box {
    margin-top: 30px;
    .el-button {
      width: 80px;
    }
  }
}
</style>