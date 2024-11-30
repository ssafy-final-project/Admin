<script setup>
defineProps({
  userQuestion: Object,
});
</script>

<template>
  <div>
    <v-text-field variant="underlined" readonly>
      <strong>제목 : </strong>
      {{ userQuestion.title }}
    </v-text-field>
    <v-textarea
      label="문의 내용"
      variant="solo"
      auto-grow
      readonly
      dirty
      rows="3"
      density="comfortable"
      :value="userQuestion.content"
    >
    </v-textarea>
  </div>
</template>

<style lang="css" scoped></style>
