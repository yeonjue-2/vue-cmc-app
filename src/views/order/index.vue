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
      <tr v-for="order in store.orders" :key="order.orderId">
        <td>{{ formatDate(order.createdAt) }}</td>
        <td>
          <RouterLink :to="`/orders/${order.orderId}`">
            {{ order.productId }}
          </RouterLink>
        </td>
        <td>{{ formatPrice(order.totalAmount) }} 원</td>
        <td>{{ order.orderStatus }}</td>
      </tr>
      </tbody>
    </table>
    <paging></paging>
    <button @click="prevPage" :disabled="store.currentPage === 1">이전</button>
    <span>페이지 {{ store.currentPage }} / {{ store.totalPages }}</span>
    <button @click="nextPage" :disabled="store.currentPage + 1 >= store.totalPages">다음</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'
import Paging from "@/components/atom/Paging.vue";

const store = useOrderStore()

function nextPage() {
  if (store.currentPage < store.totalPages) {
    store.loadOrders(store.currentPage + 1)
  }
}

function prevPage() {
  if (store.currentPage > 1) {
    store.loadOrders(store.currentPage - 1)
  }
}

function formatDate(iso) {
  return iso?.substring(0, 10) || '-'
}

function formatPrice(value) {
  return value?.toLocaleString() || '0'
}

onMounted(() => {
  store.loadOrders()
})
</script>
