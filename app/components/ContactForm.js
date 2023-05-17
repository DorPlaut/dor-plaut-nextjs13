'use client';
import React, { useState } from 'react';
import styles from '@/styles/contact.module.css';
import axios from 'axios';
import { useAlertStore } from '@/store/alertStore';

const ContactForm = () => {
  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);
  // form info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // handle form submit
  const handleClear = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  // send Email
  const sendEmail = async () => {
    try {
      const res = await axios
        .post('/api/mail', {
          name,
          email,
          message,
        })
        .then(() => {
          showAlert('Email sent successfully', 'success');
          handleClear();
        });
    } catch (error) {
      showAlert('Error', 'danger');

      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  return (
    <div className={styles.form_container}>
      <h3>Send me a message</h3>
      <form onSubmit={handleSubmit} className={styles.contact_form}>
        {/* name */}
        <div className={styles.form_input}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
        </div>
        {/* Email */}
        <div className={styles.form_input}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your@Email.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </div>
        {/* Message  */}
        <div className={styles.form_input}>
          <label>Message: </label>
          <textarea
            rows="7"
            value={message}
            placeholder="Write message here"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            required
          ></textarea>
        </div>
        <button className="btn block-btn dark">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
