import React from 'react';
import SiteInfo from '../components/SiteInfo';
import ContactForm from '../components/ContactForm';
import styles from '@/styles/About.module.css';
import TitlesSection from '../components/TitlesSection';
import MainSection from '../components/MainSection';

const Contact = () => {
  return (
    <>
      <TitlesSection>
        <h3>contact me now</h3>
      </TitlesSection>
      <MainSection>
        <div className={`${styles.contact} container`}>
          <ContactForm />
          <SiteInfo />
        </div>
      </MainSection>
    </>
  );
};

export default Contact;
