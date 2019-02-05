import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { actionTypes } from './actions';


const initialState = {
  currenciesList: {},
  fromCurrency: '',
  toCurrency: '',
  convertionResult: '',
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENCIES_LIST:
      return { ...state, currenciesList: { status: 'loading', payload: null } };
    case actionTypes.FETCH_CURRENCIES_LIST_DONE:
      return { ...state, currenciesList: { status: 'done', payload: action.payload } };
    case actionTypes.UPDATE_FROM_CURRENCY:
      return { ...state, fromCurrency: action.payload };
    case actionTypes.UPDATE_TO_CURRENCY:
      return { ...state, toCurrency: action.payload };
    case actionTypes.FETCH_CURRENCIES_CONVERTION_VAL_DONE:
      return { ...state, convertionResult: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({
  appState,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;
