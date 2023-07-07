import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@/composables/useLocalStorage.js';

const { getSavedExchangeRates, setSavedExchangeRates, removeSavedExchangeRates } = useLocalStorage();

export const savedExchangeRateStore = defineStore('savedExchangeRate', {
  state: () => ({
    list: [],
    listTotal: 0,
    listLoading: false,
  }),

  actions: {
    async getList() {
      try {
        this.listLoading = true;

        const savedList = getSavedExchangeRates();

        if (savedList) {
          this.list = savedList;
          this.listTotal = savedList.length;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.listLoading = false;
      }
    },

    setExchangeRates(exchangeRate) {
      setSavedExchangeRates(exchangeRate);
      this.list.unshift(exchangeRate);
    },

    removeExchangeRates() {
      removeSavedExchangeRates();
      this.list = [];
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(savedExchangeRateStore, import.meta.hot));
