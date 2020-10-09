<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: './' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>售后服务管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter = '20'>
        <el-col :span = '7'>
          <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @click="getsoldList">
            <el-button slot="append" icon="el-icon-search" @click="getsoldList"></el-button>
          </el-input>
        </el-col>
        <el-col :span = '4'>
          <el-button type = "primary" @click = "addDialogVisible = true">添加考核单</el-button>
        </el-col>
      </el-row>
      <!--这里时显示用户信息的部分-->
      <el-table :data = 'soldList' stripe> <!--绑定数据为，soldList-->

        <!--索引列-->
        <el-table-column  type="index"></el-table-column>

        <el-table-column label = '用户编码' >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '交易单号'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.dealId }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '商品编号'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.goodsId }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '商品销量'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>

        <el-table-column label = '服务质量评分'>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.score }}</span>
          </template>
        </el-table-column>

        <!--这里是对考核单信息的删除-->
        <el-table-column label = '操作'>
          <template slot-scope="scope">     <!--scope用来接收数据-->
            <!--删除-->

            <el-tooltip effect="dark" content="删除考核单" placement="top" :enterable="false" >
              <el-button type="danger" icon="el-icon-delete" @click="removeItem(scope.row)"></el-button>
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
            title = "添加交易记录"
            @close="addDialogClosed"
            :visible.sync = "addDialogVisible"
            width = "30%">
      <el-form ref="form" :model="form" label-width="100px" >

        <el-form-item label="客户编号">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>

        <el-form-item label="交易单号">
          <el-input v-model="form.dealId"></el-input>
        </el-form-item>

        <el-form-item label="商品编号">
          <el-input v-model="form.goodsId"></el-input>
        </el-form-item>

        <el-form-item label="购买数量">
          <el-input v-model="form.quantity"></el-input>
        </el-form-item>

        <el-form-item label="服务质量评分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>


      </el-form>
      <span slot = "footer" class = "dialog-footer">
        <el-button type="primary" @click="addDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "AfterSold",
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
        soldList: [
          {
            userId: '加载中',
            dealId: '',
            score: 0,
            goodsId: '',
            quantity: 0
          }
          // {
          //   userId: '007',
          //   dealId: '332',
          //   score: 80,
          //   goodsId: '002',
          //   quantity:7
          // },
          // {
          //   userId: '009',
          //   dealId: '002',
          //   score: 50,
          //   goodsId: '003',
          //   quantity:10
          // }
        ],
        total: 0,

        addDialogVisible: false, //控制添加用户信息对话框的显示和隐藏

        form: {
          userId: '',
          dealId: '',
          score: '',
          goodsId: ''
        },   //添加用户所需要填写的表单

      }
    },
    created() {
      this.getsoldList()
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
      //重置添加用户的表单信息
      reset() {
        this.$refs.form.resetFields()
      },
      //提交添加内容，
      // 这里我是直接把添加的用户信息直接append到userList中作为测试
      //具体实现，请更新到数据库
      async onSubmit() {
        //console.log(this.form);
        //this.soldList.push(this.form)

        const {data: {feedback:feedbackInfo}} =
            await this.$http.post('a.general', {type: "add_sale_info", info: this.form});

        if(feedbackInfo.length === 0) {
          this.$message.success("成功添加")
        }else{
          this.$message.error(feedbackInfo)
        }

        this.getsoldList()
      },

      //根据id删除用户
      async removeItem(row) {
        const confirmResult = await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
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

        await this.$http.post('a.general',{type:"delete_sale_info",id:row.dealId})

        this.getsoldList() //更新用户列表
      },


      //网络请求请获得用户记录在下面函数里实现，具体是实现对用户列表userList和数据库里面的数据进行双向绑定

      //从数据库获取记录result，并更新到userList，返回来的result是一个对象数组
      async getsoldList() {
        console.log('正在获取销售信息')

        const {data: respondInfo} = await this.$http.post('a.general',{type:"get_sale_infos"});

        this.soldList = respondInfo.soldList;

        console.log('获得销售信息' + this.soldList.length);
      },

    }
  }
</script>

<style scoped>

</style>