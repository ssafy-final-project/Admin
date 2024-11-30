import { getMetrics } from '@/api/dashboard';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useDashboardStore = defineStore('dashboard', () => {
  const status = reactive({});

  const refreshStatus = (endpoint) => {
    getMetrics(
      endpoint,
      ({ data }) => {
        status[endpoint] = data;
      },
      console.log
    );
  };

  return {
    refreshStatus,
    status,
  };
});
