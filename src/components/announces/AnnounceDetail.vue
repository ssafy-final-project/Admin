<template>
  <div>
    <AnnounceCommonForm
      :ptitle="announce?.title ?? ''"
      :pcontent="announce?.content ?? ''"
      :preadonly="true"
      @modify-announce="updateAnnounce"
      @delete-announce="deleteNotice"
    ></AnnounceCommonForm>
  </div>
</template>

<script setup>
import AnnounceCommonForm from "./AnnounceCommonForm.vue";
import { detailAnnounce, modifyAnnounce, deleteAnnounce } from "@/api/announce";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const announce = ref(null);

watch(
  () => route.params.noticeNo,
  (noticeNo) => {
    detailAnnounce(
      noticeNo,
      ({ data }) => {
        announce.value = data;
      },
      (err) => console.log(err)
    );
  },
  { immediate: true }
);

const updateAnnounce = (announce) => {
  console.log(announce);
  modifyAnnounce(
    { ...announce, notice_no: route.params.noticeNo },
    ({ data }) => console.log(data),
    (err) => console.log(err)
  );
};

const deleteNotice = () => {
  deleteAnnounce(
    route.params.noticeNo,
    ({ data }) => {
      console.log(data);
      alert("글이 성공적으로 삭제되었습니다!");
      router.replace("/announce");
    },
    (err) => console.log(err)
  );
};
</script>
