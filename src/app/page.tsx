'use client';

import { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  const { data: countryQuestion, error, isLoading } = useGetDestinationsQuery();
  const [selectedOption, setSelectedOption] = useState('option1');
  const currentQuestionRef = useRef<number>(0);
  const randomNumberRef = useRef<number>(Math.floor(Math.random() * 2));

  const handleOptionSelection = (event: ChangeEvent<HTMLInputElement>) => {
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
                {countryQuestion?.[currentQuestionRef.current]?.clues[randomNumberRef.current]} ?
              </p>
              <div className={cx('options-container')}>
                {countryQuestion?.[currentQuestionRef.current]?.options?.map((option) => (
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
