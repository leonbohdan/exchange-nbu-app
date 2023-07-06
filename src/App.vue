<script setup>
import { RouterView } from 'vue-router';
import HeaderLayout from "@/layouts/HeaderLayout.vue";
</script>

<template>
  <v-layout ref="app" class="rounded rounded-md">
    <v-app-bar color="indigo-lighten-5" name="app-bar">
      <HeaderLayout/>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>

    <v-footer
      app
      name="footer"
      color="indigo-lighten-1"
    >
      <v-container>
        footer
      </v-container>
    </v-footer>
  </v-layout>
</template>
