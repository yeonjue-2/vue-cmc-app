import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductList from '@/views/product/index.vue'
import OrderView from '@/views/order/index.vue'
import PaymentView from '@/views/PaymentView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/products', component: ProductList },
    { path: '/orders', component: OrderView },
    {
        path: '/orders/:id',
        component: () => import('@/views/order/detail.vue'),
    },
    { path: '/payments', component: PaymentView },
    {
        path: '/payments/orders/:orderId',
        component: () => import('@/views/payment/index.vue'),
    },
    {
        path: '/payments/orders/:orderId/result',
        component: () => import('@/views/payment/result.vue'),
    },
    {
        path: '/payment/result',
        name: 'PaymentResult',
        component: () => import('@/views/payment/result.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
