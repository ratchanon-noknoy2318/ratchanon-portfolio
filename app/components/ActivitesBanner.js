"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Banner.module.css';
import { FaExternalLinkAlt, FaTimes, FaCalendarAlt, FaStar } from 'react-icons/fa';

export default function Banner({ banner, onDismiss, isFeatured }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss(banner.id);
    }
  };

  if (!isVisible || !banner) {
    return null;
  }

  return (
    <div className={styles.bannerContainer}>
      <section className={`${styles.bannerCard} ${styles.bannerCardFlex}`}>
        {isFeatured && (
          <div className={styles.featuredTag} aria-label="Featured project">
            <FaStar />
          </div>
        )}
        <button
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Close banner"
        >
          <FaTimes />
        </button>
        {banner.imageUrl && (
          <div className={styles.bannerImageWrapper}>
            <div className={styles.bannerImageContainer}>
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 80px, 320px"
                style={{ objectFit: 'cover' }}
                className={styles.bannerImage}
              />
            </div>
          </div>
        )}
        <div 
          className={`${styles.bannerContent} ${styles.bannerContentFlex}`}
        >
          {banner.date && (
            <p className={styles.bannerDate}><FaCalendarAlt style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />{banner.date}</p>
          )}
          <h2 className={styles.bannerTitle}>{banner.title}</h2>
          <p className={styles.bannerText}>{banner.text}</p>
          <a 
            href={banner.link}
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.bannerButton}
          >
            <span>{banner.buttonText}</span>
            <FaExternalLinkAlt />
          </a>
        </div>
      </section>
    </div>
  );
}