<template>
  <el-form ref="form" :model="form" label-width="80px" class="bodyreg">

    <el-form-item label="用户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.region" placeholder="请选择性别">
        <el-option label="男" value="male"></el-option>
        <el-option label="女" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.pass1" type="password"></el-input>
    </el-form-item>
    <el-form-item label="再次输入密码密码">
      <el-input v-model="form.pass2" type="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">注册</el-button>
      <el-button @clikc="reset">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        form: {
          name: 'th',
          sex: '',
          pass1:'',
          pass2: '',
        }
      }
    },
    methods: {
      onSubmit() {
        if(this.form.pass1 != this.form.pass2){
           alert('两次输入密码不一致');
        }
        else {
          //$ajax.request(from.data);//发送网络请求
          console.log('submit!');
        }
      },
      reset(){
        this.$refs.form.resetFields();
      }
    }
  }
</script>

<style scoped>
.bodyreg{
  position: absolute;
  top: 100px;
  left: 340px;
}
</style>