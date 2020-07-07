<script>
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  data() {
    return {
      newMenu: []
    };
  },
  methods: {
    r(h, subMenu) {
      if (subMenu.isBtn == 0) {
        if (subMenu.children && subMenu.children.length) {
          return (
            <el-submenu index={subMenu.menuId.toString()}>
              <template slot="title">
                <span>{subMenu.menuName}</span>
              </template>
              {subMenu.children.map(item => {
                return this.r(h, item);
              })}
            </el-submenu>
          );
        } else {
          return (
            <el-menu-item
              index={subMenu.menuId.toString()}
              on-click={this.handleMenuClick.bind(this, subMenu)}
            >
              {subMenu.menuName}
            </el-menu-item>
          );
        }
      }
    },
    handleMenuClick(menu) {
      this.$router.push({ path: menu.menuUrl }).catch(err => err);
      this.$emit("menuChange", menu);
    },
    resetMenu(menu) {
      const newMenuTree = [];
      menu.forEach((ele, index) => {
        if (ele.isBtn == 0) {
          newMenuTree.push(ele);
        }
        if (ele.children && ele.children.length) {
          newMenuTree[index].children = this.resetMenu(ele.children);
        }
      });
      return newMenuTree;
    }
  },
  computed: {
    ...mapGetters(["menu"])
  },
  mounted() {
    this.newMenu = JSON.parse(JSON.stringify(this.menu));
    this.resetMenu(this.newMenu);
  },
  render(h) {
    return (
      <el-menu class="sidebar">
        {this.newMenu.map(ele => {
          return this.r(h, ele);
        })}
      </el-menu>
    );
  }
};
</script>

<style lang="scss">
.sidebar {
  height: 100%;
  width: 200px;
}
.el-menu {
  height: 100%;
  background-color: #ffffff !important;
}
</style>