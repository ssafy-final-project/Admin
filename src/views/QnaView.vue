<template>
  <div id="container" class="w-full mx-auto h-fit grid">
    <h1 class="font-bold self-center col-span-full text-center text-4xl">Q&amp;A</h1>

    <div id="qnaContainer" class="row-start-2 col-span-full">
      <div class="grid gap-5 grid-rows-4 grid-cols-2 max-h-screen">
        <QnaList :qnas="qnas" :maxPage="maxPage" @page-change="fetchData" class="row-span-3"></QnaList>
        <QnaUserContent :userQuestion="userQuestion" class="me-3 row-span-1"></QnaUserContent>
        <QnaAdminForm
          :adminAnswer="adminAnswer"
          @resolve-question="toggleResolve"
          @cancel-answer="toggleResolve"
          class="me-3"
        ></QnaAdminForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import QnaAdminForm from '@/components/qnas/QnaAdminForm.vue';
import QnaList from '@/components/qnas/QnaList.vue';
import QnaUserContent from '@/components/qnas/QnaUserContent.vue';

import { onMounted, reactive, ref, watch } from 'vue';
import { listQna, getQnaCount, detailQna } from '@/api/qna';
import { selectAnswer } from '@/api/answer';
import dayjs from 'dayjs';
import { useRoute } from 'vue-router';

// const page = ref(1);
const route = useRoute();
const qnas = ref([]);
const maxPage = ref(1);

// Question
const userQuestion = reactive({
  title: '',
  content: '',
});

// Answer
const adminAnswer = ref({});

onMounted(() => {
  getQnaCount(
    ({ data }) => {
      maxPage.value = data % 10 == 0 ? data / 10 : Math.floor(data / 10) + 1;
    },
    (err) => console.log(err)
  );

  fetchData(1);

  if (route.query.qnaNo !== undefined) {
    fetchUserQuestion(route.query.qnaNo);
    fetchAdminAnswer(route.query.qnaNo);
  }
});

watch(
  () => route.query.qnaNo,
  (qNo) => {
    fetchUserQuestion(qNo);
    fetchAdminAnswer(qNo);
  }
);

const fetchAdminAnswer = (qnaNo) => {
  selectAnswer(
    qnaNo,
    ({ data }) => {
      // console.log(data);
      adminAnswer.value = data;
    },
    (err) => console.log(err)
  );
};

const fetchUserQuestion = (qnaNo) => {
  detailQna(
    qnaNo,
    ({ data }) => {
      userQuestion.title = data.title;
      userQuestion.content = data.content;
    },
    (err) => console.log(err)
  );
};

const fetchData = (page) => {
  listQna(
    { from: page - 1, amount: 1000 },
    (response) => {
      const { data } = response;
      qnas.value = [
        ...data.map((qna) => {
          return {
            qnaNo: qna.questionId,
            category: qna.category,
            title: qna.title,
            content: qna.content,
            author: qna.author,
            qnaDate: dayjs(qna.createdAt).format('YYYY-MM-DD'),
            isResolved: qna.isResolved,
          };
        }),
      ];
      console.log(qnas.value);
    },
    (error) => console.log(error)
  );
};

const toggleResolve = (qNo) => {
  const resolvedQuestion = qnas.value.find((qna) => qna.qnaNo == qNo);
  resolvedQuestion.isResolved = 1 - resolvedQuestion.isResolved;
  // console.log(resolvedQuestion);
};
</script>

<style scoped>
#container {
  grid-template-rows: repeat(10, minmax(0, 1fr));
}

#qnaContainer {
  grid-row: span 9;
}
</style>
