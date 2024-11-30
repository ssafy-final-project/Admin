import { localAxios } from "@/util/http-commons";

const local = localAxios();

// param : pageno (number)
function listQna(param, success, fail) {
  local.get(`/qna`, { params: param }).then(success).catch(fail);
}

function detailQna(qnaNo, success, fail) {
  return local.get(`/qna/${qnaNo}`).then(success).catch(fail);
}

function getQnaCount(success, fail) {
  return local.get(`/qna/count`).then(success).catch(fail);
}

function registQna(Qna, success, fail) {
  return local.post(`/qna`, JSON.stringify(Qna)).then(success).catch(fail);
}

function getModifyQna(qnaNo, success, fail) {
  local.get(`/qna/modify/${qnaNo}`).then(success).catch(fail);
}

function modifyQna(Qna, success, fail) {
  local.put(`/qna/${Qna.qnaNo}`, JSON.stringify(Qna)).then(success).catch(fail);
}

// function resolveQuestion(qNo, success, fail) {
//   local.put(`/qna/resolve/${qNo}`).then(success).catch(fail);
// }

function deleteQna(qnaNo, success, fail) {
  local.delete(`/qna/${qnaNo}`).then(success).catch(fail);
}

export { listQna, detailQna, registQna, getModifyQna, modifyQna, deleteQna, getQnaCount };
