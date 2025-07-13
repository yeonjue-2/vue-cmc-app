<template>
  <ul v-if="model.pagination.totalElements > 0" class="pagination">
    <li class="prev" :class="{ disabled: pageIndex <= 1 }" @click="click(1)"><<</li>
    <li class="prev" :class="{ disabled: pageIndex <= 1 }" @click="click(pageIndex - 1)"><</li>
    <template v-if="pageIndex > 5 && lastPageNumber > 9">…</template>
    <li v-for="i in pagingItems" class="cursor-pointer" :class="i === pageIndex ? 'active' : ''" @click="click(i)">{{ i }}</li>
    <template v-if="pageIndex < lastPageNumber - 4 && lastPageNumber > 9">…</template>
    <li class="next" :class="{ disabled: pageIndex >= lastPageNumber }"  @click="click(pageIndex + 1)">></li>
    <li class="next" :class="{ disabled: pageIndex >= lastPageNumber }" @click="click(lastPageNumber)">>></li>
  </ul>
</template>

<script setup>
import { computed } from "vue";

const model = defineModel({required: true})
const pageIndex = computed(() => model.value.pagination.page);
const lastPageNumber = computed(() => model.value.pagination.totalPages);
const pagingItems = computed(() => {
  const page = pageIndex.value;
  let start, end;

  if (page < 6) {
    start = 1;
    end = Math.min(9, lastPageNumber.value);
  } else if (page > lastPageNumber.value - 5) {
    start = Math.max(1, lastPageNumber.value - 9);
    end = lastPageNumber.value;
  } else {
    start = page - 4;
    end = page + 4;
  }

  return Array.from({length: end - start + 1}).map((_, i) => start + i);
});

function click(index) {
  if (
      index < 1 ||
      index > lastPageNumber.value ||
      index === pageIndex.value
  ) return

    model.value.pagination.page = index;
    model.value.fetchDataPages()
}
</script>

<style scoped>
.pagination {
  list-style: none;
  display: flex;
  padding: 0;
  gap: 6px; /* 간격은 원하는 만큼 조절 */
}

.pagination li {
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.pagination li.active {
  font-weight: bold;
  background-color: #eee;
}

.pagination li.disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
