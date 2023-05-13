'use client';
import React, { useState } from 'react';
import styles from '@/styles/About.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
  };

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'message') {
      setMessage(e.target.value);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={styles.contact_form_container}>
      <form onSubmit={handleSubmit} className={styles.contact_form}>
        {/* name */}
        <div className={styles.form_input}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            placeholder={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
        </div>
        {/* Email */}
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            placeholder={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </div>
        {/* Message  */}
        <div>
          <label>Message: </label>
          <textarea
            placeholder={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            required
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
