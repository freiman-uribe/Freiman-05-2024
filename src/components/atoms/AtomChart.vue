<template>
    <VueApexCharts type="radar" height="350" :options="chartOptions" :series="series"></VueApexCharts>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

defineProps<{
    chartOptions: object;
    series: Array<object>;
}>();
</script>
  