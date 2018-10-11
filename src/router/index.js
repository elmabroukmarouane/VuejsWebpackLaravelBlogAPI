/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../http'
import store from '../store'
import LayoutLogin from '../layouts/LayoutLogin.vue'
import LayoutApp from '../layouts/LayoutApp.vue'
import Login from '../components/auth/Login.vue'
import Home from '../components/home/Home.vue'
import Post from '../components/posts/Post.vue'
import Register from '../components/auth/Register.vue'

Vue.use(VueRouter)

function requireAuth(to, from, next) {
    if (to.name !== "Login" || to.name !== "Register") {
        if (Object.keys(store.state.user).length !== 0) {
            next();
        } else {
            next({
                path: "/auth/login"
            });
        }
    }
}

const routes = [{
        path: '/',
        component: LayoutApp,
        beforeEnter: requireAuth,
        children: [{
            name: 'Posts List',
            path: '/home',
            component: Home,
        }]
    },
    {
        path: '/',
        component: LayoutApp,
        beforeEnter: requireAuth,
        children: [{
            name: 'Posts Details',
            path: '/post/:id',
            component: Post,
        }]
    },
    {
        path: '/auth',
        component: LayoutLogin,
        children: [{
                name: 'Login',
                path: 'login',
                component: Login
            },
            {
                name: 'Register',
                path: 'register',
                component: Register
            }
        ]
    }
]

export const router = new VueRouter({
    routes
})
export default router