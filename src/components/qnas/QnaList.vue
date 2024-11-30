<template>
  <div class="p-3 d-flex flex-col gap-y-5">
    <div id="thead" class="py-2 border-t-2 border-b grid grid-cols-4">
      <!-- 그리드 정의를 명시적으로 조정 -->
      <div class="font-semibold py-2 text-center">사용자</div>
      <div class="font-semibold py-2 text-center">카테고리</div>
      <div class="font-semibold py-2 text-center">날짜</div>
      <div class="font-semibold py-2 text-center">답변여부</div>
    </div>
    <div class="tbody">
      <QnaListItem :qnas="qnas"></QnaListItem>
    </div>
    <div class="text-center">
      <v-pagination
        :length="maxPage"
        :total-visible="5"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        v-model="page"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import QnaListItem from './QnaListItem.vue';
import { ref, watch } from 'vue';

defineProps({
  qnas: Array,
  maxPage: Number,
});

const emit = defineEmits(['pageChange']);
const page = ref(1);

const pageChanged = () => {
  emit('pageChange', page.value);
};

watch(page, () => {
  pageChanged();
});
</script>

<style scoped></style>
