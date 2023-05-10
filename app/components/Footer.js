import React from 'react';
import styles from '@/styles/Footer.module.css';
import NavLinks from './nav/NavLinks';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer>
      <br />
      <div className={styles.footer_container}>
        <div className={styles.footer_contact}>
          <span>Contact me:</span>
          <SocialLinks />
        </div>
        <div className={styles.footer_nav}>
          <span>Navigation</span>
          <NavLinks />
        </div>
      </div>
      <span className={styles.footer_copyright}>
        Built by{' '}
        <a
          href="https://dorplaut.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Dor Plaut
        </a>
        . All right reserved ©
      </span>
    </footer>
  );
};

export default Footer;
