<script setup>
import {RouterLink} from "vue-router";
</script>

<script>
import movieService from "@/services/MovieService";

export default {
  name : 'HomeView',
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
        console.error(e)
      }
    },
    async supprimer(id) {
      try {
        const response = await movieService.delete(id);
        if (response.status === 200) {
          this.getAllMovies()
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<template>
  <div class="home container-fluid">

    <div class="row">
      <div class="col-xl-10 col-md-12">
        <h1>Gestion des films</h1>

        <div class="my-3">
            <RouterLink class="btn btn-primary" to="/creer">Ajouter</RouterLink>
        </div>

        <table class="table table-striped table-secondary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Films</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="film in this.films" :key="film.id">
              <th scope="row">{{ film.id }}</th>
              <td>{{ film.nom }}</td>
              <td>
                <RouterLink :to="{name: 'films', params: {id: film.id}}">modifier</RouterLink>
                /
                <a href="#" @click="supprimer(film.id)">supprimer</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <RouterView></RouterView>


  </div>
</template>

<style>
th {
  font-weight: bold;
}
</style>
