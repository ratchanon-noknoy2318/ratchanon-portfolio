'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaGitlab, FaArrowLeft, FaLanguage, FaReddit, FaPrint, FaYoutube, FaTwitch, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import styles from '../styles/page.module.css';

export default function Contact() {
  const [language, setLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [printDate, setPrintDate] = useState('');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setPrintDate(new Date().toLocaleString(language === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }));
  }, [language]);

  return (
    <div className={styles.aboutPageWrapper} style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', padding: isMobile ? '1rem' : '3rem 1rem' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .print-only { display: none; }
        
        /* Enhanced Table Styles */
        .${styles.infoTable} {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
        }
        .${styles.infoTable} th {
          text-align: left;
          padding: 12px 16px;
          color: #64748b;
          font-weight: 600;
          width: 30%;
          vertical-align: top;
          border-bottom: 1px solid #f1f5f9;
          background-color: #f8fafc;
        }
        .${styles.infoTable} td {
          padding: 12px 16px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          line-height: 1.6;
        }
        .${styles.infoTable} tr:last-child th,
        .${styles.infoTable} tr:last-child td {
          border-bottom: none;
        }

        @media print {
          @page { margin: 1cm; size: A4; }
          body { background-color: white !important; -webkit-print-color-adjust: exact; }
          @page { size: A4; margin: 10mm; }
          html, body { height: 100%; margin: 0 !important; padding: 0 !important; overflow: visible; }
          
          body::after {
            content: "Ratchanon Noknoy";
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 8rem;
            color: rgba(0, 0, 0, 0.05);
            z-index: 9999;
            white-space: nowrap;
            pointer-events: none;
          }

          .no-print { display: none !important; }
          .${styles.aboutPageWrapper} {
            padding: 0 !important;
            background-color: white !important;
            height: auto !important;
            min-height: auto !important;
          }
          .${styles.aboutPaper} {
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            position: relative;
          }
          .print-only { display: block !important; }
          .print-only { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            right: 0; 
            font-size: 12px !important; 
            color: #000 !important; 
            font-weight: bold; 
          }
          
          h1 { font-size: 22pt !important; margin-bottom: 0.5rem !important; color: #000 !important; }
          p { font-size: 11pt !important; color: #000 !important; }
          table { width: 100% !important; border-collapse: collapse !important; }
          /* Title Section Alignment */
          .${styles.aboutPaper} > div:nth-of-type(3) {
            margin-bottom: 1rem !important; 
            padding-bottom: 0.5rem !important; 
            border-bottom: 2px solid #333 !important;
            text-align: left !important;
            padding-right: 0 !important;
          }
          .${styles.aboutTitle} { 
            font-size: 24px !important; 
            margin-bottom: 5px !important; 
            color: #000 !important; 
          }
          .${styles.aboutPaper} > div:nth-of-type(3) > p { 
            margin-top: 0 !important; 
            font-size: 14px !important; 
            color: #333 !important; 
          }

          p { font-size: 14px !important; color: #000 !important; }

          table { margin-bottom: 10px !important; width: 100% !important; border-collapse: collapse !important; }
          th, td { 
            padding: 8px 10px !important; 
            border: 1px solid #cbd5e1 !important; 
            font-size: 10pt !important;
            padding: 8px 2px !important; 
            font-size: 14px !important; 
            line-height: 1.4 !important;
            background-color: transparent !important;
            border-bottom: 1px solid #000 !important;
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            color: #000 !important;
          }
          th { background-color: #f1f5f9 !important; width: 30% !important; }
          th { width: 25% !important; font-weight: bold !important; color: #000 !important; text-align: left !important; }
          a { text-decoration: none !important; color: #000 !important; }
          svg { color: #000 !important; }
        }
      `}} />
      <div className={styles.aboutPaper} style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        padding: isMobile ? '2rem 1.5rem' : '4rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 25px rgba(0,0,0,0.05)',
        position: 'relative',
        // borderTop: '6px solid #486e9f'
      }}>
        <div className="print-only" style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
          {language === 'th' ? 'พิมพ์เมื่อ: ' : 'Printed on: '} {printDate}
        </div>
        
        {/* Header with Back Button and Language Switcher */}
        <div className={`${styles.aboutHeaderTop} ${styles.noPrint} no-print`} style={{ marginBottom: '2rem' }}>
            <Link href="/"  title={language === 'th' ? 'กลับหน้าหลัก' : 'Back to Home'} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
                <FaArrowLeft /> {language === 'th' ? 'กลับหน้ากลัก' : 'Back to Home'}
            </Link>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => window.print()}
               title={language === 'th' ? 'พิมพ์หน้านี้' : 'Print this page'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '8px 16px',
                borderRadius: '5px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#fff',
                cursor: 'pointer',
                color: '#475569',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              <FaPrint />
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
               title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#fff',
                cursor: 'pointer',
                color: '#475569',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              <FaLanguage /> {language === 'en' ? 'TH' : 'EN'}
            </button>
            </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '3rem', paddingBottom: '2rem' }}>
            <h1 className={`${styles.aboutTitle} no-print`} style={{ fontSize: isMobile ? '1.75rem' : '2.25rem', color: '#1e293b' }}>
                {language === 'th' ? 'ติดต่อฉัน' : 'Contact Me'}
            </h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                {language === 'th' ? 'ช่องทางการติดต่อ' : 'Contact Channels'}
            </p>
        </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-start' }}>
                {/* Contact Info */}
                <div style={{ flex: 1, width: '100%' }}>
                    <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        {language === 'th' 
                            ? 'หากคุณสนใจร่วมงาน หรือมีข้อสงสัยเพิ่มเติม สามารถติดต่อได้ผ่านช่องทางด้านล่างนี้'
                            : 'I am interested in working with you. Please feel free to contact me via the channels below.'}
                    </p>

                    <table className={styles.infoTable} style={{ width: '100%' }}>
                        <tbody>
                            {/* <tr>
                                <th>
                                    {language === 'th' ? 'ชื่อเล่น' : 'Nickname'}
                                </th>
                                <td>
                                    {language === 'th' ? 'ฟิล์ม' : 'Film'}
                                </td>
                            </tr>
                             <tr>
                                <th>
                                    {language === 'th' ? 'อายุ' : 'Age'}
                                </th>
                                <td>
                                    {language === 'th' ? '26 ปี' : '26 Years'}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {language === 'th' ? 'วันเกิด' : 'Birthday'}
                                </th>
                                <td>
                                    {language === 'th' ? '4 กรกฎาคม 2542' : 'July 4, 1999'}
                                </td>
                            </tr> */}
                             <tr>
                                <th>
                                    {language === 'th' ? 'โทร' : 'Tel'}
                                </th>
                                <td>
                                    <a 
                                        href="tel:0987462598" 
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                    >
                                        +66 98 746 2598
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {language === 'th' ? 'อีเมล' : 'Email'}
                                </th>
                                <td>
                                    <a 
                                        href="mailto:ratchanon.noknoy2318@gmail.com" 
                                        style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}
                                        title={language === 'en' ? 'Send an email' : 'ส่งอีเมล'}
                                    >
                                        ratchanon.noknoy2318@gmail.com
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    {language === 'th' ? 'ที่อยู่' : 'Address'}
                                </th>
                                <td>
                                    <a 
                                        href="https://www.google.com/maps/place/%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%94%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%9B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+62000/@16.4548737,99.5079203,14z/data=!3m1!4b1!4m6!3m5!1s0x30de1889625cac4d:0xc4e9477440dd2c5e!8m2!3d16.454875!4d99.52852!16s%2Fg%2F1hdz3r7wd?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                    >
                                        {language === 'th' ? 'หมู่บ้านไดมอนด์ปาร์ค ตำบลในเมือง อำเภอเมืองกำแพงเพชร กำแพงเพชร 62000' : 'Diamond Park Village, Kamphaeng Phet 62000, Thailand'}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>LinkedIn</th>
                                <td>
                                    <a href="https://www.linkedin.com/in/ratchanon-noknoy/" title={language === 'en' ? 'LinkedIn Profile' : 'LinkedIn โปรไฟล์'} target="_blank" rel="noopener noreferrer" style={{ color: '#0a66c2', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    
                                        <FaLinkedin /> ratchanon-noknoy
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>GitHub</th>
                                <td>
                                    <a href="https://github.com/ratchanon-noknoy2318" title={language === 'en' ? 'GitHub Profile' : 'GitHub โปรไฟล์'} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaGithub /> ratchanon-noknoy2318
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>GitLab</th>
                                <td>
                                    <a href="https://gitlab.com/ratchanon.noknoy2318" title={language === 'en' ? 'GitLab Profile' : 'GitLab โปรไฟล์'} target="_blank" rel="noopener noreferrer" style={{ color: '#FC6D26', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaGitlab /> ratchanon.noknoy2318
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>Reddit</th>
                                <td>
                                    <a href="https://www.reddit.com/user/QuantitySoggy4885/" title={language === 'en' ? 'Reddit Profile' : 'Reddit โปรไฟล์'} target="_blank" rel="noopener noreferrer" style={{ color: '#FF4500', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaReddit /> ratchanon-noknoy
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>YouTube</th>
                                <td>
                                    <a href="https://www.youtube.com/@Ratchanon2318" title={language === 'en' ? 'YouTube Channel' : 'ช่อง YouTube'} target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaYoutube /> @Ratchanon2318
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>Twitch</th>
                                <td>
                                    <a href="https://www.twitch.tv/ratchanonnoknoy2318" title={language === 'en' ? 'Twitch Channel' : 'ช่อง Twitch'} target="_blank" rel="noopener noreferrer" style={{ color: '#9146FF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaTwitch /> Twitch Channel
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>TikTok</th>
                                <td>
                                    <a href="https://www.tiktok.com/@ratchanon2318" title={language === 'en' ? 'TikTok Profile' : 'TikTok โปรไฟล์'} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaTiktok /> @ratchanon2318
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Google Maps */}
                <div className={`${styles.noPrint} no-print`} style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    {/* <iframe 
                        src="https://www.google.com/maps/embed?pb=!4v1767926331285!6m8!1m7!1sPAk1H_fRTvJYS9zIWj_Bcg!2m2!1d16.45445427988214!2d99.52903143672681!3f166.0023482910106!4f10.313834901343256!5f0.7820865974627469" 
                        style={{ width: '100%', height: isMobile ? '300px' : '450px', border: 0, borderRadius: '8px' }}
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe> */}
                    <a 
                        href="https://www.google.com/maps/place/%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%94%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%9B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+62000/@16.4548737,99.5079203,14z/data=!3m1!4b1!4m6!3m5!1s0x30de1889625cac4d:0xc4e9477440dd2c5e!8m2!3d16.454875!4d99.52852!16s%2Fg%2F1hdz3r7wd?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '12px 24px',
                            backgroundColor: '#6fa9f3',
                            color: '#ffffff',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            boxShadow: '0 4px 10px rgba(72, 110, 159, 0.3)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 15px rgba(72, 110, 159, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(72, 110, 159, 0.3)';
                        }}
                    >
                        <FaMapMarkerAlt /> {language === 'th' ? 'เปิดใน Google Maps' : 'Open in Google Maps'}
                    </a>
                </div>
            </div>
      </div>
      <div className={`${styles.noPrint} no-print`} style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
      <Footer language={language} />
      </div>
    </div>
  );
}
