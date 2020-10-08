<template>
  <el-form ref="form" :model="Form" label-width="80px" class="bodyreg">

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
          telephone: '',
          complainTitle:'',
          complain:''
        }
      }
    },
    methods: {
     async onSubmit() {
       const {data: {feedback:feedbackInfo}} =await this.$http.post(
            'a.general',{type:"submit_complain",complain:this.Form}
        );//发送请求，更新

       if(feedbackInfo.len===0) {
         this.$message({
           type: 'success',
           message: '提交成功',
           showClose: true
         })
       }else{
         this.$message.error(feedbackInfo)
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