'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Confetti from 'react-confetti';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import styles from './page.module.scss';
import Image from 'next/image';

const cx = classNames.bind(styles);

export default function Home() {
  const { data: countryQuestion, error, isLoading } = useGetDestinationsQuery();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const currentQuestionRef = useRef<number>(0);
  const randomNumberRef = useRef<number>(Math.floor(Math.random() * 2));
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure it's client-side

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOptionSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    if (
      event.target.value ===
      `${countryQuestion?.[currentQuestionRef.current]?.city} - ${countryQuestion?.[currentQuestionRef.current]?.country}`
    ) {
      setShowConfetti(true);
    }
  };

  return (
    <main className={cx('main-container')}>
      <section className={cx('homepage-section')}>
        <div className={cx('box')}>
          <div className={cx('square')} />
          <div className={cx('square')} />
          <div className={cx('square')} />
          <div className={cx('container')}>
            <h2 className={cx('heading')}>Globetrotter - The Ultimate Travel Guessing Game!</h2>
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
                      disabled={!!selectedOption}
                    />
                    <label
                      htmlFor={option}
                      className={cx(
                        'option-label',
                        selectedOption !== option && selectedOption != null && 'option-disabled',
                      )}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {selectedOption ? (
            <div className={cx('fun-fact')}>
              Fun Fact :{' '}
              {countryQuestion?.[currentQuestionRef.current]?.fun_fact[randomNumberRef.current]}
            </div>
          ) : null}
        </div>
        {selectedOption ? (
          showConfetti ? (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={2000}
              // onConfettiComplete={() => setShowConfetti(false)}
            />
          ) : (
            <Image
              src="/sad.gif"
              alt="Sad Face"
              width={250}
              height={250}
              priority
              className={cx('sad-image', 'hide-sad-image')}
            />
          )
        ) : null}
      </section>
    </main>
  );
}
