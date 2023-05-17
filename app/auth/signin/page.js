import MainSection from '@/app/components/MainSection';
import TitlesSection from '@/app/components/TitlesSection';
import React from 'react';
import styles from '@/styles/contact.module.css';
import SiteInfo from '@/app/components/SiteInfo';
import LoginForm from '@/app/components/user/LoginForm';
import axios from 'axios';

async function getData() {
  const url = process.env.NEXT_PUBLIC_URL + '/api/auth/providers';
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// component
const Login = async () => {
  const providers = await getData();
  return (
    <>
      <TitlesSection>
        <p className={styles.titles}>lets log in or register</p>
      </TitlesSection>
      <MainSection>
        <div className={`${styles.contact} container`}>
          <LoginForm providers={providers} />
          <SiteInfo />
        </div>
      </MainSection>
    </>
  );
};

export default Login;
