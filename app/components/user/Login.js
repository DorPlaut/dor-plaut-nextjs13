'use client';
import styles from '@/styles/contact.module.css';
import { signIn, useSession } from 'next-auth/react';
import { BsGoogle } from 'react-icons/bs';
import { ImFacebook } from 'react-icons/im';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { redirect } from 'next/navigation';

const Login = ({ providers }) => {
  // set page
  const [page, SetPage] = useState('login');
  // handle providers icons
  const icon = (provider) => {
    if (provider === 'google') return <BsGoogle />;
    if (provider === 'facebook') return <ImFacebook />;
  };
  // get session details
  const { data: session } = useSession();
  // redirect to hompage if user is loged in
  useEffect(() => {
    if (session) {
      redirect('/');
    }
  }, [session]);
  return (
    <div className={styles.form_container}>
      <h3>Login</h3>
      {page === 'login' && <LoginForm />}
      {page === 'signup' && <SignUpForm />}
      <div className={styles.form}>
        {page === 'login' ? (
          <button
            className="btn block-btn dark"
            onClick={() => SetPage('signup')}
          >
            Dossent have a user? Sign up now
          </button>
        ) : (
          <button
            className="btn block-btn dark"
            onClick={() => SetPage('login')}
          >
            Allredy have a user? Login now
          </button>
        )}
        <br />
        {/* other providers */}

        {providers.map((provider) => {
          const providerName = provider.name;
          return (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className={`btn block-btn dark ${providerName.toLowerCase()}`}
            >
              {icon(providerName.toLowerCase())} Continue with {providerName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Login;
