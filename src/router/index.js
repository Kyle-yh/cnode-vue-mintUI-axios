import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Detail from '@/components/detail'
import Login from '@/components/login'
import Mine from '@/components/mine'
import Collect from '@/components/collect'
import Message from '@/components/message'
import Eidt from '@/components/eidt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:Detail
    },
    {
      path:"/login",
      name:'login',
      component:Login
    },{
      path:'/mine',
      name:'mine',
      component:Mine
    },
    {
      path:'/collect',
      name:'collect',
      component:Collect
    },
    {
      path:'/message',
      name:'message',
      component:Message
    },{
      path:"/eidt",
      name:'eidt',
      component:Eidt
    }
  ]
})
