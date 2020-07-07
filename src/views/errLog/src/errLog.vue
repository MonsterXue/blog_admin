<template>
  <div class="errLog">
    <baseSearch :searchData="searchData" :modelSearch="modelSearch" />
    <baseTable
      :tableHeaders="tableHeaders"
      :hasIndex="hasIndex"
      :hasCheckBox="hasCheckBox"
      :tableData="tableData"
      :border="border"
      :total="total"
      :topBtnList="topBtnList"
    />
  </div>
</template>

<script>
import baseSearch from "@/components/baseSearch";
import baseTable from "@/components/baseTable";
export default {
  name: "errLog",
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
          prop: "userRole",
          type: "select",
          options: [
            {
              label: "超级管理员",
              value: "superAdmin"
            }
          ]
        },
        {
          label: "发生时间",
          prop: "happenedTime",
          type: "input"
        },
        {
          type: "button",
          buttonList: [
            {
              label: "查询",
              icon: "el-icon-search",
              type: "primary",
              handleClick: () => {console.log(1)}
            },
            {
              label: "清除",
              icon: "el-icon-refresh",
              type: "warning",
              handleClick: () => {console.log(2)}
            }
          ]
        }
      ],
      tableHeaders: [
        {
          label: "用户名",
          prop: "userName",
          align: "center",
          width: "120"
        },
        {
          label: "姓名",
          prop: "name",
          align: "center",
          width: "120"
        },
        {
          label: "用户角色",
          prop: "userRole",
          align: "center",
          width: "120"
        },
        {
          label: "发生时间",
          prop: "happenedTime",
          align: "center",
          width: "200"
        },
        {
          label: "日志信息",
          prop: "logInfo"
        },
        {
          label: "IP地址",
          prop: "ipAddr",
          align: "center",
          width: "120"
        },
        {
          label: "操作",
          align: "center",
          width: "120",
          buttonList: [
            {
              icon: "iconfont icon-delete"
            }
          ]
        }
      ],
      tableData: [
        {
          userName: "xjl",
          name: "xjl",
          userRole: "超级管理员",
          ipAddr: "127.0.0.1",
          happenedTime: "2020-4-15 14:03:00",
          logInfo: "xxxxx"
        }
      ],
      topBtnList: [
        {
          label: "删除",
          icon: "el-icon-delete",
          type: "danger",
          handleClick: () => {}
        }
      ],
      modelSearch: {},
      hasIndex: true,
      hasCheckBox: true,
      border: true,
      total: 1
    };
  }
}
</script>

<style>

</style>