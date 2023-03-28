<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Créer un film</h1>

        <div class="alert alert-success fw-bold" role="alert" v-if="this.message">{{ this.message }}</div>
        <form @submit.prevent="handleForm" enctype="multipart/form-data">
          <div class="form-group mb-3">
            <label for="titre">Titre</label>
            <input type="text" id="titre" class="form-control" name="titre" v-model="this.nom" required>
          </div>

          <div class="form-group mb-3">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" name="description" rows="3"
                      v-model="this.description" required></textarea>
            <small id="descriptionHelp" class="form-text text-muted">Max 255 caractères</small>
          </div>

          <div class="form-group mb-3">
            <label for="date">Date de sortie</label>
            <input type="date" id="date" class="form-control" name="date" v-model="this.dateSortie" required>
          </div>

          <div class="form-group mb-3">
            <label for="duree">Durée</label>
            <input type="number" id="duree" class="form-control" name="duree" v-model="this.duree" required>
          </div>

          <div class="form-group mb-3">
            <label for="genre">Genre</label>
            <input type="text" id="genre" class="form-control" name="genre" v-model="this.genre" required>
          </div>

          <div class="form-group mb-4">
            <label for="image">Affiche</label>
            <input type="file" id="image" class="form-control" name="image" @change="handleUpload" required>
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
import uploadService from "@/services/UploadService";

export default {
  name: "CreateForm",
  data() {
    return {
      nom: '',
      description: '',
      dateSortie: 0,
      duree: 0,
      message: '',
      genre: '',
      image: null
    }
  },
  methods: {
    handleForm() {


      let formData = new FormData();
      formData.append("image", this.image);

      uploadService.upload(formData)
          .then(response => {

                console.log("url recuperee : " + response.data)

                let film = {
                  nom: this.nom,
                  description: this.description,
                  dateSortie: this.dateSortie,
                  duree: this.duree,
                  genre: this.genre,
                  imageUrl: response.data
                };

                movieService.create(film).then(response => {
                  if (response.status === 200) {
                    console.log("Movie renvoyé par back : " + response.data)
                    location.assign("/");
                  } else {
                    this.message = "une erreur s'est produite !"
                    setTimeout(() => this.message = "", 3000)
                  }
                });

              }
          )


    },
    handleUpload(event) {
      this.image = event.target.files[0];
    }
  }
}
</script>

<style scoped>

</style>