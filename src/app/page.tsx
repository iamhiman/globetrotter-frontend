'use client';

import classNames from 'classnames/bind';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import styles from './page.module.scss';
import { ChangeEvent, useState } from 'react';
const cx = classNames.bind(styles);

export default function Home() {
  const { data, error, isLoading } = useGetDestinationsQuery();
  const [selectedOption, setSelectedOption] = useState('option1');

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
                hbdsf sg sgsfg sfdgdgdgdgdsgdsggsfg sfd fhfd fgsfd fggsfg sdgsdg sdgsg fgfsdg rgre
                sfgsfg sgsfg sdgsfdg?
              </p>
              <div className={cx('options-container')}>
                <div className={cx('option-container')}>
                  <input
                    type="radio"
                    name="question"
                    id="first-option"
                    className={cx('option')}
                    value="option1"
                    checked={selectedOption === 'option1'}
                    onChange={handleOptionSelection}
                  />
                  <label htmlFor="first-option" className={cx('option-label')}>
                    New Delhi - India
                  </label>
                </div>
                <div className={cx('option-container')}>
                  <input
                    type="radio"
                    name="question"
                    id="second-option"
                    className={cx('option')}
                    value="option2"
                    checked={selectedOption === 'option2'}
                    onChange={handleOptionSelection}
                  />
                  <label htmlFor="second-option" className={cx('option-label')}>
                    Large
                  </label>
                </div>
                <div className={cx('option-container')}>
                  <input
                    type="radio"
                    name="question"
                    id="third-option"
                    className={cx('option')}
                    value="option3"
                    checked={selectedOption === 'option3'}
                    onChange={handleOptionSelection}
                  />
                  <label htmlFor="third-option" className={cx('option-label')}>
                    Large3
                  </label>
                </div>
                <div className={cx('option-container')}>
                  <input
                    type="radio"
                    name="question"
                    id="fourth-option"
                    className={cx('option')}
                    value="option4"
                    checked={selectedOption === 'option4'}
                    onChange={handleOptionSelection}
                  />
                  <label htmlFor="fourth-option" className={cx('option-label')}>
                    Large4
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('fun-fact')}></div>
        </div>
      </section>
    </main>
  );
}
