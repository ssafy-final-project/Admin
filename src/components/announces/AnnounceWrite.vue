<template>
  <div>
    <AnnounceCommonForm @create-Announce="createAnnounce" status="write"></AnnounceCommonForm>
  </div>
</template>

<script setup>
import AnnounceCommonForm from "./AnnounceCommonForm.vue";
import { registAnnounce } from "@/api/announce";
import { useRouter } from "vue-router";

const router = useRouter();

const createAnnounce = async (announce) => {
  await registAnnounce(
    announce,
    ({ data }) => {
      console.log(data);
    },
    (err) => console.log(err)
  );
  router.push("/announce");
};
</script>
