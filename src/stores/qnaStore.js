import { defineStore } from "pinia";
import { listQna, getQnaCount } from "@/api/qna";

export const useQnaStore = defineStore("qna", () => {
  const questions = ref([]);
  const questionCnt = ref(0);
  const qMaxPage = ref(0);
  const answers = ref([]);
  const answerCnt = ref(0);

  const init = () => {
    // 페이지 초기화
    getQnaCount(
      ({ data }) => (qMaxPage.value = data % 10 == 0 ? data / 10 : data / 10 + 1),
      (err) => console.log(err)
    );
  };
});
