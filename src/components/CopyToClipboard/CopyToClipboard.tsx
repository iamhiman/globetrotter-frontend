import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CopyToClipboard.module.scss';

const cx = classNames.bind(styles);

const CopyToClipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className={cx('copy-to-clipboard-container')}>
      <input type="text" value={text} className={cx('clipboard-input')} />
      <button className={cx('copy-btn')} onClick={handleCopy}>
        Copy
      </button>
      <br />
      <br />
      {copied && <span className={cx('copied-text')}>✅ Copied!</span>}
    </div>
  );
};

export default CopyToClipboard;
