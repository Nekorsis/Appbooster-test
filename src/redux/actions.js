
export const actionTypes = {
  FETCH_CURRENCIES_LIST: 'FETCH_CURRENCIES_LIST',
  FETCH_CURRENCIES_LIST_DONE: 'FETCH_CURRENCIES_LIST_DONE',
  FETCH_CURRENCIES_CONVERTION_VAL: 'FETCH_CURRENCIES_CONVERTION_VAL',
  FETCH_CURRENCIES_CONVERTION_VAL_DONE: 'FETCH_CURRENCIES_CONVERTION_VAL_DONE',
  UPDATE_FROM_CURRENCY: 'UPDATE_FROM_CURRENCY',
  UPDATE_TO_CURRENCY: 'UPDATE_TO_CURRENCY',
  FETCH_EXCHANGE_RATES: 'FETCH_EXCHANGE_RATES',
  FETCH_EXCHANGE_RATES_DONE: 'FETCH_EXCHANGE_RATES_DONE',
};

const BASE_RATE_URL = 'https://ratesapi.io/api/';

export const getCurrenciesList = () => (dispatch) => {
  const url = `${BASE_RATE_URL}latest`;
  dispatch({ type: actionTypes.FETCH_CURRENCIES_LIST, payload: null });
  fetch(url).then(response => response.json()).then((data) => {
    const currencies = [...Object.keys(data.rates), data.base];
    dispatch({ type: actionTypes.FETCH_CURRENCIES_LIST_DONE, payload: currencies });
    dispatch({ type: actionTypes.UPDATE_FROM_CURRENCY, payload: currencies[0] });
    dispatch({ type: actionTypes.UPDATE_TO_CURRENCY, payload: currencies[0] });
  });
};

export const getCurrenciesConverionVal = (currencies, value) => (dispatch) => {
  const url = `${BASE_RATE_URL}latest?base=${currencies.from}&symbols=${currencies.to}`;
  dispatch({ type: actionTypes.FETCH_CURRENCIES_CONVERTION_VAL, payload: null });
  fetch(url).then(response => response.json()).then((data) => {
    const rateValue = data.rates[`${currencies.to}`];
    const result = parseFloat(value) * rateValue;
    dispatch({ type: actionTypes.FETCH_CURRENCIES_CONVERTION_VAL_DONE, payload: result });
  });
};

export const handleFromCurrency = e => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_FROM_CURRENCY, payload: e });
};


export const handleToCurrency = e => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_TO_CURRENCY, payload: e });
};

export const getRates = currency => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_EXCHANGE_RATES, payload: null });
  const url = `${BASE_RATE_URL}latest?base=${currency}`;
  fetch(url).then(response => response.json()).then((data) => {
    const result = [];
    Object.keys(data.rates).forEach((key) => {
      result.push({ name: key, value: data.rates[key] });
    });
    dispatch({ type: actionTypes.FETCH_EXCHANGE_RATES_DONE, payload: result });
  });
};
