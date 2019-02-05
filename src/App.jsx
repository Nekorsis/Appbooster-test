import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCurrenciesList, getCurrenciesConverionVal, handleFromCurrency, handleToCurrency,
} from './redux/actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrencyValue: '',
    };
  }

  componentWillMount() {
    const { getCurrenciesListAction } = this.props;
    getCurrenciesListAction();
  }

  handleFromCurrencyValueInput = (e) => {
    this.setState({ fromCurrencyValue: e.target.value });
  }


  handleConvertion = () => {
    const { getCurrenciesConverionValAction, fromCurrency, toCurrency } = this.props;
    const { fromCurrencyValue } = this.state;
    const currencies = { from: fromCurrency, to: toCurrency };
    if (!fromCurrencyValue) {
      return;
    }
    getCurrenciesConverionValAction(currencies, fromCurrencyValue);
  }

  getCurrencySymbol = () => {
    const { currenciesList, toCurrency } = this.props;
    const result = currenciesList.payload.find(k => (k.id === toCurrency));
    return result.currencySymbol;
  }

  render() {
    const {
      currenciesList, handleFromCurrencyAction, handleToCurrencyAction, convertionResult,
    } = this.props;
    return (
      <div className="App">
        <div className="content-container">
          <div>
            <select onChange={(e) => { handleFromCurrencyAction(e.target.value); }}>
              {currenciesList.payload && currenciesList.payload.map(k => (
                <option value={k.id} key={k.id}>{k.currencyName}</option>
              ))}
            </select>
            <input onChange={this.handleFromCurrencyValueInput} type="text" defaultValue="11" />
          </div>
          <div>
            <select onChange={(e) => { handleToCurrencyAction(e.target.value); }}>
              {currenciesList.payload && currenciesList.payload.map(k => (
                <option value={k.id} key={k.id}>{k.currencyName}</option>
              ))}
            </select>
          </div>
          <button onClick={this.handleConvertion} type="button">Convert</button>
          {convertionResult && (
          <p>
            {`Result: ${convertionResult} `}
            <span>{this.getCurrencySymbol()}</span>
          </p>
          )}
        </div>
      </div>
    );
  }
}

const bindActions = dispatch => ({
  getCurrenciesListAction: bindActionCreators(getCurrenciesList, dispatch),
  getCurrenciesConverionValAction: bindActionCreators(getCurrenciesConverionVal, dispatch),
  handleFromCurrencyAction: bindActionCreators(handleFromCurrency, dispatch),
  handleToCurrencyAction: bindActionCreators(handleToCurrency, dispatch),
});

const mapStateToProps = state => ({
  currenciesList: state.appState.currenciesList,
  fromCurrency: state.appState.fromCurrency,
  toCurrency: state.appState.toCurrency,
  convertionResult: state.appState.convertionResult,
});

export default connect(mapStateToProps, bindActions)(App);
