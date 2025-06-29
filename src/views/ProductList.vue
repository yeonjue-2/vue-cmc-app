<template>
  <div>
    <h1>상품 목록</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.productName }} - {{ product.productAmount }}원
      </li>
    </ul>
    <button @click="prevPage" :disabled="page === 0">이전</button>
    <span>페이지 {{ page }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="page + 1 >= totalPages">다음</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '@/api/product'

const products = ref([])
const page = ref(1)
const size = 20
const totalPages = ref(1)

async function loadProducts() {
  try {
    const response = await fetchProducts(page.value, size)
    products.value = response.data.products
    totalPages.value = response.data.totalPages
  } catch (err) {
    console.error('상품 로딩 실패', err)
  }
}

function nextPage() {
  if (page.value + 1 < totalPages.value) {
    page.value++
    loadProducts()
  }
}

function prevPage() {
  if (page.value > 0) {
    page.value--
    loadProducts()
  }
}

onMounted(() => {
  loadProducts()
})
</script>
