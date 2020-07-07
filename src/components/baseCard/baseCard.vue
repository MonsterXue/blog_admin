<template>
  <div class="baseCard">
    <el-row>
      <el-col class="card_item" v-for="(item, index) in cardList" :key="index" :span="item.span">
        <div class="icon_wrapper" :style="{backgroundColor: item.bgmColor}">
          <i :class="item.icon" class="iconfont"></i>
        </div>
        <div class="right">
          <div class="num">{{item.num}}</div>
          <div class="title">{{item.title}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "baseCard",
  props: {
    cardList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.baseCard {
  margin-bottom: 50px;
}
.card_item {
  width: 255px;
  height: 110px;
  border: #f0f2f5 6px solid;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  .icon_wrapper {
    height: 100%;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .iconfont {
    font-size: 30px;
    color: #FFF;
  }
  .right {
    width: 100%;
    text-align: center;
    .num {
      font-size: 40px;
      line-height: 70px;
    }
    .title {
      font-size: 14px;
    }
  }
}
</style>