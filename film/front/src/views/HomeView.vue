<script setup>
import {RouterLink} from "vue-router";
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
  <div class="home container-fluid">

    <div class="row">
      <div class="col">
        <h1>HomePage</h1>

        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Films</th>
            </tr>
          </thead>

          <tbody>
          <tr v-for="film in this.films">

          </tr>
          </tbody>

        </table>
        <ul>
          <li v-for="film in this.films" :key="film.id">Film : {{film.nom}}</li>
          <router-link to="/documentation">mon super lien</router-link>
        </ul>
      </div>
    </div>


  </div>
</template>
