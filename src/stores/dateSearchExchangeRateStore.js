import { defineStore, acceptHMRUpdate } from 'pinia';
import { getExchangeList } from '@/api/config.js';
import { format } from 'date-fns';

const currentDate = format(new Date(), 'yyyy.MM.dd');

export const dateSearchExchangeRateStore = defineStore('dateSearchExchangeRate', {
  state: () => ({
    list: [],
    listTotal: 0,
    listLoading: false,

    params: {
      json: '',
      data: currentDate,
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
  import.meta.hot.accept(acceptHMRUpdate(dateSearchExchangeRateStore, import.meta.hot));
