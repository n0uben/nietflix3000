<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container-fluid px-0">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-2">
          <RouterLink to="/" class="navbar-brand">
            Nietflix Films backoffice
          </RouterLink>
          <div class="navbar-nav">
              <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
              <RouterLink to="/documentation" class="nav-item nav-link">Documentation</RouterLink>
          </div>
        </nav>
  </header>

  <RouterView />

</template>

<style>
@import "bootstrap/dist/css/bootstrap.css";

body {
  padding: 0;
  margin: 0;
}
</style>
