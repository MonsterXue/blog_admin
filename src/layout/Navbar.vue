<template>
  <div class="navbar">
    <div class="info">
      <div class="photo"></div>
      <div class="title">博客后台管理系统-莫斯利安薛</div>
    </div>
    <div class="user">
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          欢迎，{{ userName }}
          <i class="iconfont iconxiajiantou"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="resetPwd">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="logout"  @click="logout">退出</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "navbar",
  data() {
    return {
    };
  },
  methods: {
    logout() {
      const APP_NAME = process.env.VUE_APP_NAME;
      localStorage.removeItem(APP_NAME);
      this.$router.push("/").catch(err => {});
      location.reload();
    },
    resetPwd() {
      this.$emit("resetPwd");
    }
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  }
};
</script>

<style lang="scss">
.navbar {
  background-color: #0f4c81;
  height: 50px;
  line-height: 50px;
  color: #eeeeee;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  .info {
    float: left;
    .title {
      margin-left: 10px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .user {
    float: right;
    margin-right: 20px;
    cursor: default;
    .dropdown {
      display: inline-block;
      color: #eeeeee;
      font-size: 16px;
      .el-dropdown-link:focus {
        outline: none;
      }
      .iconxiajiantou {
        font-size: 13px;
        margin-left: 2px;
      }
    }
    .logout {
      margin-left: 30px;
      cursor: pointer;
    }
  }
}
</style>