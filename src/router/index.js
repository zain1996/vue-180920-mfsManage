// 模版引入
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import passwordEdit from '@/components/passwordEdit'
import main from '@/components/main'
import list from '@/components/list'
import UserAdd from '@/components/UserAdd'
import UserList from '@/components/UserList'
import UserEdit from '@/components/UserEdit'
import Log from '@/components/Log'
import add from '@/components/add'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

// vue注册事件
Vue.use(Router)

// 路由表
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect: '/list',
      children:[
        {
          path: '/list',
          name: 'list',
          component: list,
        },
        {
          path: '/UserList',
          name: 'UserList',
          component: UserList
        },
        {
          path: '/Log/:project_id/:time',
          name: 'Log',
          component: Log
        }
      ]
    },
    {
      path: '/passwordEdit',
      name: 'passwordEdit',
      meta: {
        requireAuth: true
      },
      component: passwordEdit
    }
  ]
});

// 全局路由钩子
router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.login) {
      if(to.name == 'login'){
        next({
          path: '/list',
        })
      }
      else{
        next();
      }
    }
    else {
      if(to.name == 'login'){
        next();
      }
      else{
        next({
          path: '/login',
        })
      }
    }
  }
  else {
    next();
  }
});

// 导出
export default router;


