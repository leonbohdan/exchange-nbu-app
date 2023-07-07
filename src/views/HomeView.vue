<script setup>
import ExchangeRateList from '@/components/ExchangeRateList.vue';
import { exchangeRateStore } from '@/stores/exchangeRateStore.js';

const exchangeRate = exchangeRateStore();

exchangeRate.getList();
</script>

<template>
  <v-card border>
    <ExchangeRateList />
  </v-card>
</template>

<style lang="sass">
.v-table > .v-table__wrapper > table > thead > tr > th
  background-color: #F5F5F5
</style>
