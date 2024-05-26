<!-- ProjectsPage.vue -->
<template>
    <TemplatePokemon>
        <template #title>
            <h1 class="text-2xl"> Pokemones </h1>
        </template>
        <template #list>
            <OrganismsPockemosList/>
        </template>
    </TemplatePokemon>
</template>

<script setup>
import TemplatePokemon from '../templates/TemplatePokemon.vue';
import OrganismsPockemosList from '../components/organisms/OrganismsPockemosList.vue'
import Nav from '../components/atoms/Nav.vue'
</script>

<style scoped>
</style>