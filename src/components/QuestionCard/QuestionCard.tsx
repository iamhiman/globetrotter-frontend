import React from 'react';
import classNames from 'classnames/bind';
import { IQuestionCardProps } from '@/utils/typings/typings';
import RadioButton from '../RadioButton';
import styles from './QuestionCard.module.scss';

const cx = classNames.bind(styles);

const QuestionCard = ({
  countryQuestion,
  currentQuestion,
  selectedOption,
  handleRadioButtonSelection,
}: IQuestionCardProps) => {
  return (
    <div className={cx('question-card-container')}>
      {countryQuestion?.[currentQuestion]?.clues?.map((clue, index) => (
        <p className={cx('question')} key={clue}>
          Clue {index + 1} : {clue}
        </p>
      ))}
      <div className={cx('options-container')}>
        {countryQuestion?.[currentQuestion]?.options?.map((option) => (
          <RadioButton
            key={option}
            id={option}
            name={'question'}
            value={option}
            selectedOption={selectedOption}
            label={option}
            handleRadioButtonSelection={handleRadioButtonSelection}
            disabled={!!selectedOption}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
