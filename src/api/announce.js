import { localAxios } from "@/util/http-commons";

const local = localAxios();

// param : pageno (number)
function listAnnounce(param, success, fail) {
  local.get(`/notice`, { params: param }).then(success).catch(fail);
}

function detailAnnounce(announceNo, success, fail) {
  return local.get(`/notice/${announceNo}`).then(success).catch(fail);
}

function getNoticeCount(success, fail) {
  local.get(`/notice/count`).then(success).catch(fail);
}

function registAnnounce(announce, success, fail) {
  return local.post(`/notice`, JSON.stringify(announce)).then(success).catch(fail);
}

function getModifyAnnounce(announceNo, success, fail) {
  local.get(`/notice/modify/${announceNo}`).then(success).catch(fail);
}

function modifyAnnounce(announce, success, fail) {
  local.put(`/notice`, JSON.stringify(announce)).then(success).catch(fail);
}

function deleteAnnounce(announceNo, success, fail) {
  local.delete(`/notice/${announceNo}`).then(success).catch(fail);
}

export {
  listAnnounce,
  detailAnnounce,
  registAnnounce,
  getModifyAnnounce,
  modifyAnnounce,
  deleteAnnounce,
  getNoticeCount,
};
