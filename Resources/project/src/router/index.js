import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/components/Student'
import Driver from '@/components/Driver'
import Verify from '@/components/Verify'
import WarningForm from '@/components/WarningForm'
import LoginPage from '@/components/LoginPage'
import AdminPage from '@/components/AdminPage'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/student',
            name: 'Student',
            component: Student,
        },
        {
            path: '/driver',
            name: 'Driver',
            component: Driver,
        },
        {
            path: '/verification',
            name: 'Verify',
            component: Verify,
        },
        {
            path: '/warningform',
            name: 'WarningForm',
            component: WarningForm,
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage,
            meta: {auth: true}
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
            beforeEnter: (to, from, next) => {
                const userData = JSON.parse(localStorage.getItem("user"))
                const token = userData.token
                if (token) {
                    next({ path: '/admin' });
                } else {
                    next();
                }
            }
        },
    ]
})