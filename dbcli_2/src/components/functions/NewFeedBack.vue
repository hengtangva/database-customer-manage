<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: './' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新品信息反馈</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 评分统计 -->
    <div id="chartmainline" style="width:500px; height:400px; float: left;"></div>
    <!-- 销量统计 -->
    <div id="chartmainbar" style="width:500px; height:400px; float: right"></div>
  </div>
</template>

<script>
  export default {
    name: "NewFeedBack",
    data(){
      return{
        optionline:{
          title:{
            text:'新品平均评分统计'
          },
          tooltip:{},
          legend:{
            data:['商品编号']
          },
          xAxis:{
            data:["001","002","003","004"]//为了方便起见，我们这里就只有4种商品
          },
          yAxis:{

          },
          series:[{
            name:'平均评分',
            type:'line', //设置图表主题
            data:[65,80,93,82]
          }]
        },
        optionbar:{
          title:{
            text:'新品销量统计'
          },
          tooltip:{},
          legend:{
            data:['商品编号']
          },
          xAxis:{
            data:["001","002","003","004"]
          },
          yAxis:{

          },
          series:[{
            name:'销售量',
            type:'bar', //设置图表主题
            data:[4,6,2,7]
          }]
        }
      }
    },
    async mounted() {
      //this.drawLine()

       const{data:{goodIdList:goodIdList, quantityList:quantityList, evaluationList: evaluationList}} =
           await this.$http.post('a.general',{type:"get_analyze_info"});

      this.optionline.xAxis.data = goodIdList;
      this.optionline.series[0].data = evaluationList;

      this.optionbar.xAxis.data = goodIdList;
      this.optionbar.series[0].data = quantityList;

      console.log(goodIdList)
      console.log(quantityList)
      console.log(evaluationList)

      this.drawLine()
    },
    methods: {
      drawLine: function(){
        //基于准本好的DOM，初始化echarts实例
        let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
        let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
        //绘制图表
        chartmainline.setOption(this.optionline);
        chartmainbar.setOption(this.optionbar);
      }
    }

  }
</script>

<style scoped>

</style>