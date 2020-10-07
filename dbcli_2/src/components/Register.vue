<template>
  <el-form ref="form" :model="Form" label-width="80px" class="bodyreg">

      <el-form-item label="用户名">
        <el-input v-model="Form.username ">
        </el-input>
      </el-form-item>

    <el-form-item label="联系电话">
      <el-input v-model="Form.telephone">
      </el-input>
    </el-form-item>

      <el-form-item label="投诉标题">
        <el-input v-model="Form.complainTitle">
        </el-input>
      </el-form-item>

    <el-form-item label="投诉内容">
      <el-input type="textarea" autosize v-model="Form.complain">
      </el-input>
    </el-form-item>

    <el-button type="primary" @click="onSubmit">提交<i class="el-icon-upload el-icon--right"></i></el-button>

  </el-form>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        Form: {
          username: '',
          telephone:'',
          complainTitle:'',
          complain:''
        }
      }
    },
    methods: {
     async onSubmit() {
        await this.$http.post(
            'a.general',{type:"submit_complain",info:this.Form}
        );//发送请求，更新

       this.$message({
         type: 'success',
         message: '提交成功',
         showClose: true
       })
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