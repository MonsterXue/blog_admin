<template>
  <div class="baseTable">
    <div class="btn_wrapper">
      <el-button
        v-for="(item, index) in topBtnList"
        :key="index"
        :type="item.type"
        :icon="item.icon"
        :class="item.class"
        @click="item.handleClick"
      >{{item.label}}</el-button>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="{
        'background-color': 'rgba(106, 141, 195, 0.05)',
        'height':'54px'        
      }"
      :border="border"
      :height="height"
      :row-key="rowKey"
      :ref="tableRef"
      @select="tableChoose"
    >
      <el-table-column
        v-if="hasIndex"
        :index="handleIndex"
        type="index"
        label="序号"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column v-if="hasCheckBox" type="selection" width="50" align="center"></el-table-column>
      <el-table-column
        v-for="(item, index) in tableHeaders"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
        :formatter="item.formatter"
        header-align="center"
      >
        <template v-slot="scope" v-if="item.label == '操作'">
          <template v-if="item.buttonList && item.buttonList.length">
            <span
              v-for="(key, value) in item.buttonList"
              :key="value"
              class="btnItem"
              :class="key.icon ? key.icon : ''"
              @click="key.handleClick(scope.$index, scope.row)"
            >{{key.name}}</span>
          </template>
          <template v-else-if="scope.row.iconList && scope.row.iconList.length">
            <i
              v-for="(iconItem, iconIndex) in scope.row.iconList"
              :key="iconIndex"
              :class="iconItem.class"
              class="iconfont"
              @click="iconItem.handleClick(scope.$index, scope.row)"
            ></i>
            <span>{{scope.row[item.prop]}}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      :layout="layout"
      @sizeChange="handleSizeChange"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import pagination from "@/components/pagination";
export default {
  name: "baseTable",
  props: {
    tableHeaders: {
      //表格头
      type: Array,
      default: () => []
    },
    tableData: {
      //表格数据
      type: Array,
      default: () => []
    },
    hasIndex: {
      type: Boolean,
      default: false
    },
    handleIndex: {
      type: Function,
      default: index => {
        return index + 1;
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    hasCheckBox: {
      type: Boolean,
      default: false
    },
    topBtnList: {
      type: Array,
      default: () => []
    },
    hasRowSelect: {
      type: Array,
      default: () => []
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper"
    },
    currentPage: Number, // 当前页码
    pageSize: Number, // 每页条数
    total: Number, // 总数
    height: String,
    rowKey: String,
    tableRef: String
  },
  components: {
    pagination
  },
  methods: {
    tableChoose(selection, row) {
      this.$emit("tableChoose", selection, row);
    },
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    handlePageChange(val) {
      this.$emit("pageChange", val);
    }
  }
};
</script>

<style lang="scss">
.baseTable {
  margin-top: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  .btn_wrapper {
    margin: 20px 0;
    .addBtn {
      background: rgba(15, 76, 129, 1);
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      &:hover {
        background-color: rgba(15, 76, 129, 1);
        color: rgba(255, 255, 255, 1);
      }
      &:focus {
        background-color: rgba(15, 76, 129, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .btnItem {
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(106, 141, 195, 1);
    cursor: pointer;
    margin-left: 12px;
  }
  .iconfont {
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
  }
  .icon-edit {
    color: #409eff;
  }
  .icon-delete {
    color: #f56c6c;
  }
  .icon-auth {
    color: #87d5ad;
  }
  .icon-manage {
    color: #386998;
  }
  .icon-resetpwd {
    color: #27408b;
  }
}
</style>