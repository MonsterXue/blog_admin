<script>
export default {
  name: "baseSearch",
  props: {
    searchData: {
      type: Array,
      default: () => []
    },
    modelSearch: {
      type: Object,
      default: () => {}
    },
    searchWidth: {
      type: Number,
      default: 400
    }
  },
  methods: {
    renderFormItem(item) {
      const { modelSearch, searchWidth } = this;
      const {
        type,
        label,
        prop,
        placeholder,
        buttonList,
        handleClick,
        options
      } = item;
      if (item.type === "input") {
        return (
          <div class="searchInput" style={{ width: searchWidth + "px" }}>
            <span domPropsInnerHTML={label}></span>
            <el-input
              v-model={modelSearch[prop]}
              placeholder={placeholder}
            ></el-input>
          </div>
        );
      } else if (
        item.type === "button" &&
        item.buttonList &&
        item.buttonList.length
      ) {
        return item.buttonList.map(ele => {
          return (
            <div class="searchBtn">
              <el-button
                type={ele.type}
                icon={ele.icon}
                on-click={e => ele.handleClick(e)}
              >
                {ele.label}
              </el-button>
            </div>
          );
        });
      } else if (item.type === "select") {
        return (
          <div class="searchInput" style={{ width: searchWidth + "px" }}>
            <span domPropsInnerHTML={label}></span>
            <el-select v-model={modelSearch[prop]}>
              {item.options.length &&
                item.options.map(item => {
                  return (
                    <el-option
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    ></el-option>
                  );
                })}
            </el-select>
          </div>
        );
      } else if (item.type === "date-pick") {
        return (
          <div class="searchInput" style={{ width: searchWidth + "px" }}>
          <span domPropsInnerHTML={label}></span>
            <el-date-picker
              v-model={modelSearch[prop]}
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        );
      }
    }
  },
  render(h) {
    const { searchData, renderFormItem } = this;
    return (
      <div class="search_head">
        {searchData.map(item => {
          return renderFormItem(item);
        })}
      </div>
    );
  }
};
</script>

<style lang="scss">
.search_head {
  display: flex;
  flex-flow: wrap;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
  .searchInput {
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
    & > span {
      width: 20%;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .searchBtn {
    margin-right: 10px;
  }
}
</style>