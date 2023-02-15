<template>
    <h1>Holaaaaa confirm MP</h1>
  </template>
  
  <script setup>
    import {onMounted} from 'vue'
    import {useChartStore} from '../store/chart';
    const chartStore = useChartStore();
  
    onMounted(async()=>{
          chartStore.prevChart();
        })
  </script>
  
  <style scoped>
    h1{
      color: white;
    }
  </style>