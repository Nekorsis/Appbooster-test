import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Convertor from './containers/Convertor';
import Rates from './containers/Rates';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Convertor} />
          <Route path="/rates" component={Rates} />
        </Switch>
      </Router>
    );
  }
}
