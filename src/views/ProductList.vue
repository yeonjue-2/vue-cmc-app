<template>
  <div>
    <h1>상품 목록</h1>
    <ul>
      <li v-for="product in store.products" :key="product.productId">
        {{ product.productName }} - {{ product.productAmount }}원
      </li>
    </ul>
    <button @click="prevPage" :disabled="store.currentPage === 1">이전</button>
    <span>페이지 {{ store.currentPage }} / {{ store.totalPages }}</span>
    <button @click="nextPage" :disabled="store.currentPage + 1 >= store.totalPages">다음</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()

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
