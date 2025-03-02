import classNames from 'classnames/bind';
import { HomePage } from '@/layouts';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <main className={cx('main-container')}>
      <HomePage />
    </main>
  );
}
