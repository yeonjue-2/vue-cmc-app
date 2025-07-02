<template>
  <div>
    <h1>결제 페이지</h1>
    <p>상품: {{ order.productId }}</p>
    <p>수량: {{ order.quantity }}</p>
    <p>금액: {{ formatPrice(order.totalAmount) }}원</p>
    <h3>결제 수단 선택</h3>
    <label>
      <input type="radio" value="kakao" v-model="paymentMethod"/>
      카카오페이
    </label>

    <button @click="pay" :disabled="paymentMethod !== 'kakao'">결제하기</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {usePaymentStore} from '@/stores/payment'
import {useOrderStore} from '@/stores/order'

const route = useRoute()
const router = useRouter()
const orderId = route.params.orderId

const paymentStore = usePaymentStore()
const orderStore = useOrderStore()

const order = ref({})
const paymentMethod = ref('kakao')

// 주문 정보 조회
async function loadOrder() {
  try {
    order.value = await orderStore.loadOrderById(orderId)
  } catch (e) {
    console.error('주문 정보 불러오기 실패:', e)
  }
}

async function pay() {
  try {
    const redirectUrl = await paymentStore.prepare(orderId)
    window.location.href = redirectUrl
  } catch (e) {
    console.error('결제 요청 실패:', e)
  }
}

function formatPrice(value) {
  return value?.toLocaleString() || '0'
}

onMounted(() => {
  loadOrder()
})
</script>
