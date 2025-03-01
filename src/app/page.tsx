"use client"

import classNames from 'classnames/bind';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import styles from './page.module.scss';
const cx = classNames.bind(styles);

export default function Home() {
  const { data, error, isLoading } = useGetDestinationsQuery();
  console.log({ data, error, isLoading });

  return (
    <main className={cx('main-container')}>
      <section className={cx('homepage-section')}>
        <div className={cx('box')}>
          <div className={cx('square')} />
          <div className={cx('square')} />
          <div className={cx('square')} />
          <div className={cx('container')}>
            <h2>Globetrotter - The Ultimate Travel Guessing Game!</h2>
          </div>
        </div>
      </section>
    </main>
  );
}
