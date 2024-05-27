<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AtomCard from '../atoms/AtomCard.vue';
import { usePokemonStore } from '../../store/usePokemonStore';

const store = usePokemonStore();
export interface Pokemon {
  id: number;
  name: string;
}
const pokemons = ref<Pokemon[]>([]);

onMounted(async () => {
  await store.fetchPokemons();
  pokemons.value = store.getPokemonsList as Pokemon[];
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AtomCard v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon" />
    </div>
  </div>
</template>

<style scoped>
</style>
