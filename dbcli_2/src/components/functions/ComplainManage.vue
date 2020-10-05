<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: './' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>投诉管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <!--这里设置了两个按钮，分别是处理完的投诉内容，和未处理过得投诉记录-->、
      <el-button type="primary" @click="getComplainList()">待处理投诉</el-button>
      <el-button type="primary" @click="getFinishList()">处理完的投诉</el-button>

      <!--这里时显示用户信息的部分-->
      <el-table :data = 'complainList' stripe> <!--绑定数据为，complainList-->

        <!--索引列-->
        <el-table-column  type="index"></el-table-column>

        <el-table-column label = '用户编码' >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '用户名称'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '投诉内容'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.complain }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '投诉回复'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.answer }}</span>
          </template>
        </el-table-column>

        <!--这里是对用户信息的修改删除-->
        <el-table-column label = '操作'>
          <template slot-scope="scope">     <!--scope用来接收数据-->
            <!--回复投诉-->

            <el-tooltip effect="dark" content="回复投诉" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="showEdit(scope.row.userId)"></el-button><!--传入参数为用户id-->
            </el-tooltip>

            <el-tooltip effect="dark" content="完成处理" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-success" @click="removeUser(scope.row.userId)"></el-button><!--传入参数为用户id-->
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


    <!--回复投诉的对话框-->
    <el-dialog
            title="回复用户投诉"
            :visible.sync="editDialogVisible"
            width="50%">

      <el-form :model = 'editForm'
               ref    = 'editFormRef'
               label-width = '70px'>
        <el-form-item label="用户id">
          <el-input v-model="editForm.userId" disabled>
          </el-input>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="editForm.username " disabled>
          </el-input>
        </el-form-item>

        <el-form-item label="投诉内容">
          <el-input v-model="editForm.complain" disabled>
          </el-input>
        </el-form-item>

        <el-form-item label="处理投诉的回复">
          <el-input v-model="editForm.answer" >
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
    name: "ComplainManage",
    data() {
      return {
        //获取用户列表的参数对象
        queryInfo: {
          query: '',    //搜索用到的关键字
          pageNum: 1,   //当前页数
          pageSize: 2,  //每页显示多少条数据
        },

        //发送网络请求时，请直接把所有的用户信息都返回给我,
        //在添加用户，和修改用户信息时，我的想法是这样的，发送网络请求把要修改的内容传过去，
        //你那边更新数据库内容，然后动态把新的userList再发给我，以达到客户端这边的动态显示修改内容
        complainList: [
          {
            userId: '001',
            username: 'th',
            complain: 'price too high',//这是用户投诉的内容
            answer:'',                 //这是处理投诉回复的内容
          },
          {
            userId: '007',
            username: 'kobe',
            complain: 'quality bad',
            answer:'',
          },
        ],
        total: 0,

        editDialogVisible: false,//控制修改用户信息对话框的显示和隐藏

        editForm: {},            //填写修改用户信息的表单，数据库请求到该id的信息后显示在对话框上，供管理员修改
      }
    },
    created() {//这里的vue实例创建，即进入UserManage时，就向服务器发送网络请求，获取用户列表
      this.getComplainList()//该方法见methods
    },
    methods: {
      handleSizeChange(newSize) {
        console.log(newSize);
        this.queryInfo.pageSize = newSize
      },
      handleCurrentChange(newPage) {
        console.log(newPage);
        this.queryInfo.pageNum = newPage
      },


      //展示用户编辑的对话框，来进行修改用户信息，这里请发送请求获取用户id
      showEdit(id) {
        //这里是我没直接用data里面的userList进行测试
        let n;
        console.log(id);
        for (n in this.complainList) {
          //如果点击edit按钮后，传入的id和complainList某一行相同，就将改条记录给editForm
          if (this.userList[n].userId === id) {
            this.editForm = this.complainList[n]
            console.log(this.complainList[n])
          }
        }
        this.editDialogVisible = true
      },

      //监听修改对话框关闭事件，这里关闭后，提交，更新数据到数据库
      editUpdate() {
        this.editDialogVisible = false // 关闭对话框
        //回复后，请发送网络请求更新到数据库
        //this.$http.get('url',data)
      },



      //根据id删除用户
      async removeUser(id) {
        const confirmResult = await this.$confirm('是否完成该条投诉的回复, ?', '提示', {
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

        //完成回复后，删除界面上的记录
        let n
        console.log(id)
        for (n in this.complainList) {
          if (this.complainList[n].userId === id) {
            this.complainList.splice(n,1)
            console.log(this.complainList[n])
          }
        }

      },


      //网络请求请获得用户记录在下面函数里实现，具体是实现对用户列表complainList和数据库里面的数据进行双向绑定

      //从数据库获取记录result，并更新到complainList，返回来的result是一个对象数组
      async getComplainList() {
        console.log('get')
        //这里的complainlist最后接受的是未回复的 内容，就是answer为空的，
        //管理员回复完后，立即更新到数据库，
        // 管理员可以在界面上点击处理完成按钮，删除界面上处理完的记录就在界面上删除，但不影响数据库中的数据
        /*
        result = get('url')
        if(failed) {//请求失败，
          return this.$message.error('获取用户列表失败')
        }
        //获取成功
        this.complainList = result
      }
    }*/
      },
      async getFinishList() {
        console.log('get')
        //这里的complainlist最后接受的是已经回复的 内容，，

        /*
        result = get('url')
        if(failed) {//请求失败，
          return this.$message.error('获取用户列表失败')
        }
        //获取成功
        this.complainList = result
      }
    }*/
      },


    }
  }
</script>

<style scoped>

</style>