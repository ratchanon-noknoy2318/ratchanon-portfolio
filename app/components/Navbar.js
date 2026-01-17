'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes, FaLanguage, FaBookOpen } from 'react-icons/fa';
import styles from '../styles/navbar.module.css';

export default function Navbar({ language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);

  const links = [
    { id: 'profile', label: language === 'th' ? 'โปรไฟล์' : 'Profile' },
    { id: 'experience', label: language === 'th' ? 'ประสบการณ์' : 'Experience' },
    { id: 'skills', label: language === 'th' ? 'ทักษะ' : 'Skills' },
    { id: 'projects', label: language === 'th' ? 'ผลงาน' : 'Projects' },
    { id: 'education', label: language === 'th' ? 'การศึกษา' : 'Education' },
    { id: 'activities', label: language === 'th' ? 'กิจกรรม' : 'Activities' },
    // { id: 'publications', label: language === 'th' ? 'สื่อ' : 'Media' },
    // { id: 'references', label: language === 'th' ? 'อ้างอิง' : 'References' },
    { id: 'socials', label: language === 'th' ? 'ติดต่อ' : 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sectionIds = ['profile', 'experience', 'skills', 'projects', 'education', 'activities', 'publications', 'references', 'socials'];
      const current = sectionIds.find(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the active viewport area (with offset for navbar)
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Backdrop (Overlay) */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
            backdropFilter: 'blur(3px)'
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} style={{ zIndex: 999 }}>
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <FaBookOpen size={24} />
        <span style={{ fontFamily: 'Sarabun, serif', fontSize: '1.25rem', fontWeight: 'bold' }}>
          Ratchanon
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ul 
          className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}
          style={isMobile ? {
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100vh',
            width: '250px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
            zIndex: 1000,
            padding: 0,
            margin: 0,
            listStyle: 'none'
          } : {}}
        >
          {links.map((link) => (
            <li 
              key={link.id} 
              className={styles.navLink} 
              onClick={() => scrollToSection(link.id)}
              style={{ 
                fontFamily: 'Sarabun, serif',
                fontWeight: activeSection === link.id ? 'bold' : 'normal',
                opacity: activeSection === link.id ? 1 : 0.7,
                transition: 'all 0.3s ease'
              }}
            >
              {link.label}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
          className={styles.langBtn}
        >
          <FaLanguage size={18} /> {language === 'th' ? 'EN' : 'TH'}
        </button>
        <div className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
    </>
  );
}