<template>
  <div>
    <h1>주문 생성</h1>
    <form @submit.prevent="submit">
      <input v-model="form.productId" placeholder="상품 ID" />
      <input v-model="form.quantity" placeholder="수량" />
      <button type="submit">주문하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'

const store = useOrderStore()
const router = useRouter()

const form = ref({
  productId: '',
  quantity: 1,
})

async function submit() {
  const response = await store.submitOrder(form.value)
  router.push(`/orders/${response.id}`)
}
</script>
