<template>
  <el-container class="main-container">
    <el-header>
      <div>
        <img>
        <span style="color:#fff">客户关系管理系统</span>
      </div>
      <div id="outButton">
      <el-button type="info" @click="logout">退出登陆</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--侧边导航栏-->
        <el-menu
                router
                :default-active = '$route.path'
                class="el-menu-vertical-demo"
                active-text-color="#409eff"
        >
          <el-menu-item index = '/main/user'>
              <i class="el-icon-user"></i>
              <span slot="title">客户资料管理</span>
          </el-menu-item>
          <el-menu-item index = '/main/exercise'>
            <i class="el-icon-menu"></i>
            <span slot="title">培训管理</span>
          </el-menu-item>
          <el-menu-item index = '/main/sold' >
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">售后服务管理</span>
          </el-menu-item>
          <el-menu-item index = '/main/complain'>
            <i class="el-icon-edit-outline"></i>
            <span slot="title">投诉与反馈管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: 'Main',
    methods: {
      logout(){//退出登录,返回登陆页
        this.$router.push('/');
      },
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .main-container {
    height: 100%;
  }

  #outButton{

  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 450px;
  }
</style>
