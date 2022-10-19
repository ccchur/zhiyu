import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    
    component: () => import('../views/login/index.vue'),
    meta: {
      isRe: true
    }
  },
  {
    path: '/',
    name: "index",
    redirect: '/home',
    component: () => import('../views/main/index.vue'),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import('../views/main/home/home.vue'),
        meta: {
          keepAlive: true,
          isRe: false
        }
      },
      {
        path: "center",
        naem: "Center",
        component: () => import('../views/main/center/center.vue'),
        meta: {
          keepAlive: false,
          isRe: false
        },
        children: [
          {
            path: 'setting',
            name: 'Setting',
            component: () => import('../views/main/center/center.vue')

          }
        ]
      },
    ]
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/main/publish/publish.vue'),
    meta: {
      isRe: true
    }

  },

]



const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    //scrollBehavior方法接收to，form路由对象
    //第三个参数savedPosition当且仅当在浏览器前进后退按钮触发时才可用
    //该方法会返回滚动位置的对象信息，如果返回false，或者是一个空的对象，那么不会发生滚动
    //我们可以在该方法中设置返回值来指定页面的滚动位置，例如：
    //表示在用户切换路由时让是所有页面都返回到顶部位置
    //如果返回savedPosition,那么在点击后退按钮时就会表现的像原生浏览器一样，返回的页面会滚动过到之前按钮点击跳转的位置，大概写法如下：
    if (savedPosition) {
      return savedPosition
    } 

}
})

export default router
