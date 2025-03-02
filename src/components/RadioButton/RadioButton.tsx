import React from 'react';
import classNames from 'classnames/bind';
import { IRadioButtonProps } from '@/utils/typings/typings';
import styles from './RadioButton.module.scss';

const cx = classNames.bind(styles);

const RadioButton = ({
  name,
  id,
  value,
  label,
  selectedOption,
  disabled,
  handleRadioButtonSelection = () => {},
}: IRadioButtonProps) => {
  return (
    <div className={cx('radio-button-container')}>
      <input
        type="radio"
        name={name}
        id={id}
        className={cx('radio-btn')}
        value={value}
        checked={selectedOption === value}
        onChange={handleRadioButtonSelection}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={cx(
          'radio-btn-label',
          selectedOption !== value && selectedOption != null && 'radio-btn-disabled',
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
