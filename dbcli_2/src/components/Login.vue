<template>
  <div class="login_container">

    <div class="loginin_box">
      <!--这里是实现粒子动画效果，不需要改动-->
      <vue-particles
              color="#00ffff"
              :particleOpacity="0.7"
              :particlesNumber="100"
              shapeType="circle"
              :particleSize="4"
              linesColor="#00ffff"
              :linesWidth="1"
              :lineLinked="true"
              :lineOpacity="0.4"
              :linesDistance="150"
              :moveSpeed="3"
              :hoverEffect="true"
              hoverMode="grab"
              :clickEffect="true"
              clickMode="push"
              class="atom"
      >
      </vue-particles>
      <h4>客户关系管理系统</h4>
    <el-row type="flex" justify="center" >
      <!--//这里的:model绑定的user 为表单对象，发送网络请求时，请把它做为参数-->
      <el-form ref="loginForm" :model="user"  status-icon label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="user.name" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="user.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="register">投诉</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      login() {
        this.$refs.loginForm.validate(async (valid) => {//表单的验证,,,async(valid),异步
          if (valid) {

            //发送网络请求，
            const {data: res} = await this.$http.post('login.do',this.user);
            if(res.meta.status !== 200){
              this.$message({
                type: 'error',
                message: '用户名或密码错误',
                showClose: true
              })
              return
            }
            console.log('登陆成功');
            window.sessionStorage.setItem('token',res.data.token);//将token保存在sessionStorage中，供访问权限

            this.$notify({
              type: 'success',
              message: '欢迎你,' + this.user.name + '!',
              duration: 3000
            })
            await this.$router.replace('/main')//跳转到主界面
          } else {
            return false
          }
        })
      },
      register() {
        this.$router.push('/register')
      }
    },
    data() {
      return {
        user: {
          name: 'admin',
          pass: '123'
        },
      }
    }
  }
</script>

<style scoped>

  .loginin_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .login_container {
    background-image: url("../assets/background/bac3.jpg");
    height: 100%;
    background-size: 100% 100%;
    position: fixed;
    width: 100%
  }
  .el-row {
    position: absolute;
    left: 40%;
    top: 60%;
    transform: translate(-50%,-50%);
  }
  h4{
    position: absolute;
    top: 5%;
    left: 35%;
  }
</style>