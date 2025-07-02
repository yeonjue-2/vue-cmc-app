<template>
  <div v-if="order">
    <h1>주문 상세</h1>
    <p>ID: {{ order.orderId }}</p>
    <p>주문일자: {{ formatDate(order.createdAt) }}</p>
    <p>상품명: {{ order.productId }}</p>
    <p>금액: {{ formatPrice(order.totalAmount) }}</p>
    <p>수량: {{ order.quantity }}</p>
    <p>상태: {{ order.orderStatus }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'

const route = useRoute()
const store = useOrderStore()

const order = store.selectedOrder


function formatDate(iso) {
  return iso?.substring(0, 10) || '-'
}

function formatPrice(value) {
  return value?.toLocaleString() || '0'
}


onMounted(() => {
  store.loadOrderById(route.params.id)
})
</script>
