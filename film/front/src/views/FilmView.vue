<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Modifier le film</h1>

        <div class="alert alert-success fw-bold" role="alert" v-if="message">{{message}}</div>
        <form @submit.prevent="handleForm">
          <div class="form-group">
            <label for="titre">Titre</label>
            <input type="text" id="titre" class="form-control" name="titre" v-model="this.film.nom">
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" name="description" rows="3" v-model="this.film.description"></textarea>
            <small id="descriptionHelp" class="form-text text-muted">Max 255 caractères</small>
          </div>

          <div class="form-group">
            <label for="date">Date de sortie</label>
            <input type="date" id="date" class="form-control" name="date" v-model="this.film.dateSortie">
          </div>

          <div class="form-group mb-3">
            <label for="duree">Durée</label>
            <input type="number" id="duree" class="form-control" name="duree" v-model="this.film.duree">
          </div>

          <input type="submit" value="valider" class="btn btn-success">
        </form>
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
      'film': {},
      message: ''
    }
  },
  mounted() {
    this.getFilm()
  },
  methods: {
    async getFilm() {
      try {
        const response = await movieService.getOne(this.id)
        this.film = response.data.data.movieById
      } catch (e) {
        console.error(e)
      }
    },
    handleForm() {
      movieService.update(this.film).then(response => {
        if (response.status === 200) {
          this.message = "Film modifié !"
        } else {
          this.message = "Une erreur s'est produite !"
        }

        setTimeout(() => this.message = '', 5000)
      })
    }
  }
}
</script>

<style scoped>

</style>