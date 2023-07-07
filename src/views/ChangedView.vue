<script setup>
import ExchangeRateList from '@/components/ExchangeRateList.vue';
import { savedExchangeRateStore } from '@/stores/savedExchangeRateStore.js';

const savedExchangeRate = savedExchangeRateStore();

savedExchangeRate.getList();
</script>

<template>
  <v-card border>
    <ExchangeRateList />
  </v-card>
</template>
