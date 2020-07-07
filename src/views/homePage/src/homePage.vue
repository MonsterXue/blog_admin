<template>
  <div class="homePage">
    <baseCard :cardList="cardList" />
    <el-row>
      <el-col :span="10">
        <pieCharts ref="pieChart" />
      </el-col>
      <el-col :span="14">
        <barCharts ref="barChart" />
      </el-col>
    </el-row>
    <lineCharts ref="lineChart" />
  </div>
</template>

<script>
import baseCard from "@/components/baseCard";
import barCharts from "@/components/barCharts";
import lineCharts from "@/components/lineCharts";
import pieCharts from "@/components/pieCharts";
import { dateFormat } from "@/utils/common";
export default {
  name: "homePage",
  components: {
    baseCard,
    barCharts,
    lineCharts,
    pieCharts
  },
  data() {
    return {
      cardList: [
        {
          title: "文章总数",
          num: 0,
          span: 12,
          icon: "icon-addPage",
          bgmColor: "#2D8CF0"
        },
        {
          title: "用户总数",
          num: 0,
          span: 12,
          icon: "icon-addUser",
          bgmColor: "#9A66E4"
        }
      ]
    };
  },
  methods: {
    
  },
  mounted() {
    this.$api.homePageAPI.getCardData().then(res => {
      if (res.data.code == 200) {
        res.data.data.forEach((ele, index) => {
          this.cardList[index].num = ele.num;
        });
      }
    });
  }
};
</script>

<style lang="scss">
</style>