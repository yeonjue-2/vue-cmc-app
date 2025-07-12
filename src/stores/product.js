import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProducts } from '@/api/product'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const pagination = ref({
        page: 1,
        totalElements: 0,
        totalPages: 0
    })

    async function loadProducts() {
        const page = pagination.value.page
        const size = 10

        try {
            const response = await fetchProducts(page, size)
            products.value = response.data.products
            pagination.value = {
                page : response.data.currentPage,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages
            }
        } catch (e) {
            console.error('상품 로딩 실패:', e)
        }
    }

    return {
        products,
        pagination,
        fetchDataPages: loadProducts,
    }
})
