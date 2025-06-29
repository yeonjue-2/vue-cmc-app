import apiClient from './index'

// 상품 목록 조회
export function fetchProducts(page = 1, size = 20) {
    return apiClient.get('/products', {
        params: { page, size }
    })
}