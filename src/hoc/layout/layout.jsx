import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './layout.module.scss';
import Loader from '../../components/loader/loader';
import errorConfigs from '../../utils/error-configs';
import { errorHandler } from '../../store/common/actions/common.actions';
import StatusModal from '../../components/status-modal/status-modal';
import Header from '../../components/header/header';

class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleError(error, errorHandlerAction) {
    switch (error.status) {
      case 401:
        return (
          <StatusModal
            message={errorConfigs['401'].message}
            status="failed"
            onClose={() => errorHandlerAction(null)}
          />
        );
      case 403:
        return (
          <StatusModal
            message={errorConfigs['403'].message}
            status="failed"
            onClose={() => errorHandlerAction(null)}
          />
        );
      default:
        return (
          <StatusModal
            message={errorConfigs['default'].message}
            status="failed"
            onClose={() => errorHandlerAction(null)}
          />
        );
    }
  }

  render() {
    const {
      error,
      action__errorHandler,
      children,
      common,
    } = this.props;
    const { loader } = common;
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles['routes']}>{children}</div>
        {loader ? <Loader /> : []}
        {error ? this.handleError(error, action__errorHandler) : []}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  common: { ...state.common },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      action__errorHandler: errorHandler,
    },
    dispatch,
  );

Layout.propTypes = {
  error: PropTypes.object,
  children: PropTypes.object,
  common: PropTypes.object,
  action__errorHandler: PropTypes.func,
};

Layout.defaultProps = {
  error: null,
  children: {},
  common: {},
  action__errorHandler: Function,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
