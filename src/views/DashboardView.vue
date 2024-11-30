<script setup>
import DashboardEndpointStack from '@/components/dashboards/DashboardEndpointStack.vue';
import DashboardQueryLine from '@/components/dashboards/DashboardQueryLine.vue';
import DashboardRegionTree from '@/components/dashboards/DashboardRegionTree.vue';
import DashboardServerPie from '@/components/dashboards/DashboardServerPie.vue';
import { useDashboardStore } from '@/stores/dashboardStore';

const store = useDashboardStore();
const endpoints = ['server', 'hikari', 'db', 'regional', 'endpoint'];
const timers = [];

for (let e of endpoints) {
  store.refreshStatus(e);
  timers[e] = setInterval(() => {
    store.refreshStatus(e);
  }, 3000);
}
</script>

<template>
  <div id="container" class="w-full mx-auto h-full grid grid-cols-6 gap-4">
    <div class="xl:col-span-3 col-span-full mainbox">
      <DashboardServerPie></DashboardServerPie>
    </div>
    <div class="xl:col-span-3 col-span-full mainbox">
      <DashboardQueryLine></DashboardQueryLine>
    </div>
    <div class="xl:col-span-3 col-span-full mainbox">
      <DashboardEndpointStack></DashboardEndpointStack>
    </div>
    <div class="xl:col-span-3 col-span-full mainbox">
      <DashboardRegionTree></DashboardRegionTree>
    </div>
  </div>
</template>

<style scoped>
#container {
  padding: 10px;
}

#container > div {
  border-radius: 10px;
  padding: 5px;
  background-color: white;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

#container > div:hover {
  background-color: #eee;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
}

#container > p {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mainbox {
  height: 600px;
}

.subbox {
  height: 400px;
}

.auxbox {
  height: 200px;
}
</style>
