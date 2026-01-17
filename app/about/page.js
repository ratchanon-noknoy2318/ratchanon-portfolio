'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaLanguage, FaPrint } from 'react-icons/fa';
import Footer from '../components/Footer';
import '../styles/globals.css';
import styles from '../styles/page.module.css';

export default function AboutPage() {
  const [language, setLanguage] = useState('en');
  const [printDate, setPrintDate] = useState('');

  useEffect(() => {
    const now = new Date();
    setPrintDate(now.toLocaleString(language === 'th' ? 'th-TH' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }));
  }, [language]);

  const content = {
    th: {
      back: "กลับสู่หน้าหลัก",
      title: "ประวัติส่วนตัว",
      subtitle: "ข้อมูลบุคลากร",
      section1: "ข้อมูลทั่วไป",
      fields: {
        name: "ชื่อ-นามสกุล",
        nickname: "ชื่อเล่น",
        position: "ตำแหน่ง",
        affiliation: "สังกัด",
        dob: "วันเดือนปีเกิด",
        age: "อายุ",
        nationality: "สัญชาติ",
        religion: "ศาสนา",
        address: "ที่อยู่ปัจจุบัน",
        phone: "โทรศัพท์",
        email: "อีเมล",
        education: "ประวัติการศึกษา",
        experience: "ประสบการณ์การทำงาน",
        internship: "ประสบการณ์ฝึกงาน",
        skills: "ทักษะเพิ่มเติม",
        activities: "กิจกรรมระหว่างการศึกษา"
      },
      data: {
        name: "นายรัชชานนท์ นกน้อย",
        nickname: "ฟิล์ม",
        position: "นักพัฒนาระบบฟูลสแตก",
        affiliation: "โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร",
        dob: "4 ก.ค. 2542",
        age: "26 ปี",
        nationality: "ไทย",
        religion: "พุทธ",
        address: "หมู่บ้านไดมอนด์ปาร์ค ตำบลในเมือง อำเภอเมืองกำแพงเพชร กำแพงเพชร 62000",
        phone: "098 746 2598",
        email: "ratchanon.noknoy2318@gmail.com",
        education: [
          {
            institution: "มหาวิทยาลัยแม่ฟ้าหลวง",
            degree: "วิทยาศาสตรบัณฑิต (วิศวกรรมซอฟต์แวร์)",
            year: "จบการศึกษาเมื่อ 2567"
          },
          {
            institution: "โรงเรียนนวมินทราชินูทิศ บดินทรเดชา",
            degree: "มัธยมศึกษาตอนปลาย (ห้องเรียนพิเศษวิทยาศาสตร์-คณิตศาสตร์ สสวท.)",
            year: "จบการศึกษาเมื่อ 2560"
          },
        ],
        experience: [
          {
            company: "โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร",
            role: "นักพัฒนาระบบฟูลสแตก",
            year: "มี.ค. - ก.ย. 2568",
            details: "พัฒนาระบบเว็บและเทเลเมดิซีนโรงพยาบาลบน Next.js รวม LINE OA และ HOSxP ดิจิทัลการลงทะเบียนผู้ป่วยนอก และปรับปรุงการไหลของผู้ป่วย พร้อมส่งมอบโซลูชันฟูลสแตกที่ทำให้การทำงานราบรื่นและเพิ่มประสิทธิภาพบริการโรงพยาบาล"
          }
        ],
        internship: [
          {
            company: "โรงพยาบาลโกสัมพีนคร, กำแพงเพชร",
            role: "นักศึกษาฝึกงานตำแหน่งโปรแกรมเมอร์",
            year: "พ.ค. - ก.ย. 2567",
            details: "พัฒนาระบบความโปร่งใส ITA และระบบจองห้องประชุม พร้อม LINE Notify เพื่อเพิ่มประสิทธิภาพการทำงาน"
          }
        ],
        skills: [
          { category: "HOSxP & OPD", items: "เข้าใจระบบงานโรงพยาบาล" },
          { category: "System Analysis", items: "วิเคราะห์และออกแบบระบบ" },
          { category: "Accountability", items: "รับผิดชอบงาน ส่งตรงเวลา ระบบเสถียร" },
          { category: "Work Skills", items: "ทำงานร่วมกับแผนกอื่นได้" },
          { category: "LINE API", items: "พัฒนา Rich Menu & ระบบอัตโนมัติ" },
          { category: "Data Integration", items: "เชื่อมข้อมูลโรงพยาบาลผ่าน LINE" }
        ],
        activities: [
          { item: "นักพัฒนาเว็บส่วนหน้า (Frontend Developer) โครงการเรียนรู้ดิจิทัล มหาวิทยาลัยแม่ฟ้าหลวง พัฒนาสื่อดิจิทัลรายวิชาภาษาจีน ๑", year: "2563" },
          { item: "ได้รับรางวัลเหรียญเงิน การแข่งขันงานศิลปหัตถกรรมในสาขาวิชาชีววิทยาและฟิสิกส์", year: "2560" }
        ]
      }
    },
    en: {
      back: "Back to Home",
      title: "Personal Profile",
      subtitle: "Personal Information",
      section1: "General Information",
      fields: {
        name: "Name",
        nickname: "Nickname",
        position: "Position",
        affiliation: "Affiliation",
        dob: "Date of Birth",
        age: "Age",
        nationality: "Nationality",
        religion: "Religion",
        address: "Address",
        phone: "Phone",
        email: "Email",
        education: "Education",
        experience: "Work Experience",
        internship: "Internship Experience",
        skills: "Skills",
        activities: "Activities"
      },
      data: {
        name: "Mr. Ratchanon Noknoy",
        nickname: "Film",
        position: "Full Stack Engineer",
        affiliation: "Kamphaeng Phet Municipality Community Hospital",
        dob: "July 4, 1999",
        age: "26 Years",
        nationality: "Thai",
        religion: "Buddhism",
        address: "Diamond Park Village, Kamphaeng Phet 62000, Thailand",
        phone: "(+66) 98-746-2598",
        email: "ratchanon.noknoy2318@gmail.com",
        education: [
          {
            institution: "Mae Fah Luang University",
            degree: "Bachelor of Science (Software Engineering)",
            year: "Graduated in 2024"
          },
          {
            institution: "Nawaminthrachinuthit Bodindecha School",
            degree: "High School (Science–Mathematics Program IPST)",
            year: "Graduated in 2017"
          },
        ],
        experience: [
          {
            company: "Kamphaeng Phet Municipality Community Hospital",
            role: "Full Stack Engineer",
            year: "Mar – Sep 2025",
            details: "Developed Next.js hospital web and telemedicine systems with LINE OA and HOSxP, digitizing OPD registration and improving patient flow. Delivered full-stack solutions to streamline workflows and enhance hospital services."
          }
        ],
        internship: [
          {
            company: "Kosamphi Nakhon Hospital, Kamphaeng Phet",
            role: "Programmer Internship",
            year: "May – Sep 2024",
            details: "Developed ITA transparency and meeting room booking systems with LINE Notify, improving workflow efficiency."
          }
        ],
        skills: [
          { category: "HOSxP & OPD", items: "Hospital Workflow Understanding" },
          { category: "System Analysis", items: "System Analysis & Design" },
          { category: "Accountability", items: "Responsibility, Punctuality, System Stability" },
          { category: "Work Skills", items: "Cross-Department Collaboration" },
          { category: "LINE API", items: "Rich Menu & Automation Development" },
          { category: "Data Integration", items: "Hospital Data Integration via LINE" }
        ],
        activities: [
          { item: "Frontend Developer, Digital Learning Project, Mae Fah Luang University – Developed digital content for Chinese Language 1.", year: "2020" },
          { item: "Received a silver medal in the student science project competition, in the fields of biology and physics.", year: "2017" }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className={`${styles.aboutPageWrapper} responsive-wrapper`} style={{ backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .print-visible { display: none; }
        
        /* Responsive Styles */
        .responsive-wrapper { padding: 3rem 1rem; }
        .responsive-paper { padding: 4rem; }
        .responsive-title { font-size: 2.25rem !important; }
        .responsive-grid { display: flex; flex-direction: column; gap: 2rem; align-items: center; }
        .responsive-image-col { width: 100%; display: flex; justify-content: center; }

        @media (max-width: 768px) {
          .responsive-wrapper { padding: 1rem; }
          .responsive-paper { padding: 2rem 1.5rem; }
          .responsive-title { font-size: 1.75rem !important; }
        }

        @media print {
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

          .print-visible { display: block !important; position: absolute; top: 0; right: 0; font-size: 12px !important; color: #000 !important; font-weight: bold; }
          .print-hidden { display: none !important; }
          .${styles.aboutPageWrapper} { padding: 0 !important; background-color: white !important; height: auto !important; min-height: 0 !important; }
          .${styles.aboutPaper} { 
            padding: 0 !important; 
            box-shadow: none !important; 
            width: 100% !important;
            max-width: 100% !important;
            border: none !important; 
            margin: 0 !important;
            position: relative;
          }
          
          /* Adjust Layout for A4 printing */
          .${styles.aboutPaper} > div:nth-of-type(3) { /* Title Section */
            margin-bottom: 1rem !important; 
            padding-bottom: 0.5rem !important; 
            border-bottom: 2px solid #333 !important;
            text-align: left !important;
            padding-right: 0 !important;
          }
          .${styles.aboutTitle} { font-size: 24px !important; margin-bottom: 5px !important; color: #000 !important; }
          .${styles.aboutPaper} > div:nth-of-type(3) > p { margin-top: 0 !important; font-size: 14px !important; color: #333 !important; }
          
          .responsive-grid { display: block !important; margin-top: 0 !important; gap: 0 !important; }
          
          /* Hide Image in Print */
          .responsive-image-col { display: none !important; }
          
          /* Adjust table and headers */
          h3 { font-size: 18px !important; margin-top: 15px !important; margin-bottom: 8px !important; padding-left: 0 !important; color: #000 !important; border-bottom: 2px solid #000 !important; font-weight: bold !important; }
          table { margin-bottom: 10px !important; page-break-inside: avoid; width: 100% !important; }
          table th, table td { 
            padding: 4px 2px !important; 
            font-size: 14px !important; 
            line-height: 1.4 !important;
            background-color: transparent !important;
            border-bottom: 1px solid #000 !important;
            color: #000 !important;
          }
          table th { width: 25% !important; font-weight: bold !important; color: #000 !important; }
          td div { margin-bottom: 2px !important; color: #000 !important; }
        }

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
      `}} />

      <div className={`${styles.aboutPaper} responsive-paper`} style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 4px 25px rgba(0,0,0,0.05)',
        // position: 'relative',
        // borderTop: '6px solid #486e9f' // เพิ่มแถบสีด้านบนให้ดูทางการ
      }}>
        
        {/* Print Date */}
        <div className="print-visible" style={{ textAlign: 'right', fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
            {language === 'th' ? 'พิมพ์เมื่อ: ' : 'Printed on: '} {printDate}
        </div>

        {/* Header Actions */}
        <div className={`${styles.aboutHeaderTop} print-hidden`} style={{ marginBottom: '2rem' }}>
            <Link href="/" title={t.back} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
              <FaArrowLeft /> {t.back}
            </Link>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                    onClick={() => {
                      const now = new Date();
                      setPrintDate(now.toLocaleString(language === 'th' ? 'th-TH' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }));
                      setTimeout(() => window.print(), 100);
                    }}
                    style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', color: '#64748b' }}
                    title={language === 'th' ? 'พิมพ์หน้านี้' : 'Print this page'}
                    aria-label={language === 'th' ? 'พิมพ์หน้านี้' : 'Print this page'}
                >
                    <FaPrint />
                </button>
                <button
                onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
                title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', color: '#475569', fontSize: '0.85rem', fontWeight: '600' }}
                >
                <FaLanguage /> {language === 'th' ? 'EN' : 'TH'}
                </button>
            </div>
        </div>

        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '2rem' }}>
            <h1 className={`${styles.aboutTitle} responsive-title`} style={{ color: '#1e293b' }}>{t.title}</h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1.1rem' }}>{t.subtitle}</p>
        </div>

        {/* Content Grid */}
        <div className="responsive-grid">
            
            {/* Left Column: Image (Formal Style) */}
            <div className="responsive-image-col">
                <div 
                    title={t.data.name}
                    style={{ 
                    width: '180px', 
                    height: '240px', 
                    borderRadius: '4px', 
                    overflow: 'hidden', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    position: 'relative',
                    backgroundColor: '#f8fafc'
                }}>
                    <Image 
                        src="/RatchanonNoknoy_Profile.png" 
                        alt={language === 'th' ? 'รูปโปรไฟล์ของ รัชชานนท์ นกน้อย' : 'Profile picture of Ratchanon Noknoy'}
                        fill 
                        sizes="180px"
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            </div>

            {/* Right Column: Table Info */}
            <div style={{ flex: 1, width: '100%' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#334155', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                    {t.section1}
                </h3>
                
                <table className={styles.infoTable}>
                    <tbody>
                        <tr>
                            <th scope="row">{t.fields.name}</th>
                            <td>{t.data.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t.fields.nickname}</th>
                            <td>{t.data.nickname}</td>
                        </tr>
                        {/* <tr>
                            <th scope="row">{t.fields.position}</th>
                            <td>{t.data.position}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t.fields.affiliation}</th>
                            <td>{t.data.affiliation}</td>
                        </tr> */}
                         <tr>
                            <th scope="row">{t.fields.dob}</th>
                            <td>{t.data.dob}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t.fields.age}</th>
                            <td>{t.data.age}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t.fields.nationality}</th>
                            <td>{t.data.nationality}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t.fields.religion}</th>
                            <td>{t.data.religion}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t.fields.address}</th>
                            <td>{t.data.address}</td>
                        </tr>
                        {/* <tr>
                            <th scope="row">{t.fields.phone}</th>
                            <td>{t.data.phone}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t.fields.email}</th>
                            <td>{t.data.email}</td>
                        </tr> */}
                    </tbody>
                </table>

                <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                    {t.fields.education}
                </h3>
                
                <table className={styles.infoTable}>
                    <tbody>
                        {t.data.education.map((edu, index) => (
                            <tr key={index}>
                                <th scope="row" style={{ verticalAlign: 'top' }}>{edu.year}</th>
                                <td>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{edu.institution}</div>
                                    <div>{edu.degree}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                    {t.fields.experience}
                </h3>
                
                <table className={styles.infoTable}>
                    <tbody>
                        {t.data.experience.map((exp, index) => (
                            <tr key={index}>
                                <th scope="row" style={{ verticalAlign: 'top' }}>{exp.year}</th>
                                <td>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{exp.role}</div>
                                    <div style={{ marginBottom: '4px' }}>{exp.company}</div>
                                    {exp.details && <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{exp.details}</div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                    {t.fields.internship}
                </h3>
                
                <table className={styles.infoTable}>
                    <tbody>
                        {t.data.internship.map((intern, index) => (
                            <tr key={index}>
                                <th scope="row" style={{ verticalAlign: 'top' }}>{intern.year}</th>
                                <td>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{intern.role}</div>
                                    <div style={{ marginBottom: '4px' }}>{intern.company}</div>
                                    {intern.details && <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{intern.details}</div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                    {t.fields.activities}
                </h3>
                
                <table className={styles.infoTable}>
                    <tbody>
                        {t.data.activities.map((activity, index) => (
                            <tr key={index}>
                                <th scope="row" style={{ verticalAlign: 'top' }}>{activity.year}</th>
                                <td>{activity.item}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                    {t.fields.skills}
                </h3>
                
                <table className={styles.infoTable}>
                    <tbody>
                        {t.data.skills.map((skill, index) => (
                            <tr key={index}>
                                <th style={{ verticalAlign: 'top' }}>{skill.category}</th>
                                <td>{skill.items}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}

                {/* <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', borderLeft: '4px solid #486e9f', paddingLeft: '1rem' }}>
                    {t.fields.education}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {t.data.education && t.data.education.map((edu, index) => (
                        <div key={index} style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <span style={{ fontWeight: '600', color: '#334155' }}>{edu.institution}</span>
                                <span style={{ fontSize: '0.85rem', color: '#64748b', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '12px', height: 'fit-content' }}>{edu.year}</span>
                            </div>
                            <div style={{ color: '#475569' }}>{edu.degree}</div>
                        </div>
                    ))}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', borderLeft: '4px solid #486e9f', paddingLeft: '1rem' }}>
                    {t.fields.activities}
                </h3>
                
                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {t.data.activities && t.data.activities.map((activity, index) => (
                        <li key={index} style={{ 
                            position: 'relative', 
                            paddingLeft: '1.5rem', 
                            color: '#475569',
                            fontSize: '1rem'
                        }}>
                            <span style={{ 
                                position: 'absolute', 
                                left: 0, 
                                top: '0.6rem', 
                                width: '6px', 
                                height: '6px', 
                                borderRadius: '50%', 
                                backgroundColor: '#486e9f' 
                            }}></span>
                            {activity}
                        </li>
                    ))}
                </ul>

                <h3 style={{ fontSize: '1.25rem', color: '#334155', marginTop: '2rem', marginBottom: '1.5rem', borderLeft: '4px solid #486e9f', paddingLeft: '1rem' }}>
                    {t.fields.skills}
                </h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {t.data.skills && t.data.skills.map((skill, index) => (
                        <span key={index} style={{ 
                            backgroundColor: '#eff6ff', 
                            color: '#1d4ed8', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '9999px', 
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            border: '1px solid #dbeafe'
                        }}>
                            {skill}
                        </span>
                    ))}
                </div> */}
            </div>
        </div>

      </div>
      <div className="print-hidden" style={{ maxWidth: '900px', margin: '2rem auto 0' }}>
        <Footer language={language} />
      </div>
    </div>
  );
}