import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductList from '@/views/product/index.vue'
import OrderView from '@/views/order/index.vue'
import PaymentView from '@/views/PaymentView.vue'
import ResultView from '@/views/ResultView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/products', component: ProductList },
    { path: '/orders', component: OrderView },
    {
        path: '/orders/create',
        component: () => import('@/views/order/create.vue'),
    },
    {
        path: '/orders/:id',
        component: () => import('@/views/order/detail.vue'),
    },
    { path: '/payments', component: PaymentView },
    {
        path: '/payments/:orderId',
        component: () => import('@/views/payment/index.vue'),
    },
    { path: '/result', component: ResultView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
