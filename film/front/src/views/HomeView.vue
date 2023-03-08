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

        <table class="table table-striped table-secondary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Films</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
          <tr v-for="film in this.films">
            <th scope="row">{{film.id}}</th>
            <td>{{film.nom}}</td>
            <td><RouterLink to="/">modifier</RouterLink> / <RouterLink to="/">supprimer</RouterLink> </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>

<style>
  th {
    font-weight: bold;
  }
</style>
