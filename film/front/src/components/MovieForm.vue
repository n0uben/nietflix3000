<template>
  <form @submit.prevent="handleForm">
    <div class="form-group">
      <label for="titre">Titre</label>
      <input type="text" id="titre" class="form-control" name="titre" :value="movie.nom">
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" class="form-control" name="description" rows="3">{{movie.description}}</textarea>
      <small id="descriptionHelp" class="form-text text-muted">Max 255 caractères</small>
    </div>

    <div class="form-group">
      <label for="date">Date de sortie</label>
      <input type="date" id="date" class="form-control" name="date" :value="movie.dateSortie">
    </div>

    <div class="form-group">
      <label for="duree">Durée</label>
      <input type="number" id="duree" class="form-control" name="duree" :value="movie.duree">
    </div>

    <input type="submit" value="valider" class="btn btn-success">
  </form>
</template>

<script>
export default {
  name: "MovieForm",
  props: ["movie"],
  data() {
    return {
      film: {}
    }
  },
  methods: {
    handleForm() {
      console.log("coucou")
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}
</style>