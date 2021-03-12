import Vue from 'vue';
import Router from 'vue-router';
import TravelEvaDetails from '../components/page/TravelEvaDetails.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '供应商登录', requireAuth: true }
        },
        {
            path: '/register',
            component: () => import('../components/page/Register.vue'),
            meta: { title: '供应商注册', requireAuth: true }
        },
        {
            path: '/updatePwd',
            component: () => import('../components/page/UpdatePwd.vue'),
            meta: { title: '修改密码', requireAuth: true}
        },

        {
            path: '/',
            component: () => import( '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [  
                {
                    path: '/dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '系统首页', requireAuth: true }
                },
                {
                    path: '/inlandTravelProducts',
                    component: () => import('../components/page/InlandTravelProducts.vue'),
                    meta: { title: '国内游产品', requireAuth: true }
                },
                {
                    path: '/rimTravelProducts',
                    component: () => import('../components/page/RimTravelProducts.vue'),
                    meta: { title: '周边游产品', requireAuth: true }
                },
                {
                    path: '/outTravelProducts',
                    component: () => import('../components/page/OutTravelProducts.vue'),
                    meta: { title: '出境游产品', requireAuth: true }
                },
                {
                    path: '/specialTravelProducts',
                    component: () => import('../components/page/SpecialTravelProducts.vue'),
                    meta: { title: '特价游产品', requireAuth: true }
                },
                {
                    path: '/mybill',
                    component: () => import('../components/page/MyBill.vue'),
                    meta: { title: '财务分析', requireAuth: true }
                },
                {
                    path: '/travelEva',
                    component: () => import('../components/page/TravelEva.vue'),
                    meta: { title: '产品评价', requireAuth: true }
                },
                {
                    path: '/travelEvaDetails/:id',
                    name: 'travelEvaDetails',
                    component: TravelEvaDetails,
                    meta: { title: '评价详情', requireAuth: true }
                },
                {
                    path: '/orderList',
                    component: () => import('../components/page/OrderList.vue'),
                    meta: { title: '订单显示', requireAuth: true }
                },
                {
                    path: '/checkAgent',
                    component: () => import('../components/page/CheckAgent.vue'),
                    meta: { title: '审核认证', requireAuth: true }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表', requireAuth: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/per',
                    component: () => import('../components/page/adminInfo.vue'),
                    meta: { title: '个人中心', requireAuth: true }
                }
            ]
        },
        // {
        //     path: '/login',
        //     component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
        //     meta: { title: '登录' }
        // },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
