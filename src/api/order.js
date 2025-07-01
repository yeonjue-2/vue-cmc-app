import apiClient from './index'

export function createOrder(orderData) {
    return apiClient.post('/orders', orderData)
}

export function fetchOrders(params) {
    return apiClient.get('/orders', { params })
}

export function fetchOrderById(orderId) {
    return apiClient.get(`/orders/${orderId}`)
}