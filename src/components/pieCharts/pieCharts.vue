<template>
  <div class="pieCharts">
    <el-select v-model="month" class="month_select" @change="monthChange">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div id="pieChart"></div>
  </div>
</template>

<script>
export default {
  name: "pieCharts",
  data() {
    return {
      options: [],
      month: new Date().getMonth() + 1
    };
  },
  methods: {
    drawPie(id) {
      this.charts = this.echarts.init(document.getElementById(id));
      this.charts.clear();
      this.charts.setOption({
        title: {
          text: "本月用户访问来源",
          top: "5%",
          left: "40%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        legend: {
          show: true,
          orient: "vertical",
          left: "10%",
          top: "5%"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["55%", "50%"],
            data: this.chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    monthChange(val) {
      this.month = val;
      this.getPieData();
    },
    getPieData() {
      this.$api.homePageAPI
        .getSourceVisit({
          currentTime: this.month
        })
        .then(res => {
          if (res.data.code == 200) {
            this.chartData = [];
            res.data.data.forEach(ele => {
              this.chartData.push({
                value: ele.num,
                name: ele.roleName
              });
            });
            this.drawPie("pieChart");
          }
        });
    }
  },
  mounted() {
    for (let i = 1; i <= 12; i++) {
      this.options.push({
        label: i + "月",
        value: i
      });
    }
    this.getPieData();
  }
};
</script>

<style lang="scss">
#pieChart {
  height: 400px;
}
</style>