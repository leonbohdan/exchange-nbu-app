<script setup>
import { VDataTable } from 'vuetify/labs/components';
import { useExchangeRateList } from '@/composables/useExchangeRateList.js';
import { exchangeRateStore } from '@/stores/exchangeRateStore.js';

const exchangeRate = exchangeRateStore();

const { search, headers, searchedItems, actions, currentDate } = useExchangeRateList();
</script>

<template>
  <v-expand-transition>
    <v-row dense align="center">
      <v-col cols="3">
        <v-text-field
          v-model="search"
          label="Search by currency"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          class="ma-2"
        />
      </v-col>

      <v-col cols="auto" class="pa-4 ml-auto">
        <span class="font-weight-bold">
          Current date:
        </span>

        {{ currentDate }}
      </v-col>
    </v-row>
  </v-expand-transition>

  <VDataTable
    :headers="headers"
    :items="searchedItems"
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
</template>
