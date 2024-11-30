<script setup>
import { onMounted, ref, watch } from 'vue';
import ApexCharts from 'apexcharts';
import { useDashboardStore } from '@/stores/dashboardStore';
import { storeToRefs } from 'pinia';

const chartdiv = ref(null);
const chart = ref(null);

const store = useDashboardStore();
const { status } = storeToRefs(store);

onMounted(() => {
  const options = {
    series: [],
    legend: {
      show: false,
    },
    chart: {
      width: '100%',
      height: '100%',
      type: 'treemap',
    },
    title: {
      text: 'Regional API Requests',
      align: 'left',
      margin: 20,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans KR',
        color: '#263238',
      },
    },
  };

  chart.value = new ApexCharts(chartdiv.value, options);
  chart.value.render();
});

watch(
  () => status.value['regional'],
  () => {
    if (!chart.value) return;
    const data = status.value['regional'];
    const mapped_data = data.map((e) => {
      return { x: e.region_name, y: e.query_count };
    });
    chart.value.updateSeries([
      {
        name: 'Query Count',
        data: mapped_data,
      },
    ]);
  }
);
</script>

<template>
  <div ref="chartdiv"></div>
</template>

<style scoped></style>
