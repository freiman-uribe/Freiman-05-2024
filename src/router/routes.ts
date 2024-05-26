import { createRouter, createWebHistory } from "vue-router";
import PagePokemon from "../pages/PagePokemon.vue";
import OrganismPokemonTeam from "../components/organisms/OrganismPokemonTeam.vue";
import PageNotFont from "../pages/PageNotFont.vue";
import OrganismsPokemon from "../components/organisms/OrganismsPokemon.vue";

const routes = [
  { path: "/", component: PagePokemon },
  { path: "/team", component: OrganismPokemonTeam },
  { path: "/team/:id", component: OrganismsPokemon },
  { path: '/:catchAll(.*)*', component: PageNotFont }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;