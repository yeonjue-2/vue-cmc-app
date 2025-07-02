<template>
  <div>
    <nav>
      <router-link to="/">홈</router-link> |
      <router-link to="/about">소개</router-link> |
      <router-link to="/products">상품</router-link> |
      <router-link to="/orders">주문</router-link> |
      <router-link to="/payments">결제</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<script setup>
</script>
