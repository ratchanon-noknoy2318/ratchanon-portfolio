'use client';

import styles from '../styles/Footer.module.css';
import Link from 'next/link';
import SocialLinks from './SocialLinks';
import { useState, useEffect } from 'react';

const Footer = ({ contactInfo = [], name, language = 'en' }) => {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      const timePart = now.toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      setCurrentTime(`${datePart} ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const sitemap = [
    // { label: language === 'th' ? 'โปรไฟล์' : 'Profile', href: '/#profile' },
    // { label: language === 'th' ? 'ประสบการณ์' : 'Experience', href: '/#experience' },
    // { label: language === 'th' ? 'ทักษะ' : 'Skills', href: '/#skills' },
    // { label: language === 'th' ? 'ผลงาน' : 'Projects', href: '/#projects' },
    // { label: language === 'th' ? 'การศึกษา' : 'Education', href: '/#education' },
    // { label: language === 'th' ? 'กิจกรรม' : 'Activities', href: '/#activities' },
    // { label: language === 'th' ? 'บรรยากาศการทำงาน' : 'Work Environment', href: '/#work-atmosphere' },
    // { label: language === 'th' ? 'ขอบคุณ' : 'Thank you', href: '/#thank-you' },

  ];

  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #f1f5f9',
      padding: '4rem 0 2rem',
      color: '#64748b',
      fontFamily: 'var(--font-sarabun), sans-serif',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2.5rem'
      }}>
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {sitemap.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith('/#')) {
                  const targetId = item.href.replace('/', '');
                  const element = document.querySelector(targetId);
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                color: '#64748b',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#6DA9F3'}
              onMouseLeave={(e) => e.target.style.color = '#64748b'}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px 0' }}>
          <SocialLinks language={language} />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          textAlign: 'center',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '20px',
          width: '100%',
          maxWidth: '600px'
        }}>
          {/* <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }}>
            {language === 'th' ? 'สร้างสรรค์โซลูชันดิจิทัลเพื่อประสิทธิภาพทางการแพทย์' : 'Building Digital Solutions for Healthcare Efficiency'}
          </span> */}
          <div style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ color: '#94a3b8' }}>&copy; {currentYear} Ratchanon Noknoy</span>
            {currentTime && (
              <>
                <span style={{ color: '#e2e8f0' }}>•</span>
                <span style={{ color: '#94a3b8', fontVariantNumeric: 'tabular-nums' }}>{currentTime}</span>
              </>
            )}
            <span style={{ color: '#e2e8f0' }}>•</span>
            <Link
              href="/sitemap-HTML"
              style={{ textDecoration: 'none', color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#6DA9F3'}
              onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              title={language === 'th' ? 'ดูแผนผังเว็บไซต์' : 'View Sitemap'}
            >
              Sitemap
            </Link>
            <span style={{ color: '#e2e8f0' }}>•</span>
            <Link
              href="/robots-HTML"
              style={{ textDecoration: 'none', color: '#94a3b8', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#6DA9F3'}
              onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
              title={language === 'th' ? 'ดูไฟล์ robots.txt' : 'View robots.txt'}
            >
              Robots.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;