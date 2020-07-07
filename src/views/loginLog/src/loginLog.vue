<template>
  <div class="loginLog">
    <baseSearch :searchData="searchData" :modelSearch="modelSearch" />
    <baseTable
      tableRef="logTable"
      :tableHeaders="tableHeaders"
      :hasIndex="hasIndex"
      :hasCheckBox="hasCheckBox"
      :tableData="tableData"
      :border="border"
      :total="total"
      :topBtnList="topBtnList"
      @sizeChange="handleSizeChange"
      @pageChange="handlePageChange"
      @tableChoose="tableChoose"
    />
  </div>
</template>

<script>
import baseSearch from "@/components/baseSearch";
import baseTable from "@/components/baseTable";
import { mapState } from "vuex";
export default {
  name: "loginLog",
  components: {
    baseSearch,
    baseTable
  },
  data() {
    return {
      searchData: [
        {
          label: "用户名",
          prop: "userName",
          type: "input"
        },
        {
          label: "姓名",
          prop: "name",
          type: "input"
        },
        {
          label: "用户角色",
          prop: "roleId",
          type: "select",
          options: this.$store.state.dataDict["roleList"] || []
        },
        {
          label: "登录时间",
          prop: "loginTime",
          type: "date-pick"
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
          label: "用户名",
          prop: "userName",
          align: "center"
        },
        {
          label: "姓名",
          prop: "name",
          align: "center"
        },
        {
          label: "用户角色",
          prop: "roleName",
          align: "center"
        },
        {
          label: "IP地址",
          prop: "ipAddress",
          align: "center"
        },
        {
          label: "登录时间",
          prop: "loginTime",
          align: "center"
        },
        {
          label: "操作",
          align: "center",
          buttonList: [
            {
              icon: "iconfont icon-delete",
              handleClick: this.handleDelClick
            }
          ]
        }
      ],
      tableData: [],
      topBtnList: [
        {
          label: "删除",
          icon: "el-icon-delete",
          type: "danger",
          handleClick: this.handleManyDelCLick
        }
      ],
      currentChecked: [],
      allCheckedSelect: [],
      modelSearch: {},
      hasIndex: true,
      hasCheckBox: true,
      border: true,
      total: 1,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    getList() {
      let params = {
        page: this.currentPage,
        limit: this.pageSize,
        ...this.modelSearch
      };
      this.$api.loginLog
        .getAllLog(params)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
            this.togglePageSelection();
          }
        })
        .catch(err => {
          this.$message.error("请求错误！");
        });
    },
    handleQueryClick() {
      this.getList();
    },
    handleRefreshClick() {
      this.modelSearch = {};
      this.getList();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleDelClick(index, row) {
      this.$confirm("确定删除该条日志？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.loginLog
            .delLog({
              logIdList: row.logId
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("删除成功！");
              } else {
                this.$message.error("删除失败！");
              }
              if (this.tableData.length == 1) {
                this.currentPage--;
              }
              this.Init();
            })
            .catch(err => {
              this.$message.error("请求失败！");
            });
        })
        .catch(() => {});
    },
    handleManyDelCLick() {
      let logIdList = [];
      this.allCheckedSelect.forEach(ele => {
        logIdList.push(ele.logId);
      });
      logIdList = logIdList.join(",");
      if (this.allCheckedSelect.length) {
        this.$confirm("确定批量删除日志？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.loginLog
              .delLog({
                logIdList
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.$message.success("删除成功！");
                } else {
                  this.$message.error("删除失败！");
                }
                this.currentPage = 1;
                this.Init();
              })
              .catch(err => {
                this.$message.error("请求失败！");
              });
          })
          .catch(() => {});
      } else {
        this.$message.error("无已选择的日志");
      }
    },
    tableChoose(selection, row) {
      if (selection.length > this.currentChecked.length) {
        this.allCheckedSelect.push(row);
      } else {
        let index = this.allCheckedSelect.findIndex(child => {
          return child["logId"] == row["logId"];
        });
        this.allCheckedSelect.splice(index, 1);
      }
      this.currentChecked = selection;
    },
    togglePageSelection() {
      this.currentChecked = [];
      this.$children[1].$refs["logTable"].clearSelection();
      this.allCheckedSelect.forEach(item => {
        let row = this.tableData.find(key => {
          return key["logId"] == item["logId"];
        });
        if (row) {
          this.currentChecked.push(row);
          this.$nextTick(() => {
            this.$children[1].$refs["logTable"].toggleRowSelection(row);
          });
        }
      });
    },
    Init() {
      this.getList();
      if (!this.$store.state.dataDict["roleList"]) {
        this.$store.dispatch("getRoleList").then(res => {
          this.searchData[2].options = res;
        });
      }
    }
  },
  mounted() {
    this.Init();
  },
  computed: {
    ...mapState({
      dataDict: state => state.dataDict
    })
  }
};
</script>

<style>
</style>