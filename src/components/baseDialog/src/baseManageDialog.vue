<template>
  <div class="baseManageDialog">
    <el-dialog :visible="visible" :title="title" v-on:close="close">
      <span class="current_role">当前角色：{{currentRole}}</span>
      <baseTable
        rowKey="userId"
        :tableRef="tableRef"
        :tableHeaders="tableHeaders"
        :hasCheckBox="true"
        :tableData="tableData"
        :border="true"
        :hasRowSelect="hasRowSelect"
        :total="total"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :layout="layout"
        @pageChange="handlePageChange"
        @tableChoose="tableChoose"
      />
      <containerList :title="'已分配人员（'+ userTotal + '）'" :tagList="tagList" @close="tagDel"/>
      <div class="btn_box">
        <el-button @click="close">取消</el-button>
        <el-button class="deep" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseTable from "@/components/baseTable";
import containerList from "@/components/containerList";
export default {
  name: "baseManageDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {}
    },
    params: {
      type: Object,
      default: () => {}
    },
    hasRowSelect: {
      type: Array,
      default: () => []
    },
    tableRef: {
      type: String,
      default: "userManage"
    },
    title: String,
    currentRole: String
  },
  components: {
    baseTable,
    containerList
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
        }
      ],
      tableData: [],
      currentChecked: [],
      allCheckedSelect: [],
      tagList: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      userTotal: 0,
      layout: "prev, pager, next, jumper"
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.tagList);
    },
    getTableData() {
      let params = {
        limit: 5,
        page: this.currentPage
      };
      this.$api.userAPI
        .getSysUserInfo({
          ...params
        })
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
            this.togglePageSelection();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请求错误！");
        });
    },
    tableChoose(selection, row) {
      if (selection.length > this.currentChecked.length) {
        this.allCheckedSelect.push(row);
        this.tagList.push({
          userId: row.userId,
          name: row.userName
        });
      } else {
        let index = this.allCheckedSelect.findIndex(child => {
          return child["userId"] == row["userId"];
        });
        this.allCheckedSelect.splice(index, 1);

        let hasIndex = this.hasRowSelect.findIndex(ele => {
          return ele["userId"] == row["userId"];
        });
        this.hasRowSelect.splice(hasIndex, 1);

        let tagIndex = this.tagList.findIndex(ele => {
          return ele["userId"] == row["userId"]
        });

        this.tagList.splice(tagIndex, 1);
      }
      this.currentChecked = selection;
    },
    togglePageSelection() {
      if (this.hasRowSelect.length > 0) {
        this.hasRowSelect.forEach(ele => {
          let item = this.allCheckedSelect.find(child => {
            return child["userId"] == ele["userId"];
          });
          let row = this.tableData.find(key => {
            return key["userId"] == ele["userId"];
          });
          if (row && !item) this.allCheckedSelect.push(row);
        });
      }

      this.currentChecked = [];
      this.$nextTick(() => {
        this.$children[0].$children[0].$refs[this.tableRef].clearSelection();
      });
      this.allCheckedSelect.forEach(item => {
        let row = this.tableData.find(key => {
          return key["userId"] == item["userId"];
        });
        if (row) {
          this.currentChecked.push(row);
          this.$nextTick(() => {
            this.$children[0].$children[0].$refs[
              this.tableRef
            ].toggleRowSelection(row);
          });
        }
      });
    },
    tagDel(index) {
      let delTag = this.tagList[index];
      this.tagList.splice(index, 1);
      let curIndex = this.currentChecked.findIndex(ele => {
        return ele["userId"] == delTag.userId
      });
      let delUser = this.allCheckedSelect.find(ele => {
        return ele["userId"] == delTag.userId
      });
      let allIndex = this.allCheckedSelect.findIndex(ele => {
        return ele["userId"] == delTag.userId
      })
      this.currentChecked.splice(curIndex, 1);
      this.allCheckedSelect.splice(allIndex, 1);
      this.$children[0].$children[0].$refs[this.tableRef].toggleRowSelection(delUser);
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.getTableData();
    }
  },
  mounted() {},
  watch: {
    visible: function(newVal, oldVal) {
      if (newVal) {
        this.allCheckedSelect = [];
        this.tagList = JSON.parse(JSON.stringify(this.hasRowSelect));
        this.getTableData();
      }
    },
    tagList: function(newVal, oldVal) {
      this.userTotal = this.tagList.length;
    }
  }
};
</script>

<style lang="scss">
.baseManageDialog {
  .el-dialog {
    width: 660px;
    height: 700px;
    position: relative;
    .el-table__row {
      td {
        padding: 8px 0;
        box-sizing: border-box;
      }
    }
    .btn_box {
      position: absolute;
      bottom: 30px;
      left: 30%;
    }
  }
}
</style>