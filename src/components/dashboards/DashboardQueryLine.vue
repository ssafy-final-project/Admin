<script setup>
import { onMounted, ref, watch } from 'vue';
import ApexCharts from 'apexcharts';
import { useDashboardStore } from '@/stores/dashboardStore';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';

const chartdiv = ref(null);
const chart = ref(null);
const store = useDashboardStore();
const { status } = storeToRefs(store);

onMounted(() => {
  const options = {
    series: [
      {
        name: 'Series A',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: 'Series B',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    chart: {
      height: '100%',
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'DB Query Usage',
      align: 'left',
      margin: 20,
      style: {
        fontSize: '25px',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans KR',
        color: '#263238',
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      reversed: true,
    },
    yaxis: [
      {
        title: {
          text: 'Connections',
        },
        min: 0,
        max: 100, // Connections의 최대값에 맞춤
      },
      {
        opposite: true, // 오른쪽 Y축 사용
        title: {
          text: 'Queries',
        },
      },
    ],
  };

  chart.value = new ApexCharts(chartdiv.value, options);
  chart.value.render();
});

watch(
  () => status.value['db'],
  () => {
    if (!chart.value) return;
    const data = status.value['db'].reverse();

    const metricTime = data.map((item) => dayjs(new Date(...item.metric_time)).format('HH:mm'));
    const connections = data.map((item) => item.connections);
    const queries = data.map((item) => Math.max(item.queries_difference, 0));

    chart.value.updateOptions({
      xaxis: {
        categories: metricTime,
      },
    });

    chart.value.updateSeries([
      {
        name: 'Connections',
        data: connections,
      },
      {
        name: 'Queries',
        data: queries,
      },
    ]);
  }
);
</script>

<template>
  <div ref="chartdiv"></div>
</template>

<style scoped></style>
