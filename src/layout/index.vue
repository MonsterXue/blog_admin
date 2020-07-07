<template>
  <div class="app_container">
    <navbar @resetPwd="resetPwd" />
    <div class="middle">
      <sidebar @menuChange="handleMenuChange($event)" />
      <div class="main_container">
        <breadcrumb :breadItem="menuLevel" />
        <router-view class="content" />
      </div>
    </div>
    <resetPwdDialog
      :modleForm="pwdModelForm"
      :title="pwdDialog.title"
      :visible="pwdDialog.visible"
      :close="pwdDialog.close"
      @confirm="pwdDialog.confirm"
    />
  </div>
</template>

<script>
import navbar from "./Navbar";
import sidebar from "./Sidebar";
import breadcrumb from "./BreadCrumb";
import resetPwdDialog from "@/components/baseDialog/src/resetPwdDialog";
import { mapGetters } from "vuex"
export default {
  name: "layout",
  components: {
    navbar,
    sidebar,
    breadcrumb,
    resetPwdDialog
  },
  data() {
    return {
      menuLevel: [],
      pwdModelForm: {},
      pwdDialog: {
        title: "修改密码",
        visible: false,
        confirm: this.confirm,
        close: () => {
          this.pwdDialog.visible = false;
        }
      }
    };
  },
  methods: {
    handleMenuChange(menu) {
      this.menuLevel = [menu];
    },
    confirm() {
      if (this.pwdModelForm.oldPwd && this.pwdModelForm.oldPwdSec && this.pwdModelForm.newPwd) {
        if (this.pwdModelForm.oldPwd == this.pwdModelForm.oldPwdSec) {
          if (this.pwdModelForm.oldPwd != this.pwdModelForm.newPwd) {
            this.$api.userAPI.changePwd({
              userId: this.userInfo.userId,
              oldPwd: this.pwdModelForm.oldPwd,
              newPwd: this.pwdModelForm.newPwd
            }).then(res => {
              if (res.data.code == 200) {
                this.$message.success("修改成功！");
                this.pwdDialog.visible = false;
              }
              if (res.data.code == -1) {
                this.$message.error("原始密码错误！");
              }
            }).catch(err => {
              this.$message.error("请求错误！");
            })
          } else {
            this.$message.error("新密码不能与旧密码相同！");
          }
        } else {
          this.$message.error("两次密码不一致！");
        }
      } else {
        this.$message.error("密码不能为空！");
      }
    },
    resetPwd() {
      this.pwdDialog.visible = true;
      this.pwdModelForm = {};
    }
  },
  mounted() {
    this.menuLevel = [
      {
        menuName: this.$route.meta.title
      }
    ];
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="scss">
.app_container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.middle {
  display: flex;
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  .main_container {
    flex: 1;
    border: #f0f2f5 12px solid;
    overflow: scroll;
    .breadcrumb {
      margin: 5px 0px 5px 5px;
    }
    .content {
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
</style>