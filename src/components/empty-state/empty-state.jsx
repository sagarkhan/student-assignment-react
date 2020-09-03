import React from 'react';
import styles from './empty-state.module.scss';
import notFoundImage from '../../assets/images/not-found.svg';

const EmptyState = () => (
  <div className={styles['container']}>
    <img src={notFoundImage} alt="not-found" width="150" height="150" />
    <p className={styles['text']}> No Records </p>
  </div>
);

export default EmptyState;
