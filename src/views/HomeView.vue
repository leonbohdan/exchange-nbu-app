<script setup>
import { ref } from 'vue';
import { format } from 'date-fns';
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

const addExchangeRate = (raw) => {
  console.log('addExchangeRate', raw);
};

const editExchangeRate = (raw) => {
  console.log('editExchangeRate', raw);
};

const removeExchangeRate = (raw) => {
  console.log('removeExchangeRate', raw);
};

const actions = [
  {
    name: 'Add exchange rate',
    icon: 'mdi-plus-circle-outline',
    isShow: true,
    action: (raw) => addExchangeRate(raw),
  }, {
    name: 'Edit exchange rate',
    icon: 'mdi-pencil-outline',
    isShow: true,
    action: (raw) => editExchangeRate(raw),
  }, {
    name: 'Remove exchange rate',
    icon: 'mdi-delete-outline',
    isShow: true,
    action: (raw) => removeExchangeRate(raw),
  },
];
</script>

<template>
  <v-card border>
    <v-expand-transition>
      <v-row dense align="center">
        <v-col class="pa-4 mr-auto">
          <span class="font-weight-bold">
            Current date:
          </span>

          {{ format(new Date(), 'dd MMMM yyyy') }}
        </v-col>
      </v-row>
    </v-expand-transition>

    <VDataTable
      :headers="headers"
      :items="exchangeRate.exchangeRateList"
      :loading="exchangeRate.exchangeRateListLoading"
      :items-per-page="10"
    >
      <template #item.actions="{ item }">
        <template v-for="({name, isShow, icon, action}, i) in actions">
          <v-btn
            v-if="isShow"
            :key="i"
            icon
            elevation="0"
            @click="action(item.raw)"
          >
            <v-icon :icon="icon"/>

            <v-tooltip
              activator="parent"
              location="bottom"
            >
              {{ name }}
            </v-tooltip>
          </v-btn>
        </template>
      </template>
    </VDataTable>
  </v-card>
</template>

<style lang="sass">
.v-table > .v-table__wrapper > table > thead > tr > th
  background-color: #F5F5F5
</style>
