<template>
  <div class="barCharts">
    <el-select v-model="month" class="month_select" @change="monthChange">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div id="barChart"></div>
  </div>
</template>

<script>
export default {
  name: "barCharts",
  data() {
    return {
      options: [],
      month: new Date().getMonth() + 1,
      series: [],
      barData: [],
      xData: [],
      userList: [],
      charts: null
    };
  },
  methods: {
    drawBar(id) {
      this.charts = this.echarts.init(document.getElementById(id));
      this.charts.clear();
      this.charts.setOption({
        title: {
          text: "本月活跃用户",
          left: "40%"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          show: true,
          right: "10%"
        },
        xAxis: {
          type: "category",
          data: this.xData
        },
        yAxis: {
          type: "value"
        },
        series: this.series
      });
    },
    getBarData() {
      this.$api.homePageAPI
        .getActiveUser({
          currentTime: this.month
        })
        .then(res => {
          if (res.data.code == 200) {

            this.series = [];
            this.userList = [];
            this.barData = [];
            this.xData = [];

            if (res.data.data.length) {
              res.data.data.forEach((ele, index) => {
                ele.data = ele.data.split(",");
                ele.userName = ele.userName.split(",");
                this.xData.push(ele.date);
              });

              this.barData = res.data.data;

              this.userList.push(this.barData[0].userName[0]);

              this.barData.forEach((ele, index) => {
                ele.userName.forEach(item => {
                  let userIndex = this.userList.indexOf(item);
                  if (userIndex == -1) {
                    this.userList.push(item);
                  }
                });
              });

              this.userList.forEach(ele => {
                this.series.push({
                  data: [],
                  type: "bar",
                  name: ele
                });
              });

              this.barData.forEach((ele, itemIndex) => {
                this.series.forEach((item, sindex) => {
                  let index = ele.userName.findIndex(p => {
                    return p == item.name;
                  });
                  if (index == -1) {
                    this.series[sindex].data.push("0");
                  } else {
                    this.series[sindex].data.push(ele.data[index]);
                  }
                });
              });
            }

            this.drawBar("barChart");
          }
        });
    },
    monthChange(val) {
      this.month = val;
      this.getBarData();
    }
  },
  mounted() {
    for (let i = 1; i <= 12; i++) {
      this.options.push({
        label: i + "月",
        value: i
      });
    }
    this.getBarData();
  }
};
</script>

<style lang="scss">
#barChart {
  height: 400px;
}
</style>