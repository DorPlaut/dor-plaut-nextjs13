import MainSection from '@/app/components/MainSection';
import TitlesSection from '@/app/components/TitlesSection';
import React from 'react';
import styles from '@/styles/contact.module.css';
import SiteInfo from '@/app/components/SiteInfo';
import Login from '@/app/components/user/Login';
import axios from 'axios';

async function getData() {
  const url = process.env.NEXT_PUBLIC_URL + '/api/auth/providers';
  console.log(url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// component
const LoginPage = async () => {
  const allProviders = await getData();
  // rephrase providers
  const providersArray = Object.values(allProviders);
  const providers = providersArray.filter(
    (provider) => provider.id !== 'credentials'
  );

  return (
    <>
      <TitlesSection>
        <p className={styles.titles}>lets log in or registere</p>
      </TitlesSection>
      <MainSection>
        <div className={`${styles.contact} container`}>
          <Login providers={providers} />
          <SiteInfo />
        </div>
      </MainSection>
    </>
  );
};

export default LoginPage;
