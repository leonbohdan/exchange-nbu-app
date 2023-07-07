<script setup>
import { VDataTable } from 'vuetify/labs/components';
import { useExchangeRateList } from '@/composables/useExchangeRateList.js';
import { exchangeRateStore } from '@/stores/exchangeRateStore.js';
import { savedExchangeRateStore } from '@/stores/savedExchangeRateStore.js';
import EditCurrencyDialog from '@/components/dialogs/EditCurrencyDialog.vue';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';

const savedExchangeRate = savedExchangeRateStore();
const exchangeRate = exchangeRateStore();

const { search, headers, searchedItems, actions, currentDate, showConfirmDialog, removeExchangeRate } = useExchangeRateList();
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

  <EditCurrencyDialog
    v-model="savedExchangeRate.editCurrencyDialog.isOpen"
  />

  <ConfirmDialog
    v-model="showConfirmDialog"
    title="Delete currency"
    message="Are you sure, do you want to delete this currency?"
    @confirm-value="removeExchangeRate"
  />
</template>
