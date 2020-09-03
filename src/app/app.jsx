import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppRoutes from './app.route';
import NetworkInterceptor from '../services/interceptor/interceptor';
import * as redux from '../store/createStore';
import environments from '../environments/environments';

NetworkInterceptor.setupInterceptors(redux.store);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router basename={environments.APP_BASE_NAME}>
        <AppRoutes {...this.props} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: { ...state.settings },
});

App.propTypes = {
  settings: PropTypes.object,
};

App.defaultProps = {
  settings: {},
};

export default connect(mapStateToProps, null)(App);
