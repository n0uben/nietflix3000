<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h1>Modifier le film</h1>

                <div v-if="message" class="alert alert-success fw-bold" role="alert">{{ message }}</div>
                <form @submit.prevent="handleForm">
                    <div class="form-group">
                        <label for="titre">Titre</label>
                        <input id="titre" v-model="this.film.nom" class="form-control" name="titre" type="text">
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" v-model="this.film.description" class="form-control" name="description"
                                  rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="date">Date de sortie</label>
                        <input id="date" v-model="this.film.dateSortie" class="form-control" name="date" type="date">
                    </div>

                    <div class="form-group mb-3">
                        <label for="duree">Durée</label>
                        <input id="duree" v-model="this.film.duree" class="form-control" name="duree" type="number">
                    </div>

                    <div class="form-group mb-3">
                        <label for="genre">Genre</label>
                        <input id="genre" v-model="this.film.genre" class="form-control" name="genre" required
                               type="text">
                    </div>
                    <div class="row mb-4">
                        <div class="col-1">
                            <img :alt="this.film.nom" :src="this.film.imageUrl">
                        </div>
                        <div class="col-11">
                            <p>Modifier l'image :</p>
                            <input id="image" class="form-control" name="image" type="file" @change="handleUpload">
                        </div>
                    </div>

                    <input class="btn btn-success" type="submit" value="valider"> -
                    <router-link class="btn btn-danger" to="/">Retour</router-link>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

import movieService from "@/services/MovieService";
import uploadService from "@/services/UploadService";

export default {
    name: "FilmView",
    props: ['id'],
    data() {
        return {
            'film': {},
            image: null,
            message: ''
        }
    },
    mounted() {
        this.getFilm()
    },
    methods: {
        handleForm() {
            if (this.image == null) {
                movieService.update(this.film).then(response => {
                    if (response.status === 200) {
                        this.message = "Film modifié !"
                    } else {
                        this.message = "Une erreur s'est produite !"
                    }

                    setTimeout(() => this.message = '', 5000)
                })
            } else {
                let formData = new FormData();
                formData.append("image", this.image);

                uploadService.upload(formData)
                    .then(response => {

                            this.film.imageUrl = response.data;

                            movieService.update(this.film).then(response => {
                                if (response.status === 200) {
                                    this.message = "Film modifié !"
                                } else {
                                    this.message = "Une erreur s'est produite !"
                                }

                                setTimeout(() => this.message = '', 5000)
                            })
                        }
                    )
            }
        },
        async getFilm() {
            try {
                const response = await movieService.getOne(this.id)
                this.film = response.data.data.movieById
            } catch (e) {
                console.error(e)
            }
        },
        handleUpload(event) {
            this.image = event.target.files[0];
        }
    }
}
</script>

<style scoped>

</style>