<template>
  <div class="roleSys">
    <baseTable
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :topBtnList="topBtnList"
      :hasIndex="hasIndex"
      :border="border"
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
    />
    <baseAuthDialog
      :title="authDialog.title"
      :visible="authDialog.visible"
      :dialogRef="authDialog.dialogRef"
      :currentRole="authDialog.currentRole"
      :close="authDialog.close"
      @confirm="authDialog.confirm"
    />
    <baseManageDialog
      :title="manageDialog.title"
      :visible="manageDialog.visible"
      :currentRole="manageDialog.currentRole"
      :params="manageDialog.params"
      :hasRowSelect="manageDialog.hasRowSelect"
      :close="manageDialog.close"
      @confirm="manageDialog.confirm"
    />
    <baseRoleDialog
      :title="roleDialog.title"
      :visible="roleDialog.visible"
      :modelForm="roleDialog.modelForm"
      :close="roleDialog.close"
      @confirm="roleDialog.confirm"
    />
  </div>
</template>

<script>
import baseTable from "@/components/baseTable";
import baseAuthDialog from "@/components/baseDialog/src/baseAuthDialog";
import baseManageDialog from "@/components/baseDialog/src/baseManageDialog";
import baseRoleDialog from "@/components/baseDialog/src/baseRoleDialog";
import { mapState } from "vuex";
export default {
  name: "roleSys",
  components: {
    baseTable,
    baseAuthDialog,
    baseManageDialog,
    baseRoleDialog
  },
  data() {
    return {
      tableHeaders: [
        {
          label: "角色代码",
          prop: "roleCode",
          width: "150"
        },
        {
          label: "角色名称",
          prop: "roleName",
          width: "150"
        },
        {
          label: "状态",
          prop: "status",
          width: "100",
          align: "center",
          formatter: (row, val) => {
            return row.status == "1" ? "已启用" : "未启用";
          }
        },
        {
          label: "已分配人员",
          prop: "userList"
        },
        {
          label: "操作",
          width: "150",
          align: "center"
        }
      ],
      tableData: [
        /* {
          roleCode: "superAdmin",
          roleName: "超级管理员",
          userList: "xjl",
          status: "1",
          iconList: [
            {
              class: "icon-auth",
              handleClick: this.handleAuth
            },
            {
              class: "icon-manage",
              handleClick: this.handleUserManage
            }
          ]
        },
        {
          roleCode: "admin",
          roleName: "管理员",
          userList: "xjl1",
          status: "1",
          iconList: [
            {
              class: "icon-edit",
              handleClick: this.handleEdit
            },
            {
              class: "icon-delete",
              handleClick: this.handleRemove
            },
            {
              class: "icon-auth",
              handleClick: this.handleAuth
            },
            {
              class: "icon-manage",
              handleClick: this.handleUserManage
            }
          ]
        },
        {
          roleCode: "test",
          roleName: "测试人员",
          userList: "xjl3",
          status: "0",
          iconList: [
            {
              class: "icon-edit",
              handleClick: this.handleEdit
            },
            {
              class: "icon-delete",
              handleClick: this.handleRemove
            },
            {
              class: "icon-auth",
              handleClick: this.handleAuth
            },
            {
              class: "icon-manage",
              handleClick: this.handleUserManage
            }
          ]
        } */
      ],
      authDialog: {
        title: "",
        visible: false,
        currentRole: "",
        dialogRef: "menuTree",
        checkedNodes: [],
        roleId: "",
        close: () => {
          this.authDialog.visible = false;
          this.$children[1].$refs.menuTree.setCheckedNodes([]);
        },
        confirm: this.authConfirm
      },
      manageDialog: {
        visible: false,
        title: "",
        currentRole: "",
        params: {},
        hasRowSelect: [],
        roleId: "",
        close: () => {
          this.manageDialog.visible = false;
        },
        confirm: this.manageConfirm
      },
      roleDialog: {
        visible: false,
        title: "",
        type: "",
        modelForm: {},
        close: () => {
          this.roleDialog.visible = false;
        },
        confirm: this.roleConfirm
      },
      topBtnList: [
        {
          label: "新增",
          icon: "el-icon-plus",
          class: "addBtn",
          handleClick: this.handleAddClick
        }
      ],
      hasIndex: true,
      border: true,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    handleAddClick() {
      this.roleDialog.visible = true;
      this.roleDialog.title = "新增角色";
      this.roleDialog.modelForm = { status: "0" };
      this.roleDialog.type = "add";
    },
    handleEdit(index, row) {
      this.roleDialog.visible = true;
      this.roleDialog.title = "编辑角色";
      this.$nextTick(() => {
        this.roleDialog.modelForm = { ...row };
      });
      this.roleDialog.type = "";
    },
    handleRemove(index, row) {
      this.$confirm("该操作无法回退，确认删除该角色？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.roleSys
            .delRole({ roleId: row.roleId })
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("删除成功！");
                this.Init();
              } else {
                this.$message.error("删除失败！");
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
    },
    handleAuth(index, row) {
      this.authDialog.title = "角色授权";
      this.authDialog.visible = true;
      this.authDialog.currentRole = row.roleName;
      this.authDialog.roleId = row.roleId;
      const menuList = [];
      this.$nextTick(() => {
        if (row.roleMenu) {
          const roleMenu = row.roleMenu.split(",");
          roleMenu.forEach(ele => {
            this.$children[1].$refs.menuTree.setChecked(ele, true, false);
          });
        }
      });
    },
    handleUserManage(index, row) {
      this.manageDialog.title = "人员分配";
      this.manageDialog.visible = true;
      this.manageDialog.currentRole = row.roleName;
      this.manageDialog.params = {
        roleId: row.roleId
      };
      this.manageDialog.hasRowSelect = [];
      let nameArr = row.userList.split("、");
      row.userIdList.split(",").forEach((ele, index) => {
        this.manageDialog.hasRowSelect.push({
          userId: ele,
          name: nameArr[index]
        });
      });
      this.manageDialog.roleId = row.roleId;
    },
    authConfirm() {
      const newMenuList = this.$children[1].$refs.menuTree.getCheckedNodes(
        false,
        true
      );
      const newMenuId = this.getMenuId(newMenuList)
        .sort((a, b) => {
          return a - b;
        })
        .join(",");
      this.$api.roleSys
        .updateRoleMenu({
          roleId: this.authDialog.roleId,
          roleMenu: newMenuId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("更新成功！");
            this.Init();
          } else {
            this.$message.error("更新失败！");
          }
          this.authDialog.visible = false;
        })
        .catch(err => {
          this.$message.error("请求错误！");
        });
    },
    manageConfirm(val) {
      const idList = [];
      val.forEach(ele => {
        idList.push(ele.userId);
      });
      this.$api.roleSys
        .updateUserRole({
          userIdList: idList.join(","),
          roleId: this.manageDialog.roleId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("分配成功！");
          } else {
            this.$message.error("分配失败");
          }
          this.manageDialog.visible = false;
          this.Init();
        })
        .catch(err => {
          this.$message.error("请求错误！");
        });
    },
    roleConfirm() {
      this.$children[3].$children[0].$children[0].$refs["formAdd"].validate(
        valid => {
          if (valid) {
            if (this.roleDialog.type == "add") {
              this.$api.roleSys
                .addRole(this.roleDialog.modelForm)
                .then(res => {
                  if (res.data.code == 200) {
                    this.$message.success("添加成功!");
                    this.Init();
                  } else {
                    this.$message.error("添加失败！");
                  }
                  this.roleDialog.visible = false;
                })
                .catch(err => {
                  this.$message.error("请求错误！");
                });
            } else {
              this.$api.roleSys
                .updateRole(this.roleDialog.modelForm)
                .then(res => {
                  if (res.data.code == 200) {
                    this.$message.success("修改成功！");
                    this.Init();
                  } else {
                    this.$message.error("更新失败！");
                  }
                  this.roleDialog.visible = false;
                })
                .catch(err => {
                  this.$message.error("请求错误！");
                });
            }
          } else {
            this.$message.error("表单信息不完整");
          }
        }
      );
    },
    getMenuId(menu) {
      let res = [];
      menu.forEach(ele => {
        res.push(ele.id);
        if (ele.children.length) {
          return [...this.getMenuId(ele.children)];
        }
      });
      return res;
    },
    getList() {
      let params = {
        page: this.currentPage,
        limit: this.pageSize
      };
      this.$store.dispatch("getRoleList");
      this.$api.userAPI.getUserByRole(params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.userList;
          this.total = res.data.data.total;
          this.tableData.forEach(ele => {
            if (ele.roleId == 1) {
              ele["iconList"] = [
                {
                  class: "icon-auth",
                  handleClick: this.handleAuth
                },
                {
                  class: "icon-manage",
                  handleClick: this.handleUserManage
                }
              ];
            } else {
              ele["iconList"] = [
                {
                  class: "icon-edit",
                  handleClick: this.handleEdit
                },
                {
                  class: "icon-delete",
                  handleClick: this.handleRemove
                },
                {
                  class: "icon-auth",
                  handleClick: this.handleAuth
                },
                {
                  class: "icon-manage",
                  handleClick: this.handleUserManage
                }
              ];
            }
          });
        }
      });
    },
    Init() {
      this.getList();
    }
  },
  mounted() {
    let _this = this;
    this.Init();
  },
  computed: {
    ...mapState({
      dataDict: state => state.dataDict
    })
  }
};
</script>

<style lang="scss">
</style>