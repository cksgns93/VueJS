import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from '../components/Home.vue'
import NotFound from '../components/NotFound.vue'
import SignUp from '../components/user/SignUp.vue'
import Login from '../components/user/Login.vue'
import Logout from '../components/user/Logout.vue'
import UserList from '../components/user/UserList.vue'

Vue.use(VueRouter); //VueRouter를 미들웨어로 사용하겠다고 명시

export default new VueRouter({
    mode:'history',
    base:'/',
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home
        },
        {
            path:'/signup',
            name:'SignUp',
            component:SignUp
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {
            path:'/logout',
            name:'Logout',
            component:Logout
        },
        {
            path:'/users',
            name:'UserList',
            component:UserList
        },
        {
            path:'*',
            component:NotFound
        }
    ]
})