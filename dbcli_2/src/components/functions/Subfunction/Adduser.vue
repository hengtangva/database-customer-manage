<template>
  <div>
    <el-form>
      <el-form ref="form" :model="form" label-width="80px" >

        <el-form-item label="用户编号">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>

        <el-form-item label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="电话号码">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>

      </el-form>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Adduser",
    data(){
      return{
        form: {
          userId: '',
          username: '',
          tel: ''
        },
      }
    },
    methods: {
      onSubmit(){
        console.log(this.form);
        this.userList.push(this.form);
      },
      //
      async getUserList() {
        console.log('userList');
      }
    }
  }
</script>

<style scoped>

</style>