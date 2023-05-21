'use client';
import styles from '@/styles/contact.module.css';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import { useAlertStore } from '@/store/alertStore';
import { redirect } from 'next/navigation';

const LoginForm = ({ providers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);
  //

  // chack if user exist
  const checkUser = async () => {
    try {
      await axios
        .get(`/api/user/credentials?email=${email}&password=${password}`)
        .then((res) => {
          console.log(res);
          loginUser();
        });
    } catch (error) {
      showAlert(error.response.data.error, 'danger');
      console.log(error.response);
    }
  };
  // Login
  const loginUser = async () => {
    try {
      let options = { email: email, password: password, redirect: '/' };
      await signIn('credentials', options).then((res) => {
        redirect('/');
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.form_input}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your@Email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.form_input}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn block-btn dark"> Log in </button>
    </form>
  );
};

export default LoginForm;
