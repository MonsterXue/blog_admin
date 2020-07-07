<template>
  <div id="login_container">
    <el-form class="login_form" label-width="0px" :model="userForm" autocomplete="off">
      <h2 class="appName">Monster_Xue_Blog_Admin</h2>
      <el-form-item>
        <span class="iconfont iconyonghuming"></span>
        <el-input v-model="userForm.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="iconfont iconmima"></span>
        <el-input v-model="userForm.password" :type="inputType" placeholder="密码"></el-input>
        <span
          :class="inputType ? 'iconfont iconguanbi' : 'iconfont iconxianshimima'"
          @click="changeInputType"
        ></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login_btn" @click="handleLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "login",
  data() {
    return {
      userForm: {
        userName: "",
        password: ""
      },
      inputType: "password",
      loading: false
    };
  },
  methods: {
    changeInputType() {
      if (this.inputType) {
        this.inputType = "";
      } else {
        this.inputType = "password";
      }
    },
    handleLogin() {
      this.loading = true;
      if (this.userForm.userName && this.userForm.password) {
        this.$store
          .dispatch("Login", this.userForm)
          .then(res => {
            this.loadingFun();
            if (res.data.code === 200) {
              const menu = JSON.parse(localStorage.getItem(process.env.VUE_APP_NAME)).menuList[0];
              const url = this.getMenuUrl(menu);
              console.log(url)
              this.$router.push(url).catch(err => err);
            } else {
              this.$message.error("用户名密码不匹配");
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("请求错误");
            this.loadingFun();
          });
      } else {
        this.$message.error("用户名或密码不能为空");
        this.loadingFun();
      }
    },
    loadingFun() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    getMenuUrl(menu) {
      let url = "";
      if (!menu.menuUrl && menu.children.length) {
        url = this.getMenuUrl(menu.children[0]);
      } else {
        url = menu.menuUrl;
      }
      return url;
    }
  },
  created() {
    let _this = this;
    if (this.$route.name === "login") {
      document.onkeydown = function(e) {
        if (e.keyCode === 13 && !_this.loading) {
          _this.loading = true;
          _this.handleLogin();
        }
      };
    }
  },
  computed: {
    ...mapGetters(["menu"])
  }
};
</script>

<style lang="scss">
#login_container {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  position: fixed;
  .appName {
    color: #FFF;
    text-align: center;
    margin-bottom: 50px;
  }
  input {
    background: transparent;
    border: none;
    border-radius: 0px;
    padding: 10px 5px 12px 15px;
    color: #eee;
    height: 47px;
    box-sizing: border-box;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    background: transparent;
  }
  .login_form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      margin-bottom: 20px;
      .iconfont {
        font-size: 16px;
        margin-left: 10px;
        color: #889aa4;
        position: relative;
        top: 2px;
      }
      .iconguanbi,
      .iconxianshimima {
        margin-left: 0px;
        font-size: 18px;
        cursor: pointer;
        top: 3px;
        font-weight: 800;
      }
    }
    .login_btn {
      width: 100%;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: #409eff;
      border-radius: 5px;
      color: #eee;
      cursor: pointer;
    }
  }
}
</style>