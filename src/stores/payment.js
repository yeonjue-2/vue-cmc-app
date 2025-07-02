import { defineStore } from 'pinia'
import { requestKakaoPay } from '@/api/payment'

export const usePaymentStore = defineStore('payment', () => {
    async function prepare(orderId) {
        try {
            const res = await requestKakaoPay(orderId)
            return res.data.next_redirect_pc_url  // 카카오페이 리다이렉트 URL 반환
        } catch (e) {
            errorMessage.value = '결제 준비 실패'
            throw e
        }
    }

    return {
        prepare
    }
})