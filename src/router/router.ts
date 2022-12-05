import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import tms from "~/views/eve/tms/emailSendTest.vue";
import tmsTable from "~/views/eve/tms/tmsTable.vue";
import liConfigRole from "~/views/eve/li/configRole.vue";

// 1. 定义路由组件.
// 也可以从其他文件导入
// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes: Array<RouteRecordRaw> = [
    {
        path: "/admin",
        component: () => import("~/views/home.vue"),
        children: [
            {
                path: 'goods',
                components: {
                    default: () => import("~/views/admin/goods.vue"),
                    nav: () => import("~/layouts/navLayout.vue")
                },

            },
            {
                path: 'products',
                components: {
                    default: () => import("~/views/admin/products.vue"),
                    nav: () => import("~/layouts/navLayout.vue")
                },

            },
        ],
    },

    {
        path: '/login',
        components: {
            default: () => import("~/views/admin/login.vue"),
        },

    },

    {
        path: "/eve",
        component: () => import("~/views/eve/index.vue"),
        children: [
            {path: 'tms', component: tms},
            {path: 'tmsTable', component: tmsTable},

            {path: 'liConfigRole', component: liConfigRole},
        ]
    },

]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;


