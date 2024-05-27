<template>
    <div class="mx-auto px-4 py-8">
      <p class="text-4xl font-semibold">Team</p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MoleculeCard v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon" @click="selectTeam(pokemon)" />
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import MoleculeCard from '../molecules/MoleculeCard.vue';
  import { usePokemonStore } from '../../store/usePokemonStore';// Assuming you have a type for Pokemon
  
  const store = usePokemonStore();
  export interface Pokemon {
    id: number;
    name: string;
    }
  const pokemons = ref<Pokemon[]>([]);
  
  onMounted(() => {
    pokemons.value = store.getPokemonsTeam;
  });
  
  const listTeam = ref<Pokemon[]>([]);
  
  const selectTeam = (pokemon: Pokemon) => {
    listTeam.value.push(pokemon);
  };
</script>