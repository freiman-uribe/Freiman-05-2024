<template>
    <div class="p-4 rounded shadow-lg" :class="[publishedBooksMessage? 'bg-blue-100': 'bg-white ']" @click="selectTeam(pokemon)">
      <AtomImage :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon?.name || 'Pokemon Image'" class="object-contain h-32 w-full mb-4"/>
      <h4 class="text-xl font-bold text-center">{{ pokemon.name }}</h4>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed, ref } from 'vue';
  import { usePokemonStore } from '../../store/usePokemonStore';
  import AtomImage from './AtomImage.vue';
  
  interface Pokemon {
    name: string;
    id: number; // Asumiendo que el ID es un número basado en el error anterior
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  }
  
  interface Store {
    getPokemonsTeam: Pokemon[];
    selectPokemonTeam: (pokemon: Pokemon) => Promise<void>;
  }
  
  const store = usePokemonStore() as unknown as Store;
  
  const props = defineProps<{
    pokemon: Pokemon;
  }>();
  
  const listTeam = ref<Pokemon[]>([]);
  
  const publishedBooksMessage = computed(() => {
    if (store.getPokemonsTeam.length > 0) {
      const index = store.getPokemonsTeam.findIndex((element) => props.pokemon.id === element.id);
      return index >= 0;
    }
    return false;
  });
  
  const selectTeam = (pokemon: Pokemon) => {
    store.selectPokemonTeam(pokemon).then(() => {
      listTeam.value = store.getPokemonsTeam;
    });
  };
  </script>
  