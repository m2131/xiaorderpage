import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import projectList from './views/project/projectList.vue'
import purchase from './views/order/purchase.vue'
import orderList from './views/order/orderList.vue'
import shopList from './views/shop/shopList.vue'
import Setting from './views/Setting.vue'

let routes = [
    // {
    //     path: '/Main',
    //     component: Main,
    //     name: '美国卡号',
    //     iconCls: 'fa fa-home fa-lg',
    //     children: [
    //         // { path: '/main', component: Main, name: '首页' },
    //         // { path: '/setting', component: Setting, name: '个人设置'}
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-shopping-cart fa-lg',//图标样式class
        children: [
            { path: '/orderList', component: orderList, name: '订单列表' ,iconCls: 'fa fa-list'},
            { path: '/shopList', component: shopList, name: '店铺管理',iconCls: 'fa fa-shopping-cart' },
            { path: '/orderManage/purchase', component: purchase, name: '订单采购',iconCls: 'fa fa-shopping-cart' },
        ]
    }
];

export default routes;