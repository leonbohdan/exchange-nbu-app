import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { exchangeRateStore } from '@/stores/exchangeRateStore.js';
import { savedExchangeRateStore } from '@/stores/savedExchangeRateStore.js';
import { dateSearchExchangeRateStore } from '@/stores/dateSearchExchangeRateStore.js';
import { PAGE_NAME } from '@/constants/pages.constants.js';

export function useExchangeRateList() {
  const exchangeRate = exchangeRateStore();
  const savedExchangeRate = savedExchangeRateStore();
  const dateSearchExchangeRate = dateSearchExchangeRateStore();

  const route = useRoute();

  const search = ref(null);

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

  const isHomePage = computed(() => {
    return route.name === PAGE_NAME.Home;
  });

  const isChangedPage = computed(() => {
    return route.name === PAGE_NAME.Changed;
  });

  const isSearchPage = computed(() => {
    return route.name === PAGE_NAME.Search;
  });

  const actions = [
    {
      name: 'Add exchange rate',
      icon: 'mdi-plus-circle-outline',
      isShow: !isChangedPage.value,
      action: (raw) => addExchangeRate(raw),
    }, {
      name: 'Edit exchange rate',
      icon: 'mdi-pencil-outline',
      isShow: true,
      action: (raw) => editExchangeRate(raw),
    }, {
      name: 'Remove exchange rate',
      icon: 'mdi-delete-outline',
      isShow: isChangedPage.value,
      action: (raw) => removeExchangeRate(raw),
    },
  ];

  const currentStore = computed(() => {
    return isHomePage.value ? exchangeRate : isChangedPage.value ? savedExchangeRate : dateSearchExchangeRate;
  });

  const searchedItems = computed(() => {
    return search.value
      ? currentStore.value.list.filter(rate => rate.txt.toLowerCase().includes(search.value.toLowerCase()))
      : currentStore.value.list;
  });

  const currentDate = format(new Date(), 'dd.MM.yyyy');

  return {
    search,
    headers,
    actions,
    searchedItems,
    currentDate,
  };
}