import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false, // (세션/쿠키 기반 인증 시)
})

export default apiClient
