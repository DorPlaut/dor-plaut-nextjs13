'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/Header.module.css';
import Navbar from './nav/Navbar';
// import Login from './user/Login';
import Image from 'next/image';
import Link from 'next/link';

const Header = ({ dashborad }) => {
  // handle header visability
  const [isVisible, setIsVisible] = useState(true);
  // handle header visability based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.filler} id="home"></div>
      <header className={`${styles.header} `}>
        <div className={`${styles.inner} ${isVisible && styles.visible}`}>
          <div className={`${styles.logo}  bright`}>
            <Link href={'/#home'} scroll={false}>
              <img src={'/logo.svg'} alt="logo" />
            </Link>
          </div>

          <div className={styles.nav}>
            {dashborad ? <Navbar dashborad /> : <Navbar />}
          </div>

          {/* <div className={styles.user}>
            <Login />
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
