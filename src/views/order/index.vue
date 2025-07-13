<template>
  <div>
    <h1>주문 목록</h1>
    <table>
      <thead>
      <tr>
        <th>주문일자</th>
        <th>상품명</th>
        <th>금액</th>
        <th>상태</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orderStore.orders" :key="order.orderId">
        <td>{{ formatDate(order.createdAt) }}</td>
        <td>
          <RouterLink :to="`/orders/${order.orderId}`">
            {{ order.productName }}
          </RouterLink>
        </td>
        <td>{{ formatPrice(order.totalAmount) }} 원</td>
        <td>{{ order.orderStatus }}</td>
      </tr>
      </tbody>
    </table>
    <paging v-model="orderStore"></paging>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'
import Paging from '@/components/atom/Paging.vue'

const orderStore = useOrderStore()

function formatDate(iso) {
  return iso?.substring(0, 10) || '-'
}

function formatPrice(value) {
  return value?.toLocaleString() || '0'
}

onMounted(() => {
  orderStore.fetchDataPages()
})
</script>
