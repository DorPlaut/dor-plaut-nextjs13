'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { useAlertStore } from '@/store/alertStore';
import styles from '@/styles/contact.module.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);
  //
  //   sing up
  const signup = async () => {
    try {
      await axios
        .post(`/api/user/credentials`, { username, email, password })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      showAlert(error.response.data.error, 'danger');
      console.log(error.response);
    }
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };
  //   handle sign up

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.form_input}>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.form_input}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your@Email.com"
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
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn block-btn dark"> Sign up </button>
    </form>
  );
};

export default SignUpForm;
