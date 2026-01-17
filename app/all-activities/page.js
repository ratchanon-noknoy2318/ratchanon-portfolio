'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import styles from '../styles/page.module.css';
import { FaPrint, FaLanguage, FaSearch, FaFacebook, FaTiktok, FaNewspaper, FaFilePdf, FaSortAmountDown, FaSortAmountUp, FaUserCircle, FaTimes, FaExternalLinkAlt, FaCalendarAlt, FaArrowRight, FaUser } from 'react-icons/fa';

export default function AllActivities() {
    const [language, setLanguage] = useState('en');
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [publicationFilter, setPublicationFilter] = useState('all');
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = [
        {
            date_en: '19 Aug 2025',
            date_th: '19 ส.ค. 2568',
            title_en: 'KM Online Activity (Knowledge Management via Online System)',
            title_th: 'กิจกรรม KM Online (การจัดการความรู้ผ่านระบบออนไลน์)',
            location_en: 'Office of the Public Sector Development Commission (OPDC)',
            location_th: 'สำนักงาน ก.พ.ร. @OPDCThailand',
            desc_en: 'Using Big Data to enhance public services and drive efficient area development in the digital era.',
            desc_th: 'การใช้ Big Data เพื่อวิเคราะห์และวางแผน ยกระดับบริการภาครัฐให้ตรงความต้องการประชาชน และพัฒนาพื้นที่อย่างมีประสิทธิภาพในยุคดิจิทัล',
            link: 'https://www.youtube.com/live/A49CPDrhmRA',
            image: 'activities/11.png' // ใส่ URL รูปภาพที่นี่ (เช่น '/images/activity1.jpg')
        },
        {
            date_en: '31 Jul 2025',
            date_th: '31 ก.ค. 2568',
            title_en: 'Anti-Corruption and Misconduct Prevention Training',
            title_th: 'อบรมป้องกันการทุจริตและประพฤติมิชอบ',
            location_en: 'Chakangrao 1, 4th Fl., Kamphaeng Phet Municipality',
            location_th: 'ห้องประชุมชากังราว 1 ชั้น 4 เทศบาลเมืองกำแพงเพชร',
            desc_en: 'Training on preventing corruption and strengthening organizational ethics',
            desc_th: 'อบรมป้องกันการทุจริตและเสริมสร้างจริยธรรมองค์กร',
            link: 'https://www.facebook.com/reel/622040617198175/?rdid=L3KRiCKF3oDEQCNG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fr%2F1AJHo2xFCo%2F',
            image: 'activities/5.png'
        },
        {
            date_en: '9 Jul 2025',
            date_th: '9 ก.ค. 2568',
            title_en: 'Closing Ceremony of Digital Media Training Program',
            title_th: 'พิธีปิดโครงการอบรมพัฒนาความรู้สื่อดิจิทัล',
            location_en: 'Chakangrao 1, 4th Fl., Kamphaeng Phet Municipality',
            location_th: 'ห้องประชุมชากังราว 1 ชั้น 4 เทศบาลเมืองกำแพงเพชร',
            desc_en: 'Closing ceremony of the digital media training program',
            desc_th: 'พิธีปิดโครงการอบรมสื่อดิจิทัล',
            link: 'https://www.kppmu.go.th/news-detail?hd=1&id=126013',
            image: 'activities/14.png'
        },
        {
            date_en: '8 Jul 2025',
            date_th: '8 ก.ค. 2568',
            title_en: 'Digital Media Knowledge Development Training Program',
            title_th: 'โครงการอบรมพัฒนาความรู้สื่อดิจิทัล',
            location_en: 'Chakangrao 1, 4th Fl., Kamphaeng Phet Municipality',
            location_th: 'ห้องประชุมชากังราว 1 ชั้น 4 เทศบาลเมืองกำแพงเพชร',
            desc_en: 'Training on digital media knowledge development',
            desc_th: 'อบรมพัฒนาความรู้สื่อดิจิทัล',
            link: 'https://www.kppmu.go.th/news-detail?hd=1&id=126007',
            image: 'activities/3.png'
        },
        // {
        //     date_en: '31 May 2025',
        //     date_th: '31 พ.ค. 2568',
        //     title_en: 'Buddy Care System Usage Training',
        //     title_th: 'อบรมการใช้งานระบบ Buddy Care',
        //     location_en: 'Chakangrao Urban Community Health Center Kamphaeng Phet',
        //     location_th: 'ศูนย์สุขภาพชุมชนเมืองชากังราว กำแพงเพชร',
        //     desc_en: 'Training on using the Buddy Care system by the Ministry of Public Health',
        //     desc_th: 'อบรมการใช้งานระบบ Buddy Care ของกระทรวงสาธารณสุข',
        //     link: 'https://www.linkedin.com/posts/ratchanon-noknoy_brmbsabqybrcbrubrabrqbrwbrebrwbrtbrtbrh-buddycare-activity-7414851761540292608-Tjzu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF2Q4JEBP4yITEVbIn3E5Y8zTBxoVS6vqRA',
        //     image: 'activities/13.png'
        // }
        // คุณสามารถเพิ่มกิจกรรมจริงของคุณต่อได้ที่นี่ (Add your real activities here)
    ];

    const publications = [
        // {
        //   date_en: '2025',
        //   date_th: '2568',
        //   title_en: 'TikTok Channel',
        //   title_th: 'ช่อง TikTok',
        //   publisher_en: 'Kamphaeng Phet Municipality',
        //   publisher_th: 'เทศบาลเมืองกำแพงเพชร',
        //   desc_en: 'May 20, 2025 – The Mayor and public health team visited bedridden patients via Telemedicine.',
        //   desc_th: '20 พ.ค. 2568 นายกเทศมนตรีและทีมสาธารณสุขเยี่ยมบ้านผู้ป่วยผ่านระบบ Telemedicine',
        //   link: 'https://www.tiktok.com/@kpp.pr/video/7506431498870902037?is_from_webapp=1'
        // },
        // {
        //   date_en: '2025',
        //   date_th: '2568',
        //   title_en: 'Official Facebook',
        //   title_th: 'เพจทางการของเทศบาลเมืองกำแพงเพชร',
        //   publisher_en: 'Kamphaeng Phet Municipality',
        //   publisher_th: 'เทศบาลเมืองกำแพงเพชร',
        //   desc_en: 'May 20, 2025 – The Mayor and public health team visited bedridden patients via Telemedicine.',
        //   desc_th: '20 พ.ค. 2568 นายกเทศมนตรีและทีมสาธารณสุขเยี่ยมบ้านผู้ป่วยผ่านระบบ Telemedicine',
        //   link: 'https://www.facebook.com/story.php?story_fbid=122127221690712499&id=61571374970083&mibextid=wwXIfr&rdid=upOu1bXO1IWk2yAO#'
        // },

        {
            date_en: '30 Sep 2025',
            date_th: '30 ก.ย. 2568',
            title_en: 'Chakangrao Newspaper',
            title_th: 'สื่อหนังสือพิมพ์ชากังราว',
            publisher_en: 'Kamphaeng Phet Municipality',
            publisher_th: 'เทศบาลเมืองกำแพงเพชร',
            desc_en: 'This document outlines the telemedicine platform specifications and standards for Fiscal Year 2024, as published in Chakkangrao Newspaper, to support telemedicine services and improve healthcare access for homebound and chronically ill patients.',
            desc_th: 'เอกสารเผยแพร่ในหนังสือพิมพ์ชากังราว ว่าด้วยข้อกำหนดและมาตรฐานแพลตฟอร์มการแพทย์ทางไกล ประจำปีงบประมาณ พ.ศ. 2567 เพื่อส่งเสริมบริการการแพทย์ทางไกลและการเข้าถึงบริการสาธารณสุขของผู้ป่วยติดบ้านและผู้ป่วยโรคเรื้อรัง',
            link: 'https://fa8.naxapi.com/kppmu.go.th/dnm_file/project/1751867708230_50070_center.pdf',
            image: 'activities/news-paper.png'

        },
        {
            date_en: '20 May 2025',
            date_th: '20 พ.ค. 2568',
            title_en: 'Activity news',
            title_th: 'ข่าวกิจกรรม',
            publisher_en: 'Kamphaeng Phet Municipality',
            publisher_th: 'เทศบาลเมืองกำแพงเพชร',
            desc_en: 'Kamphaeng Phet Municipality has implemented telemedicine consultation services for bedridden and chronically ill patients at their residences to enhance healthcare accessibility and ensure continuous monitoring of patients’ health status.',
            desc_th: 'เทศบาลเมืองกำแพงเพชรดำเนินการให้บริการการแพทย์ทางไกลแก่ผู้ป่วยติดเตียงและผู้ป่วยโรคเรื้อรัง เพื่อเพิ่มการเข้าถึงบริการด้านสาธารณสุขและติดตามภาวะสุขภาพอย่างต่อเนื่อง',
            link: 'https://www.kppmu.go.th/news-detail?hd=1&id=124000',
            image: 'activities/news-1.png'
        },
        // {
        //   date_en: '2025',
        //   date_th: '2568',
        //   title_en: 'Facebook Update',
        //   title_th: 'อัปเดตข่าวสาร Facebook',
        //   publisher_en: 'Kamphaeng Phet Municipality',
        //   publisher_th: 'เทศบาลเมืองกำแพงเพชร',
        //   desc_en: 'Public relations news and activities update.',
        //   desc_th: 'ข่าวประชาสัมพันธ์และกิจกรรมล่าสุด',
        //   link: 'https://www.facebook.com/share/p/1AamQB6z5z/'
        // }
    ];

    const references = [
        {
            name_en: 'Kamphaeng Phet Municipality Community Hospital',
            name_th: 'โรงพยาบาลชุมชนเมืองกำแพงเพชร',
            position_en: 'Specialist Professional Nurse',
            position_th: 'พยาบาลวิชาชีพชำนาญการพิเศษ',
            org_en: 'Division of Public Health and Environment, Kamphaeng Phet Municipality',
            org_th: 'กองสาธารณสุขและสิ่งแวดล้อม เทศบาลเมืองกำแพงเพชร',
            link: 'https://www.kppmu.go.th/personnel?dpm=7&page=2',
            image: 'references/1.png' // ใส่ URL รูปภาพที่นี่ (เช่น '/images/person1.jpg')
        },
        {
            name_en: 'Health Promotion Unit, KPP Municipality Community Hospital',
            name_th: 'งานส่งเสริม ฯ โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
            position_en: 'Senior Professional Nurse',
            position_th: 'พยาบาลวิชาชีพชำนาญการ',
            org_en: 'Division of Public Health and Environment, Kamphaeng Phet Municipality',
            org_th: 'กองสาธารณสุขและสิ่งแวดล้อม เทศบาลเมืองกำแพงเพชร',
            link: 'https://www.facebook.com/kppmu/posts/pfbid0CRZhheAtjZi6Nkrb5weAtoNXaq2P2f5TCjthqbsZPUtc2zXfMQV2hSmULX2ha9tal?rdid=Csjk5hFTOVBZkeuF#',
            image: 'references/2.png' // ใส่ URL รูปภาพที่นี่
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const updateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString(language === 'th' ? 'th-TH' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            }));
        };

        checkMobile();
        updateTime();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('beforeprint', updateTime);
        return () => { window.removeEventListener('resize', checkMobile); window.removeEventListener('beforeprint', updateTime); };
    }, [language]);

    const filteredActivities = activities.filter(activity => {
        const term = searchTerm.toLowerCase();
        return (
            activity.title_en.toLowerCase().includes(term) ||
            activity.title_th.toLowerCase().includes(term) ||
            activity.desc_en.toLowerCase().includes(term) ||
            activity.desc_th.toLowerCase().includes(term) ||
            activity.location_en.toLowerCase().includes(term) ||
            activity.location_th.toLowerCase().includes(term) ||
            activity.date_en.toLowerCase().includes(term) ||
            activity.date_th.toLowerCase().includes(term)
        );
    }).sort((a, b) => {
        const dateA = new Date(a.date_en).getTime();
        const dateB = new Date(b.date_en).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const filteredPublications = publications.filter(pub => {
        const term = searchTerm.toLowerCase();
        const matchesSearch = (
            pub.title_en.toLowerCase().includes(term) ||
            pub.title_th.toLowerCase().includes(term) ||
            pub.desc_en.toLowerCase().includes(term) ||
            pub.desc_th.toLowerCase().includes(term) ||
            pub.publisher_en.toLowerCase().includes(term) ||
            pub.publisher_th.toLowerCase().includes(term) ||
            pub.date_en.toLowerCase().includes(term) ||
            pub.date_th.toLowerCase().includes(term)
        );

        if (!matchesSearch) return false;

        if (publicationFilter === 'social') {
            return pub.link && (pub.link.includes('tiktok') || pub.link.includes('facebook'));
        }
        if (publicationFilter === 'news') {
            const isSocial = pub.link && (pub.link.includes('tiktok') || pub.link.includes('facebook'));
            return !isSocial;
        }
        return true;
    });

    const filteredReferences = references.filter(ref => {
        const term = searchTerm.toLowerCase();
        return (
            ref.name_en.toLowerCase().includes(term) ||
            ref.name_th.toLowerCase().includes(term) ||
            ref.position_en.toLowerCase().includes(term) ||
            ref.position_th.toLowerCase().includes(term) ||
            ref.org_en.toLowerCase().includes(term) ||
            ref.org_th.toLowerCase().includes(term)
        );
    });

    // Styles from page.js (Activities Section)
    const paperStyle = {
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '850px',
        minHeight: 'auto',
        padding: isMobile ? '2rem 1.25rem' : '3rem 2.5rem',
        position: 'relative',
        boxShadow: isMobile
            ? '2px 2px 0px #e2e8f0, 4px 4px 10px rgba(0,0,0,0.1)'
            : '1px 1px 0px #e2e8f0, 2px 2px 0px #e2e8f0, 3px 3px 0px #e2e8f0, 4px 4px 0px #e2e8f0, 5px 5px 0px #e2e8f0, 6px 6px 20px rgba(0,0,0,0.1)',
        borderRadius: '4px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1
    };

    const lineClampStyle = {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    return (
        <div className={styles.aboutPageWrapper} style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', padding: isMobile ? '1rem' : '3rem 1rem', backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)' }}>
            <div className="print-container" style={paperStyle}>

                {/* Print Timestamp */}
                <div className="print-only" style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
                    {language === 'th' ? 'พิมพ์เมื่อ: ' : 'Printed on: '} {currentDateTime}
                </div>

                {/* Header with Back Button and Language Switcher */}
                <div className={`${styles.aboutHeaderTop} ${styles.noPrint} no-print`} style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" title={language === 'th' ? ' กลับสู่หน้าหลัก' : 'Back to Home'} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
                        {language === 'th' ? '← กลับสู่หน้าหลัก' : '← Back to Home'}
                    </Link>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => window.print()}
                            style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', color: '#64748b' }}
                            title={language === 'th' ? 'พิมพ์หน้านี้' : 'Print this page'}
                        >
                            <FaPrint />
                        </button>
                        {/* <button 
                               onClick={() => window.print()}
                               style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', color: '#ef4444' }}
                               title={language === 'th' ? 'บันทึกเป็น PDF' : 'Save as PDF'}
                           >
                               <FaFilePdf />
                           </button> */}
                        <button
                            onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
                            title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', color: '#475569', fontSize: '0.85rem', fontWeight: '600' }}
                        >
                            <FaLanguage /> {language === 'th' ? 'EN' : 'TH'}
                        </button>
                    </div>
                </div>

                {/* Title Section */}
                <div className="print-header" style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '2rem' }}>
                    <h1 className={styles.aboutTitle} style={{ color: '#1e293b', fontSize: isMobile ? '2rem' : '3rem' }}>
                        {language === 'th' ? 'กิจกรรมทั้งหมด' : 'Activites'}
                    </h1>
                    <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                        {language === 'th' ? 'กิจกรรมและเอกสารอ้างอิง' : 'All Activities & Resources'}
                    </p>
                </div>

                {/* Search Bar */}
                <div className={`${styles.noPrint} no-print`} style={{ marginBottom: '3rem', position: 'relative', maxWidth: '100%' }}>
                    <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder={language === 'th' ? 'ค้นหากิจกรรม (ชื่อ, สถานที่, วันที่)...' : 'Search activities (title, location, date)...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '15px 15px 15px 45px',
                            borderRadius: '50px',
                            border: '1px solid #cbd5e1',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            backgroundColor: '#f8fafc',
                            color: '#334155'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6fa9f3';
                            e.target.style.backgroundColor = '#fff';
                            e.target.style.boxShadow = '0 0 0 3px rgba(72, 110, 159, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#cbd5e1';
                            e.target.style.backgroundColor = '#f8fafc';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
          .print-only { display: none; }
          @media print {
            @page { size: A4; margin: 10mm; }
            html, body { height: 100%; margin: 0 !important; padding: 0 !important; }
            
            body::after {
              content: "Ratchanon Noknoy";
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 6rem;
              color: rgba(0, 0, 0, 0.03);
              z-index: -1;
              white-space: nowrap;
              pointer-events: none;
            }

            .no-print { display: none !important; }
            .${styles.aboutPageWrapper} {
              padding: 0 !important;
              background-color: white !important;
            }
            .print-container {
              padding: 0 !important;
              margin: 0 !important;
              box-shadow: none !important;
              width: 100% !important;
              max-width: 100% !important;
              border: none !important;
            }
            .print-only { 
              display: block !important; 
              text-align: right;
              font-size: 9pt !important;
              margin-bottom: 10px;
              color: #555;
            }
            
            .print-header {
              margin-bottom: 0.5rem !important; 
              padding-bottom: 0.5rem !important; 
              border-bottom: 2px solid #333 !important;
              text-align: left !important;
            }
            .print-header h1 { font-size: 18pt !important; margin: 0 !important; color: #000 !important; }
            .print-header h2 { font-size: 12pt !important; margin: 0 !important; color: #444 !important; }

            .section-wrapper { margin-top: 1rem !important; }
            h3 { 
                font-size: 11pt !important; 
                margin: 0.5rem 0 0.5rem 0 !important; 
                padding-left: 0 !important;
                color: #000 !important;
                border-bottom: 1px solid #aaa;
            }

            table { margin-bottom: 0.5rem !important; width: 100% !important; border-collapse: collapse !important; }
            thead { display: table-header-group; }
            tr { break-inside: avoid; }
            
            th, td { 
              padding: 4px 2px !important; 
              font-size: 9pt !important; 
              border-bottom: 1px solid #ddd !important;
              vertical-align: top !important;
              color: #000 !important;
            }
            th { border-bottom: 1px solid #000 !important; font-weight: bold !important; background-color: #f0f0f0 !important; }
            
            button { color: #000 !important; }
          }
        `}} />

                {/* Activities List */}
                <div className="section-wrapper">
                    {/* Section Title: Activities */}
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333', marginBottom: '2rem', paddingLeft: '15px' }}>
                        {language === 'th' ? 'กิจกรรม' : 'Activities'}
                    </h3>

                    {filteredActivities.length > 0 ? (
                        isMobile ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {filteredActivities.map((activity, index) => (
                                    <div key={`act-mobile-${index}`} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', backgroundColor: '#fff', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            {language === 'th' ? activity.date_th : activity.date_en}
                                        </div>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#334155', paddingRight: '2rem' }}>
                                            {language === 'th' ? activity.title_th : activity.title_en}
                                        </h4>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1rem', lineHeight: '1.6', ...lineClampStyle }}>
                                            {language === 'th' ? activity.desc_th : activity.desc_en}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '6px', width: 'fit-content' }}>
                                            <span style={{ color: '#6DA9F3' }}>📍</span> {language === 'th' ? activity.location_th : activity.location_en}
                                        </div>
                                        <button onClick={() => setSelectedActivity(activity)} title={language === 'th' ? 'ดูรายละเอียด' : 'View Details'} style={{
                                            position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#6DA9F3', background: 'none', border: 'none', cursor: 'pointer', padding: '5px'
                                        }}>
                                            <FaExternalLinkAlt size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569', whiteSpace: 'nowrap' }}>{language === 'th' ? 'วันที่' : 'Date'}</th>
                                            <th className="no-print" style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'รูปภาพ' : 'Screenshot'}</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'หัวข้อกิจกรรม' : 'Activity Title'}</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'สถานที่' : 'Location'}</th>
                                            <th className="no-print" style={{ width: '50px' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredActivities.map((activity, index) => (
                                            <tr key={`act-${index}`} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: '#64748b', whiteSpace: 'nowrap' }}>
                                                    {language === 'th' ? activity.date_th : activity.date_en}
                                                </td>
                                                <td className="no-print" style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                    {activity.image && (
                                                        <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                            <img src={activity.image} alt="screenshot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                    <div style={{ fontWeight: '600', color: '#334155', marginBottom: '0.25rem', ...lineClampStyle }}>
                                                        {language === 'th' ? activity.title_th : activity.title_en}
                                                    </div>
                                                    <div style={{ fontSize: '0.9rem', color: '#64748b', ...lineClampStyle }}>
                                                        {language === 'th' ? activity.desc_th : activity.desc_en}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: '#64748b' }}>
                                                    {language === 'th' ? activity.location_th : activity.location_en}
                                                </td>
                                                <td className="no-print" style={{ padding: '1rem', verticalAlign: 'top', textAlign: 'right' }}>
                                                    <button onClick={() => setSelectedActivity(activity)} title={language === 'th' ? 'ดูรายละเอียด' : 'View Details'} style={{
                                                        color: '#6DA9F3', background: 'none', border: 'none', cursor: 'pointer', padding: '5px'
                                                    }}>
                                                        <FaExternalLinkAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <p style={{ textAlign: 'center', color: '#666' }}>{language === 'th' ? 'ไม่พบข้อมูล' : 'No data found'}</p>
                    )}
                </div>

                {/* Publications List */}
                <div className="section-wrapper" style={{ marginTop: '4rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333', marginBottom: '2rem', paddingLeft: '15px' }}>
                        {language === 'th' ? 'ผลงานตีพิมพ์' : 'Published Works'}
                    </h3>
                    {filteredPublications.length > 0 ? (
                        isMobile ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {filteredPublications.map((pub, index) => (
                                    <div key={`pub-mobile-${index}`} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', backgroundColor: '#fff', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            {language === 'th' ? pub.date_th : pub.date_en}
                                        </div>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#334155', paddingRight: '2rem' }}>
                                            {language === 'th' ? pub.title_th : pub.title_en}
                                        </h4>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1rem', lineHeight: '1.6', ...lineClampStyle }}>
                                            {language === 'th' ? pub.desc_th : pub.desc_en}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '6px', width: 'fit-content' }}>
                                            <span style={{ color: '#6DA9F3' }}>📰</span> {language === 'th' ? pub.publisher_th : pub.publisher_en}
                                        </div>
                                        <button onClick={() => setSelectedActivity(pub)} title={language === 'th' ? 'ดูรายละเอียด' : 'View Details'} style={{
                                            position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#6DA9F3', background: 'none', border: 'none', cursor: 'pointer', padding: '5px'
                                        }}>
                                            <FaExternalLinkAlt size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569', whiteSpace: 'nowrap' }}>{language === 'th' ? 'วันที่' : 'Date'}</th>
                                            <th className="no-print" style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'รูปภาพ' : 'Screenshot'}</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'หัวข้อ' : 'Title'}</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'สำนักพิมพ์/แหล่งที่มา' : 'Publisher'}</th>
                                            <th className="no-print" style={{ width: '50px' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPublications.map((pub, index) => (
                                            <tr key={`pub-${index}`} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: '#64748b', whiteSpace: 'nowrap' }}>
                                                    {language === 'th' ? pub.date_th : pub.date_en}
                                                </td>
                                                <td className="no-print" style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                    {pub.image && (
                                                        <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                            <img src={pub.image} alt="screenshot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                    <div style={{ fontWeight: '600', color: '#334155', marginBottom: '0.25rem', ...lineClampStyle }}>
                                                        {language === 'th' ? pub.title_th : pub.title_en}
                                                    </div>
                                                    <div style={{ fontSize: '0.9rem', color: '#64748b', ...lineClampStyle }}>
                                                        {language === 'th' ? pub.desc_th : pub.desc_en}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: '#64748b' }}>
                                                    {language === 'th' ? pub.publisher_th : pub.publisher_en}
                                                </td>
                                                <td className="no-print" style={{ padding: '1rem', verticalAlign: 'top', textAlign: 'right' }}>
                                                    <button onClick={() => setSelectedActivity(pub)} title={language === 'th' ? 'ดูรายละเอียด' : 'View Details'} style={{
                                                        color: '#6DA9F3', background: 'none', border: 'none', cursor: 'pointer', padding: '5px'
                                                    }}>
                                                        <FaExternalLinkAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <p style={{ textAlign: 'center', color: '#666' }}>{language === 'th' ? 'ไม่พบข้อมูล' : 'No data found'}</p>
                    )}
                </div>

                {/* References List */}
                <div className="section-wrapper" style={{ marginTop: '4rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333', marginBottom: '2rem', paddingLeft: '15px' }}>
                        {language === 'th' ? 'บุคคลอ้างอิง' : 'References'}
                    </h3>
                    {filteredReferences.length > 0 ? (
                        isMobile ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {filteredReferences.map((ref, index) => (
                                    <div key={`ref-mobile-${index}`} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', backgroundColor: '#fff', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#334155', paddingRight: '2rem' }}>
                                            {language === 'th' ? ref.name_th : ref.name_en}
                                        </h4>
                                        <div style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: '600' }}>
                                            {language === 'th' ? ref.position_th : ref.position_en}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '6px', width: 'fit-content' }}>
                                            <span style={{ color: '#6DA9F3' }}>🏢</span> {language === 'th' ? ref.org_th : ref.org_en}
                                        </div>
                                        <button onClick={() => setSelectedActivity(ref)} title={language === 'th' ? 'ดูรายละเอียด' : 'View Details'} style={{
                                            position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#6DA9F3', background: 'none', border: 'none', cursor: 'pointer', padding: '5px'
                                        }}>
                                            <FaExternalLinkAlt size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                            <th className="no-print" style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'รูปภาพ' : 'Image'}</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'ชื่อ-นามสกุล' : 'Name'}</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'ตำแหน่ง' : 'Position'}</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', color: '#475569' }}>{language === 'th' ? 'หน่วยงาน' : 'Organization'}</th>
                                            <th className="no-print" style={{ width: '50px' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredReferences.map((ref, index) => (
                                            <tr key={`ref-${index}`} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <td className="no-print" style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                    {ref.image && (
                                                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                            <img src={ref.image} alt="reference" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                                                    <div style={{ fontWeight: '600', color: '#334155', ...lineClampStyle }}>
                                                        {language === 'th' ? ref.name_th : ref.name_en}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: '#64748b' }}>
                                                    <div style={lineClampStyle}>
                                                        {language === 'th' ? ref.position_th : ref.position_en}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', verticalAlign: 'top', color: '#64748b' }}>
                                                    <div style={lineClampStyle}>
                                                        {language === 'th' ? ref.org_th : ref.org_en}
                                                    </div>
                                                </td>
                                                <td className="no-print" style={{ padding: '1rem', verticalAlign: 'top', textAlign: 'right' }}>
                                                    <button onClick={() => setSelectedActivity(ref)} title={language === 'th' ? 'ดูรายละเอียด' : 'View Details'} style={{
                                                        color: '#6DA9F3', background: 'none', border: 'none', cursor: 'pointer', padding: '5px'
                                                    }}>
                                                        <FaExternalLinkAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <p style={{ textAlign: 'center', color: '#666' }}>{language === 'th' ? 'ไม่พบข้อมูล' : 'No data found'}</p>
                    )}
                </div>
            </div>

            {/* Modal for Activity Details */}
            {selectedActivity && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
                    backdropFilter: 'blur(3px)'
                }} onClick={() => setSelectedActivity(null)}>
                    <div style={{
                        backgroundColor: 'white', borderRadius: '12px', maxWidth: '600px', width: '100%',
                        maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedActivity(null)}
                            style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: '#f1f5f9', border: 'none', borderRadius: '50%',
                                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#64748b', fontSize: '1rem', transition: 'background 0.2s'
                            }}
                        >
                            <FaTimes />
                        </button>

                        <h3 style={{ marginTop: 0, marginRight: '2rem', fontSize: '1.5rem', color: '#1e293b', lineHeight: '1.3' }}>
                            {language === 'th' ? (selectedActivity.title_th || selectedActivity.name_th) : (selectedActivity.title_en || selectedActivity.name_en)}
                        </h3>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '1rem 0', fontSize: '0.9rem', color: '#64748b', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                            {(selectedActivity.date_th || selectedActivity.date_en) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '600', color: '#475569' }}>{language === 'th' ? 'วันที่:' : 'Date:'}</span>
                                    {language === 'th' ? selectedActivity.date_th : selectedActivity.date_en}
                                </div>
                            )}
                            {(selectedActivity.location_th || selectedActivity.location_en) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '600', color: '#475569' }}>{language === 'th' ? 'สถานที่:' : 'Location:'}</span>
                                    {language === 'th' ? selectedActivity.location_th : selectedActivity.location_en}
                                </div>
                            )}
                            {(selectedActivity.publisher_th || selectedActivity.publisher_en) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '600', color: '#475569' }}>{language === 'th' ? 'สำนักพิมพ์/แหล่งที่มา:' : 'Publisher:'}</span>
                                    {language === 'th' ? selectedActivity.publisher_th : selectedActivity.publisher_en}
                                </div>
                            )}
                            {(selectedActivity.position_th || selectedActivity.position_en) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '600', color: '#475569' }}>{language === 'th' ? 'ตำแหน่ง:' : 'Position:'}</span>
                                    {language === 'th' ? selectedActivity.position_th : selectedActivity.position_en}
                                </div>
                            )}
                            {(selectedActivity.org_th || selectedActivity.org_en) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontWeight: '600', color: '#475569' }}>{language === 'th' ? 'หน่วยงาน:' : 'Organization:'}</span>
                                    {language === 'th' ? selectedActivity.org_th : selectedActivity.org_en}
                                </div>
                            )}
                        </div>

                        {selectedActivity.image && (
                            <div style={{ marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                <img
                                    src={selectedActivity.image}
                                    alt={language === 'th' ? (selectedActivity.title_th || selectedActivity.name_th) : (selectedActivity.title_en || selectedActivity.name_en)}
                                    style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }}
                                />
                            </div>
                        )}

                        <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '1rem', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
                            {language === 'th' ? selectedActivity.desc_th : selectedActivity.desc_en}
                        </div>

                        {selectedActivity.link && (
                            <div style={{ textAlign: 'right' }}>
                                <a
                                    href={selectedActivity.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={language === 'th' ? 'อ่านข่าวเพิ่มเติม' : 'Read More'}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        backgroundColor: '#6fa9f3', color: 'white', padding: '0.75rem 1.5rem',
                                        borderRadius: '50px', textDecoration: 'none', fontWeight: '600',
                                        fontSize: '0.95rem', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                                    }}
                                >
                                    {language === 'th' ? 'ดูต้นฉบับ' : 'View Source'} <FaExternalLinkAlt size={14} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className={`${styles.noPrint} no-print`} style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
                <Footer language={language} />
            </div>
        </div>
    );
}
