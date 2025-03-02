import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { IModalProps } from '@/utils/typings/typings';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ isOpen, onModalClose = () => {}, children }: IModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onModalClose(); // Close modal on ESC key
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onModalClose]);

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className={cx('modal-overlay', isOpen && 'show')}>
      <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
        <button className={cx('modal-close-btn')} onClick={onModalClose}>
          &#10060;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
