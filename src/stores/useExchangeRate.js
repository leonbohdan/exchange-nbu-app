import { defineStore, acceptHMRUpdate } from 'pinia';
import {getExchangeList} from "@/api/config.js";

export const useExchangeRate = defineStore('exchangeRate', {
  state: () => ({
    exchangeRateList: [],
    exchangeRateListTotal: 0,
    exchangeRateListLoading: false,

    params: {
      json: '',
      data: null,
    },
  }),

  actions: {
    async getExchangeRateList() {
      try {
        this.exchangeRateListLoading = true;

        const { data } = await getExchangeList(this.params);

        this.exchangeRateList = data;
        this.exchangeRateListTotal = data.length;
      } catch (e) {
        console.error(e);
      } finally {
        this.exchangeRateListLoading = false;
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useExchangeRate, import.meta.hot));
