import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createOrder, fetchOrders, fetchOrderById } from '@/api/order'

export const useOrderStore = defineStore('order', () => {
    const orders = ref([])
    const selectedOrder = ref(null)

    const pagination = ref({
        page: 1,
        totalElements: 0,
        totalPages: 0
    })

    async function submitOrder(orderData) {
        try {
            const response = await createOrder(orderData)
            return response.data  // 생성된 주문 객체 반환
        } catch (e) {
            console.error('주문 생성 실패:', e)
            throw e
        }
    }

    async function loadOrders(orderStatus = null) {
        const page = pagination.value.page
        const size = 10
        try {
            const params = { page, size }
            if (orderStatus) params.orderStatus = orderStatus

            const response = await fetchOrders(params)
            orders.value = response.data.orders
            pagination.value = {
                page : response.data.currentPage,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages
            }
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
        pagination,
        selectedOrder,

        // actions
        submitOrder,
        fetchDataPages: loadOrders,
        loadOrderById
    }
})
