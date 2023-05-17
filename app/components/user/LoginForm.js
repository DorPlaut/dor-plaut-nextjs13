'use client';
import styles from '@/styles/contact.module.css';
import { signIn } from 'next-auth/react';
import { BsGoogle } from 'react-icons/bs';
import { ImFacebook } from 'react-icons/im';

const LoginForm = ({ providers }) => {
  const icon = (provider) => {
    if (provider === 'google') return <BsGoogle />;
    if (provider === 'facebook') return <ImFacebook />;
  };
  return (
    <div className={styles.form_container}>
      {/* <h3>Send me a message</h3> */}
      {Object.values(providers).map((provider) => {
        const providerName = provider.name;
        return (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id)}
              className="btn block-btn dark"
            >
              {icon(providerName.toLowerCase())} Sign in with {providerName}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default LoginForm;
