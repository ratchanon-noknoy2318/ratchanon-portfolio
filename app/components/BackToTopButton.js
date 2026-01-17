/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import { FaList } from 'react-icons/fa';
import styles from '../styles/BackToTopButton.module.css';

const BackToTopButton = ({ language = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const contentsSection = document.getElementById('contents');
    const prefaceSection = document.getElementById('preface');
    
    let shouldShow = false;

    // 1. ตรวจสอบว่าถึงหน้าคำนำ (preface) หรือยัง
    if (prefaceSection) {
      const rect = prefaceSection.getBoundingClientRect();
      // แสดงปุ่มเมื่อส่วนหัวของหน้าคำนำเข้ามาในหน้าจอ หรือเลื่อนผ่านไปแล้ว
      if (rect.top <= window.innerHeight) {
        shouldShow = true;
      }
    } else {
      // Fallback: ถ้าไม่มี id="preface" ให้ใช้ระยะ scroll เดิม (300px)
      if (window.scrollY > 300) shouldShow = true;
    }

    // 2. ถ้าอยู่ที่หน้าสารบัญ (contents) ให้ซ่อนปุ่ม (เพราะอยู่ที่เป้าหมายแล้ว)
    if (contentsSection) {
      const rect = contentsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        shouldShow = false;
      }
    }

    setIsVisible(shouldShow);
  };

  const scrollToContents = () => {
    const contentsSection = document.getElementById('contents');
    if (contentsSection) {
      contentsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // ตรวจสอบสถานะเริ่มต้นทันที
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      className={`${styles.backToTopButton} ${isVisible ? styles.show : ''}`}
      onClick={scrollToContents}
      aria-label={language === 'th' ? 'ไปหน้าสารบัญ' : 'Go to Contents'}
      title={language === 'th' ? 'ไปหน้าสารบัญ' : 'Go to Contents'}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      
    >
      <FaList />
    </button>
  );
};

export default BackToTopButton;