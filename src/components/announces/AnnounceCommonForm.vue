<template>
  <div>
    <RouterLink to="/announce" class="inline-block d-flex">
      <v-icon icon="$prev"></v-icon>
      <span class="align-middle">목록으로</span>
    </RouterLink>
    <v-form class="d-flex flex-column gap-4 mt-3">
      <v-text-field
        v-model="title"
        :rules="rules"
        label="제목을 입력하세요"
        clearable
        :readonly="isReadonly"
      ></v-text-field>
      <Editor v-model="content" :readonly="isReadonly" editorStyle="height: 500px"></Editor>
      <div v-if="status === 'write'">
        <v-btn @click="createAnnounce" block>작성완료</v-btn>
      </div>
      <div class="d-flex flex-column gap-1" v-else>
        <v-btn v-if="isReadonly" @click="() => (isReadonly = !isReadonly)" block>수정</v-btn>
        <v-btn @click="modifyAnnounce" v-else-if="!isReadonly" block>수정완료</v-btn>
        <v-btn @click="deleteAnnounce" block>삭제</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup>
import Editor from 'primevue/editor';
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const props = defineProps({
  ptitle: {
    type: String,
    default: '',
  },
  pcontent: {
    type: String,
    default: '',
  },
  preadonly: {
    type: Boolean,
    default: false,
  },
  status: String,
});

const emit = defineEmits(['createAnnounce', 'modifyAnnounce', 'deleteAnnounce']);
const rules = ref([(value) => !!value || '제목을 입력하세요']);
const actionStatus = ref(false);

watch(
  () => props.ptitle,
  () => {
    title.value = props.ptitle;
    initTitle.value = title.value;
    // console.log(initTitle.value);
  }
);
watch(
  () => props.pcontent,
  () => {
    content.value = props.pcontent;
    initContent.value = content.value;
    // console.log(initContent.value);
  }
);

const title = ref(props.ptitle);
const content = ref(props.pcontent);
const isReadonly = ref(props.preadonly);

const initTitle = ref('');
const initContent = ref('');

function createAnnounce() {
  actionStatus.value = true;
  emit('createAnnounce', {
    title: title.value,
    content: content.value,
    author: 'ssafy', // 후에 로그인 한 admin의 아이디로 전달
  });
}

function modifyAnnounce() {
  actionStatus.value = true;
  isReadonly.value = true;
  emit('modifyAnnounce', {
    title: title.value,
    content: content.value,
  });
  alert('글 수정이 완료되었습니다');
}

function deleteAnnounce() {
  actionStatus.value = true;
  if (confirm('정말로 삭제하시겠습니까?')) {
    emit('deleteAnnounce');
  }
}

onBeforeRouteLeave((to, from) => {
  if (props.status === 'write') {
    if ((title.value.length > 0 || content.value.length > 0) && !actionStatus.value) {
      if (!confirm('작성중인 게시글이 있습니다. 지금 이동하면 내용은 소실됩니다. 그래도 이동하시겠습니까?')) {
        return false;
      }
    }
  } else {
    if ((title.value !== initTitle.value || content.value !== initContent.value) && !actionStatus.value) {
      if (
        !confirm('수정중인 게시글이 있습니다. 지금 이동하면 변경한 내용은 반영되지 않습니다. 그래도 이동하시겠습니까?')
      ) {
        return false;
      }
    }
  }
});
</script>
