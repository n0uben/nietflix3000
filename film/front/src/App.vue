<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container-fluid">
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <RouterLink to="/" class="navbar-brand">
            Nietflix Films backoffice
          </RouterLink>
          <div class="navbar-nav">
              <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
              <RouterLink to="/documentation" class="nav-item nav-link">Documentation</RouterLink>
          </div>
        </nav>
      </div>
    </div>

  </header>

  <RouterView />

</template>

<style>

@import "bootstrap/dist/css/bootstrap.css";
</style>
