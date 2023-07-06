<script setup>
import { useExchangeRate } from '@/stores/useExchangeRate.js';

const exchangeRate = useExchangeRate();

exchangeRate.getExchangeRateList();
</script>

<template>
  <div class="d-flex align-center justify-center">
    <h1>Home Page</h1>
  </div>
</template>
