<template>
  <div>
    <h1>상품 목록</h1>
    <ul>
      <li v-for="product in store.products" :key="product.productId">
        <div>{{ product.productName }} </div>
        <div>{{ product.productAmount }} </div>
        <input v-model="quantities[product.productId]" type="number" placeholder="수량" />
        <button @click="createOrder(product.productId)">주문하기</button>
      </li>
    </ul>
    <button @click="prevPage" :disabled="store.currentPage === 1">이전</button>
    <span>페이지 {{ store.currentPage }} / {{ store.totalPages }}</span>
    <button @click="nextPage" :disabled="store.currentPage + 1 >= store.totalPages">다음</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.js'
import { useOrderStore } from '@/stores/order.js'


const store = useProductStore()
const orderStore = useOrderStore()
const router = useRouter()

const quantities = ref({})
const userId = 1

async function createOrder(productId) {
  const quantity = quantities.value[productId] || 1
  const orderData = { userId, productId, quantity }

  try {
    const response = await orderStore.submitOrder(orderData)
    router.push(`/payments/orders/${response.orderId}`)
  } catch (e) {
    console.error('주문 실패:', e)
  }
}

function nextPage() {
  if (store.currentPage < store.totalPages) {
    store.loadProducts(store.currentPage + 1)
  }
}

function prevPage() {
  if (store.currentPage > 1) {
    store.loadProducts(store.currentPage - 1)
  }
}

onMounted(() => {
 store.loadProducts()
})

</script>
