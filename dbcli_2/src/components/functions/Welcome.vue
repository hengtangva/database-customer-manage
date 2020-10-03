<template>
  <div>
  <h2 style="text-align: center">Welcome</h2>
  <template>
    <el-carousel :interval="2000" arrow="always" type="card">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <img v-bind:src="img.url" style= "width: 100%;height: 100%;">
      </el-carousel-item>
    </el-carousel>
  </template>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    data(){
      return{
        imgList:[
          {url:require('../../assets/background/spring.jpg')},
          {url:require('../../assets/background/summer.jpg')},
          {url:require('../../assets/background/autum.jpg')},
          {url:require('../../assets/background/winter.jpg')}
        ]
      }
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
