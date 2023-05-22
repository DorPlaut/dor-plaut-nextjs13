'use client';
import styles from '@/styles/contact.module.css';
import { signIn, useSession } from 'next-auth/react';
import { BsGoogle } from 'react-icons/bs';
import { ImFacebook } from 'react-icons/im';
import { FiGithub } from 'react-icons/fi';
import { SiAuth0 } from 'react-icons/si';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { redirect } from 'next/navigation';
import LoadScreen from '../LoadScreen';

const Login = () => {
  // set pagee
  const [page, SetPage] = useState('Login');
  // get provider
  const [providers, setProviders] = useState([]);
  const getProviders = async () => {
    try {
      axios.get('/api/auth/providers').then((res) => {
        // rephrase providers
        const providersArray = Object.values(res.data);
        setProviders(
          providersArray.filter((provider) => provider.id !== 'credentials')
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  // handle providers icons
  const icon = (provider) => {
    if (provider === 'google') return <BsGoogle />;
    if (provider === 'facebook') return <ImFacebook />;
    if (provider === 'github') return <FiGithub />;
    if (provider === 'auth0') return <SiAuth0 />;
  };
  // get session details
  const { data: session } = useSession();
  // get providers
  useEffect(() => {
    getProviders();
  }, []);
  // redirect to hompage if user is loged in
  useEffect(() => {
    if (session) {
      redirect('/');
    }
  }, [session]);
  return (
    <div className={styles.form_container}>
      <h3>{page}</h3>
      {page === 'Login' && <LoginForm />}
      {page === 'Signup' && <SignUpForm />}
      <div className={styles.form}>
        {page === 'Login' ? (
          <button
            className="btn block-btn dark"
            onClick={() => SetPage('Signup')}
          >
            Dossent have a user? Sign up now
          </button>
        ) : (
          <button
            className="btn block-btn dark"
            onClick={() => SetPage('Login')}
          >
            Allredy have a user? Login now
          </button>
        )}
        <br />
        <span> or connect automatically with : </span>
        {/* other providers */}

        {providers.length > 0 ? (
          providers.map((provider) => {
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
          })
        ) : (
          <LoadScreen />
        )}
      </div>
    </div>
  );
};

export default Login;
