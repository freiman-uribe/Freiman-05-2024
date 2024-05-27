import { defineStore } from 'pinia';
import axios from 'axios';

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
  id: number; // Adding 'id' field as it is used in the selectPokemonTeam action
  name: string;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  cries?: {
    latest: string;
    legacy: string;
  };
}

interface PokemonState {
  pokemons: Pokemon[];
  pokemon: Pokemon | null;
  teamPokemon: Pokemon[];
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemons: [],
    pokemon: null,
    teamPokemon: []
  }),
  actions: {
    async fetchFindPokemon(id: number) { // Change 'id' type to number to match usage in the template
      try {
        const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        this.pokemon = response.data;
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    },
    async fetchPokemons() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        const pokemonPromises = response.data.results.map(async (pokemon: { url: string }) => {
          const { data } = await axios.get<Pokemon>(pokemon.url);
          return data;
        });
        const pokemons = await Promise.all(pokemonPromises);
        this.pokemons = pokemons;
      } catch (error) {
        console.error('Error fetching Pokemons:', error);
      }
    },
    selectPokemonTeam(pokemon: Pokemon) {
      const pokemonIndex = this.teamPokemon.findIndex(element => element.id === pokemon.id);
      if (this.teamPokemon.length === 6 && pokemonIndex < 0) return;

      if (pokemonIndex >= 0) {
        this.teamPokemon.splice(pokemonIndex, 1);
      } else {
        this.teamPokemon = [...this.teamPokemon, pokemon];
      }
    }    
  },
  getters: {
    getPokemon: (state: PokemonState) => state.pokemon,
    getPokemonsList: (state: PokemonState) => state.pokemons,
    getPokemonsTeam: (state: PokemonState) => state.teamPokemon
  }
});
