<template>
  <div v-for="qna in qnas" :key="qna.qnaNo" class="nrow grid grid-cols-4 py-3 border-b" @click="loadQna(qna.qnaNo)">
    <!-- 각 열에 동일한 스타일과 정렬 적용 -->
    <div class="text-center">{{ qna.author }}</div>
    <div class="text-center">{{ qna.category }}</div>
    <div class="text-center">{{ qna.qnaDate }}</div>
    <div class="text-center">
      <span class="text-slate-600" v-if="qna.isResolved == 0">답변 대기</span>
      <span class="text-blue-600" v-else>답변 완료</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps(['qnas']);

const loadQna = (qNo) => {
  router.push({ name: 'qna', query: { qnaNo: qNo } });
};
</script>

<style scoped>
.nrow {
  cursor: pointer;
  position: relative;
}

.nrow * {
  text-align: center;
}

.nrow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.nrow:hover::before {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
