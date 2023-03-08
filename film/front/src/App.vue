<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
import movieService from "@/services/MovieService";

export default {
  data() {
    return {
      films: []
    }
  },

  mounted() {
    this.getAllMovies();
  },
  methods: {
    async getAllMovies() {
      try {
        const response = await movieService.getAll()
        this.films = response.data.data.allMovies
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>

<!--  <RouterView />-->
    <div>
      <p v-for="film in this.films" :key="film.id">Film : {{film.nom}}</p>
    </div>
</template>

<style scoped>


</style>
