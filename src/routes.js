import Home from './pages/Home.vue'
import purchase from './pages/order/purchase.vue'
import orderList from './pages/order/orderList.vue'
import shopList from './pages/shop/shopList.vue'

let routes = [
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