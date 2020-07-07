<template>
  <div class="lineCharts">
    <el-select v-model="month" class="month_select" @change="monthChange">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div id="lineChart"></div>
  </div>
</template>

<script>
export default {
  name: "lineCharts",
  data() {
    return {
      options: [],
      xData: [],
      yData: [],
      month: new Date().getMonth() + 1
    };
  },
  methods: {
    drawLine(id) {
      this.charts = this.echarts.init(document.getElementById(id));
      this.charts.clear();
      this.charts.setOption({
        title: {
          text: "本月网站访问量",
          left: "40%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            smooth: true,
            name: "访问量",
            type: "line",
            data: this.yData
          }
        ]
      });
    },
    getLineData() {
      this.$api.homePageAPI
        .getWebVisitNum({
          currentTime: this.month
        })
        .then(res => {
          if (res.data.code == 200) {
            this.xData = [];
            this.yData = [];
            res.data.data.forEach(ele => {
              this.xData.push(ele.date);
              this.yData.push(ele.num);
            });
            this.drawLine("lineChart");
          }
        });
    },
    monthChange(val) {
      this.month = val;
      this.getLineData();
    }
  },
  mounted() {
    for (let i = 1; i <= 12; i++) {
      this.options.push({
        label: i + "月",
        value: i
      });
    }
    this.getLineData();
  }
};
</script>

<style lang="scss">
#lineChart {
  height: 400px;
}
</style>