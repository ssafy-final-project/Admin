<script setup>
import { ref, watchEffect, watch, onMounted } from 'vue';
import Editor from 'primevue/editor';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { registAnswer, modifyAnswer, deleteAnswer } from '@/api/answer';

const { adminAnswer = {} } = defineProps({
  adminAnswer: [Object, String],
});

const emit = defineEmits(['resolveQuestion', 'cancelAnswer']);

const route = useRoute();
const router = useRouter();
const content = ref('');
const isResolvedBefore = ref(false);
const reviseStatus = ref(false);
const modifyedAnswer = ref(null);

watchEffect(() => {
  content.value = adminAnswer.content ?? '';
});

watch(
  () => adminAnswer,
  () => {
    // console.log(adminAnswer);
    if (adminAnswer.content?.length > 0) {
      isResolvedBefore.value = true;
    } else {
      isResolvedBefore.value = false;
    }
  }
);

onBeforeRouteUpdate(() => isWriting());
onBeforeRouteLeave(() => isWriting());

const isWriting = () => {
  if (!isResolvedBefore.value) {
    if (content.value.length > 0) {
      if (!confirm('작성중인 게시글이 있습니다. 지금 이동하면 내용은 소실됩니다. 그래도 이동하시겠습니까?')) {
        return false;
      } else {
        content.value = '';
        return true;
      }
    }
  }
};

const createAnswer = () => {
  if (route.query.qnaNo === undefined) return;
  registAnswer(
    { qNo: route.query.qnaNo, author: 'admin', content: content.value },
    ({ data }) => {
      console.log(data);
      emit('resolveQuestion', route.query.qnaNo);
      toggleReadOnlyStatus();
      reviseStatus.value = false;
    },
    (err) => console.log(err)
  );
};

function updateAnswer() {
  modifyAnswer.value = { ...adminAnswer };
  modifyAnswer.value.content = content.value;
  console.log(modifyAnswer.value);
  modifyAnswer(
    modifyAnswer.value,
    ({ data }) => {
      console.log(data);
      toggleStatus();
    },
    (err) => console.log(err)
  );
}

function delAnswer() {
  if (confirm('정말로 삭제하시겠습니까?')) {
    deleteAnswer(
      adminAnswer,
      ({ data }) => {
        console.log(data);
        content.value = '';
        emit('cancelAnswer', adminAnswer.questionId);
        toggleReadOnlyStatus();
        reviseStatus.value = false;
      },
      (err) => console.log(err)
    );
  }
}

const toggleStatus = () => {
  isResolvedBefore.value = !isResolvedBefore.value;
  reviseStatus.value = !reviseStatus.value;
};
const toggleReadOnlyStatus = () => (isResolvedBefore.value = !isResolvedBefore.value);
const toggleReviseStatus = () => (reviseStatus.value = !reviseStatus.value);
</script>

<template>
  <div>
    <h3 class="mb-3">문의 답변</h3>
    <div class="d-flex flex-column gap-4">
      <Editor v-model="content" editorStyle="height: 500px" :readonly="isResolvedBefore"></Editor>
      <div v-if="!isResolvedBefore">
        <div v-if="reviseStatus" class="d-flex flex-column gap-1">
          <v-btn @click="updateAnswer" block>답변 수정완료</v-btn>
          <v-btn @click="toggleStatus" block>수정 취소</v-btn>
        </div>
        <v-btn v-else @click="createAnswer" block>작성완료</v-btn>
      </div>
      <div v-else class="d-flex flex-column gap-1">
        <v-btn v-if="!reviseStatus" @click="toggleStatus" block>답변 수정</v-btn>
        <v-btn @click="delAnswer" block>답변 삭제</v-btn>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.p-editor {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.4);
}
</style>
