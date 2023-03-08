<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>{{this.film.id}} - {{this.film.nom}}</h1>

        <p>{{this.film.description}}</p>
      </div>
    </div>
  </div>

</template>

<script>

import movieService from "@/services/MovieService";
export default {
  name: "FilmView",
  props: ['id'],
  data() {
    return {
      'film': {}
    }
  },
  mounted() {
    this.getBatiment()
  },
  methods: {
    async getBatiment() {
      try {
        const response = await movieService.getOne(this.id)
        this.film = response.data.data.movieById
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>