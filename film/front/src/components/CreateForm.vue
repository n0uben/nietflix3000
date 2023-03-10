<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Créer un film</h1>

        <div class="alert alert-success fw-bold" role="alert" v-if="this.message">{{this.message}}</div>
        <form @submit.prevent="handleForm">
          <div class="form-group">
            <label for="titre">Titre</label>
            <input type="text" id="titre" class="form-control" name="titre" v-model="this.nom">
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" name="description" rows="3" v-model="this.description"></textarea>
            <small id="descriptionHelp" class="form-text text-muted">Max 255 caractères</small>
          </div>

          <div class="form-group">
            <label for="date">Date de sortie</label>
            <input type="date" id="date" class="form-control" name="date" v-model="this.dateSortie">
          </div>

          <div class="form-group mb-3">
            <label for="duree">Durée</label>
            <input type="number" id="duree" class="form-control" name="duree" v-model="this.duree">
          </div>

          <input type="submit" value="valider" class="btn btn-success"> -
          <router-link to="/" class="ml-2 btn btn-danger">Retour</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import movieService from "@/services/MovieService";
export default {
  name: "CreateForm",
  data() {
    return {
      nom: '',
      description: '',
      dateSortie: 0,
      duree: 0,
      message: ''
    }
  },
  methods: {
    handleForm() {
      let film = {
        nom: this.nom,
        description: this.description,
        dateSortie: this.dateSortie,
        duree: this.duree
      };

      movieService.create(film).then(response => {
        if (response.status === 200) {
          location.assign("/");
        } else {
          this.message = "une erreur s'est produite !"
          setTimeout(() => this.message = "", 3000)
        }
      });
    }
  }
}
</script>

<style scoped>

</style>