import React from 'react';
import SiteInfo from '../components/SiteInfo';
import ContactForm from '../components/ContactForm';
import styles from '@/styles/contact.module.css';
import TitlesSection from '../components/TitlesSection';
import MainSection from '../components/MainSection';

const Contact = () => {
  return (
    <>
      <TitlesSection>
        <p className={styles.titles}>
          Looking for a website? Have a job opportunity?
          <br /> Or simply want to say hello? <br /> Get in touch with me now
          and let me know how I can assist you.
        </p>
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
