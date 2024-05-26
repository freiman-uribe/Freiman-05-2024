<template>
    <img :src="src" :alt="alt">
  </template>
  
<script setup lang="ts">
  import { defineProps } from 'vue';
  
  defineProps<{
    src: string;
    alt: string;
  }>();
</script>
  