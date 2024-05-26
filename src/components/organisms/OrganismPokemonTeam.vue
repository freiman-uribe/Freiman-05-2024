<template>
    <div class=" mx-auto px-4 py-8">
        <p class="text-4xl font-semibold">Team</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <MoleculeCard v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon" @click="selectTeam(pokemon)"/>
        </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MoleculeCard from '../molecules/MoleculeCard.vue'
import { usePokemonStore } from '../../store/usePokemonStore'

const store = usePokemonStore();

const pokemons = ref([]);

onMounted(() => {
    pokemons.value = store.getPokemonsTeam
});

const listTeam = ref([])

const selectTeam = (pokemon) => {
    listTeam.value.push(pokemon);
}

</script>
