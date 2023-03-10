"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var permiss_1 = require("../store/permiss");
var home_vue_1 = require("../views/home.vue");
var routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: "/",
        name: "Home",
        component: home_vue_1["default"],
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    permiss: '1'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "dashboard" */ "../views/dashboard.vue"); }); }
            }, {
                path: "/ManageAll",
                name: "table_All",
                meta: {
                    title: '全区',
                    permiss: '2'
                },
                component: function () { return Promise.resolve().then(function () { return require("@/views/manage.vue"); }); }
            }, {
                path: "/ManageAreaA",
                name: "table_A",
                meta: {
                    title: 'A区',
                    permiss: '2'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "table" */ "@/views/manage.vue"); }); }
            }, {
                path: "/ManageAreaB",
                name: "table_B",
                meta: {
                    title: 'B区',
                    permiss: '2'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "table" */ "@/views/manage.vue"); }); }
            }, {
                path: "/ManageAreaC",
                name: "table_C",
                meta: {
                    title: '行政人员',
                    permiss: '2'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "table" */ "@/views/manage.vue"); }); }
            }, {
                path: "/ManageAreaD",
                name: "table_D",
                meta: {
                    title: '流动人员',
                    permiss: '2'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "table" */ "@/views/manage.vue"); }); }
            }, {
                path: "/distribution",
                name: "distributeMap",
                meta: {
                    title: '分布',
                    permiss: '3'
                },
                component: function () { return Promise.resolve().then(function () { return require('@/views/distribute.vue'); }); }
            }, {
                path: '/uploadPic',
                name: '图片上传',
                meta: {
                    title: '图片检测',
                    permiss: '3'
                },
                component: function () { return Promise.resolve().then(function () { return require('@/views/uploadPic.vue'); }); }
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表',
                    permiss: '11'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "charts" */ "../views/charts.vue"); }); }
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '通知发送',
                    permiss: '5'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "form" */ "../views/form.vue"); }); }
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '通知接收',
                    permiss: '3'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "tabs" */ "../views/tabs.vue"); }); }
            }, {
                path: "/info",
                name: "info",
                meta: {
                    title: '系统信息',
                    permiss: '14'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "info" */ "../views/info.vue"); }); }
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permiss: '13'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "permission" */ "../views/permission.vue"); }); }
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "user" */ '../views/user.vue'); }); }
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "login" */ "../views/login.vue"); }); }
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "403" */ '../views/403.vue'); }); }
    },
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHashHistory(),
    routes: routes
});
router.beforeEach(function (to, from, next) {
    document.title = to.meta.title + " | PinesWeb";
    var role = localStorage.getItem('ms_username');
    var permiss = permiss_1.usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    }
    else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    }
    else {
        next();
    }
});
exports["default"] = router;
