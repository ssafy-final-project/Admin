import { localAxios } from '@/util/http-commons';

const local = localAxios();

function getMetrics(endpoint, success, fail) {
  local.get(`/dashboard/metrics/${endpoint}`).then(success).catch(fail);
}

export { getMetrics };
