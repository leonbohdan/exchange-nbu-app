<script setup>
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { useExchangeRate } from '@/stores/useExchangeRate.js';

const exchangeRate = useExchangeRate();

exchangeRate.getExchangeRateList();

const headers = ref([
  {
    key: 'r030',
    title: 'Id',
    sortable: false,
    filterable: false,
    align: 'start',
  }, {
    key: 'cc',
    title: 'Abbreviation',
    sortable: false,
    filterable: false,
    align: 'center',
  }, {
    key: 'txt',
    title: 'Currency',
    sortable: false,
    filterable: false,
    align: 'center',
  }, {
    key: 'rate',
    title: '1 UAH',
    sortable: false,
    filterable: false,
    align: 'center',
  }, {
    key: 'actions',
    title: 'Actions',
    sortable: false,
    filterable: false,
    align: 'center',
  },
]);
</script>

<template>
  <v-card border>
    <v-expand-transition>
      <v-row dense align="center">
        <v-col class="pa-4 mr-auto">
          Date: {{ new Date() }}
        </v-col>
      </v-row>
    </v-expand-transition>

    <VDataTable
      :headers="headers"
      :items="exchangeRate.exchangeRateList"
      :loading="exchangeRate.exchangeRateListLoading"
      :items-per-page="10"
    />
    <!--    sdf-->
    <!--  </VDataTable>-->
  </v-card>
</template>
