<template>
    <span v-for="(typePokemon, index) in types" :key="index" class="inline-flex items-center rounded-md bg-green-100 ml-2 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{ typePokemon.type.name }}</span>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    types: Array<{ type: { name: string } }>;
}>();
</script>
  