'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Confetti from 'react-confetti';
import Image from 'next/image';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { FloatingSquares, Loader, QuestionCard } from '@/components';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage = () => {
  //Custom hooks & RTQ Hooks
  const { data: countryQuestion, error, isLoading } = useGetDestinationsQuery();
  const { windowWidth, windowHeight } = useWindowSize();

  //Hooks
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const randomNumberRef = useRef<number>(Math.floor(Math.random() * 2));
  const correctAnswersRef = useRef<number>(0);
  const wrongAnswersRef = useRef<number>(0);

  const handleRadioButtonSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);

    if (
      event.target.value ===
      `${countryQuestion?.[currentQuestion]?.city} - ${countryQuestion?.[currentQuestion]?.country}`
    ) {
      // showing confetti and updating correct answer count
      setShowConfetti(true);
      correctAnswersRef.current = correctAnswersRef.current + 1;
    } else {
      //updating wrong answer count
      wrongAnswersRef.current = wrongAnswersRef.current + 1;
    }
  };

  const handleNextQuestionClick = () => {
    setCurrentQuestion(currentQuestion + 1); //Redirect to New Question
    setShowConfetti(false); // Disable Confetti
    setSelectedOption(null); // Remove Previously selected option
  };

  const getMainScreenContent = () => {
    if (isLoading) return <Loader />;

    if (error)
      return (
        <div className={cx('error-state')}>
          Oops, All of our servers are under maintenance. We will be back soon !!{' '}
        </div>
      );

    if (currentQuestion == countryQuestion?.length)
      return <p className={cx('game-over')}>That's all for today - Game Over !!</p>;

    return (
      <QuestionCard
        currentQuestion={currentQuestion}
        countryQuestion={countryQuestion}
        selectedOption={selectedOption}
        handleRadioButtonSelection={handleRadioButtonSelection}
      />
    );
  };

  return (
    <section className={cx('homepage-container')}>
      <div className={cx('glass-box')}>
        <FloatingSquares />
        <h1 className={cx('heading')}>Globetrotter - The Ultimate Travel Guessing Game!</h1>
        {getMainScreenContent()}
        {selectedOption ? (
          <div className={cx('fun-fact')}>
            Fun Fact : {countryQuestion?.[currentQuestion]?.fun_fact[randomNumberRef.current]}
          </div>
        ) : null}
        <div className={cx('game-info-container')}>
          <span>&#x1F3C6; Total Score : {correctAnswersRef.current}</span>
          <span>&#9989; Correct : {correctAnswersRef.current}</span>
          <span>&#10060; Wrong : {wrongAnswersRef.current}</span>
        </div>

        <div className={cx('button-container')}>
          <button className={cx('challenge-btn')}>&#x2694; Challenge a Friend</button>
          <button
            className={cx('next-btn', !selectedOption && 'disabled-btn')}
            onClick={handleNextQuestionClick}
            disabled={!selectedOption}
          >
            &#x23ED; Next Question
          </button>
        </div>

        {currentQuestion == countryQuestion?.length ? (
          <Image src="/game-over.png" alt="Game Over" width={100} height={100} priority />
        ) : null}
      </div>
      {selectedOption ? (
        showConfetti ? (
          <Confetti
            width={windowWidth}
            height={windowHeight}
            recycle={false}
            numberOfPieces={2000}
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
