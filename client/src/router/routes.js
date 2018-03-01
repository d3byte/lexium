import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Page404 from '../views/Page404.vue'

export default [
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
        path: '/404',
        name: '404',
        component: Page404
    },
    {
        path: '*',
        redirect: '/404'
    }
]