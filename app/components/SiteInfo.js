import React from 'react';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import styles from '@/styles/contact.module.css';

const SiteInfo = () => {
  return (
    <div className={styles.siteInfo}>
      <div className={styles.logo}>
        <Image src="/logo.svg" fill alt="Picture of the author" />
      </div>
      <div className={styles.socialLinks}>
        <SocialLinks />
      </div>

      <span>DorPlaut@gmail.com</span>
    </div>
  );
};

export default SiteInfo;
