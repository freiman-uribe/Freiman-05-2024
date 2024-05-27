<template>
    <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
      <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-8xl md:px-4 lg:max-w-4xl">
        <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
              <AtomImage :src="pokemonImage" :alt="pokemon?.name || 'Pokemon Image'" class="object-cover object-center"/>
              <div>
                <AtomChart :chartOptions="chartOptions" :series="series"/>
              </div>
            </div>
            <div class="sm:col-span-8 lg:col-span-7">
              <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ pokemon?.name || 'Nombre' }}</h2>
              <section aria-labelledby="information-heading" class="mt-2">
                <h3 id="information-heading" class="sr-only">Product information</h3>
                <span class="text-1xl text-gray-900">Peso: {{ (pokemon?.weight || 0) / 10 }} m / Altura: {{ (pokemon?.height || 0) / 10 }} Kg</span>
                <div class="mt-6">
                  <h4 class="sr-only">Reviews</h4>
                  <div class="flex items-center">
                    <div class="flex items-center">
                      Tipo: <AtomBadges :types="pokemon?.types || []"/>
                    </div>
                  </div>
                </div>
              </section>
              <section aria-labelledby="options-heading" class="mt-10">
                <h3 id="options-heading" class="sr-only">Product options</h3>
                <fieldset class="mt-10" aria-label="Choose a size">
                  <div class="flex items-center justify-between">
                    <p class="text-xl font-semibold">Descripcion</p>
                  </div>
                  <div class="mt-4">
                    {{ pokemonDesc }}
                  </div>
                </fieldset>
                <AtomAudioPlayer :src="pokemonCrie" :alt="pokemon?.name || 'Pokemon Cry'" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"/>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 py-8">
      <p class="text-4xl font-semibold">Evoluciones</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="evolution in evolutions" :key="evolution.id" class="bg-white p-4 rounded shadow-lg">
          <AtomImage :src="evolution.sprites.other.dream_world.front_default" :alt="evolution?.name || 'Pokemon Image'" class="object-contain h-32 w-full mb-4"/>
          <h4 class="text-xl font-bold text-center">{{ evolution.name }}</h4>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { usePokemonStore } from '../../store/usePokemonStore';
  
  import AtomImage from '../atoms/AtomImage.vue';
  import AtomBadges from '../atoms/AtomBadges.vue';
  import AtomChart from '../atoms/AtomChart.vue';
  import AtomAudioPlayer from '../molecules/MoleculeAudioPlayer.vue';
  
  // Define interfaces for Pokemon data
  interface PokemonType {
    type: {
      name: string;
    };
  }
  
  interface PokemonStat {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  
  interface PokemonSprites {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  }
  
  interface Pokemon {
    name: string;
    weight: number;
    height: number;
    sprites: PokemonSprites;
    types: PokemonType[];
    stats: PokemonStat[];
    cries: {
      latest: string;
      legacy: string;
    };
  }
  
  interface SeriesData {
    name: string;
    data: number[];
  }
  
  interface ChartOptions {
    title?: {
      text: string;
    };
    xaxis?: {
      categories: string[];
    };
  }
  
  interface Evolution {
    id: number;
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  }
  
  // Setup state variables
  const route = useRoute();
  const store = usePokemonStore();
  
  const pokemon = ref<Pokemon | null>(null);
  const pokemonImage = ref<string>('');
  const pokemonCrie = ref<string>('');
  const pokemonDesc = ref<string>('');
  
  const series = ref<SeriesData[]>([]);
  const evolutions = ref<Evolution[]>([]);
  const evolutionNames = ref<string[]>([]);
  const chartOptions = ref<ChartOptions>({});
  
  const fetchPokemonSpecie = async () => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${route.params.id}`);
      let description = '';
      data.flavor_text_entries.forEach((element: any) => {
        if (element.language.name === 'es') {
          description += `${element.flavor_text} `;
        }
      });
      pokemonDesc.value = description.trim();
      await fetchEvolutions(data.evolution_chain.url);
    } catch (error) {
      console.error('Error al obtener la especie del Pokémon:', error);
    }
  };
  
  const fetchEvolutions = async (urlEvolutions: string) => {
    try {
      const { data } = await axios.get(urlEvolutions);
      const evolutionChain = data.chain;
  
      const getEvolutionNames = (chain: any) => {
        evolutionNames.value.push(chain.species.name);
        chain.evolves_to.forEach((evolution: any) => getEvolutionNames(evolution));
      };
  
      getEvolutionNames(evolutionChain);
  
      const evolutionsList: Evolution[] = [];
      for (const name of evolutionNames.value) {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        evolutionsList.push(data);
      }
  
      evolutions.value = evolutionsList;
    } catch (error) {
      console.error('Error fetching evolutions:', error);
    }
  };
  
  const list = async () => {
    await store.fetchFindPokemon(route.params.id as number).then(async () => {
      const fetchedPokemon = store.getPokemon as Pokemon;
      pokemon.value = fetchedPokemon;
      pokemonImage.value = fetchedPokemon.sprites.other.dream_world.front_default;
      pokemonCrie.value = fetchedPokemon.cries.latest || fetchedPokemon.cries.legacy;
  
      const categories = fetchedPokemon.stats.map((item: PokemonStat) => item.stat.name);
      const data = fetchedPokemon.stats.map((item: PokemonStat) => item.base_stat);
  
      series.value = [{
        name: 'Base Stat',
        data: data
      }];
  
      chartOptions.value = {
        xaxis: {
          categories: categories
        }
      };
    });
  };
  
  onMounted(async () => {
    await list();
    await fetchPokemonSpecie();
  });
</script>
  
<style scoped>
  .audio-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
  