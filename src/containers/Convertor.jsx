import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCurrenciesList, getCurrenciesConverionVal, handleFromCurrency, handleToCurrency,
} from '../redux/actions';
import './Convertor.css';

class Convertor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrencyValue: '1',
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
    if (!fromCurrencyValue || fromCurrency === toCurrency) {
      return;
    }
    getCurrenciesConverionValAction(currencies, fromCurrencyValue);
  }

  render() {
    const {
      currenciesList, handleFromCurrencyAction, handleToCurrencyAction, convertionResult,
    } = this.props;
    return (
      <div>
        <div className="content-container">
          <input onChange={this.handleFromCurrencyValueInput} type="number" defaultValue="1" />
          <div>
            <select onChange={(e) => { handleFromCurrencyAction(e.target.value); }}>
              {currenciesList.payload && currenciesList.payload.map(k => (
                <option value={k} key={`from_${k}`}>{k}</option>
              ))}
            </select>
          </div>
          <span>To</span>
          <div>
            <select onChange={(e) => { handleToCurrencyAction(e.target.value); }}>
              {currenciesList.payload && currenciesList.payload.map(k => (
                <option value={k} key={`to_${k}`}>{k}</option>
              ))}
            </select>
          </div>
          <button onClick={this.handleConvertion} type="button">Convert</button>
          {convertionResult && (
          <span>
            {`Result: ${convertionResult} `}
          </span>
          )}
        </div>
        <a href="/rates">check out exchange rates</a>
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

export default connect(mapStateToProps, bindActions)(Convertor);
