import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { getToken } from '@/utils/auth'
import '@vant/touch-emulator';

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// 设置全局路由守卫
router.beforeEach((to, from, next) => {
  const token = getToken()
  // const token = store.getters['user/token']
  if (token) {
    // console.log(store);
    next()
  } else {        // 没有token 
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
      
  }
})

// 创建事件总线   就相当于创建了一个新的vue实例
const bus = new Vue()
// 把bus挂载到了Vue的原型上, 保证所有的组件都能通过 this.$bus访问到事件总线
Vue.prototype.$bus = bus


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
