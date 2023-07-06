import axios from 'axios';

const api = axios.create({ baseURL: 'https://bank.gov.ua/NBUStatService/v1' });

export const getExchangeList = (params) => api.get(
  '/statdirectory/exchange',
  { params },
);
