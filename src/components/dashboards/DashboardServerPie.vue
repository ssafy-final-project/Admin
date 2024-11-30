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
    series: [0, 0],
    chart: {
      width: '100%',
      height: '100%',
      type: 'donut',
    },
    labels: ['Free Memory', 'Used Memory'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    title: {
      text: 'Server Memory Usage',
      align: 'left',
      margin: 20,
      style: {
        fontSize: '25px',
        fontWeight: 'bold',
        fontFamily: 'Noto Sans KR',
        color: '#263238',
      },
    },
    legend: {
      position: 'right',
      offsetY: 50,
      height: 230,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '30px',
              fontFamily: 'Noto Sans',
              color: '#000',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '30px',
              fontFamily: 'Noto Sans',
              color: '#000',
              offsetY: 16,
              formatter: function (val) {
                return (val / 10 ** 9).toFixed(2) + 'GB';
              },
            },
            total: {
              show: true,
              fontSize: '20px',
              fontFamily: 'Noto Sans',
              label: 'Total',
              color: '#000',
              formatter: function (w) {
                return (
                  (
                    w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0) /
                    10 ** 9
                  ).toFixed(2) + 'GB'
                );
              },
            },
          },
        },
      },
    },
  };

  chart.value = new ApexCharts(chartdiv.value, options);
  chart.value.render();
});

watch(
  () => status.value['server'],
  () => {
    if (!chart.value) return;
    const data = status.value['server'];

    const { freeMemory, usedMemory } = data;
    chart.value.updateSeries([freeMemory, usedMemory]);
  }
);
</script>

<template>
  <div ref="chartdiv"></div>
</template>

<style scoped></style>
