'use client';
import React from 'react';
import NavLinks from './NavLinks';
import styles from '@/styles/Nav.module.css';
import Login from '../user/LoginBtn';
import DashNavLinks from './DashNavLinks';

const Navbar = ({ dashborad }) => {
  return (
    <nav className={styles.nav_container}>
      {dashborad ? <DashNavLinks /> : <NavLinks />}
    </nav>
  );
};

export default Navbar;
