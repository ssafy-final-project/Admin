<template>
  <div class="nrow" v-for="notice in notices" :key="notice.notice_no" @click="mvDetail(notice.notice_no)">
    <div class="p-2 grid grid-cols-10 grid-rows-1 mt-3 py-3 border-b">
      <div class="ntitle col-span-8">[공지사항] {{ notice.title }}</div>
      <div class="ndate col-span-2 text-center">{{ notice.notice_date }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps(['notices']);

const mvDetail = (noticeNo) => {
  router.push({ name: 'announceDetail', params: { noticeNo: noticeNo } });
};
</script>

<style scoped>
.nrow {
  cursor: pointer;
  position: relative;
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
