<template>
  <div class="baseRoleDialog">
    <el-dialog :visible="visible" :title="title" v-on:close="close">
      <div class="form_wrapper">
        <baseForm
          :labelWidth="labelWidth"
          :formItems="formItems"
          :modelForm="modelForm"
          formRef="formAdd"
          :isRules="isRules"
        />
      </div>
      <div class="btn_box">
        <el-button @click="close">取消</el-button>
        <el-button class="deep" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseForm from "@/components/baseForm";
export default {
  name: "baseRoleDialog",
  components: {
    baseForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {}
    },
    modelForm: {
      type: Object,
      default: () => {}
    },
    title: String
  },
  data() {
    return {
      formItems: [
        [
          {
            label: "角色代码",
            prop: "roleName",
            inRule: true,
            message: "必填项不能为空",
            type: "input"
          }
        ],
        [
          {
            label: "角色名称",
            prop: "roleCode",
            inRule: true,
            message: "必填项不能为空",
            type: "input"
          }
        ],
        [
          {
            label: "状态",
            prop: "status",
            type: "switch"
          }
        ],
        [
          {
            label: "描述",
            prop: "description",
            type: "textarea"
          }
        ]
      ],
      isRules: true,
      labelWidth: "100px"
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    }
  },
  watch: {
    visible: function(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          //this.$children[0].$children[0].$children[0].resetFields();
        })
      }
    }
  }
};
</script>

<style lang="scss">
.baseRoleDialog {
  .el-dialog {
    height: 400px;
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
        .el-switch {
          vertical-align: middle;
          height: 32px;
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