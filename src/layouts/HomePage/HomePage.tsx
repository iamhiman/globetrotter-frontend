'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Confetti from 'react-confetti';
import Image from 'next/image';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { FloatingSquares, QuestionCard } from '@/components';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage = () => {
  //Custom hooks & RTQ Hooks
  const { data: countryQuestion, error, isLoading } = useGetDestinationsQuery();
  const { windowWidth, windowHeight } = useWindowSize();

  //Hooks
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const currentQuestionRef = useRef<number>(0);
  const randomNumberRef = useRef<number>(Math.floor(Math.random() * 2));

  const handleRadioButtonSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    if (
      event.target.value ===
      `${countryQuestion?.[currentQuestionRef.current]?.city} - ${countryQuestion?.[currentQuestionRef.current]?.country}`
    ) {
      setShowConfetti(true);
    }
  };

  return (
    <section className={cx('homepage-container')}>
      <div className={cx('glass-box')}>
        <FloatingSquares />
        <div className={cx('question-container')}>
          <h2 className={cx('heading')}>Globetrotter - The Ultimate Travel Guessing Game!</h2>
          <QuestionCard
            currentQuestion={currentQuestionRef.current}
            countryQuestion={countryQuestion}
            selectedOption={selectedOption}
            handleRadioButtonSelection={handleRadioButtonSelection}
          />
        </div>
        {selectedOption ? (
          <div className={cx('fun-fact')}>
            Fun Fact :{' '}
            {countryQuestion?.[currentQuestionRef.current]?.fun_fact[randomNumberRef.current]}
          </div>
        ) : null}
        <div className={cx('game-info-container')}>
          <span>&#x1F3C6; Total Score : 5</span>
          <span>&#9989; Correct : 3</span>
          <span>&#10060; Wrong : 3</span>
        </div>

        <div className={cx('button-container')}>
          <button className={cx('challenge-btn')}>&#x2694; Challenge a Friend</button>
          <button className={cx('next-btn')}>&#x23ED; Next Question</button>
        </div>
      </div>
      {selectedOption ? (
        showConfetti ? (
          <Confetti
            width={windowWidth}
            height={windowHeight}
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
  );
};

export default HomePage;
