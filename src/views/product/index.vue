<template>
  <div>
    <h1>상품 목록</h1>
    <ul>
      <li v-for="product in productStore.products" :key="product.productId">
        <div>{{ product.productName }} </div>
        <div>{{ product.productAmount }} </div>
        <input v-model="quantities[product.productId]" type="number" placeholder="수량" />
        <button @click="createOrder(product.productId)">주문하기</button>
      </li>
    </ul>
    <paging v-model="productStore"></paging>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.js'
import { useOrderStore } from '@/stores/order.js'
import Paging from '@/components/atom/Paging.vue'

const productStore = useProductStore()
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

onMounted(() => {
 productStore.fetchDataPages()
})

</script>
