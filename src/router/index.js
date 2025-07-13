import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductList from '@/views/product/index.vue'
import OrderView from '@/views/order/index.vue'
import OrderDetailView from '@/views/order/detail.vue'
import PaymentView from '@/views/payment/index.vue'
import PaymentResultView from '@/views/payment/result.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/products', component: ProductList },
    {
        path: '/orders',
        children: [
            { path: '', component: OrderView },
            { path: ':id', component: OrderDetailView },
        ]
    },
    {
        path: '/payments',
        children: [
            {
                path: 'orders/:orderId',
                component: PaymentView
            },
            {
                path: 'result',
                component: PaymentResultView,
                props: route => ({ status: route.query.status}),
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
