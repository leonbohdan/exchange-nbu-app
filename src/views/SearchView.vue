<script setup>
import ExchangeRateList from '@/components/ExchangeRateList.vue';
import { dateSearchExchangeRateStore } from '@/stores/dateSearchExchangeRateStore.js';

const dateSearchExchangeRate = dateSearchExchangeRateStore();

dateSearchExchangeRate.getList();
</script>

<template>
  <v-card border>
    <ExchangeRateList />
  </v-card>
</template>
