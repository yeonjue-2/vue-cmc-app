<template>
  <div class="result-page">
    <h2>{{ message }}</h2>
    <div class="actions">
      <button @click="goToOrders">주문 목록 가기</button>
      <button @click="goToHome">홈 화면 가기</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const status = route.query.status ?? 'success'

const messageMap = {
  success: '결제 완료되었습니다.',
  fail: '결제에 실패하였습니다.',
  cancel: '결제를 취소하였습니다.',
}
const message = messageMap[status] ?? '처리 결과를 알 수 없습니다.'

function goToOrders() {
  router.push('/orders')
}

function goToHome() {
  router.push('/')
}
</script>
