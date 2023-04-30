import React from 'react';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Snapbrillia Onboarding AI</h1>
      <a href="/bot" className={styles.link}>Onboard Me</a>
    </div>
  );
};