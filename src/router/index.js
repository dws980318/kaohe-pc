import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/index'

import Login from '../pages/login/root.vue'
import Administrator from '../pages/common/Administrator.vue'
import Department from '../pages/common/Department.vue'
import Staff from '../pages/common/Staff.vue'
import Standard from '../pages/common/Standard.vue'
import Assessment from '../pages/common/Assessment.vue'
import Brand from '../pages/common/Brand.vue'
import serve from '../pages/common/Serve.vue'
import personage from '../pages/common/Personage.vue'
import personageDetail from '../pages/common/personageDetail.vue'
import grade from '../pages/common/Grade.vue'
import topic from '../pages/common/Topic.vue'

import addDepartment from '../pages/children/addDepartment.vue'
import redactDepartment from '../pages/children/redactDepartment'
import addAdministrator from '../pages/children/addAdministrator'
import redactAdministrator from '../pages/children/redactAdministrator'
import addStaff from '../pages/children/addStaff'
import redactStaff from '../pages/children/redactStaff'
import addStandard from '../pages/children/addStandard'
import redactStandard from '../pages/children/redactStandard'
import addServe from '../pages/children/addServe'
import redactServe from '../pages/children/redactServe'
import addBrand from '../pages/children/addBrand'
import redactBrand from '../pages/children/redactBrand'
import addAssessment from '../pages/children/addAssessment'
import redactAssessment from '../pages/children/redactAssessment'
import addTopic from '../pages/children/addTopic'
import redactTopic from '../pages/children/redactTopic'




Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/login', name: 'login', component: Login, meta: { keepAlive: false, requireAuth: false } },
        { path: '/department', name: 'department', component: Department, meta: { keepAlive: true, requireAuth: true } },
        { path: '/administrator', name: 'administrator', component: Administrator, meta: { keepAlive: true, requireAuth: true } },
        { path: '/staff', name: 'staff', component: Staff, meta: { keepAlive: true, requireAuth: true } },
        { path: '/standard', name: 'standard', component: Standard, meta: { keepAlive: true, requireAuth: true } },
        { path: '/assessment', name: 'assessment', component: Assessment, meta: { keepAlive: true, requireAuth: true } },
        { path: '/brand', name: 'brand', component: Brand, meta: { keepAlive: true, requireAuth: true } },
        { path: '/serve', name: 'serve', component: serve, meta: { keepAlive: true, requireAuth: true } },
        { path: '/personage/:currentPage', name: 'personage', component: personage, meta: { keepAlive: true, requireAuth: true } },
        { path: '/personageDetail/:mentlist/:val1/:currentPage', name: 'personageDetail', component: personageDetail, meta: { keepAlive: true, requireAuth: true } },
        { path: '/grade', name: 'grade', component: grade, meta: { keepAlive: true, requireAuth: true } },
        { path: '/topic/:name', name: 'topic', component: topic, meta: { keepAlive: true, requireAuth: true } },

        { path: '/addDepartment', name: 'addDepartment', component: addDepartment, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactDepartment', name: 'redactDepartment', component: redactDepartment, meta: { keepAlive: true, requireAuth: true } },
        { path: '/addAdministrator', name: 'addAdministrator', component: addAdministrator, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactAdministrator', name: 'redactAdministrator', component: redactAdministrator, meta: { keepAlive: true, requireAuth: true } },
        { path: '/addStaff', name: 'addStaff', component: addStaff, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactStaff', name: 'redactStaff', component: redactStaff, meta: { keepAlive: true, requireAuth: true } },
        { path: '/addStandard', name: 'addStandard', component: addStandard, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactStandard', name: 'redactStandard', component: redactStandard, meta: { keepAlive: true, requireAuth: true } },
        { path: '/addServe', name: 'addServe', component: addServe, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactServe', name: 'redactServe', component: redactServe, meta: { keepAlive: true, requireAuth: true } },
        { path: '/addBrand', name: 'addBrand', component: addBrand, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactBrand', name: 'redactBrand', component: redactBrand, meta: { keepAlive: true, requireAuth: true } },
        { path: '/addAssessment', name: 'addAssessment', component: addAssessment, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactAssessment', name: 'redactAssessment', component: redactAssessment, meta: { keepAlive: true, requireAuth: true } },
        { path: '/addTopic/:id', name: 'addTopic', component: addTopic, meta: { keepAlive: true, requireAuth: true } },
        { path: '/redactTopic', name: 'redactTopic', component: redactTopic, meta: { keepAlive: true, requireAuth: true } },

        { path: '**', redirect: 'login', meta: { keepAlive: true } }
    ]
})





export default router