'use client';

import styles from '@/styles/Hero.module.css';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';

const Hero = () => {
  // state

  // handle hero title and height based on pathname
  // state
  const [page, setPage] = useState('Main');
  // path
  const path = usePathname();
  // format path
  function formatPath(path) {
    if (path === '/') {
      return 'Main';
    }
    const paths = path.split('/');
    let firstWord = paths[1];
    // if (paths.length > 2 && paths[1] === 'dashboard') {
    //   firstWord = paths[2];
    // }
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  }
  useEffect(() => {
    setPage(formatPath(path));
  }, [path]);

  return (
    <div
      className={`${styles.hero}  ${
        page !== 'Main' ? styles.short_hero : styles.long_hero
      } `}
    >
      {/* <div className={styles.background}>
        <BsGear
          className="spin-slow"
          style={{
            scale: `${1 + rotation / 150}`,
            opacity: `${0.8 - rotation / 80}`,
          }}
        />
      </div> */}
      <div className={styles.content}>
        {page === 'Main' ? (
          <>
            <h1>Welcome</h1>
          </>
        ) : (
          <>
            <h1>{page}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
