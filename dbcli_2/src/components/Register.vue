<template>
  <el-form ref="form" :model="Form" label-width="80px" class="bodyreg">

      <el-form-item label="用户id">
        <el-input v-model="Form.userId" disabled>
        </el-input>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="Form.username " disabled>
        </el-input>
      </el-form-item>

      <el-form-item label="投诉内容">
        <el-input v-model="Form.complain" disabled>
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
          username: 'th',
          userId: '',
          complain:'',
          answer: '',
        }
      }
    },
    methods: {
     async onSubmit() {
        const {data: res} = await this.$http.post('url',data);//发送请求，更新
        if(res.meta.status !== 200) {
          this.$message({
            type: 'error',
            message: '提交失败',
            showClose: true
          })
          return
        }
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