<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: './' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>培训信息管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter = '20'>
        <el-col :span = '7'>
          <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @click="getTrainList">
            <el-button slot="append" icon="el-icon-search" @click="getTrainList"></el-button>
          </el-input>
        </el-col>
        <el-col :span = '4'>
          <el-button type = "primary" @click = "addDialogVisible = true">添加培训人员</el-button>
        </el-col>
      </el-row>
      <!--这里时显示用户信息的部分-->
      <el-table :data = 'trainList' stripe> <!--绑定数据为，trainList-->

        <!--索引列-->
        <el-table-column  type="index"></el-table-column>
        <!--这里我就写两个作为样例了，具体展示多少信息，可以自己设置，或者再一起讨论-->
        <el-table-column label = '培训对象编码' >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '培训对象名称'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '提醒状态'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.reminded}}</span>
          </template>
        </el-table-column>

        <!--这里是对用户信息的修改删除-->
        <el-table-column label = '操作'>
          <template slot-scope="scope">     <!--scope用来接收数据-->
            <!--修改-->

            <el-tooltip effect="dark" content="修改信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="showEdit(scope.row.userId)"></el-button><!--传入参数为用户id-->
            </el-tooltip>

            <!--提醒-->
            <el-tooltip effect="dark" content="提醒用户" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-bell" @click="remind(scope.row.userId)"></el-button><!--传入参数为用户id-->
            </el-tooltip>

            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false" >
              <el-button type="danger" icon="el-icon-delete" @click="removeTrain(scope.row.userId)"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>

      <!--分页区域-->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="queryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-card>

    <!--添加用户对话框-->
    <el-dialog
            title = "添加培训记录"
            @close="addDialogClosed"
            :visible.sync = "addDialogVisible"
            width = "30%">
      <el-form ref="form" :model="form" label-width="80px" >

        <el-form-item label="培训对象编号">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>

        <el-form-item label="培训对象名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="提醒状态">
          <el-input v-model="form.reminded" disabled></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>


      </el-form>
      <span slot = "footer" class = "dialog-footer">
        <el-button type="primary" @click="addDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!--修改用户的对话框-->
    <el-dialog
            title="修改培训信息"
            :visible.sync="editDialogVisible"
            width="50%">

      <el-form :model = 'editForm'
               ref    = 'editFormRef'
               label-width = '70px'>
        <el-form-item label="培训对象编号">
          <el-input v-model="editForm.userId" disabled>
          </el-input>
        </el-form-item>

        <el-form-item label="培训对象名称">
          <el-input v-model="editForm.username">
          </el-input>
        </el-form-item>

        <el-form-item label=提醒状态>
          <el-input v-model="editForm.reminded"  disabled>
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ExerciseManage',
    data(){
      return{
        queryInfo: {
          query: '',
          pageNum: '',
          pageSize: '',
        },
        trainList: [//发送网络请求时，请直接把所有的用户信息都返回给我
          {
            userId: '001',
            username: 'th',
            reminded: '未提醒'
          },
          {
            userId: '007',
            username: 'kobe',
            reminded: '未提醒'
          }
        ],
        addDialogVisible: false, //控制添加用户信息对话框的显示和隐藏

        form: {
          userId: '',
          username: '',
          reminded: '未提醒'
        },   //添加用户所需要填写的表单

        editDialogVisible: false,//控制修改用户信息对话框的显示和隐藏

        editForm: {},            //填写修改用户信息的表单，数据库请求到该id的信息后显示在对话框上，供管理员修改
      }
    },
    created() {//这里的vue实例创建，即进入UserManage时，就向服务器发送网络请求，获取用户列表
      //this.getUserList()//该方法见methods

      this.getTrainList()
    },
    methods: {
      async remind(id){
        let n;
        for (n in this.trainList) {
          if(this.trainList[n].userId == id){
            if(this.trainList[n].reminded == '未提醒'){
              this.trainList[n].reminded = '已提醒'
            }else{
              this.trainList[n].reminded = '未提醒'
            }

            await this.$http.post(
                'a.general', {type: "edit_train_info", info: this.trainList[n]}
            );

            this.getTrainList()

            return
          }
        }

      },
      reset() {
        this.$refs.form.resetFields()
      },
      //提交添加内容，
      // 这里我是直接把添加的用户信息直接append到userList中作为测试
      //具体实现，请更新到数据库
      async onSubmit() {
        console.log(this.form);
        //this.trainList.push(this.form)

        const {data: {feedback:feedbackInfo}} =
            await this.$http.post('a.general', {type: "add_train_info", info: this.form});

        if(feedbackInfo.length === 0) {
          this.$message.success("成功添加")
        }else{
          this.$message.error(feedbackInfo)
        }

        this.getTrainList()
      },

      //展示用户编辑的对话框，来进行修改用户信息，这里请发送请求获取用户id
      showEdit(id) {
        //这里是我没直接用data里面的userList进行测试
        let n;
        for (n in this.trainList) {
          //如果点击edit按钮后，传入的id和userList某一行相同，就将改条记录给editForm
          if (this.trainList[n].userId === id) {
            this.editForm = this.trainList[n]
          }
        }
        this.editDialogVisible = true
      },

      //监听修改对话框关闭事件，这里关闭后，提交，更新数据到数据库
      async editUpdate() {
        const {data: {feedback:feedbackInfo}} = await this.$http.post(
            'a.general', {type: "edit_train_info", info: this.editForm}
        );

        if(feedbackInfo.length === 0) {
          this.$message.success("成功修改")
        }else{
          this.$message.error(feedbackInfo)
        }

        this.editDialogVisible = false // 关闭对话框

        this.getTrainList()
      },

      //监听添加用户对话框关闭事件
      addDialogClosed() {
        this.$refs.form.resetFields()
      },

      //根据id删除用户
      async removeTrain(id) {
        const confirmResult = await this.$confirm('此操作将永久删除该条培训记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => {
          return err
        })

        console.log(confirmResult)
        //如果用户确认删除，返回字符串confirm
        //如果用户点击取消，返回字符串cancel
        if (confirmResult !== 'confirm') {
          return this.$message('已取消')
        }

        await this.$http.post('a.general',{type:"delete_train_info",id:id})

        this.$message.success('删除成功')

        this.getTrainList() //更新用户列表
      },


      //网络请求请获得用户记录在下面函数里实现，具体是实现对用户列表userList和数据库里面的数据进行双向绑定

      //从数据库获取记录result，并更新到userList，返回来的result是一个对象数组
      async getTrainList() {
        console.log('正在获取培训信息')

        const {data: respondInfo} = await this.$http.post('a.general',{type:"get_train_infos"});

        this.trainList = respondInfo.trainInfos;

        console.log('获得培训信息' + this.trainList.length);
      },

    }
  }
</script>

<style scoped>

</style>