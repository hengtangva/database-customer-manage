import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Main from "../components/Main";
import Register from "../components/Register";
import UserManage from "../components/functions/UserManage";
import AfterSold from "../components/functions/AfterSold";
import ExerciseManage from "../components/functions/ExerciseManage";
import ComplainManage from "../components/functions/ComplainManage";
import Welcome from "../components/functions/Welcome";
import NewFeedBack from "../components/functions/NewFeedBack";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:'/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'数据库课程设计'
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: '/main/welcome',
    meta:{
      title:'数据库课程设计'
    },
    children: [
        {
          path: '/main/welcome',
          component: Welcome,
          meta:{
            title:'数据库课程设计'
          },
        },
      {
        path: '/main/user',
        name: 'user',
        component: UserManage,
        meta:{
          title:'数据库课程设计'
        },
      },
      {
        path: '/main/exercise',
        component: ExerciseManage,
        meta:{
          title:'数据库课程设计'
        },
      },
      {
        path: '/main/sold',
        component: AfterSold,
        meta:{
          title:'数据库课程设计'
        },
      },
      {
        path: '/main/complain',
        component: ComplainManage,
        meta:{
          title:'数据库课程设计'
        },
      },
      {
        path: '/main/feedback',
        component: NewFeedBack,
        meta:{
          title:'数据库课程设计'
        },
      }
    ]
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
      meta:{
          title:'数据库课程设计'
      },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

//挂载路由导航守卫

//作用是，如果不是通过登陆进入主界面，而是直接输入主界面的url则强制返回login界面，进行登陆
//判断方法是，通过window.sessionStorage.setItem('token')里面的token是否存在
//这里的token，是登陆成功时，服务器返回的token，把它放在客户端session中的

/*router.beforeEach((to,from,next) => {
  //to 表示将要访问的路径，from代表从哪个路径来，
  //next 表示放行
  //next() 放行   next（'/login') 强制跳转

  if(to.path === '/login') return next() //放行
  //获取token
  const tokenStr = window.sessionStorage.setItem('token')
  if(!tokenStr) return next('/login')//强制跳转
 })*/

export default router
