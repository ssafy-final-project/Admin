<template>
  <div class="p-3 d-flex flex-col gap-y-5">
    <div class="row-start-3 col-span-full mx-auto">
      <v-btn @click="mvWrite" class="row-start-3 col-span-full mx-auto" elevation="2">글쓰기</v-btn>
    </div>
    <div id="thead" class="p-2 border-t-2 border-b grid grid-cols-10 grid-rows-1">
      <div class="font-semibold py-2 col-span-8 text-center">제목</div>
      <div class="font-semibold py-2 col-span-2 text-center">날짜</div>
    </div>
    <div class="tbody">
      <AnnounceListItem :notices="notices"></AnnounceListItem>
      <!-- v-show로 글 내용 여기에 쓰기 -->
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
import { onMounted, ref, watchEffect, watch } from 'vue';
import { listAnnounce, getNoticeCount } from '@/api/announce';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import AnnounceListItem from './AnnounceListItem.vue';

const notices = ref([]);
const page = ref(1);
const maxPage = ref(0);
const router = useRouter();

const mvWrite = () => {
  router.push({ name: 'announceWrite' });
};

onMounted(() => {
  getNoticeCount(
    ({ data }) => {
      maxPage.value = data % 10 == 0 ? data / 10 : data / 10 + 1;
    },
    (err) => console.log(err)
  );
});

watchEffect(() => {
  listAnnounce(
    { pageno: page.value },
    (response) => {
      const { data } = response;
      notices.value = [
        ...data.list.map((notice) => {
          return {
            notice_no: notice.notice_no,
            title: notice.title,
            notice_date: dayjs(notice.notice_date).format('YYYY-MM-DD'),
            content: notice.content,
            contentToggle: false,
          };
        }),
      ];
    },
    (error) => console.log(error)
  );
});
</script>
