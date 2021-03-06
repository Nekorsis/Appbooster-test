import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCurrenciesList, handleFromCurrency, handleToCurrency, getRates, addToFavorites,
} from '../redux/actions';

class Rates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
    };
  }

  componentWillMount() {
    const { getCurrenciesListAction, fromCurrency } = this.props;
    getCurrenciesListAction();
  }

  handleCurrencyChange = (e) => {
    const { getRatesAction } = this.props;
    this.setState({ currency: e.target.value });
    getRatesAction(e.target.value);
  }

  render() {
    const {
      currenciesList, exchangeRates, addToFavoritesAction, favorites,
    } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <div>
          {favorites.length > 0 && favorites.map(k => (
            <div key={k}>{k}</div>
          ))}
          <span>Select currency </span>
          <select onChange={this.handleCurrencyChange}>
            {currenciesList.payload && currenciesList.payload.map(k => (
              <option value={k} key={k}>{k}</option>
            ))}
          </select>
          {exchangeRates.payload && exchangeRates.payload.map(k => (
            <div key={k.name}>
              {`${currency} to ${k.name} is ${k.value}`}
              <button type="button" onClick={() => { addToFavoritesAction(`${currency} to ${k.name} is ${k.value}`); }}> add to favorites</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const bindActions = dispatch => ({
  getCurrenciesListAction: bindActionCreators(getCurrenciesList, dispatch),
  handleFromCurrencyAction: bindActionCreators(handleFromCurrency, dispatch),
  handleToCurrencyAction: bindActionCreators(handleToCurrency, dispatch),
  getRatesAction: bindActionCreators(getRates, dispatch),
  addToFavoritesAction: bindActionCreators(addToFavorites, dispatch),
});

const mapStateToProps = state => ({
  currenciesList: state.appState.currenciesList,
  fromCurrency: state.appState.fromCurrency,
  toCurrency: state.appState.toCurrency,
  exchangeRates: state.appState.exchangeRates,
  favorites: state.appState.favorites,
});

export default connect(mapStateToProps, bindActions)(Rates);
