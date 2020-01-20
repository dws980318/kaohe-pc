import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import 'element-ui/lib/theme-chalk/index.css'
import './css/reset.css'
import './css/style.css'
Vue.config.productionTip = false
Vue.use(utils)



router.beforeEach((to, from, query) => {
  if (localStorage.getItem('open')) {
    console.log(localStorage.getItem('open'))
    if (localStorage.getItem('open') == 'true') {
      store.commit('setOpen', true)
    } else if (localStorage.getItem('open') == 'false') {
      store.commit('setOpen', false)
    }
  }
  query()
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login') {
//     if (!window.sessionStorage.name) {
//       router.push({name: 'login'})
//     }
//   }
//   next()

// })

router.beforeEach((to, from, next) => {
  const name = sessionStorage.getItem('name')
  const password = sessionStorage.getItem('password')
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (name && password) { // 通过vuex state获取当前的name是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
