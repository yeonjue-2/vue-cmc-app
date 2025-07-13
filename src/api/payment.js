import apiClient from './index'

export function requestKakaoPay(orderId) {
    return apiClient.put(`/payments/orders/${orderId}/ready`)
}