'use client';

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Confetti from 'react-confetti';
import Image from 'next/image';
import { WhatsappShareButton, WhatsappIcon } from 'next-share';
import { useGetDestinationsQuery } from '@/store/globetrotterApi';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { FloatingSquares, Loader, Modal, QuestionCard, CopyToClipboard } from '@/components';
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [formInput, setFormInput] = useState({ show: false, value: '' });
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formInput.value.trim()) return;
    setFormInput({ show: false, value: formInput.value });
    setModalOpen(true);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ show: true, value: e.target.value });
  };

  //Function to return content pf main screen(question, options)
  const getMainScreenContent = () => {
    if (isLoading) return <Loader />;

    if (error)
      return (
        <div className={cx('error-state')}>
          Oops, All of our servers are under maintenance. We will be back soon !!
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

  //Function to return content on option selection
  const getAnimatedContent = () => {
    if (selectedOption && showConfetti)
      return (
        <Confetti width={windowWidth} height={windowHeight} recycle={false} numberOfPieces={2000} />
      );

    if (selectedOption && !showConfetti)
      return (
        <Image
          src="/sad.gif"
          alt="Sad Face"
          width={250}
          height={250}
          priority
          className={cx('sad-image', 'hide-sad-image')}
        />
      );
    return null;
  };

  //Function to return content on challenge a friend and next button click
  const getDynamicContent = () => {
    if (currentQuestion == countryQuestion?.length)
      return <Image src="/game-over.png" alt="Game Over" width={100} height={100} priority />;

    if (formInput.show)
      return (
        <form onSubmit={handleFormSubmit} className={cx('form-container')}>
          <input
            placeholder="Enter your Name"
            className={cx('form-input')}
            onChange={handleFormInputChange}
          />
          <button type="submit" className={cx('submit-btn')}>
            Sign Up
          </button>
        </form>
      );

    return null;
  };

  //Function to return user scores
  const getUserGameInfo = () => {
    return (
      <div className={cx('game-info-container')}>
        <span>&#x1F3C6; Total Score : {correctAnswersRef.current}</span>
        <span>&#9989; Correct : {correctAnswersRef.current}</span>
        <span>&#10060; Wrong : {wrongAnswersRef.current}</span>
      </div>
    );
  };

  //Function to return CTAbutton container
  const getCtaButtonContainer = () => {
    return (
      <div className={cx('button-container')}>
        <button
          className={cx('challenge-btn')}
          onClick={() => setFormInput({ show: true, value: '' })}
        >
          &#x2694; Challenge a Friend
        </button>
        <button
          className={cx('next-btn', !selectedOption && 'disabled-btn')}
          onClick={handleNextQuestionClick}
          disabled={!selectedOption}
        >
          &#x23ED; Next Question
        </button>
      </div>
    );
  };

  return (
    <section className={cx('homepage-container')}>
      <div className={cx('glass-box')}>
        <FloatingSquares />
        <div className={cx('header-container')}>
          <h1 className={cx('heading')}>Globetrotter - The Ultimate Travel Guessing Game!</h1>
          <p>Welcome, {formInput.value && !formInput.show ? formInput.value : 'Guest'}</p>
        </div>
        {getMainScreenContent()}
        {selectedOption ? (
          <div className={cx('fun-fact')}>
            Fun Fact : {countryQuestion?.[currentQuestion]?.fun_fact[randomNumberRef.current]}
          </div>
        ) : null}
        {getUserGameInfo()}
        {getCtaButtonContainer()}
        {getDynamicContent()}
      </div>
      {getAnimatedContent()}

      {isModalOpen ? (
        <Modal isOpen={isModalOpen} onModalClose={() => setModalOpen(false)}>
          <p>Share</p>
          <br />
          <WhatsappShareButton
            url={'https://globetrotter-frontend-one.vercel.app/'}
            title={`Can you beat my Score of ${correctAnswersRef.current} ?`}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <CopyToClipboard text={'https://globetrotter-frontend-one.vercel.app/'} />
        </Modal>
      ) : null}
    </section>
  );
};

export default HomePage;
