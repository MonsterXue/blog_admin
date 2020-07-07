<template>
  <div class="articleManage">
    <div v-if="showTable">
      <baseSearch :searchData="searchData" :modelSearch="modelSearch" />
      <baseTable
        :tableHeaders="tableHeaders"
        :tableData="tableData"
        :topBtnList="topBtnList"
        :total="total"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @sizeChange="handleSizeChange"
        @pageChange="handlePageChange"
      />
    </div>

    <editArticle v-if="showFormEdit" ref="editForm" />
  </div>
</template>

<script>
import baseTable from "@/components/baseTable";
import baseSearch from "@/components/baseSearch";
import editArticle from "../components/articleEdit";
import router from "@/router";
import { mapGetters } from "vuex";
export default {
  name: "articleManage",
  components: {
    baseTable,
    baseSearch,
    editArticle
  },
  data() {
    return {
      searchData: [
        {
          label: "标题",
          type: "input",
          prop: "title"
        },
        {
          label: "关键字",
          type: "input",
          prop: "keyWords"
        },
        {
          label: "标签",
          type: "select",
          prop: "tagName",
          options: [
            {
              label: "标签1",
              value: "标签1"
            },
            {
              label: "标签2",
              value: "标签2"
            },
            {
              label: "标签3",
              value: "标签3"
            },
            {
              label: "标签4",
              value: "标签4"
            }
          ]
        },
        {
          label: "作者",
          type: "input",
          prop: "userName"
        },
        {
          type: "button",
          buttonList: [
            {
              label: "查询",
              icon: "el-icon-search",
              type: "primary",
              handleClick: this.handleQueryClick
            },
            {
              label: "清除",
              icon: "el-icon-refresh",
              type: "warning",
              handleClick: this.handleRefreshClick
            }
          ]
        }
      ],
      tableHeaders: [
        {
          label: "标题",
          prop: "title",
          align: "center"
        },
        {
          label: "关键字",
          prop: "keyWords",
          align: "center"
        },
        {
          label: "标签",
          prop: "tagName",
          align: "center"
        },
        {
          label: "作者",
          prop: "userName",
          align: "center"
        },
        {
          label: "更新时间",
          prop: "updateTime",
          align: "center"
        },
        {
          label: "操作",
          align: "center",
          buttonList: [
            {
              name: "编辑",
              handleClick: this.handleEditClick
            },
            {
              name: "删除",
              handleClick: this.handleDelClick
            }
          ]
        }
      ],
      tableData: [],
      topBtnList: [
        {
          label: "新增",
          icon: "el-icon-plus",
          class: "addBtn",
          handleClick: this.handleAddClick
        }
      ],
      modelSearch: {},
      total: 0,
      currentPage: 1,
      pageSize: 10,
      showTable: true,
      showFormAdd: false,
      showFormEdit: false
    };
  },
  methods: {
    handleAddClick() {
      this.$router.push("addArticle");
    },
    handleQueryClick() {
      this.getList();
    },
    handleRefreshClick() {
      this.modelSearch = {};
      this.getList();
    },
    handleEditClick(index, row) {
      let menuList = JSON.parse(localStorage.getItem(process.env.VUE_APP_NAME))
        .menuList;
      let menu = menuList.find(ele => {
        return ele.menuId == 9;
      });
      if (menu) {
        if (menu.children && menu.children.length) {
          let routerIndex = menu.children.findIndex(ele => {
            return ele.menuId == 11; //判断是否有编辑文章权限
          });
          if (routerIndex != -1) {
            this.$router.push({
              query: {
                id: row.articleId
              },
              path: "/editArticle"
            });
          } else if (row.userName == this.userName) {
            this.showFormEdit = true;
            this.showTable = false;
            this.$nextTick(() => {
              this.$refs["editForm"].getInfo(row);
            });
          } else {
            this.$router.push("404");
          }
        } else if (row.userName == this.userName) {
          this.showFormEdit = true;
          this.showTable = false;
          this.$nextTick(() => {
            this.$refs["editForm"].getInfo(row);
          });
        } else {
          this.$router.push("404");
        }
      }
    },
    handleDelClick(index, row) {
      let menuList = JSON.parse(localStorage.getItem(process.env.VUE_APP_NAME))
        .menuList;
      let menu = menuList.find(ele => {
        return ele.menuId == 9;
      });
      if (menu) {
        if (menu.children && menu.children.length) {
          let routerIndex = menu.children.findIndex(ele => { //判断是否有删除权限
            return ele.menuId == 12;
          });
          if (routerIndex != -1) {
            this.delArticle(index, row);
          } else if (row.userName == this.userName) {
            this.delArticle(index, row);
          } else {
            this.$message.error("您暂无该权限");
          }
        } else if (row.userName == this.userName) {
          this.delArticle(index, row);
        } else {
          this.$message.error("您暂无该权限");
        }
      }
      
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.getList();
    },
    getList() {
      let params = {
        page: this.currentPage,
        limit: this.pageSize,
        ...this.modelSearch
      };
      this.$api.articleAPI
        .getArticle(params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          this.$message.error("请求错误！");
        });
    },
    Init() {
      this.showTable = true;
      this.showFormAdd = false;
      this.showFormEdit = false;
      this.getList();
    },
    delArticle(index, row) {
      this.$confirm("确认删除该文章？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.articleAPI
            .delArticle({
              articleId: row.articleId
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("删除成功！");
              }
              if (this.tableData.length == 1) {
                this.currentPage--;
              }
              this.Init();
            })
            .catch(err => {
              this.$message.error("请求错误！");
            });
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.Init();
  },
  computed: {
    ...mapGetters(["userName"])
  }
};
</script>

<style>
</style>