import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import Page404 from './views/Page404.vue'
import Loading from './views/Loading.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading
    },
    {
      path: '/404',
      name: '404',
      component: Page404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
})
