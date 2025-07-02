import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createOrder, fetchOrders, fetchOrderById } from '@/api/order'

export const useOrderStore = defineStore('order', () => {
    const orders = ref([])
    const totalPages = ref(1)
    const currentPage = ref(1)
    const selectedOrder = ref(null)

    async function submitOrder(orderData) {
        try {
            const response = await createOrder(orderData)
            return response.data  // 생성된 주문 객체 반환
        } catch (e) {
            console.error('주문 생성 실패:', e)
            throw e
        }
    }

    async function loadOrders(page = 1, size = 20, orderStatus = null) {
        try {
            const params = { page, size }
            if (orderStatus) params.orderStatus = orderStatus

            const response = await fetchOrders(params)
            orders.value = response.data.orders
            totalPages.value = response.data.totalPages
            currentPage.value = response.data.currentPage
        } catch (e) {
            console.error('상품 로딩 실패:', e)
        }
    }

    async function loadOrderById(orderId) {
        try {
            const response = await fetchOrderById(orderId)
            selectedOrder.value = response.data
            return response.data
        } catch (e) {
            console.error('주문 상세 조회 실패:', e)
        }
    }

    return {
        // state
        orders,
        totalPages,
        currentPage,
        selectedOrder,

        // actions
        submitOrder,
        loadOrders,
        loadOrderById
    }
})
