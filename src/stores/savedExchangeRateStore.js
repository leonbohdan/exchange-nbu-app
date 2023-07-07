import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@/composables/useLocalStorage.js';

const { getSavedExchangeRates, setSavedExchangeRates } = useLocalStorage();

export const savedExchangeRateStore = defineStore('savedExchangeRate', {
  state: () => ({
    list: [],
    listTotal: 0,
    listLoading: false,

    editCurrencyDialog: {
      isOpen: false,
      type: null,
      editData: null,
    },
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
      this.list = this.list.filter(exchange => exchange.r030 !== exchangeRate.r030);
      this.list.unshift(exchangeRate);
      setSavedExchangeRates(this.list);
    },

    removeExchangeRates(id) {
      this.list = this.list.filter(exchange => exchange.r030 !== id);
      setSavedExchangeRates(this.list);
    },

    updateEditCurrencyDialog(isOpen, type, editData) {
      this.editCurrencyDialog = {
        isOpen,
        type,
        editData,
      };
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(savedExchangeRateStore, import.meta.hot));
