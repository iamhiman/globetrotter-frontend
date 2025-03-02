import React from 'react';
import classNames from 'classnames/bind';
import styles from './FloatingSquares.module.scss';

const cx = classNames.bind(styles);

const FloatingSquares = () => {
  return (
    <div className={cx('floating-squares-container')}>
      <div className={cx('square')} />
      <div className={cx('square')} />
      <div className={cx('square')} />
    </div>
  );
};

export default FloatingSquares;
