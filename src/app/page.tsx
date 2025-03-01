'use client';

import classNames from 'classnames/bind';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import styles from './page.module.scss';
import { ChangeEvent, useState } from 'react';
const cx = classNames.bind(styles);

export default function Home() {
  const { data: countryQuestion, error, isLoading } = useGetDestinationsQuery();
  const [selectedOption, setSelectedOption] = useState('option1');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleOptionSelection = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setSelectedOption(event.target.value);
  };

  return (
    <main className={cx('main-container')}>
      <section className={cx('homepage-section')}>
        <div className={cx('box')}>
          <div className={cx('square')} />
          <div className={cx('square')} />
          <div className={cx('square')} />
          <div className={cx('container')}>
            <h2>Globetrotter - The Ultimate Travel Guessing Game!</h2>
            <div className={cx('questions-container')}>
              <p className={cx('question')}>
                {countryQuestion?.[currentQuestion]?.clues[Math.floor(Math.random() * 2)]} ?
              </p>
              <div className={cx('options-container')}>
                {countryQuestion?.[currentQuestion]?.options?.map((option) => (
                  <div className={cx('option-container')} key={option}>
                    <input
                      type="radio"
                      name="question"
                      id={option}
                      className={cx('option')}
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionSelection}
                    />
                    <label htmlFor={option} className={cx('option-label')}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx('fun-fact')}></div>
        </div>
      </section>
    </main>
  );
}
