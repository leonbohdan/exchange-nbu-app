<script setup>
import { RouterView } from 'vue-router';
import HeaderLayout from '@/layouts/HeaderLayout.vue';
import FooterLayout from '@/layouts/FooterLayout.vue';
import { savedExchangeRateStore } from '@/stores/savedExchangeRateStore.js';

const savedExchangeRate = savedExchangeRateStore();

savedExchangeRate.getList();
</script>

<template>
  <v-layout ref="app" class="rounded rounded-md">
    <HeaderLayout/>

    <v-main class="d-flex" style="min-height: 100vh;">
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>

    <FooterLayout/>
  </v-layout>
</template>
