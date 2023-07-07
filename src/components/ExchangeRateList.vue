<script setup>
import { VDataTable } from 'vuetify/labs/components';
import { useExchangeRateList } from '@/composables/useExchangeRateList.js';
import { savedExchangeRateStore } from '@/stores/savedExchangeRateStore.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import EditCurrencyDialog from '@/components/dialogs/EditCurrencyDialog.vue';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';

const savedExchangeRate = savedExchangeRateStore();

const {
  search,
  headers,
  searchedItems,
  actions,
  currentDate,
  showConfirmDialog,
  removeExchangeRate,
  loading,
  isSearchPage,
  chosenDate,
  formattedDate,
  handleDate,
} = useExchangeRateList();
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

      <v-spacer/>

      <v-col v-if="isSearchPage" cols="auto" class="pa-4">
        <VueDatePicker
          v-model="chosenDate"
          model-type="yyyy.MM.dd"
          :enable-time-picker="false"
          :format="formattedDate"
          :teleport="true"
          :vertical="true"
          @update:model-value="handleDate"
        />
      </v-col>

      <v-col v-else cols="auto" class="pa-4 ml-auto">
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
    :loading="loading"
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
