import { defineStore, acceptHMRUpdate } from 'pinia'; 
import { getExchangeList } from '@/api/config.js';

export const exchangeRateStore = defineStore('exchangeRate', {
  state: () => ({
    list: [],
    listTotal: 0,
    listLoading: false,

    params: {
      json: '',
      data: null,
    },
  }),

  actions: {
    async getList() {
      try {
        this.listLoading = true;

        const { data } = await getExchangeList(this.params);

        this.list = data;
        this.listTotal = data.length;
      } catch (e) {
        console.error(e);
      } finally {
        this.listLoading = false;
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(exchangeRateStore, import.meta.hot));
