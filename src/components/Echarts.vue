<template>
  <div ref="line" style="width:200px;height:80px"></div>
</template>

<script>
import echarts from "echarts";
import De from "../pages/BUS/De";

export default {
  props: ["courseList"],
  data() {
    return {
      charts: "",
      list: []
    };
  },
  methods: {
    drawLine() {
      // console.log(this.courseList);
      // console.log(this.list);

      let val = this.courseList.finishingRate.replace(/%/g, "");
      this.list = val.split(",");
      this.charts.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          bottom: "10%",
          width: "80%",
          height: "70%"
        },
        xAxis: {
          axisLine: {
            show: true, //显示与否
            lineStyle: {
              //线条样式
              width: 0,
              type: "solid"
            }
          },
          type: "category"
        },
        yAxis: {
          show: true, //显示与否
          type: "value",
          splitNumber: 5,
          max: 100,
          min: 0
          // data: [20, 40, 60, 80, 100]
          // boundaryGap: [0.2, 0.2]
        },

        series: [
          {
            name: "", // 系列名称
            type: "line", // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
            data: this.list,
            symbolSize: 4, //控制折线图上表示数值的图标的大小
            symbol: "emptyCircle", //控制折线图上表示数值的样式
            itemStyle: {
              normal: {
                color: "#238bbf",
                lineStyle: {
                  color: "#238bbf"
                }
              }
            }
          }
        ]
      });
    },
    detailAction() {
      this.$router.push({ path: "/personageDetail" });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.charts = echarts.init(this.$refs.line);
      this.drawLine();
    });
  },
  watch: {
    courseList: function(val, oldVal) {
      this.drawLine();
    }
  },
  created() {}
};
</script>



<style>
</style>



// option = {
//         "series": [{
//             type: "pie",
//             center: ["50%", "50%"],
//             radius: ["30%", "40%"],
//             hoverAnimation: false,
//             startAngle: 60,
//             data: [{
//                 name: "0-10分钟",
//                 value: 32,
//                 z: 5,
//                 labelLine: {
//                     smooth: true,
//                     length: 30,
//                     length2: 30,
//                     lineStyle: {
//                         type: 'solid',
//                         color: "#4f6078",
//                         width: 1.5
//                     }
//                 },
//                 label: {
//                     color: "#f1f1f2",
//                     formatter: "{b}\n{c}件({d}%)",
//                 },
//                 itemStyle: {     //修改图形的样式
//                     color: {
//                         type: 'linear',
//                         colorStops: [{
//                             offset: 0, color: '#f79c69' // 0% 处的颜色
//                         }, {
//                             offset: 1, color: '#e48f63' // 100% 处的颜色
//                         }],
//                         global: false // 缺省为 false
//                     }
//                 }
//             }, {
//                 name: "",
//                 value: 55,
//                 labelLine: {
//                     show: false,
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 itemStyle: {
//                     color: "#161e2a"
//                 }
//             }]
//         }, {
//             type: "pie",
//             center: ["50%", "50%"],
//             radius: ["50%", "60%"],
//             z: 1,
//             hoverAnimation: false,
//             startAngle: 30,
//             data: [{
//                 name: "10-20分钟",
//                 value: 80,
//                 labelLine: {
//                     length: 30,
//                     length2: 30,
//                     lineStyle: {
//                         color: "#4f6078",
//                         width: 1.5
//                     }
//                 },
//                 label: {
//                     color: "#f1f1f2",
//                     formatter: "{b}\n{c}件({d}%)"
//                 },
//                 itemStyle: {
//                     color: {
//                         type: 'linear',
//                         colorStops: [{
//                             offset: 0, color: '#fcef96' // 0% 处的颜色
//                         }, {
//                             offset: 1, color: '#f9dd29' // 100% 处的颜色
//                         }],
//                         global: false // 缺省为 false
//                     }
//                 }
//             }, {
//                 name: "",
//                 value: 40,
//                 labelLine: {
//                     show: false,
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 itemStyle: {
//                     color: "#161e2a"
//                 }
//             }]
//         },
//         {
//             type: "pie",
//             center: ["50%", "50%"],
//             radius: ["70%", "80%"],
//             hoverAnimation: false,
//             startAngle: 10,
//             data: [{
//                 name: "30分钟以上",
//                 value: 120,
//                 z: 5,
//                 labelLine: {
//                     length: 10,
//                     length2: 30,
//                     lineStyle: {
//                         color: "#4f6078",
//                         width: 1.5
//                     }
//                 },
//                 label: {
//                     color: "#f1f1f2",
//                     formatter: "{b}\n{c}件({d}%)",
//                     fontSize: 12
//                 },
//                 itemStyle: {
//                     color: {
//                         type: 'linear',
//                         colorStops: [{
//                             offset: 0, color: '#0d81fe' // 0% 处的颜色
//                         }, {
//                             offset: 1, color: '#1ac2f3' // 100% 处的颜色
//                         }],
//                         global: false // 缺省为 false
//                     }
//                 }
//             }, {
//                 name: "",
//                 value: 50,
//                 labelLine: {
//                     show: false,
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 itemStyle: {
//                     color: "#161e2a"
//                 }
//             }]
//         }]
//     }

