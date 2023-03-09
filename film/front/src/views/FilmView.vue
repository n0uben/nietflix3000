<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Modifier le film</h1>
        <MovieForm :movie="this.film" />
      </div>
    </div>
  </div>

</template>

<script>

import movieService from "@/services/MovieService";
import MovieForm from "@/components/MovieForm.vue";
export default {
  name: "FilmView",
  components: {MovieForm},
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