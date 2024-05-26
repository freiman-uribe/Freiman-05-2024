<template>
        <div class="bg-white p- rounded shadow-lg">
            <AtomImage :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon?.name || 'Pokemon Image'" class="object-contain h-32 w-full mb-4"/>
            <h4 class="text-xl font-bold text-center">{{ pokemon.name }}</h4>
            <div class="flex justify-between items-center">
                <router-link class="mx-4" :to="`/team/${pokemon.id}`">Ver mas...</router-link>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="selectTeam(pokemon)">Eliminar</button>
            </div>
        </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { usePokemonStore } from '../../store/usePokemonStore'
import AtomImage from '../atoms/AtomImage.vue'

const store = usePokemonStore();
interface Pokemon {
    name: string;
    url: string;
}

defineProps<{
  pokemon: Pokemon;
}>();

const selectTeam = (pokemon : Object) => {
    store.selectPokemonTeam(pokemon)
}
</script>