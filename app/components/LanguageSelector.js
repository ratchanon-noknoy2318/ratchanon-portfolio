'use client';

import styles from '../styles/LanguageSelector.module.css';

export default function LanguageSelector({ language, setLanguage }) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => setLanguage('th')}
        className={`${styles.button} ${language === 'th' ? styles.activeText : ''}`}
      >
        TH
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`${styles.button} ${language === 'en' ? styles.activeText : ''}`}
      >
        EN
      </button>
      <div className={`${styles.glider} ${language === 'en' ? styles.gliderRight : ''}`} />
    </div>
  );
}