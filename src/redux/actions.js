
export const actionTypes = {
  FETCH_CURRENCIES_LIST: 'FETCH_CURRENCIES_LIST',
  FETCH_CURRENCIES_LIST_DONE: 'FETCH_CURRENCIES_LIST_DONE',
  FETCH_CURRENCIES_CONVERTION_VAL: 'FETCH_CURRENCIES_CONVERTION_VAL',
  FETCH_CURRENCIES_CONVERTION_VAL_DONE: 'FETCH_CURRENCIES_CONVERTION_VAL_DONE',
  UPDATE_FROM_CURRENCY: 'UPDATE_FROM_CURRENCY',
  UPDATE_TO_CURRENCY: 'UPDATE_TO_CURRENCY',
};

const BASE_URL = 'https://free.currencyconverterapi.com/api/v6';

export const getCurrenciesList = () => (dispatch) => {
  const url = `${BASE_URL}/currencies`;
  dispatch({ type: actionTypes.FETCH_CURRENCIES_LIST, payload: null });
  fetch(url).then(response => response.json()).then((data) => {
    const currencies = Object.values(data.results);
    dispatch({ type: actionTypes.FETCH_CURRENCIES_LIST_DONE, payload: currencies });
    dispatch({ type: actionTypes.UPDATE_FROM_CURRENCY, payload: currencies[0].id });
    dispatch({ type: actionTypes.UPDATE_TO_CURRENCY, payload: currencies[0].id });
  });
};

export const getCurrenciesConverionVal = (currencies, value) => (dispatch) => {
  const url = `${BASE_URL}/convert?q=${currencies.from}_${currencies.to}`;
  dispatch({ type: actionTypes.FETCH_CURRENCIES_CONVERTION_VAL, payload: null });
  fetch(url).then(response => response.json()).then((data) => {
    const rateValue = data.results[`${currencies.from}_${currencies.to}`].val;
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
