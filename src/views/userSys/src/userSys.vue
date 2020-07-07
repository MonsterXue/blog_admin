<template>
  <div class="userSys">
    <baseTable
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :topBtnList="topBtnList"
      :hasIndex="hasIndex"
      :border="border"
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @pageChange="handlePageChange"
      @sizeChange="handleSizeChange"
    />
    <baseUserDialog
      :visible="userDialog.visible"
      :title="userDialog.title"
      :type="userDialog.type"
      :modleForm="userDialog.modleForm"
      :close="userDialog.close"
      @confirm="userDialog.confirm"
    />
  </div>
</template>

<script>
import baseTable from "@/components/baseTable";
import baseUserDialog from "@/components/baseDialog/src/baseUserDialog";
export default {
  name: "userSys",
  components: {
    baseTable,
    baseUserDialog
  },
  data() {
    return {
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
          label: "角色",
          prop: "roleName",
          align: "center"
        },
        {
          label: "操作",
          align: "center",
          buttonList: [
            {
              icon: "iconfont icon-edit",
              handleClick: this.handleEditClick
            },
            {
              icon: "iconfont icon-delete",
              handleClick: this.handleDelClick
            },
            {
              icon: "iconfont icon-resetpwd",
              handleClick: this.handleResetPWDClick
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
      userDialog: {
        visible: false,
        title: "",
        type: "",
        modleForm: {},
        close: () => {
          this.userDialog.visible = false;
        },
        confirm: this.confirm
      },
      hasIndex: true,
      border: true,
      total: 1,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    handleAddClick() {
      this.userDialog.visible = true;
      this.userDialog.title = "新增用户";
      this.userDialog.modleForm = {};
      this.userDialog.type = "add";
    },
    handleEditClick(idnex, row) {
      this.userDialog.visible = true;
      this.userDialog.title = "编辑用户";
      this.userDialog.modleForm = { ...row };
      this.userDialog.type = "";
    },
    handleDelClick(index, row) {
      this.$confirm("该操作无法回退，确定删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.userAPI
            .delUser({
              userId: row.userId
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
            });
        })
        .catch(() => {});
    },
    handleResetPWDClick(index, row) {
      this.$confirm("该操作无法回退，确定重置该用户的密码吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.userAPI
            .initPwd({
              userId: row.userId
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("重置成功，新密码为6个8！");
              } else {
                this.$message.error("重置失败！");
              }
            })
            .catch(err => {
              this.$message.error("请求错误！");
            });
        })
        .catch(() => {});
    },
    confirm() {
      if (
        this.userDialog.modleForm["userName"] &&
        this.userDialog.modleForm["name"]
      ) {
        if (this.userDialog.type === "add") {
          const len = this.tableData.filter(ele => {
            return ele.userName == this.userDialog.modleForm.userName;
          }).length;
          if (!len) {
            this.$api.userAPI
              .addSysUser(this.userDialog.modleForm)
              .then(res => {
                if (res.data.code == 200) {
                  this.$message.success("添加成功！");
                } else {
                  this.$message.error("添加失败！");
                }
                this.userDialog.visible = false;
                this.Init();
              })
              .catch(err => {
                this.$message.error("请求错误！");
              });
          }
        } else {
          this.$api.userAPI
            .updateUserInfo(this.userDialog.modleForm)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("更新成功！");
              } else {
                this.$message.error("更新失败！");
              }
              this.userDialog.visible = false;
              this.Init();
            })
            .catch(err => {
              this.$message.error("请求错误！");
            });
        }
      } else {
        this.$message.error("用户名或姓名不能为空");
      }
    },
    getList() {
      let params = {
        page: this.currentPage,
        limit: this.pageSize
      };
      this.$api.userAPI
        .getSysUserInfo(params)
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          this.$message.error("请求错误！");
        });
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    Init() {
      this.getList();
    }
  },
  mounted() {
    this.Init();
  }
};
</script>

<style>
</style>