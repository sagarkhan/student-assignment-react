import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './404.scss';

const NotFound = (props) => {
  const { classes = {} } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.heading} ${classes.primaryText}`}>
          404 Error
        </p>
        <p className={`${styles.subtitle} ${classes.primaryText}`}>
          We couldn’t find what you are looking for !
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          Home
        </Link>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  classes: PropTypes.object,
};

NotFound.defaultProps = {
  classes: {},
};

export default NotFound;
