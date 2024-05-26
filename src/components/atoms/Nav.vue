<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="toggleMenu">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:ml-6 sm:block">
            <ul class="flex space-x-4">
              <li v-for="(route, index) in routes" :key="index">
                <router-link :to="route.path" exact-active-class="text-blue-600" class="text-gray-300 hover:bg-gray-700 hover:text-white">{{ route.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" :class="{ 'block': isOpen, 'hidden':isOpen }" id="mobile-menu">
      <ul class="space-y-1 px-2 pb-3 pt-2">
        <li v-for="(route, index) in routes" :key="index">
          <router-link :to="route.path" exact-active-class="text-blue-600" class="text-gray-300 hover:bg-gray-700 hover:text-white">{{ route.name }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const isOpen = ref(false);
  const routes = [
    { path: '/', name: 'Inicio', isActive: () => router.currentRoute.value.path === '/' },
    { path: '/team', name: 'Team', isActive: () => router.currentRoute.value.path === '/team' },
  ];
  
  function toggleMenu() {
    isOpen.value =!isOpen.value;
  }
  </script>

  
  