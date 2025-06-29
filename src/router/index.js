import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductList from '../views/ProductList.vue'
import OrderView from '../views/OrderView.vue'
import PaymentView from '../views/PaymentView.vue'
import ResultView from '../views/ResultView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/products', component: ProductList },
    { path: '/orders', component: OrderView },
    { path: '/payments', component: PaymentView },
    { path: '/result', component: ResultView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
