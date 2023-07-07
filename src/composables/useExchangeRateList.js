import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { format, parse } from 'date-fns';
import { exchangeRateStore } from '@/stores/exchangeRateStore.js';
import { savedExchangeRateStore } from '@/stores/savedExchangeRateStore.js';
import { dateSearchExchangeRateStore } from '@/stores/dateSearchExchangeRateStore.js';
import { PAGE_NAME } from '@/constants/pages.constants.js';
import { DIALOG_TYPE } from '@/constants/dialogTypes.constants.js';

export function useExchangeRateList() {
  const exchangeRate = exchangeRateStore();
  const savedExchangeRate = savedExchangeRateStore();
  const dateSearchExchangeRate = dateSearchExchangeRateStore();

  const route = useRoute();

  const search = ref(null);
  const showConfirmDialog = ref(false);
  const deleteCurrencyId = ref(null);

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
      key: 'exchangedate',
      title: 'Date',
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

  const removeExchangeRate = () => {
    console.log('removeExchangeRate', deleteCurrencyId.value);
    savedExchangeRate.removeExchangeRates(deleteCurrencyId.value);
    showConfirmDialog.value = false;
    deleteCurrencyId.value = null;
  };

  const handleDeleteExchangeRate = (id) => {
    deleteCurrencyId.value = id;
    showConfirmDialog.value = true;
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
      action: (raw) => savedExchangeRate.updateEditCurrencyDialog(true, DIALOG_TYPE.Add, raw),
    }, {
      name: 'Edit exchange rate',
      icon: 'mdi-pencil-outline',
      isShow: isChangedPage.value,
      action: (raw) => savedExchangeRate.updateEditCurrencyDialog(true, DIALOG_TYPE.Edit, raw),
    }, {
      name: 'Remove exchange rate',
      icon: 'mdi-delete-outline',
      isShow: isChangedPage.value,
      action: (raw) => handleDeleteExchangeRate(raw.r030),
    },
  ];

  const currentStore = computed(() => {
    return isHomePage.value ? exchangeRate : isChangedPage.value ? savedExchangeRate : dateSearchExchangeRate;
  });

  const loading = computed(() => {
    return isHomePage.value ? exchangeRate.listLoading : isChangedPage.value ? savedExchangeRate.listLoading : dateSearchExchangeRate.listLoading;
  });

  const searchedItems = computed(() => {
    return search.value
      ? currentStore.value.list.filter(rate => rate.txt.toLowerCase().includes(search.value.toLowerCase()))
      : currentStore.value.list;
  });

  const currentDate = format(new Date(), 'dd.MM.yyyy');

  const chosenDate = ref(format(new Date(), 'yyyy.MM.dd'));

  const formattedDate = computed(() => {
    return format(new Date(chosenDate.value), 'dd.MM.yyyy');
  });

  const handleDate = () => {
    console.log('handleDate', chosenDate.value);
    console.log('handleDate parse', format(new Date(parse(chosenDate.value, 'yyyy.MM.dd', new Date())), 'yyyyMMdd'));
    const formattedDate = format(new Date(parse(chosenDate.value, 'yyyy.MM.dd', new Date())), 'yyyyMMdd');
    dateSearchExchangeRate.setChosenDate(formattedDate);
  };

  watch(() => dateSearchExchangeRate.params.date,
    (value) => {
      console.log('dateSearchExchangeRate.params.date', value);
      if (value) {
        dateSearchExchangeRate.getList();
      }
    },
    { immediate: true, deep: true },
  );

  return {
    showConfirmDialog,
    removeExchangeRate,
    loading,
    search,
    headers,
    actions,
    searchedItems,
    currentDate,
    isSearchPage,
    formattedDate,
    chosenDate,
    handleDate,
  };
}