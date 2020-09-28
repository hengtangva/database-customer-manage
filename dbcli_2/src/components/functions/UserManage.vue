<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户信息管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter = '20'>
        <el-col :span = '7'>
          <el-input placeholder="请输入搜索内容"  >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span = '4'>
          <el-button type = "primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--这里时显示用户信息的部分-->
      <el-table :data = 'userList' stripe> <!--绑定数据为，userList-->


        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">

              <el-form-item label="电话号码">
                <span>{{ props.row.tel }}</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>

        <!--索引列-->
        <el-table-column  type="index"></el-table-column>
        <!--这里我就写两个作为样例了，具体展示多少信息，可以自己设置，或者再一起讨论-->
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

        <!--这里是对用户信息的修改删除-->
        <el-table-column label = '操作'>
          <template>    <!--    <template slot-scope="scope">  scope用来接收数据-->
            <!--修改-->
            <el-tooltip effect="dark" content="修改信息" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>

            <!--删除-->
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
  export default {
    name: "UserManage",
    data(){
      return{
        queryInfo: {
          query: '',
          pageNum: '',
          pageSize: '',
        },
        userList: [//发送网络请求时，请直接把所有的用户信息都返回给我
          {
            userId: '001',
            username: 'th',
            tel: '110'
          },
          {
            userId: '007',
            username: 'kobe',
            tel: '119'
          }
        ],
        total: 0,
      }
    },
    created() {//这里的vue实例创建，即进入UserManage时，就向服务器发送网络请求，获取用户列表
      //this.getUserList()//该方法见methods
    },
    methods: {


/*      async getUserList() {

        //文档里面为用户的定义信息太多了，感觉可以返回少一点的数据。。。
        const {data: res} = await this.$http.get('url',{params: this.queryInfo})
        if(res.meta.status !== 200) {//请求失败，
          return this.$message.error('获取用户列表失败')
        }
        //获取成功
        this.userList = res.data.users
        this.total = res.data.total
      }*/
    }
  }
</script>

<style scoped>

</style>