import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProducts } from '@/api/product'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const totalPages = ref(1)
    const currentPage = ref(1)

    async function loadProducts(page = 1, size = 20) {
        try {
            const res = await fetchProducts(page, size)
            products.value = res.data.products
            totalPages.value = res.data.totalPages
            currentPage.value = res.data.currentPage
        } catch (e) {
            console.error('상품 로딩 실패:', e)
        }
    }

    return {
        products,
        totalPages,
        currentPage,
        loadProducts,
    }
})
