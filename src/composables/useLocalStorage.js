import localStorageService from '@/services/localStorage.service.js';
import { LOCAL_STORAGE_NAME } from '@/constants/localStorage.constants.js'; 

export function useLocalStorage() {
  const getSavedExchangeRates = () => {
    return localStorageService.get(LOCAL_STORAGE_NAME.Exchange);
  };

  const setSavedExchangeRates = (exchangeRate) => {
    localStorageService.set(LOCAL_STORAGE_NAME.Exchange, exchangeRate);
  };

  const removeSavedExchangeRates = () => {
    localStorageService.remove(LOCAL_STORAGE_NAME.Exchange);
  };

  return {
    getSavedExchangeRates,
    setSavedExchangeRates,
    removeSavedExchangeRates,
  };
}
