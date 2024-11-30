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
    series: [],
    chart: {
      type: 'bar',
      height: '100%',
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    title: {
      text: 'Endpoint Latency Usage',
      align: 'left',
      margin: 20,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans KR',
        color: '#263238',
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {},
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  chart.value = new ApexCharts(chartdiv.value, options);
  chart.value.render();
});

watch(
  () => status.value['endpoint'],
  () => {
    if (!chart.value) return;
    const data = status.value['endpoint'];

    // 1. 데이터를 엔드포인트별로 그룹화
    const groupedData = data.reduce((acc, item) => {
      const endpoint = item.endpoint;
      const method = item.method;
      const avgResponseTime = item.averageResponseTime.toFixed(2);

      if (!acc[endpoint]) {
        acc[endpoint] = {};
      }
      acc[endpoint][method] = avgResponseTime;
      return acc;
    }, {});

    // 2. X축 카테고리 생성 (엔드포인트 목록)
    const categories = Object.keys(groupedData);

    // 3. HTTP 메서드별로 데이터 정리
    const methods = Array.from(
      new Set(data.map((item) => item.method)) // 고유한 메서드 추출
    );

    const series = methods.map((method) => ({
      name: method,
      data: categories.map((endpoint) => groupedData[endpoint][method] || 0), // 없는 경우 0 처리
    }));

    // 4. ApexCharts 업데이트
    chart.value.updateOptions({
      xaxis: {
        categories, // 엔드포인트 목록
      },
    });

    chart.value.updateSeries(series);
  }
);
</script>

<template>
  <div ref="chartdiv"></div>
</template>

<style scoped></style>
