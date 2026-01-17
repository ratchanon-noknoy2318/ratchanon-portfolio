'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaHtml5, FaCss3Alt, FaJsSquare, FaLine, FaLink, FaSearch, FaRocket, FaGitlab, FaSyncAlt, FaExternalLinkAlt, FaCode, FaLaptopCode, FaArrowUp, FaArrowDown, FaPhp, FaHospital, FaChartBar, FaLandmark, FaCalendarAlt, FaPlus, FaBriefcase, FaBrain, FaUsers, FaClock, FaLightbulb, FaCertificate, FaLinkedin, FaLinkedinIn, FaArrowRight, FaGraduationCap, FaDownload, FaGlobe, FaMapMarkerAlt, FaGithub, FaLanguage, FaUser, FaUserNurse, FaUserTie, FaBirthdayCake, FaFlag, FaDharmachakra, FaSearchPlus, FaSearchMinus, FaChevronLeft, FaChevronRight, FaHome, FaList, FaImages, FaFileAlt, FaPlay, FaBuilding, FaReddit, FaPrint, FaTimes, FaPhone, FaFacebook, FaBook, FaEnvelope, FaGift, FaIdCard } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { SiGooglesheets } from 'react-icons/si';
import { SiRender, SiVercel, SiCanva, SiGmail } from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';
import Link from 'next/link';
import Script from 'next/script';
import { content, allProjects, allLineProjects, skillsData, professionalExperienceData, activitiesInfo, tocItems, workImages, transcriptsData } from './data/content';
import ProjectFilter from './components/ProjectFilter';
import styles from './styles/page.module.css';
import SectionHeader from './components/SectionHeader';
import Footer from './components/Footer';

// --- Lazy Load Components ---
// โหลด Component Modal เมื่อจำเป็นเท่านั้น (ช่วยให้เว็บโหลดเร็วขึ้น)
const Modal = dynamic(() => import('./components/Modal'), { ssr: false });

// --- Static Data & Helpers (Moved outside component to prevent re-creation) ---
// --- ข้อมูลคงที่และฟังก์ชันช่วยคำนวณ (อยู่นอก Component เพื่อประสิทธิภาพ ไม่ต้องสร้างใหม่ทุกครั้งที่ Render) ---
const birthDate = '1999-07-04';

const calculateAge = (dateString) => { // ฟังก์ชันคำนวณอายุจากวันเกิด
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Map สำหรับแปลงชื่อหมวดหมู่โปรเจกต์ให้แสดงผลสวยงาม
const categoryDisplayMap = {
  'web-app': 'Web Application',
  'healthcare-it': 'Healthcare IT',
  'line-oa': 'LINE OA',
  'canva-ai': 'Canva AI'
};

// Icon mapping defined once
// จับคู่ชื่อเทคโนโลยีกับไอคอน (กำหนดครั้งเดียวเพื่อลดการทำงานซ้ำซ้อน)
const iconMap = {
  'gitlab': <FaGitlab />,
  'next.js': <SiNextdotjs />,
  'react': <FaReact />,
  'php': <FaPhp />,
  'node.js': <FaNodeJs />,
  'html5': <FaHtml5 />,
  'css3': <FaCss3Alt />,
  'css modules': <FaCss3Alt />,
  'tailwind css': <FaCss3Alt />,
  'tailwind': <FaCss3Alt />,
  'javascript (es6+)': <FaJsSquare />,
  'javascript': <FaJsSquare />,
  'mysql': <FaDatabase />,
  'sql': <FaDatabase />,
  'sql for healthcare': <FaHospital />,
  'git': <FaGitAlt />,
  'line': <FaLine />,
  'line messaging api': <FaLine />,
  'rich menu': <FaLine />,
  'flex message': <FaLine />,
  'line oa automation': <FaLine />,
  'line bot designer': <FaLine />,
  'line notify': <FaLine />,
  'flex': <FaLine />,
  'quick replies': <FaLine />,
  'json': <VscJson />,
  'canva': <SiCanva />,
  'canva ai': <SiCanva />,
  'canva tools': <SiCanva />,
  'vercel': <SiVercel />,
  'render': <SiRender />,
  'restful api': <FaLink />,
  'seo optimization': <FaSearch />,
  'seo': <FaSearch />,
  'ci/cd': <FaRocket />,
  'agile': <FaSyncAlt />,
  'google apps script': <SiGooglesheets />,
  'google app script (gas)': <SiGooglesheets />,
  'gas': <SiGooglesheets />,
  'google sheets': <SiGooglesheets />,
  'google sites': <FaGlobe />,
  'hdc': <FaChartBar />,
  'nhso platform': <FaLandmark />,
  'hosxp': <FaHospital />,
  'bmshosxpstandard43export': <FaHospital />,
  'opd workflow': <FaHospital />,
  'hosxpxe pcu': <FaHospital />,
  'buddy care': <FaHospital />,
  'continuous learning': <FaBrain />,
  'การเรียนรู้อย่างต่อเนื่อง': <FaBrain />,
  'collaboration': <FaUsers />,
  'การทำงานร่วมกับผู้อื่น': <FaUsers />,
  'highly responsible': <FaClock />,
  'มีความรับผิดชอบสูง': <FaClock />,
  'ux passion': <FaLightbulb />,
  'ความหลงใหลใน ux': <FaLightbulb />,
  'adaptability': <FaSyncAlt />,
  'ความยืดหยุ่น': <FaSyncAlt />,
  'web application': <FaGlobe />,
  'healthcare it': <FaHospital />,
  'line oa': <FaLine />,
  'canva ai': <SiCanva />,
};

// ฟังก์ชันช่วยดึงไอคอนจากชื่อทักษะ (Case-insensitive)
const getSkillIcon = (skill) => {
  const lowerSkill = skill.toLowerCase();
  return iconMap[lowerSkill] || null;
};

// --- Static Data (Moved outside to prevent re-creation) ---
// รายชื่อ ID ของกิจกรรมที่จะแสดงในหน้ากิจกรรม

const activityIds = [7, 12, 5];

// --- Extracted Components for Conciseness ---
// --- ส่วนประกอบย่อย (Components) ที่แยกออกมาเพื่อให้โค้ดหลักอ่านง่ายขึ้น ---

// 1. ExperienceItem: แสดงรายการประสบการณ์ทำงานแต่ละช่วงเวลา
const ExperienceItem = ({ exp }) => (
  <div className={styles.flexResponsive} style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
    <div className={styles.timelineDate} style={{ fontSize: '1.4rem', fontWeight: '800', color: '#6DA9F3', lineHeight: '1.2', flexShrink: 0 }}>
      {exp.period}
    </div>
    <div style={{ flex: 1, paddingBottom: '20px' }}>
      <h3 style={{ color: '#4A8ED8', fontSize: '1.4rem', fontWeight: '700', marginBottom: '0', lineHeight: 1.3 }}>{exp.role}</h3>
      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#444', marginBottom: '10px', marginTop: '2px' }}>{exp.company}</h4>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
        {exp.contributions.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

// 2. SkillCard: การ์ดแสดงหมวดหมู่ทักษะและรายการทักษะย่อย
const SkillCard = ({ category }) => (
  <div className={styles.skillCard} style={{ marginBottom: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
      <h3 className={styles.skillCardTitle} style={{ fontSize: '1.1rem', fontWeight: '700', color: '#2c3e50', margin: 0 }}>
        {category.category}
      </h3>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {category.items.map((skill, idx) => (
        <div key={idx} className={`${styles.skillTag} ${styles.skillTagResponsive}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '50px', color: '#555', fontWeight: '500', transition: 'all 0.2s ease', boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6DA9F3'; e.currentTarget.style.color = '#6DA9F3'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(109, 169, 243, 0.15)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#555'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.03)'; }}
        >
          <span style={{ fontSize: '1.1rem', display: 'flex', color: 'inherit' }}>{getSkillIcon(skill)}</span>
          {skill}
        </div>
      ))}
    </div>
  </div>
);

// 3. ProjectCard: การ์ดแสดงผลงาน (รองรับทั้ง Web App, LINE OA, และ Canva AI)
const ProjectCard = ({ project, language, content, openModal, setSelectedImage }) => {
  const isLineOA = project.category === 'line-oa';
  const isCanvaAI = project.category === 'canva-ai';
  
  // ตรวจสอบประเภทโปรเจกต์เพื่อปรับการแสดงผลรูปภาพและปุ่มต่างๆ
  return (
    <div className={styles.projectItem} style={{
      backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)'; e.currentTarget.style.borderColor = '#f1f5f9'; }}
    >
      <div className={styles.projectImageWrapper} style={{ cursor: 'zoom-in', position: 'relative', borderBottom: '1px solid #f1f5f9', height: '220px', width: '100%', backgroundColor: '#f8fafc' }}
        onClick={() => setSelectedImage({ src: project.imageUrl, title: project.title, width: 1200, height: 800 })}
      >
        <Image
          src={project.imageUrl}
          alt={isLineOA ? (language === 'th' ? `Rich Menu ของ ${project.title}` : `Rich Menu of ${project.title}`) : (language === 'th' ? `ภาพหน้าจอของ ${project.title}` : `Screenshot of ${project.title}`)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: isCanvaAI ? 'contain' : 'cover', objectPosition: isLineOA ? 'top' : 'center', padding: isCanvaAI ? '10px' : '0' }}
          className={styles.projectImage}
        />
      </div>
      <div className={styles.projectContent} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 className={styles.projectTitle} style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '0.5rem', fontWeight: '700', lineHeight: 1.3 }}>{project.title}</h3>
        {project.createDate && (
          <p className={styles.projectDate} style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <FaCalendarAlt size={12} /> {content.createdOn}: {project.createDate}
          </p>
        )}
        <div className={styles.projectDesc} style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>
          {project.description}
        </div>
        {project.tech && (
          <div className={styles.projectTech} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
            {project.tech.split(', ').map(tech => (
              <span key={tech} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '20px', fontSize: '0.75rem', color: '#0284c7', fontWeight: '600', letterSpacing: '0.3px' }}>
                {getSkillIcon(tech)} {tech}
              </span>
            ))}
          </div>
        )}
        <div className={styles.projectLinks} style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1.2rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', alignItems: 'center' }}>
          {['web-app', 'healthcare-it', 'canva-ai'].includes(project.category) && (
            <>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#ffffff', fontWeight: '600', textDecoration: 'none', backgroundColor: '#6fa9f3', padding: '8px 16px', borderRadius: '50px', boxShadow: '0 4px 10px rgba(111, 169, 243, 0.3)', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'} title={project.websiteTooltip || project.websiteLabel || content.viewWebsite}
                >
                  <FaExternalLinkAlt size={12} /> {project.websiteLabel || content.viewWebsite}
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600', textDecoration: 'none', padding: '8px 12px', borderRadius: '50px', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} title={content.viewCode}
                >
                  <FaCode size={14} /> {content.viewCode}
                </a>
              )}
              {project.details && (
                <button type="button" onClick={() => openModal(project)} style={{ cursor: 'pointer', border: 'none', background: 'none', padding: '8px 12px', font: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600', borderRadius: '50px', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'} title={content.readMore}
                >
                  <FaPlus size={12} /> {content.readMore}
                </button>
              )}
            </>
          )}
          {isLineOA && (
            <>
              {project.addFriendUrl && (
                <a href={project.addFriendUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#06C755', color: 'white', padding: '8px 20px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 6px rgba(6, 199, 85, 0.3)', transition: 'transform 0.2s ease' }}
                  title={content.addFriend} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <FaLine size={18} /> {content.addFriend}
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600', textDecoration: 'none' }} title={content.viewCode}><FaCode size={14} /> {content.viewCode}</a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // --- การจัดการ State (State Management) ---
  // เก็บสถานะการทำงานของหน้าเว็บ เช่น ภาษาปัจจุบัน, ตัวกรองที่เลือก, การเปิด Modal
  const [language, setLanguage] = useState('en');
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [visibleLineProjects, setVisibleLineProjects] = useState(4);
  const [currentRefIndex, setCurrentRefIndex] = useState(0);
  const [printDate, setPrintDate] = useState('');
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [signatureDate, setSignatureDate] = useState('');
  const filterRef = useRef(null);
  const [showEasterEggTooltip, setShowEasterEggTooltip] = useState(false);
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredWorkImage, setHoveredWorkImage] = useState(null);


  // --- Effects (การทำงานข้างเคียง) ---
  // 1. อัปเดต attribute lang ของ html เมื่อเปลี่ยนภาษา
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // 2. อัปเดตวันที่และเวลาสำหรับแสดงผลในโหมดพิมพ์และลายเซ็น
  useEffect(() => {
    const now = new Date();
    setPrintDate(now.toLocaleString(language === 'th' ? 'th-TH' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }));
    setSignatureDate(now.toLocaleString(language === 'th' ? 'th-TH' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }));
  }, [language]);

  // 3. จัดการการแสดงปุ่ม Floating Button (ดาวน์โหลด/เปลี่ยนภาษา) ตามการเลื่อนหน้าจอ
  useEffect(() => {
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

      setShowFloatingButton(shouldShow);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // ตรวจสอบสถานะเริ่มต้นทันที
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 4. รีเซ็ตจำนวนโปรเจกต์ที่แสดงเมื่อเปลี่ยนตัวกรอง
  useEffect(() => {
    setVisibleProjects(4);
  }, [filter]);

  // 5. ตรวจสอบขนาดหน้าจอเพื่อปรับโหมด Mobile/Desktop
  useEffect(() => {
    // ตรวจสอบขนาดหน้าจอเพื่อปรับโหมด Mobile
    // จัดการการเลื่อนหน้าจอสำหรับตัวกรองแบบติดหนึบและการปรับขนาดหน้าจอสำหรับมือถือ
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 6. ล็อคการเลื่อนหน้าจอ (Scroll Lock) เมื่อเปิด Modal รูปภาพ
  // ล็อคการเลื่อนหน้าจอหลักเมื่อเปิดรูปภาพขยาย
  useEffect(() => {
    if (selectedImage) {
      setIsZoomed(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  // --- Data Preparation (การเตรียมข้อมูล) ---
  // ใช้ useMemo เพื่อแคชข้อมูลตามภาษาที่เลือก ป้องกันการคำนวณซ้ำโดยไม่จำเป็น
  const baseContent = useMemo(() => content[language], [language]);
  const currentContent = baseContent;

  // --- Effect: Auto-rotate References ---
  // 7. เลื่อนรายชื่อบุคคลอ้างอิงอัตโนมัติ (Carousel) ทุก 5 วินาที
  useEffect(() => {
    if (currentContent.referencesList && currentContent.referencesList.length > 0) {
      const interval = setInterval(() => {
        setCurrentRefIndex((prev) => (prev + 1) % currentContent.referencesList.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentContent.referencesList]);

  // ดึงข้อมูลโปรเจกต์, ทักษะ, และประสบการณ์ทำงาน ตามภาษาที่เลือก
  const projects = useMemo(() => allProjects[language], [language]);
  const lineProjects = useMemo(() => allLineProjects[language], [language]);
  const currentSkills = useMemo(() => skillsData[language], [language]);
  const professionalExperience = useMemo(() => professionalExperienceData[language], [language]);

  // ข้อมูลการติดต่อ (Contact Info)
  const contactInfo = useMemo(() => [
    {
      id: 'location',
      icon: <FaMapMarkerAlt />,
      label: language === 'th' ? 'ที่อยู่' : 'Location',
      value: 'Kamphaeng Phet, Thailand',
      link: 'https://maps.app.goo.gl/qmYUfoXVRZhDkngW7'
    },
    {
      id: 'email',
      icon: <SiGmail />,
      label: language === 'th' ? 'อีเมล' : 'Email',
      value: 'ratchanon.noknoy2318@gmail.com',
      link: 'mailto:ratchanon.noknoy2318@gmail.com'
    },
  ], [language]);

  // --- Paper Style Helper ---
  // สไตล์พื้นฐานของหน้ากระดาษ (Paper Style) สำหรับแสดงผลเหมือนเอกสาร
  const paperStyle = useMemo(() => ({
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '210mm',
    position: 'relative',
    borderRadius: '4px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1
  }), []);

  const pageNumberStyle = {
    position: 'absolute',
    top: '30px',
    right: '30px',
    border: '2px solid #6DA9F3',
    color: '#6DA9F3',
    borderRadius: '20px',
    padding: '2px 15px',
    fontWeight: '700',
    fontSize: '1rem'
  };

  // --- ตัวจัดการเหตุการณ์ (Event Handlers) ---
  // ฟังก์ชันเปิด/ปิด Modal แสดงรายละเอียดโปรเจกต์
  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // --- Extract Unique Technologies for Filter ---
  // คำนวณรายชื่อเทคโนโลยีและหมวดหมู่ทั้งหมดจากโปรเจกต์เพื่อสร้างตัวเลือกใน Filter
  const allTechs = useMemo(() => {
    const allCombined = [...projects];
    const techSet = new Set();
    const categorySet = new Set();

    allCombined.forEach(p => {
      if (p.tech) {
        p.tech.split(',').forEach(t => techSet.add(t.trim()));
      }
      if (p.category) {
        const display = categoryDisplayMap[p.category] || p.category;
        categorySet.add(display);
      }
    });

    const sortedTechs = Array.from(techSet).sort((a, b) => {
      const priority = ['react', 'next.js', 'node.js', 'tailwind css', 'javascript', 'mysql', 'php'];
      const indexA = priority.indexOf(a.toLowerCase());
      const indexB = priority.indexOf(b.toLowerCase());

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    const categoryOrder = ['Web Application', 'Healthcare IT', 'LINE OA', 'Canva AI'];
    const sortedCategories = Array.from(categorySet).sort((a, b) => {
      const idxA = categoryOrder.indexOf(a);
      const idxB = categoryOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      return a.localeCompare(b);
    });

    return {
      categories: sortedCategories,
      technologies: sortedTechs
    };
  }, [projects]);

  // กรองรายการโปรเจกต์ตาม Filter ที่เลือก
  const filteredProjects = useMemo(() => {
    const allCombinedProjects = [...projects];
    return allCombinedProjects.filter(project => {
      if (filter === 'all') return true;
      const techs = project.tech ? project.tech.toLowerCase().split(',').map(t => t.trim()) : [];
      const categoryDisplay = project.category ? (categoryDisplayMap[project.category] || project.category) : '';
      return techs.includes(filter.toLowerCase()) || categoryDisplay.toLowerCase() === filter.toLowerCase();
    });
  }, [projects, filter]);

  // ข้อมูลใบเกรดและใบรับรอง (Transcripts & Certificates)
  const transcriptsList = useMemo(() => transcriptsData[language], [language]);

  // --- Helper: Render Section Header with Permalink ---
  // ฟังก์ชันช่วยสร้างส่วนหัวของแต่ละ Section (มีภาษาไทยและอังกฤษ)
  const renderSectionHeader = (id, titleTh, titleEn) => (
    <SectionHeader title={
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.3', color: '#6fa9f3' }}>
        <span className={styles.sectionHeaderEn} style={{ fontWeight: '700' }}>{titleEn}</span>
        <span className={styles.sectionHeaderTh} style={{ opacity: 0.8, fontWeight: '500', marginTop: '4px', color: '#000000' }}>{titleTh}</span>
      </span>
    } />
  );

  // --- Helper: Render Page Header (Preface Style) ---
  // ฟังก์ชันช่วยสร้างหัวกระดาษสำหรับแต่ละหน้า (พร้อมเลขหน้า)
  const renderPageHeader = (titleEn, titleTh, pageNum) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div>
          <h1 className={styles.headerTitle} style={{ fontWeight: '800', color: '#333', lineHeight: '0.9', margin: 0 }}>{titleEn}</h1>
          <h2 className={styles.headerSubtitle} style={{ color: '#6DA9F3', fontWeight: '600', margin: 0 }}>{titleTh}</h2>
        </div>
      </div>
      {pageNum && <div style={{
        border: '2px solid #6DA9F3',
        color: '#6DA9F3',
        borderRadius: '20px',
        padding: '2px 18px',
        fontWeight: '700',
        fontSize: '1.1rem',
        height: 'fit-content'
      }}>
        {pageNum}
      </div>}
    </div>
  );

  // --- SEO: Structured Data (JSON-LD) ---
  // สร้างข้อมูล Structured Data (JSON-LD) สำหรับ SEO เพื่อให้ Google เข้าใจเนื้อหาเว็บ
  const jsonLd = useMemo(() => {
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: currentContent.name,
      jobTitle: 'Full Stack & Health Tech Developer',
      url: 'https://ratchanon-portfolio.vercel.app',
      image: 'https://ratchanon-portfolio.vercel.app/RatchanonNoknoy_Profile.png',
      sameAs: contactInfo.map((c) => c.link).filter((link) => link && link.startsWith('http')),
      worksFor: {
        '@type': 'Organization',
        name: professionalExperience[0]?.company,
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: currentContent.university
      },
      knowsAbout: currentSkills.flatMap((s) => s.items),
    };

    const projectsSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareSourceCode',
          name: project.title,
          description: project.description,
          url: project.liveUrl || project.sourceUrl,
          image: project.imageUrl ? `https://ratchanon-portfolio.vercel.app${project.imageUrl}` : undefined,
          programmingLanguage: project.tech,
          author: {
            '@type': 'Person',
            name: currentContent.name
          },
          dateCreated: project.createDate
        }
      }))
    };

    return [personSchema, projectsSchema];
  }, [currentContent, professionalExperience, currentSkills, contactInfo, projects]);

  const handlePrint = () => {
    // ฟังก์ชันสั่งพิมพ์: ขยายโปรเจกต์ทั้งหมดให้แสดงครบก่อนสั่งพิมพ์
    // และตั้งค่าวันที่พิมพ์ปัจจุบัน
    setPrintDate(new Date().toLocaleString(language === 'th' ? 'th-TH' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }));
    setVisibleProjects(filteredProjects.length);
    setVisibleLineProjects(lineProjects.length);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <>
      {/* --- SEO & Scripts --- */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript" />

      {/* --- Floating Buttons: ปุ่มดาวน์โหลดเอกสาร (มุมขวาล่าง) --- */}
      <div style={{
        position: 'fixed',
        bottom: '90px',
        right: isMobile ? '15px' : '30px',
        right: '30px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      
        alignItems: 'center',
        opacity: showFloatingButton ? 1 : 0,
        visibility: showFloatingButton ? 'visible' : 'hidden',
        transition: 'opacity 0.3s, visibility 0.3s',
        pointerEvents: showFloatingButton ? 'auto' : 'none',
      }}
        className={styles.noPrint}>
        {/* <a
          href={language === 'th' ? '/pdf/resume-th.pdf' : '/pdf/resume-en.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          title={language === 'th' ? 'ดาวน์โหลดเรซูเม่' : 'Download Resume'}
          style={{
            width: '50px',
            height: '50px',
            padding: 0,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#6fa9f3',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(74, 142, 216, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            transition: 'transform 0.3s, background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 142, 216, 0.4)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 142, 216, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <FaDownload size={20} />
        </a> */}

        {/* Transcript Download Button */}
        {/* <a
          href="https://drive.google.com/file/d/1bu4neAkGrfAV4nfZJ8ugUfbQgYKyBA_O/view?usp=sharing"
          target='_blank'
          rel="noopener noreferrer"
          title={language === 'th' ? 'ดาวน์โหลดใบผลการเรียน' : 'Download Transcript'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 0 : '8px',
            width: isMobile ? '50px' : 'auto',
            height: '50px',
            padding: isMobile ? 0 : '0 20px',
            borderRadius: '50px',
            background: '#2c3e50',
            color: '#ffffff',
            border: 'none',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            transition: 'transform 0.2s ease, background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = '#34495e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#2c3e50';
          }}
          aria-label={language === 'th' ? 'ดาวน์โหลดใบผลการเรียน' : 'Download Transcript'}
        >
          <FaGraduationCap size={20} />
          {!isMobile && (language === 'th' ? 'ใบผลการเรียน' : 'Transcript')}
        </a> */}

        {/* Certificates/Documents Download Button */}
        {/* <a
          href="https://drive.google.com/drive/u/0/folders/12AVbhuFR43G5GDSdlK8ga0h9lImF5bnC"
          target='_blank'
          rel="noopener noreferrer"
          title={language === 'th' ? 'ดาวน์โหลดเอกสารสำคัญ' : 'Download Important Documents'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 0 : '8px',
            width: isMobile ? '50px' : 'auto',
            height: '50px',
            padding: isMobile ? 0 : '0 20px',
            borderRadius: '50px',
            background: '#ffffff',
            color: '#2c3e50',
            border: '2px solid #2c3e50',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, background-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = '#2c3e50';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#2c3e50';
          }}
          aria-label={language === 'th' ? 'ดาวน์โหลดเอกสารสำคัญ' : 'Download Important Documents'}
        >
          <FaCertificate size={18} />
          {!isMobile && (language === 'th' ? 'เอกสารสำคัญ' : 'Documents')}
        </a> */}
      </div>

      {/* --- Top Right Controls: ปุ่มเปลี่ยนภาษาและดาวน์โหลดเรซูเม่ (มุมขวาบน) --- */}
      <div className={styles.noPrint} style={{ position: 'fixed', top: isMobile ? '10px' : '20px', right: isMobile ? '10px' : '20px', zIndex: 1000, display: 'flex', gap: '8px' }}>
        <a
          href={language === 'th' ? '/pdf/resume-th.pdf' : '/pdf/resume-en.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 'auto',
            padding: isMobile ? '0 12px' : '0 14px',
            height: isMobile ? '36px' : '40px',
            borderRadius: '50px',
            border: '1.5px solid #4A8ED8',
            backgroundColor: '#ffffff',
            color: '#4A8ED8',
            boxShadow: '0 2px 8px rgba(74, 142, 216, 0.2)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = '#4A8ED8';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#4A8ED8';
          }}
          title={language === 'th' ? 'ดาวน์โหลดเรซูเม่' : 'Download Resume'}
        >
         
          <FaDownload size={isMobile ? 14 : 16} style={{ marginRight: '6px' }} />
        
          {language === 'th' ? 'เรซูเม่' : 'Resume'}
        </a>
        <button
          onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
          style={{
            width: 'auto',
            padding: isMobile ? '0 12px' : '0 14px',
            height: isMobile ? '36px' : '40px',
            borderRadius: '50px',
            border: '1.5px solid #4A8ED8',
            backgroundColor: '#ffffff',
            color: '#4A8ED8',
            boxShadow: '0 2px 8px rgba(74, 142, 216, 0.2)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = '#4A8ED8';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#4A8ED8';
          }}
          aria-label={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
          title={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
        >
          <FaLanguage size={isMobile ? 18 : 20} style={{ marginRight: '6px' }} />
          {language === 'en' ? 'TH' : 'EN'}
        </button>
      </div>

      {/* --- Print Header: ส่วนหัวที่จะแสดงเฉพาะตอนสั่งพิมพ์ --- */}
      <div className={styles.printHeader} style={{ display: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '10px' }}>
          <div>
            <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: '0', lineHeight: '1' }}>{currentContent.name}</h1>
            <p style={{ fontSize: '9pt', margin: '2px 0 0 0', color: '#000', fontWeight: '500' }}>Full Stack Developer & Health Tech Expert</p>
            <p style={{ fontSize: '9pt', margin: '2px 0 0 0', color: '#000' }}>
              Email: ratchanon.noknoy2318@gmail.com | Tel: +66 98 746 2598
            </p>
            <p style={{ fontSize: '9pt', margin: '2px 0 0 0', color: '#000' }}>
            
              {currentContent.age}: {calculateAge(birthDate)} {currentContent.years} | {currentContent.nickname}: {currentContent.nicknameValue} | {currentContent.locationLabel}: {language === 'th' ? 'หมู่บ้านไดมอนด์ปาร์ค ตำบลในเมือง อำเภอเมืองกำแพงเพชร กำแพงเพชร 62000' : 'Diamond Park Village, Kamphaeng Phet 62000, Thailand'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ratchanon-portfolio.vercel.app" alt="Portfolio QR" style={{ width: '50px', height: '50px' }} />
            <span style={{ fontSize: '7pt', color: '#000', marginTop: '0' }}>{printDate}</span>
          </div>
        </div>
      </div>

      <main style={{ backgroundColor: '#f8fafc', backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)', position: 'relative', zIndex: 1 }}>
        
        {/* --- Section 1: หน้าปก (Cover Page) --- */}
        <section id="home" className={styles.coverPage} style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: '1.5rem',
          paddingBottom: '2rem',
          alignItems: 'center',
          backgroundColor: '#f8fafc',
          backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '210mm',
            aspectRatio: '800/1131',
            backgroundColor: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            margin: '0 auto',
            zIndex: 10
          }}
            className={styles.coverBase}
          >
            {/* 1. Image Section */}
            <div style={{
              width: '100%',
              height: '55%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            }}
              onMouseEnter={() => setIsCoverHovered(true)}
              onMouseLeave={() => setIsCoverHovered(false)}
            // title={language === 'th' ? 'โรงพยาบาลชุมชนเทศบาบเมืองกำแพงเพชร' : 'Kamphaeng Phet Community Municipality Hospital'}
            >
              <Image
                src="/work-environment/3.png"
                alt="Ratchanon Noknoy Portfolio Cover - Kamphaeng Phet Hospital"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              <Image
                src="/work-environment/4.png"
                alt="Ratchanon Noknoy Portfolio Cover Hover"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  opacity: isCoverHovered ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out'
                }}
                priority
              />
              {/* <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(109, 169, 243, 0.95)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '30px',
                fontSize: '0.9rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(109, 169, 243, 0.4)',
                opacity: isCoverHovered ? 1 : 0,
                transform: isCoverHovered ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)'
              }}>
                <FaMapMarkerAlt style={{ color: '#ffffff' }} />
                {language === 'th' ? 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร' : 'Kamphaeng Phet Community Municipality Hospital'}
              </div> */}
            </div>

            {/* 2. Text: Kamphaeng Phet */}
            <div style={{
              position: 'absolute',
              top: '57%',
              right: '6%',
              zIndex: 2,
              textAlign: 'right',
              display: isMobile ? 'none' : 'block'
            }}>
              <a
                href="https://www.facebook.com/story.php?story_fbid=122127221690712499&id=61571374970083&mibextid=wwXIfr&rdid=upOu1bXO1IWk2yAO#"
                target="_blank"
                rel="noopener noreferrer"
                title={language === 'th' ? 'ดูข้อมูลเพิ่มเติม' : 'View more information'}
                style={{
                  color: '#000000',
                  fontSize: 'clamp(0.4rem, 1.2vw, 0.8rem)',
                  fontSize: 'clamp(0.55rem, 1.5vw, 0.85rem)',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'none',
                  fontFamily: 'var(--font-sarabun), sans-serif',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                  e.currentTarget.style.textShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.textShadow = 'none';
                }}>
                {/* {!isMobile && <FaMapMarkerAlt size="1.6rem" style={{ flexShrink: 0, color: '#EA4335' }} />} */}
                {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2', textAlign: 'right' }}>
                  {language === 'th' ? (
                    <>
                      <span>โรงพยาบาลชุมชนเทศบาล</span>
                      <span>เมืองกำแพงเพชร</span>
                    </>
                  ) : (
                    <>
                      <span>Kamphaeng Phet Community</span>
                      <span>Municipality Hospital</span>
                    </>
                  )}
                </div> */}
              </a>
            </div>

            {/* 3. Main Text Content (PORTFOLIO) */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '6%',
              zIndex: 3,
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: 'clamp(3.5rem, 15vw, 8rem)',
                fontSize: 'clamp(3.2rem, 14vw, 8rem)',
                fontWeight: 800,
                lineHeight: 0.85,
                color: '#1a1a1a',
                letterSpacing: '2px',
                marginBottom: '40px',
                marginBottom: 'clamp(20px, 4vw, 40px)',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sarabun), sans-serif'
              }}>
                PORT<br />FOLIO
              </div>
              <div style={{
                fontSize: 'clamp(1.2rem, 5vw, 2.2rem)',
                fontSize: 'clamp(1.1rem, 4vw, 2.2rem)',
                color: '#6fa9f3',
                fontWeight: 500,
                fontFamily: 'var(--font-sarabun), sans-serif'
              }}>
                {language === 'th' ? 'แฟ้มสะสมผลงาน' : 'OFFICIAL PORTFOLIO'}
              </div>
            </div>

            {/* 4. Footer Section (Author Name) */}
            <div style={{
              position: 'absolute',
              bottom: '4%',
              bottom: '5%',
              right: '6%',
              zIndex: 3,
              width: 'auto',
              textAlign: 'right'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <span style={{
                  color: '#6fa9f3',
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                  fontSize: 'clamp(0.85rem, 2vw, 1.2rem)',
                  marginBottom: '5px',
                  fontFamily: 'var(--font-sarabun), sans-serif'
                }}>
                  {language === 'th' ? 'จัดทำโดย' : 'Created by'}
                </span>
                <h1 style={{
                  margin: 0,
                  lineHeight: 1,
                  color: '#1a1a1a',
                  fontSize: 'clamp(1.1rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-sarabun), sans-serif'
                }}>
                  {currentContent.name}
                </h1>
                <p style={{
                  margin: '5px 0 0 0',
                  color: '#555',
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-sarabun), sans-serif',
                  opacity: 0.9
                }}>
                  {language === 'th' ? 'สร้างสรรค์ประสบการณ์การใช้งานที่ลื่นไหลด้วย React' : 'Crafting fluid user experiences with React'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: สารบัญ (Table of Contents) --- */}
        <section id="contents" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={`${styles.paperBase} ${styles.paperPadding}`} style={{ ...paperStyle, display: 'flex', flexDirection: 'column' }}>
            <header className={styles.tocHeaderNew} style={{ marginBottom: '30px' }}>
              {/* // <div className={styles.tocCIcon}></div> */}
              <div className={styles.tocHeaderText}>
                <h1>CONTENTS</h1>
                <h2>สารบัญ</h2>
              </div>
            </header>

            <div className={styles.tocListNew} style={{ flexGrow: 1 }}>
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={styles.tocItemNew}
                  title={language === 'th' ? `ไปที่ ${item.th}` : `Go to ${item.en}`}
                  style={{ width: '100%' }}
                >
                  <div className={styles.tocPageNumNew}>{item.page}</div>
                  <div className={styles.tocItemText}>
                    <span className={styles.tocTitleEnNew}>{item.en}</span>
                    <span className={styles.tocTitleThNew}>{item.th}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 3: คำนำ (Preface) --- */}
        <section id="preface" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={styles.paperBase} style={{
            ...paperStyle,
            padding: 0, // Override padding for full layout
            overflow: 'hidden', // Ensure decoration doesn't spill
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: 'auto'
          }}>
            {/* Header */}
            <div className={styles.prefacePadding} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Logo C */}
                {/* <div style={{
                  width: isMobile ? '50px' : '65px',
                  height: isMobile ? '50px' : '65px',
                  border: '10px solid #6DA9F3',
                  borderRightColor: 'transparent',
                  borderRadius: '50%',
                  transform: 'rotate(-45deg)',
                  flexShrink: 0
                }}></div> */}
                <div>
                  <h1 className={styles.headerTitle} style={{ fontWeight: '800', color: '#333', lineHeight: '0.9', margin: 0 }}>PREFACE</h1>
                  <h2 className={styles.headerSubtitle} style={{ color: '#6DA9F3', fontWeight: '600', margin: 0, letterSpacing: 'normal' }}>คำนำ</h2>
                  {/* <h2 className="header-subtitle" style={{ color: '#6DA9F3', fontWeight: '600', margin: 0, letterSpacing: 'normal' }}>{language === 'th' ? 'คำนำ' : 'Preface'}</h2> */}
                </div>
              </div>
              <div style={{
                border: '2px solid #6DA9F3',
                color: '#6DA9F3',
                borderRadius: '20px',
                padding: '2px 18px',
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>
                01
              </div>
            </div>

            {/* Content */}
            <div className={styles.prefacePadding} style={{ paddingTop: '10px !important', maxWidth: '950px', position: 'relative', zIndex: 2, flex: 1 }}>
              {language === 'th' ? (
                <>
                  <p style={{ marginBottom: '5px', fontSize: '1rem', letterSpacing: '-0.5px', textIndent: '2.5em', color: '#555', textAlign: isMobile ? 'left' : 'justify', lineHeight: '1.6' }}>
                    แฟ้มสะสมผลงานฉบับนี้จัดทำขึ้นเพื่อแนะนำประสบการณ์ด้านการพัฒนาระบบสารสนเทศเพื่อสนับสนุนการทำงานในโรงพยาบาล ข้าพเจ้าถนัดการพัฒนา Front-End ด้วย React และ Next.js มีความรู้ด้าน Back-End เช่น Node.js, Google Apps Script และ SQL รวมถึงการเชื่อมต่อระบบภายนอกและการ Deploy ด้วย Vercel
                  </p>
                  <p style={{ marginBottom: '5px', fontSize: '1rem', letterSpacing: '-0.5px', textIndent: '2.5em', color: '#555', textAlign: isMobile ? 'left' : 'justify', lineHeight: '1.6' }}>
                    จากประสบการณ์ทำงานกับระบบโรงพยาบาลและ HIS ข้าพเจ้ามุ่งพัฒนาระบบที่ใช้งานง่าย ช่วยลดภาระงานบุคลากรทางการแพทย์ ลดเวลารอคอยของผู้ป่วย และสร้างประโยชน์ให้แก่องค์กรอย่างเป็นรูปธรรม
                  </p>
                  {/* <p style={{ marginBottom: '5px', fontSize: '1.05rem', textIndent: '2.5em', color: '#555', textAlign: isMobile ? 'left' : 'justify', lineHeight: '1.6' }}>
                    จากประสบการณ์ทำงานร่วมกับระบบโรงพยาบาลและ HIS (HOSxP, Buddy Care) ข้าพเจ้ามุ่งพัฒนาระบบที่ใช้งานง่าย ช่วยลดภาระงานของบุคลากรทางการแพทย์ ลดเวลารอคอยของผู้ป่วย และสร้างประโยชน์อย่างเป็นรูปธรรมให้แก่องค์กร
                  </p> */}
                </>
              ) : (
                <>
                  <p style={{ marginBottom: '5px', fontSize: '1rem', letterSpacing: '-0.2px', textIndent: '2.5em', color: '#555', textAlign: isMobile ? 'left' : 'justify', lineHeight: '1.6' }}>
                    This portfolio is prepared to present my experience in developing information systems to support hospital operations. I specialize in Front-End development using React and Next.js, with working knowledge of Back-End technologies such as Node.js, Google Apps Script, and SQL, as well as external system integration and deployment using Vercel.
                  </p>
                  <p style={{ marginBottom: '5px', fontSize: '1rem', letterSpacing: '-0.2px', textIndent: '2.5em', color: '#555', textAlign: isMobile ? 'left' : 'justify', lineHeight: '1.6' }}>
                    With experience working with hospital systems and HIS platforms, I focus on developing user-friendly solutions that reduce workloads for medical staff, shorten patient waiting times, and deliver tangible value to healthcare organizations.
                  </p>
                  {/* <p style={{ marginBottom: '5px', fontSize: '1.05rem', textIndent: '2.5em', color: '#555', textAlign: isMobile ? 'left' : 'justify', lineHeight: '1.6' }}>
                    Through my experience with hospital systems and HIS (HOSxP, Buddy Care), I aim to develop user-friendly systems that reduce the workload of medical personnel, decrease patient waiting times, and create tangible benefits for the organization.
                  </p> */}
                </>
              )}
            </div>

            {/* Footer Decoration */}
            <div className={styles.prefaceFooterDecoration}>
              <div className={styles.prefaceQuoteContainer}>
                <span className={styles.quoteMark} style={{ fontFamily: 'Sarabun' }}>“</span>
                <div className={styles.quoteText}>
                  {language === 'th' ? 'ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น' : 'Where there is a will, there is a way.'}
                </div>
                <span className={styles.quoteMarkEnd} style={{ fontFamily: 'Sarabun' }}>”</span>
              </div>
            </div>

            {/* Image Circle */}
            <div style={{
              position: 'absolute',
              display: isMobile ? 'none' : 'block',
              bottom: isMobile ? '10%' : '15%',
              right: isMobile ? '5%' : '12%',
              width: isMobile ? '100px' : '250px',
              height: isMobile ? '100px' : '250px',
              borderRadius: '50%',
              border: isMobile ? '4px solid white' : '10px solid white',
              overflow: 'hidden',
              zIndex: 2,
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
              backgroundColor: '#fff',
              cursor: 'zoom-in'
            }}
              onClick={() => setSelectedImage({
                src: "/work-environment/5.png",
                title: language === 'th' ? 'พี่ๆ งานส่งเสริม ฯ' : 'P’s from Health Promotion',
                width: 1200,
                height: 800
              })}
              title={language === 'th' ? 'คลิกเพื่อดูรูปขยาย' : 'Click to view full image'}
            >
              <Image
                src="/work-environment/5.png"
                alt="Team Photo"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Signature */}
            <div className={styles.prefaceSignature}>
              <h3 className={styles.signatureName} style={{ fontWeight: '700', margin: 0 }}>
                <Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#6DA9F3', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6DA9F3'}
                  title={language === 'th' ? 'กลับไปหน้าแรก' : 'Back to Home'}
                >
                  {currentContent.name}
                </Link>
              </h3>
              {/* <p style={{ color: '#666', fontWeight: '500', margin: 0 }}>{language === 'th' ? 'ผู้จัดทำ' : 'Creator'}</p>
              <p style={{ color: '#666', fontWeight: '500', margin: 0 }}>{signatureDate}</p> */}
              <p style={{ color: '#666', fontWeight: '500', margin: 0, textAlign: 'right' }}>{language === 'th' ? 'ผู้จัดทำ' : 'Creator'}</p>
              <p style={{ color: '#666', fontWeight: '500', margin: 0, textAlign: 'right' }}>{signatureDate}</p>
            </div>

          </div>
        </section>

        {/* --- Section 4: ประวัติส่วนตัว (Profile) --- */}
        <section id="profile" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={`${styles.paperBase} ${styles.flexResponsive}`} style={{
            ...paperStyle,
            padding: 0,
            display: 'flex',
            overflow: 'hidden'
          }}>
            {/* Left Sidebar (Blue) */}
            <div className={styles.profileSidebar} style={{
              backgroundColor: '#6DA9F3',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              <div style={{ padding: '25px 20px 10px 20px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 0.9, margin: 0, color: 'white' }}>PROFILE</h1>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '400', opacity: 0.9, margin: '5px 0 0 0', color: 'white' }}>ประวัติส่วนตัว</h2>
                {/* <h2 style={{ fontSize: '1.1rem', fontWeight: '400', opacity: 0.9, margin: '5px 0 0 0', color: 'white' }}>{language === 'th' ? 'ประวัติส่วนตัว' : 'Personal Profile'}</h2> */}
              </div>

              <div
                className={styles.profileImageContainer}
                style={{ width: '100%', height: '450px', position: 'relative', overflow: 'hidden' }}
                title={language === 'th' ? 'คลิกเพื่อดูรูปขยาย' : 'Click to view full image'}
              >
                <Image
                  src="/RatchanonNoknoy_Profile.png"
                  alt="Ratchanon Noknoy - Full Stack Developer"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top', cursor: 'zoom-in' }}
                  onClick={() => setSelectedImage({
                    src: "/RatchanonNoknoy_Profile.png",
                    title: language === 'th' ? 'รูปโปรไฟล์' : 'Profile Picture',
                    width: 1200,
                    height: 1500
                  })}
                />
              </div>

              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <h3 style={{ fontSize: '2.0rem', fontWeight: '700', marginBottom: '15px', marginTop: '10px', lineHeight: 1.2, margin: '10px 0 15px 0', color: 'white' }}>
                  {currentContent.name}
                </h3>
                <div>
                  <h4 style={{ fontSize: '1.5rem', borderBottom: '2px solid white', display: 'inline-block', marginBottom: '10px', fontWeight: '600', color: 'white' }}>{language === 'th' ? 'ช่องทางการติดต่อ' : 'CONTACT'}</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: '8px', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                    <FaPhone size={14} />
                    <a
                      href="tel:+66987462598"
                      style={{ color: 'white', textDecoration: 'none', transition: 'text-decoration 0.2s' }}
                      title={language === 'th' ? 'โทรออก' : 'Call Now'}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      +66 98 746 2598
                    </a>
                  </p>
                  <p style={{ fontSize: '0.95rem', marginBottom: '8px', fontWeight: '300', display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'white' }}>
                    <FaEnvelope size={14} style={{ marginTop: '4px' }} />
                    <a
                      href="mailto:ratchanon.noknoy2318@gmail.com"
                      style={{ color: 'white', textDecoration: 'none', transition: 'text-decoration 0.2s' }}
                      title={language === 'th' ? 'ส่งอีเมล' : 'Send Email'}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      ratchanon.noknoy2318@gmail.com
                    </a>
                  </p>
                  <p style={{ fontSize: '0.95rem', marginBottom: '8px', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                    <FaLinkedin size={14} />
                    <a
                      href="https://www.linkedin.com/in/ratchanon-noknoy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'white', textDecoration: 'none', transition: 'text-decoration 0.2s' }}
                      title="LinkedIn"
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      ratchanon-noknoy
                    </a>
                  </p>
                  <p style={{ fontSize: '0.95rem', marginBottom: '8px', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                    <FaGithub size={14} />
                    <a
                      href="https://github.com/ratchanon-noknoy2318"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'white', textDecoration: 'none', transition: 'text-decoration 0.2s' }}
                      title="GitHub"
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      ratchanon-noknoy2318
                    </a>
                  </p>
                  <p style={{ fontSize: '0.95rem', marginBottom: '8px', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                    <FaGitlab size={14} />
                    <a
                      href="https://gitlab.com/ratchanon.noknoy2318"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'white', textDecoration: 'none', transition: 'text-decoration 0.2s' }}
                      title="GitLab"
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      ratchanon.noknoy2318
                    </a>
                  </p>
                  {/* <p style={{ fontSize: '0.95rem', marginBottom: '8px', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                    <FaMapMarkerAlt size={14} />
                    <a
                      href="https://www.google.com/maps/place/%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%94%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%9B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+62000/@16.4548737,99.5079203,14z/data=!3m1!4b1!4m6!3m5!1s0x30de1889625cac4d:0xc4e9477440dd2c5e!8m2!3d16.454875!4d99.52852!16s%2Fg%2F1hdz3r7wd?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'white', textDecoration: 'none', transition: 'text-decoration 0.2s' }}
                      title={language === 'th' ? 'ดูแผนที่บน Google Maps' : 'View on Google Maps'}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {language === 'th' ? 'กำแพงเพชร, ประเทศไทย' : 'Kamphaeng Phet, Thailand'}
                    </a>
                  </p> */}
                </div>
              </div>
            </div>

            {/* Right Main Content (White) */}
            <div className={styles.profileContent} style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                border: '2px solid #6DA9F3',
                color: '#6DA9F3',
                borderRadius: '20px',
                padding: '2px 15px',
                fontWeight: '700',
                fontSize: '1rem'
              }}>02</div>

              <div style={{ marginBottom: '15px', marginTop: isMobile ? '20px' : '10px' }}>
                <h3 style={{
                  color: '#6DA9F3',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  display: 'inline-block',
                  borderBottom: '3px solid #6DA9F3',
                  lineHeight: 1.5
                }}>
                  {language === 'th' ? 'สรุปข้อมูลส่วนตัว' : 'PERSONAL SUMMARY'}
                </h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0, color: '#444', lineHeight: '1.7', fontSize: '0.95rem', textAlign: isMobile ? 'left' : 'justify' }}>
                  {currentContent.professionalSummary && currentContent.professionalSummary.map((text, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>{text}</li>
                  ))}
                </ul>
              </div>
              {/* </div> */}

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{
                  color: '#6DA9F3',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  display: 'inline-block',
                  borderBottom: '3px solid #6DA9F3',
                  lineHeight: 1.5
                }}>
                  {language === 'th' ? 'ข้อมูลส่วนตัว' : 'PERSONAL INFO'}
                </h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
                  {[
                    { label: currentContent.nickname, value: currentContent.nicknameValue },
                    { label: currentContent.dob, value: currentContent.dobValue },
                    { label: currentContent.age, value: `${calculateAge(birthDate)} ${currentContent.years}` },
                    { label: currentContent.nationality, value: currentContent.nationalityValue },
                    { label: language === 'th' ? 'ศาสนา' : 'Religion', value: language === 'th' ? 'พุทธ' : 'Buddhism' },
                    { label: language === 'th' ? 'ที่อยู่' : 'Address', value: language === 'th' ? 'หมู่บ้านไดมอนด์ปาร์ค ตำบลในเมือง อำเภอเมืองกำแพงเพชร กำแพงเพชร 62000' : 'Diamond Park Village, Kamphaeng Phet 62000, Thailand' },
                  ].map((item, idx) => (
                    <li key={idx} style={{
                      marginBottom: '6px',
                      color: '#444',
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}>
                      <span style={{ fontWeight: '600', color: '#555' }}>{item.label}: </span>
                      <span style={{ fontWeight: '500' }}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{
                  color: '#6DA9F3',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  display: 'inline-block',
                  borderBottom: '3px solid #6DA9F3',
                  lineHeight: 1.5
                }}>
                  {language === 'th' ? 'ทักษะเพิ่มเติม' : 'ADDITIONAL SKILLS'}
                </h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
                  {[
                    { label: 'HOSxP & OPD', value: language === 'th' ? 'เข้าใจระบบงานโรงพยาบาล' : 'Hospital Operation Systems' },
                    { label: 'System Analysis', value: language === 'th' ? 'วิเคราะห์และออกแบบระบบ' : 'System Analysis & Design' },
                    { label: 'Accountability', value: language === 'th' ? 'รับผิดชอบงาน ส่งตรงเวลา ระบบเสถียร' : 'Responsibility, Punctuality, System Stability' },
                    { label: 'Work Skills', value: language === 'th' ? 'ทำงานร่วมกับแผนกอื่นได้' : 'Cross-functional Collaboration' },
                    { label: 'LINE API', value: language === 'th' ? 'พัฒนา Rich Menu & ระบบอัตโนมัติ' : 'Rich Menu & Automation' },
                    { label: 'Data Integration', value: language === 'th' ? 'เชื่อมข้อมูลโรงพยาบาลผ่าน LINE' : 'Hospital Data Integration via LINE' },
                  ].map((item, idx) => (
                    <li key={idx} style={{
                      marginBottom: '6px',
                      color: '#444',
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}>
                      <span style={{ fontWeight: '600', color: '#555' }}>{item.label}: </span>
                      <span style={{ fontWeight: '500' }}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h3 style={{
                  color: '#6DA9F3',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  display: 'inline-block',
                  borderBottom: '3px solid #6DA9F3',
                  lineHeight: 1.5
                }}>
                  {language === 'th' ? 'บุคคลอ้างอิง' : 'REFERENCES'}
                </h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0 }}>
                  {currentContent.referencesList && currentContent.referencesList.length > 0 ? (
                    currentContent.referencesList.map((ref, index) => (
                      <li key={index} style={{
                        marginBottom: '6px',
                        color: '#444',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}>
                        {ref.url ? (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontWeight: '600', color: '#6DA9F3', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            title={ref.company}
                          >
                            {ref.name}
                          </a>
                        ) : (
                          <span style={{ fontWeight: '600', color: '#555' }}>{ref.name}</span>
                        )}
                        {ref.province && (
                          <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaMapMarkerAlt size={10} /> {ref.province}
                          </div>
                        )}
                        {ref.position && (
                          <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaUserNurse size={10} /> {ref.position}
                          </div>
                        )}
                        {ref.phone && (
                          <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaPhone size={10} />
                            <a
                              href={`tel:${ref.phone.replace(/[^0-9+]/g, '')}`}
                              style={{ color: 'inherit', textDecoration: 'none' }}
                              title={language === 'th' ? 'โทรออก' : 'Call'}
                            >
                              {ref.phone}
                            </a>
                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <li style={{ marginBottom: '6px', color: '#444', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      <span style={{ fontWeight: '600', color: '#555' }}>-</span>
                    </li>
                  )}
                </ul>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
                {/* <Link
                  href="/about"
                  style={{
                    cursor: 'pointer',
                    padding: '12px 30px',
                    borderRadius: '50px',
                    background: '#6fa9f3',
                    color: '#ffffff',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(44, 62, 80, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(44, 62, 80, 0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 62, 80, 0.2)'; }}
                  title={language === 'th' ? 'เข้าดูข้อมูลเพิ่มเติม' : 'Learn More Information'}
                >
                  {language === 'th' ? 'อ่านเพิ่มเติม' : 'Read More'} <FaArrowRight />
                </Link> */}

                {/* Social Icons */}
                {/* <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="mailto:ratchanon.noknoy2318@gmail.com"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', color: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.2s', fontSize: '1.1rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    aria-label="Email"
                    title="Send Email"
                  >
                    <FaEnvelope />
                  </a>
                  <a href="https://www.linkedin.com/in/ratchanon-noknoy/" target="_blank" rel="noopener noreferrer"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', color: '#0a66c2', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.2s', fontSize: '1.1rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    aria-label="LinkedIn"
                    title="Visit LinkedIn Profile"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a href="https://github.com/ratchanon-noknoy2318" target="_blank" rel="noopener noreferrer"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.2s', fontSize: '1.1rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    aria-label="GitHub"
                    title="Visit GitHub Profile"
                  >
                    <FaGithub />
                  </a>
                  <a href="https://gitlab.com/ratchanon.noknoy2318" target="_blank" rel="noopener noreferrer"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff', color: '#FC6D26', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', transition: 'transform 0.2s', fontSize: '1.1rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    aria-label="GitLab"
                    title="Visit GitLab Profile"
                  >
                    <FaGitlab />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 5: ประสบการณ์ทำงาน (Experience) --- */}
        <section id="experience" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div style={paperStyle} className={`${styles.paperBase} ${styles.paperPadding}`}>
            {renderPageHeader('EXPERIENCE', 'ประสบการณ์ทำงาน', '03')}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              borderLeft: '3px solid #6DA9F3',
              marginLeft: isMobile ? '10px' : '30px',
              paddingLeft: isMobile ? '20px' : '40px',
              marginTop: '2rem',
              position: 'relative',
              zIndex: 1
            }}>
              {professionalExperience.map((exp) => (
                <div key={exp.id} className={styles.flexResponsive} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative'
                }}>
                  {/* Timeline Dot */}
                  {/* <div style={{
                    position: 'absolute',
                    left: isMobile ? '-27.5px' : '-47.5px',
                    top: '5px',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '3px solid #6DA9F3',
                    zIndex: 2
                  }}></div> */}
                  <div className={styles.timelineDate} style={{ fontSize: '1.4rem', fontWeight: '800', color: '#6DA9F3', lineHeight: '1.2', flexShrink: 0 }}>
                    {exp.period}
                  </div>
                  <div style={{ flex: 1, paddingBottom: '20px' }}>
                    <h3 style={{ color: '#4A8ED8', fontSize: '1.4rem', fontWeight: '700', marginBottom: '0', lineHeight: 1.3 }}>{exp.role}</h3>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#444', marginBottom: '10px', marginTop: '2px' }}>{exp.company}</h4>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {exp.contributions.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 6: ทักษะทางเทคนิค (Skills) --- */}
        <section id="skills" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div style={paperStyle} className={`${styles.paperBase} ${styles.paperPadding}`}>
            {renderPageHeader('SKILLS', 'ทักษะทางเทคนิค', '04')}

            <div className={`${styles.skillsGrid} ${styles.skillsGridResponsive}`}>
              {currentSkills.map((category, index) => (
                <div key={index} className={styles.skillCard} style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    borderBottom: '2px solid #f1f5f9',
                    paddingBottom: '0.5rem'
                  }}>
                    <div style={{
                      // width: '8px',
                      // height: '8px',
                      // backgroundColor: '#6DA9F3',
                      // borderRadius: '50%',
                      // marginRight: '10px'
                    }}></div>
                    <h3 className={styles.skillCardTitle} style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#2c3e50',
                      margin: 0
                    }}>
                      {category.category}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {category.items.map((skill, idx) => (
                      <div key={idx} className={`${styles.skillTag} ${styles.skillTagResponsive}`} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '50px',
                        color: '#555',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
                      }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#6DA9F3';
                          e.currentTarget.style.color = '#6DA9F3';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 10px rgba(109, 169, 243, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.color = '#555';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.03)';
                        }}
                      >
                        <span style={{ fontSize: '1.1rem', display: 'flex', color: 'inherit' }}>{getSkillIcon(skill)}</span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 7: ผลงานและโครงการ (Projects) --- */}
        <section id="projects" className={`${styles.page} ${styles.projectsPage}`} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent', paddingBottom: '2rem', paddingTop: '2rem' }}>
          <div style={paperStyle} className={`${styles.paperBase} ${styles.paperPadding}`}>
            {renderPageHeader('PROJECTS', 'ผลงานและโครงการ', '05')}
            <div style={{ zIndex: 1, position: 'relative' }}>
              <div className={styles.noPrint}>
                <ProjectFilter
                  ref={filterRef}
                  currentFilter={filter}
                  setFilter={setFilter}
                  language={language}
                  isSticky={false} // Disable sticky inside paper
                  filterOptions={allTechs}
                  getSkillIcon={getSkillIcon}
                />
              </div>

              <div className={`${styles.projectsGrid} ${styles.projectsGridResponsive}`}>
                {filteredProjects.slice(0, visibleProjects).map((project) => (
                  <div
                    key={project.id}
                    className={styles.projectItem}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #f1f5f9',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.borderColor = '#f1f5f9';
                    }}
                  >
                    {project.category === 'canva-ai' ? (
                      <div className={`${styles.projectImageWrapper} ${styles.projectImageWrapper}`}
                        style={{
                          cursor: 'zoom-in',
                          position: 'relative',
                          borderBottom: '1px solid #f1f5f9',
                          height: '220px',
                          width: '100%',
                          backgroundColor: '#f8fafc'
                        }}
                        onClick={() => setSelectedImage({
                          src: project.imageUrl,
                          title: project.title,
                          width: 1200,
                          height: 800
                        })}
                      >
                        <Image
                          src={project.imageUrl}
                          alt={language === 'th' ? `ภาพหน้าจอของ ${project.title}` : `Screenshot of ${project.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'contain', padding: '10px' }}
                          className={styles.projectImage}
                        />
                        {/* <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#333',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          zIndex: 2
                        }}>
                          <FaSearchPlus size={12} />
                        </div> */}
                      </div>
                    ) : (
                      <div className={`${styles.projectImageWrapper} ${styles.projectImageWrapper}`}
                        style={{
                          cursor: 'zoom-in',
                          position: 'relative',
                          borderBottom: '1px solid #f1f5f9',
                          height: '220px',
                          width: '100%',
                          backgroundColor: '#f8fafc'
                        }}
                        onClick={() => setSelectedImage({
                          src: project.imageUrl,
                          title: project.title,
                          width: 1200,
                          height: 800
                        })}
                      >
                        <Image
                          src={project.imageUrl}
                          alt={
                            project.category === 'line-oa'
                              ? (language === 'th' ? `Rich Menu ของ ${project.title}` : `Rich Menu of ${project.title}`)
                              : (language === 'th' ? `ภาพหน้าจอของ ${project.title}` : `Screenshot of ${project.title}`)
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover', objectPosition: project.category === 'line-oa' ? 'top' : 'center' }}
                          className={styles.projectImage}
                        />
                        {/* <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#333',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          zIndex: 2
                        }}>
                          <FaSearchPlus size={12} />
                        </div> */}
                      </div>
                    )}
                    <div className={styles.projectContent} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 className={styles.projectTitle} style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '0.5rem', fontWeight: '700', lineHeight: 1.3 }}>{project.title}</h3>
                      {project.createDate && (
                        <p className={styles.projectDate} style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          <FaCalendarAlt size={12} />
                          {currentContent.createdOn}: {project.createDate}
                        </p>
                      )}
                      <div className={styles.projectDesc} style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>
                        {project.description}
                      </div>

                      {project.tech && (
                        <div className={styles.projectTech} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                          {project.tech.split(', ').map(tech => (
                            <span key={tech} style={{
                              display: 'flex', alignItems: 'center', gap: '6px',
                              padding: '6px 12px',
                              backgroundColor: '#f0f9ff',
                              border: '1px solid #e0f2fe',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              color: '#0284c7',
                              fontWeight: '600',
                              letterSpacing: '0.3px'
                            }}>
                              {getSkillIcon(tech)}
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className={styles.projectLinks} style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1.2rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', alignItems: 'center' }}>
                        {['web-app', 'healthcare-it', 'canva-ai'].includes(project.category) && (
                          <>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '6px',
                                  fontSize: '0.9rem', color: '#ffffff', fontWeight: '600',
                                  textDecoration: 'none',
                                  backgroundColor: '#6fa9f3',
                                  padding: '8px 16px',
                                  borderRadius: '50px',
                                  boxShadow: '0 4px 10px rgba(111, 169, 243, 0.3)',
                                  transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                title={project.websiteTooltip || project.websiteLabel || currentContent.viewWebsite}
                              >
                                <FaExternalLinkAlt size={12} /> {project.websiteLabel || currentContent.viewWebsite}
                              </a>
                            )}
                            {project.sourceUrl && (
                              <a
                                href={project.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '6px',
                                  fontSize: '0.9rem', color: '#64748b', fontWeight: '600',
                                  textDecoration: 'none',
                                  padding: '8px 12px',
                                  borderRadius: '50px',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                title={currentContent.viewCode}
                              >
                                <FaCode size={14} /> {currentContent.viewCode}
                              </a>
                            )}
                            {project.details && (
                              <button
                                type="button"
                                onClick={() => openModal(project)}
                                style={{
                                  cursor: 'pointer', border: 'none', background: 'none',
                                  padding: '8px 12px', font: 'inherit',
                                  display: 'flex', alignItems: 'center', gap: '6px',
                                  fontSize: '0.9rem', color: '#64748b', fontWeight: '600',
                                  borderRadius: '50px',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                title={currentContent.readMore}
                              >
                                <FaPlus size={12} /> {currentContent.readMore}
                              </button>
                            )}
                          </>
                        )}
                        {project.category === 'line-oa' && (
                          <>
                            {project.addFriendUrl && (
                              <a
                                href={project.addFriendUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  backgroundColor: '#06C755', // Official LINE Green
                                  color: 'white',
                                  padding: '8px 20px',
                                  borderRadius: '50px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  fontWeight: '600',
                                  fontSize: '0.9rem',
                                  textDecoration: 'none',
                                  boxShadow: '0 2px 6px rgba(6, 199, 85, 0.3)',
                                  transition: 'transform 0.2s ease'
                                }}
                                title={currentContent.addFriend}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                              >
                                <FaLine size={18} /> {currentContent.addFriend}
                              </a>
                            )}
                            {project.sourceUrl && (
                              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600', textDecoration: 'none' }} title={currentContent.viewCode}><FaCode size={14} /> {currentContent.viewCode}</a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length > 4 && (
                <div className={styles.noPrint} style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => setVisibleProjects(prev => prev >= filteredProjects.length ? 4 : filteredProjects.length)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid #6fa9f3',
                      color: '#6fa9f3',
                      padding: '12px 32px',
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#6fa9f3'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6fa9f3'; }}
                    title={visibleProjects >= filteredProjects.length ? (language === 'th' ? 'ย่อลง' : 'Show Less') : (language === 'th' ? 'ดูเพิ่มเติม' : 'See More')}
                  >
                    {visibleProjects >= filteredProjects.length ? (language === 'th' ? 'ย่อลง' : 'Show Less') : (language === 'th' ? 'ดูเพิ่มเติม' : 'See More')} {visibleProjects >= filteredProjects.length ? <FaArrowUp /> : <FaArrowDown />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Section 8: ผลงาน LINE OA (LINE OA Projects) --- */}
        <section id="line-oa" className={`${styles.page} ${styles.projectsPage}`} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent', paddingBottom: '2rem', paddingTop: '2rem' }}>
          <div style={paperStyle} className={`${styles.paperBase} ${styles.paperPadding}`}>
            {renderPageHeader('LINE OA', 'ผลงาน LINE Official Account', '06')}
            <div style={{ zIndex: 1, position: 'relative' }}>

              <div className={`${styles.projectsGrid} ${styles.projectsGridResponsive}`}>
                {lineProjects.slice(0, visibleLineProjects).map((project) => (
                  <div
                    key={project.id}
                    className={styles.projectItem}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #f1f5f9',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.borderColor = '#f1f5f9';
                    }}
                  >
                    <div className={`${styles.projectImageWrapper} ${styles.projectImageWrapper}`}
                      style={{
                        cursor: 'zoom-in',
                        position: 'relative',
                        borderBottom: '1px solid #f1f5f9',
                        height: '220px',
                        width: '100%',
                        backgroundColor: '#f8fafc'
                      }}
                      onClick={() => setSelectedImage({
                        src: project.imageUrl,
                        title: project.title,
                        width: 1200,
                        height: 800
                      })}
                    >
                      <Image
                        src={project.imageUrl}
                        alt={language === 'th' ? `Rich Menu ของ ${project.title}` : `Rich Menu of ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className={styles.projectImage}
                      />
                    </div>
                    <div className={styles.projectContent} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 className={styles.projectTitle} style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '0.5rem', fontWeight: '700', lineHeight: 1.3 }}>{project.title}</h3>
                      {project.createDate && (
                        <p className={styles.projectDate} style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          <FaCalendarAlt size={12} />
                          {currentContent.createdOn}: {project.createDate}
                        </p>
                      )}
                      <div className={styles.projectDesc} style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>
                        {project.description}
                      </div>

                      {project.tech && (
                        <div className={styles.projectTech} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                          {project.tech.split(', ').map(tech => (
                            <span key={tech} style={{
                              display: 'flex', alignItems: 'center', gap: '6px',
                              padding: '6px 12px',
                              backgroundColor: '#f0f9ff',
                              border: '1px solid #e0f2fe',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              color: '#0284c7',
                              fontWeight: '600',
                              letterSpacing: '0.3px'
                            }}>
                              {getSkillIcon(tech)}
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className={styles.projectLinks} style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1.2rem', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', alignItems: 'center' }}>
                        {project.addFriendUrl && (
                          <a
                            href={project.addFriendUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#06C755', // Official LINE Green
                              color: 'white',
                              padding: '8px 20px',
                              borderRadius: '50px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontWeight: '600',
                              fontSize: '0.9rem',
                              textDecoration: 'none',
                              boxShadow: '0 2px 6px rgba(6, 199, 85, 0.3)',
                              transition: 'transform 0.2s ease'
                            }}
                            title={currentContent.addFriend}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                            <FaLine size={18} /> {currentContent.addFriend}
                          </a>
                        )}
                        {project.sourceUrl && (
                          <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600', textDecoration: 'none' }} title={currentContent.viewCode}><FaCode size={14} /> {currentContent.viewCode}</a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {lineProjects.length > 4 && (
                <div className={styles.noPrint} style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                  <button
                    onClick={() => setVisibleLineProjects(prev => prev >= lineProjects.length ? 4 : lineProjects.length)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '2px solid #6fa9f3',
                      color: '#6fa9f3',
                      padding: '12px 32px',
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#6fa9f3'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6fa9f3'; }}
                    title={visibleLineProjects >= lineProjects.length ? (language === 'th' ? 'ย่อลง' : 'Show Less') : (language === 'th' ? 'ดูเพิ่มเติม' : 'See More')}
                  >
                    {visibleLineProjects >= lineProjects.length ? (language === 'th' ? 'ย่อลง' : 'Show Less') : (language === 'th' ? 'ดูเพิ่มเติม' : 'See More')} {visibleLineProjects >= lineProjects.length ? <FaArrowUp /> : <FaArrowDown />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>



        {/* --- Section 9: ประวัติการศึกษา (Education) --- */}
        <section id="education" className={`${styles.page} ${styles.educationPage}`} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div style={paperStyle} className={`${styles.paperBase} ${styles.paperPadding}`}>
            {renderPageHeader('EDUCATION', 'ประวัติการศึกษา', '07')}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              borderLeft: '3px solid #6DA9F3',
              marginLeft: isMobile ? '10px' : '30px',
              paddingLeft: isMobile ? '20px' : '40px',
              marginTop: '2rem',
              position: 'relative',
              zIndex: 1
            }}>
              {/* Bachelor */}
              <div className={styles.flexResponsive} style={{
                display: 'flex',
                alignItems: 'flex-start',
                position: 'relative'
              }}>
                {/* Timeline Dot */}
                {/* <div style={{
                  position: 'absolute',
                  left: isMobile ? '-27.5px' : '-47.5px',
                  top: '10px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '3px solid #6DA9F3',
                  zIndex: 2
                }}></div> */}
                <div className={styles.timelineDate} style={{ fontSize: '3rem', fontWeight: '800', color: '#6DA9F3', lineHeight: '1', flexShrink: 0, paddingRight: '30px' }}>
                  {currentContent.graduatedDateMFU.replace(/[^0-9]/g, '').slice(-4) || currentContent.graduatedDateMFU}
                </div>
                <div style={{ flex: 1, paddingBottom: '20px' }}>
                  <h3 style={{ color: '#4A8ED8', fontSize: '1.4rem', fontWeight: '700', marginBottom: '0', lineHeight: 1.3 }}>{currentContent.bachelorDegree}</h3>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#444', marginBottom: '10px', marginTop: '2px' }}>{currentContent.university}</h4>
                  <div style={{ color: '#666', marginBottom: '10px', fontSize: '1rem' }}>{currentContent.graduated}: {currentContent.graduatedDateMFU}</div>

                  <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>{currentContent.activitiesAndSocieties}</p>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {currentContent.universityActivitiesList.map((item, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* High School */}
              <div className={styles.flexResponsive} style={{
                display: 'flex',
                alignItems: 'flex-start',
                position: 'relative'
              }}>
                {/* Timeline Dot */}
                {/* <div style={{
                  position: 'absolute',
                  left: isMobile ? '-27.5px' : '-47.5px',
                  top: '10px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '3px solid #6DA9F3',
                  zIndex: 2
                }}></div> */}
                <div className={styles.timelineDate} style={{ fontSize: '3rem', fontWeight: '800', color: '#6DA9F3', lineHeight: '1', flexShrink: 0, paddingRight: '30px' }}>
                  {currentContent.graduatedDateSchool.replace(/[^0-9]/g, '').slice(-4) || currentContent.graduatedDateSchool}
                </div>
                <div style={{ flex: 1, paddingBottom: '20px' }}>
                  <h3 style={{ color: '#4A8ED8', fontSize: '1.4rem', fontWeight: '700', marginBottom: '0', lineHeight: 1.3 }}>{currentContent.highSchool}</h3>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#444', marginBottom: '10px', marginTop: '2px' }}>{currentContent.school}</h4>
                  <div style={{ color: '#666', marginBottom: '10px', fontSize: '1rem' }}>{currentContent.graduated}: {currentContent.graduatedDateSchool}</div>

                  <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#444' }}>{currentContent.activitiesAndSocieties}</p>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {currentContent.schoolActivitiesList.map((item, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 10: ใบผลการเรียน (Transcripts) --- */}
        <section id="certificates" className={`${styles.page} ${styles.educationPage}`} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={styles.paperBase} style={{
            ...paperStyle,
            backgroundColor: '#6DA9F3',
            padding: 0,
            color: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header Section */}
            <div className={styles.certificatesHeader} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              color: 'white',
              flexWrap: 'nowrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                {/* C Logo */}
                {/* <div style={{
                  width: isMobile ? '50px' : '65px',
                  height: isMobile ? '50px' : '65px',
                  border: isMobile ? '7px solid white' : '9px solid white',
                  borderRightColor: 'transparent',
                  borderRadius: '50%',
                  transform: 'rotate(-45deg)',
                  flexShrink: 0
                }}></div> */}
                <div>
                  <h1 className={styles.headerTitle} style={{
                    fontWeight: '800',
                    lineHeight: '1',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    margin: 0,
                    color: 'white'
                  }}>
                    Transcripts
                  </h1>
                  <h2 className={styles.headerSubtitle} style={{
                    fontWeight: '500',
                    opacity: 0.95,
                    margin: '5px 0 0 0',
                    color: 'white'
                  }}>
                    {/* {language === 'th' ? 'ใบผลการเรียน' : 'Transcripts'} */}
                    ใบผลการเรียน
                  </h2>
                </div>
              </div>
              <div style={{
                border: '2px solid white',
                color: 'white',
                borderRadius: '50px',
                padding: '3px 18px',
                fontSize: '1.2rem',
                fontWeight: '700',
                whiteSpace: 'nowrap'
              }}>
                08
              </div>
            </div>

            {/* Content Wrapper (White Box) */}
            <div className={styles.certificatesContent} style={{
              backgroundColor: 'white',
              minHeight: '800px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              color: '#333',
              position: 'relative',
              zIndex: 1
            }}>
              {/* --- ส่วนผลการเรียน (Academic Transcripts) --- */}
              <div style={{ marginBottom: '3rem' }}>
                {/* <h3 style={{
                  textAlign: 'center',
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  color: '#ffffff',
                  backgroundColor: '#6fa9f3',
                  padding: '1rem',
                  marginBottom: '2rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px rgba(72, 110, 159, 0.3)'
                }}>
                  <FaFileAlt /> {currentContent.transcriptTitle || (language === 'th' ? 'ใบผลการเรียน' : 'Transcript')}
                </h3> */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {transcriptsList.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className={styles.transcriptContainer}
                      onClick={() => window.open(item.link || item.src, '_blank')}
                      title={language === 'th' ? 'คลิกเพื่อซูมดูรายละเอียด' : 'Click to zoom in for details'}
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: '0',
                        overflow: 'hidden',
                        boxShadow: 'none',
                        border: 'none',
                        transition: 'all 0.3s ease',

                        cursor: 'zoom-in',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        setHoveredItem(item.id);
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 50px -10px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        setHoveredItem(null);
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={800}
                          height={1131}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                        {/* <div style={{
                          position: 'absolute',
                          bottom: '20px',
                          right: '20px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#333',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}>
                          <FaSearchPlus size={14} />
                        </div> */}
                      </div>
                      {/* <h4 style={{ fontSize: isMobile ? '0.8rem' : '1.1rem', color: '#333', marginBottom: '0.5rem', fontWeight: '700', textAlign: 'center' }}>{item.title}</h4>
                        <p style={{ color: '#64748b', fontSize: isMobile ? '0.6rem' : '0.95rem', lineHeight: '1.5', margin: 0, textAlign: 'center' }}>{item.description}</p> */}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* --- Section 11: กิจกรรม (Activities - Part 1) --- */}
        <section id="activities" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={`${styles.paperBase} ${styles.paperPadding}`} style={{ ...paperStyle, display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div className="header" style={{ padding: 0, marginBottom: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* <div className="c-icon" style={{ width: isMobile ? '40px' : '60px', height: isMobile ? '40px' : '60px', border: '9px solid #6DA9F3', borderRightColor: 'transparent', borderRadius: '50%', transform: 'rotate(-45deg)' }}></div> */}
                <div className="header-text">
                  <h1 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: '800', color: '#222', lineHeight: '1', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>ACTIVITIES</h1>
                  <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.8rem', fontWeight: '700', color: '#6DA9F3', margin: 0 }}>กิจกรรม</h2>
                  {/* <h2 style={{ fontSize: isMobile ? '1.2rem' : '1.8rem', fontWeight: '700', color: '#6DA9F3', margin: 0 }}>{language === 'th' ? 'กิจกรรม' : 'Activities'}</h2> */}
                </div>
              </div>
              <div className="page-number" style={{ border: '2px solid #6DA9F3', color: '#6DA9F3', borderRadius: '50px', padding: '2px 15px', fontWeight: '700', fontSize: '1.1rem' }}>09</div>
            </div>

            {/* Content Container */}
            <div className="container" style={{ padding: 0, width: '100%', maxWidth: '100%' }}>

              {/* Activity 01 */}
              <div className={styles.activitySection01}>
                <div className={styles.imgVerticalWrapper}>
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '120%', borderRadius: '0', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'zoom-in' }} onClick={() => window.open(activitiesInfo[11][language].link, '_blank')} title={language === 'th' ? 'คลิกเพื่อดูรายละเอียด' : 'Click to view details'}>
                    <Image src="/activities/big-data.png" alt="Activity 3" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>

                <div className={styles.contentRightCol}>
                  <div className={styles.numberHeader}>
                    <div className={styles.numLarge}>01</div>
                  </div>
                  <div className={styles.activityTitle} style={{ marginBottom: '50px' }}>
                    {activitiesInfo[11][language].title}
                  </div>
                  <div className={styles.imgHorizontal} style={{ position: 'relative', width: '100%', paddingBottom: '60%', borderRadius: '0', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'zoom-in' }} onClick={() => window.open(activitiesInfo[11][language].link, '_blank')} title={language === 'th' ? 'คลิกเพื่อดูรายละเอียด' : 'Click to view details'}>
                    <Image src="/activities/bit-data-2.png" alt="Activity 3 Detail" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                </div>
              </div>

              {/* Activity 02 */}
              <div className={styles.activitySection01} style={{ flexDirection: 'row-reverse' }}>
                <div className={styles.imgVerticalWrapper}>
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '130%', borderRadius: '0', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'zoom-in' }} onClick={() => window.open(activitiesInfo[3][language].link, '_blank')} title={language === 'th' ? 'คลิกเพื่อดูรายละเอียด' : 'Click to view details'}>
                    <Image src="/activities/3.png" alt="Activity 11" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>

                <div className={styles.contentRightCol} style={{ textAlign: 'right' }}>
                  <div className={styles.imgHorizontal} style={{ position: 'relative', width: '100%', paddingBottom: '65%', borderRadius: '0', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'zoom-in', marginBottom: '70px' }} onClick={() => window.open(activitiesInfo[3][language].link, '_blank')} title={language === 'th' ? 'คลิกเพื่อดูรายละเอียด' : 'Click to view details'}>
                    <Image src="/activities/4.1.png" alt="Activity 11 Detail" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  <div className={styles.numberHeader} >
                    <div className={styles.numLarge}>02</div>
                  </div>

                  <div className={styles.activityTitle} style={{ marginBottom: '10px' }}>
                    {activitiesInfo[3][language].title}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* --- Section 12: กิจกรรม (Activities - Part 2) --- */}
        <section id="activities-2" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={styles.paperBase} style={{ ...paperStyle, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <div className={styles.activitiesHeader} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* C Icon */}
                {/* <div style={{
                  width: isMobile ? '40px' : '60px',
                  height: isMobile ? '40px' : '60px',
                  border: isMobile ? '6px solid #6DA9F3' : '9px solid #6DA9F3',
                  borderRightColor: 'transparent',
                  borderRadius: '50%',
                  transform: 'rotate(-45deg)',
                  flexShrink: 0
                }}></div> */}
                <div>
                  <h1 className={styles.headerTitle} style={{ fontWeight: '800', color: '#333', lineHeight: '1', letterSpacing: '1px', margin: 0 }}>ACTIVITIES</h1>
                  <h2 className={styles.headerSubtitle} style={{ fontWeight: '600', color: '#6DA9F3', margin: 0 }}>กิจกรรม</h2>
                  {/* <h2 className="header-subtitle" style={{ fontWeight: '600', color: '#6DA9F3', margin: 0 }}>{language === 'th' ? 'กิจกรรม' : 'Activities'}</h2> */}
                </div>
              </div>
              <div style={{
                border: '2px solid #6DA9F3',
                color: '#6DA9F3',
                borderRadius: '50px',
                padding: '2px 15px',
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>10</div>
            </div>

            {/* Activities List */}
            <div className={styles.activitiesContent} style={{ flex: 1 }}>
              {activityIds.map((num, index) => {
                const info = activitiesInfo[num] ? activitiesInfo[num][language] : { title: language === 'th' ? `กิจกรรมที่ ${num}` : `Activity ${num}`, description: '', date: '' };
                const isMedia = [12, 7, 19].includes(num);
                return (
                  <div key={num} className={styles.activityRow} style={{
                    display: 'flex',
                    marginBottom: '60px',
                    alignItems: 'flex-start'
                  }}>
                    {/* Image Side */}
                    <div
                      style={{
                        flex: 1,
                        borderRadius: '0',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        width: '100%',
                        aspectRatio: '16/10',
                        position: 'relative',

                        cursor: 'zoom-in'
                      }}
                      title={language === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                      onClick={() => {
                        if (info.link) {
                          window.open(info.link, '_blank');
                        } else {
                          setSelectedImage({
                            id: num,
                            src: `/activities/${num}.png`,
                            title: info.title,
                            description: info.description,
                            date: info.date,
                            width: 1200,
                            height: 800
                          });
                        }
                      }}
                    >
                      <Image
                        src={`/activities/${num}.png`}
                        alt={info.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      {/* <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#333',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        pointerEvents: 'none'
                      }}>
                        {info.link ? <FaExternalLinkAlt size={14} /> : <FaSearchPlus size={14} />}
                      </div> */}
                    </div>

                    {/* Content Side */}
                    <div style={{ flex: 1, width: '100%' }}>
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#6DA9F3',
                        lineHeight: '1',
                        marginBottom: '10px',
                        display: 'block',
                        borderBottom: '2px solid #6DA9F3',
                        paddingBottom: '5px',
                        width: '100%'
                      }}>
                        {String(index + 3).padStart(2, '0')}
                      </div>

                      {/* {info.date && (
                        <div style={{
                          fontSize: '0.85rem',
                          color: '#888',
                          fontWeight: '600',
                          marginTop: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {num === 24 ? <FaUser size={12} style={{ color: '#6DA9F3' }} /> : <FaCalendarAlt size={12} style={{ color: '#6DA9F3' }} />}
                          {info.date}
                        </div>
                      )} */}

                      {/* <h3 style={{
                        fontSize: '1.0rem',
                        fontWeight: '700',
                        color: '#333',
                        marginTop: '10px',
                        marginBottom: '10px',
                        lineHeight: '1.4'
                      }}>
                        {info.title}
                      </h3> */}

                      <p style={{
                        fontSize: '0.8rem',
                        color: '#555',
                        lineHeight: '1.6'
                      }}>
                        {info.description}
                      </p>

                      {/* {info.link && (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '15px',
                            color: '#6DA9F3',
                            fontWeight: '600',
                            textDecoration: 'none',
                            fontSize: '0.95rem'
                          }}
                        >
                          {language === 'th' ? 'อ่านต่อ' : 'Read More'} <FaArrowRight size={12} />
                        </a>
                      )} */}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer Bar */}
            <div style={{
              height: '15px',
              backgroundColor: '#6DA9F3',
              width: '100%',
              marginTop: 'auto'
            }}></div>
          </div>
        </section>
        {/* --- Section 13: เกียรติบัตร (Certificates) --- */}
        <section id="certificates-2" className={`${styles.page} ${styles.educationPage}`} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={styles.paperBase} style={{
            ...paperStyle,
            backgroundColor: '#6DA9F3',
            padding: 0,
            color: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header Section */}
            <div className={styles.certificatesHeader} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              color: 'white',
              flexWrap: 'nowrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                <div>
                  <h1 className={styles.headerTitle} style={{
                    fontWeight: '800',
                    lineHeight: '1',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    margin: 0,
                    color: 'white'
                  }}>
                    CERTIFICATES
                  </h1>
                  <h2 className={styles.headerSubtitle} style={{
                    fontWeight: '500',
                    opacity: 0.95,
                    margin: '5px 0 0 0',
                    color: 'white'
                  }}>
                    {/* {language === 'th' ? 'เกียรติบัตร' : 'Certificates'} */}
                    เกียรติบัตร
                  </h2>
                </div>
              </div>
              <div style={{
                border: '2px solid white',
                color: 'white',
                borderRadius: '50px',
                padding: '3px 18px',
                fontSize: '1.2rem',
                fontWeight: '700',
                whiteSpace: 'nowrap'
              }}>
                11
              </div>
            </div>

            {/* Content Wrapper (White Box) */}
            <div className={styles.certificatesContent} style={{
              backgroundColor: 'white',
              minHeight: '800px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              color: '#333',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {transcriptsList.slice(3).map((item) => (
                    <div
                      key={item.id}
                      className={styles.transcriptContainer}
                      onClick={() => window.open(item.link || item.src, '_blank')}
                      title={language === 'th' ? 'คลิกเพื่อซูมดูรายละเอียด' : 'Click to zoom in for details'}
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: '0',
                        overflow: 'hidden',
                        boxShadow: 'none',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'zoom-in',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        setHoveredItem(item.id);
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 50px -10px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        setHoveredItem(null);
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={800}
                          height={1131}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                        {/* <div style={{
                          position: 'absolute',
                          bottom: '20px',
                          right: '20px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#333',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}>
                          <FaSearchPlus size={14} />
                        </div> */}
                      </div>
                      
                        <h4 style={{ fontSize: isMobile ? '0.8rem' : '1.1rem', color: '#333', marginBottom: '0.5rem', fontWeight: '700', textAlign: 'center' }}>{item.title}</h4>
                        <p style={{ color: '#64748b', fontSize: isMobile ? '0.6rem' : '0.95rem', lineHeight: '1.5', margin: 0, textAlign: 'center' }}>{item.description}</p>
                     
                    </div>
                  ))}
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                    <a href="https://drive.google.com/drive/u/0/folders/12AVbhuFR43G5GDSdlK8ga0h9lImF5bnC" target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 32px',
                        backgroundColor: '#6fa9f3',
                        color: '#ffffff',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(72, 110, 159, 0.3)',
                        transition: 'all 0.3s ease',
                        border: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(72, 110, 159, 0.4)';
                        e.currentTarget.style.backgroundColor = '#6fa9f3';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(72, 110, 159, 0.3)';
                        e.currentTarget.style.backgroundColor = '#6fa9f3';
                      }}
                      title={language === 'th' ? 'ดาวน์โหลดเอกสารทั้งหมด' : 'Download All Documents'}
                    >
                      <FaDownload /> {currentContent.downloadPDF}
                    </a>
                  </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 14: บรรยากาศการทำงาน (Work Atmosphere) --- */}
        <section id="work-atmosphere" className={styles.page} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={styles.paperBase} style={{
            ...paperStyle,
            backgroundColor: '#6DA9F3',
            padding: 0,
            color: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header Section */}
            <div className={styles.atmosphereHeader} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                <div>
                  <h1 className={styles.headerTitle} style={{ fontWeight: '800', lineHeight: '1', letterSpacing: '1px', margin: 0, color: 'white' }}>Atmosphere</h1>
                   <h2 className={styles.headerSubtitle} style={{ fontWeight: '600', margin: 0, color: 'white' }}>บรรยากาศ</h2>
                  {/* <h2 className="header-subtitle" style={{ fontWeight: '600', margin: 0, color: 'white' }}>{language === 'th' ? 'บรรยากาศ' : 'Atmosphere'}</h2> */}
                </div>
              </div>
              <div style={{
                border: '2px solid white',
                borderRadius: '50px',
                padding: '2px 18px',
                fontSize: '1.1rem',
                fontWeight: '700'
              }}>12</div>
            </div>

            {/* Grid Layout */}
            <div className={`${styles.workGrid} ${styles.atmosphereGrid}`} style={{
              maxWidth: '1100px',
              margin: '20px auto 40px auto',
              display: 'grid',
              width: '100%'
            }}>
              {workImages.map((item, index) => (
                <div key={index} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      backgroundColor: 'white',
                      width: '100%',
                      aspectRatio: '4/3',
                      marginBottom: '15px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      cursor: 'zoom-in',
                      overflow: 'hidden',
                      transform: hoveredWorkImage === index ? 'translateY(-5px)' : 'translateY(0)',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedImage({
                      src: item.src,
                      title: language === 'th' ? item.title.th : item.title.en,
                      width: 1200,
                      height: 800,
                      gallery: workImages.map(img => ({ src: img.src, title: language === 'th' ? img.title.th : img.title.en }))
                    })}
                    onMouseEnter={() => setHoveredWorkImage(index)}
                    onMouseLeave={() => setHoveredWorkImage(null)}
                    title={language === 'th' ? 'ดูบรรยากาศการทำงาน' : 'View Work Atmosphere'}
                  >
                    <Image
                      src={item.src}
                      alt={`Work Atmosphere ${index + 1}`}
                      fill
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: hoveredWorkImage === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: hoveredWorkImage === index ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <FaSearchPlus size={32} />
                    </div>
                  </div>

                  {/* Caption */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.6)', paddingTop: '15px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '600', lineHeight: '1.4', marginBottom: '5px' }}>
                      {language === 'th' ? item.title.th : item.title.en}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '300', opacity: 0.9 }}>
                      {language === 'th' ? 'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร' : 'Kamphaeng Phet Municipality Hospital'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: 'auto' }}>
              <a
                href="https://www.facebook.com/kmch.kpp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 32px',
                  borderRadius: '50px',
                  border: '2px solid white',
                  color: 'white',
                  backgroundColor: 'transparent',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#6DA9F3'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                title={language === 'th' ? 'เยี่ยมชมเว็บไซต์องค์กร' : 'Visit Organization Website'}
              >
                {language === 'th' ? 'เยี่ยมชมองค์กร' : 'Visit Organization'} <FaBuilding />
              </a>
            </div>
          </div>
        </section>


        {/* --- Section 15: หน้าปิดท้าย (Back Cover & Thank You) --- */}
        <section id="thank-you" className={styles.closingPage} style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '2rem', paddingTop: '2rem', backgroundColor: 'transparent' }}>
          <div className={styles.paperBase} style={{
            ...paperStyle,
            aspectRatio: '800/1131',
            padding: isMobile ? '1rem' : '0',
            background: 'linear-gradient(to bottom, #AECDF6 0%, #AECDF6 38%, #6CA8F0 38%, #6CA8F0 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 10,
            gap: isMobile ? '1.5rem' : '0'
          }}>

            {/* Profile Wrapper */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(150px, 45vw, 320px)',
                height: 'clamp(150px, 45vw, 320px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '0' : '40px',
                marginTop: isMobile ? '0' : '0',
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                // transform: showEasterEggTooltip ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={() => setShowEasterEggTooltip(true)}
              onMouseLeave={() => setShowEasterEggTooltip(false)}
              onClick={() => window.open(language === 'th' ? '/resume_th.pdf' : '/resume_en.pdf', '_blank')}
            >
              {/* Easter Egg Tooltip */}
              <div style={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: `translateX(-50%) translateY(${showEasterEggTooltip ? 0 : '5px'})`,
                backgroundColor: '#ffffff',
                color: '#334155',
                padding: '10px 20px',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                fontWeight: '600',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
                zIndex: 20,
                transition: 'all 0.3s ease',
                opacity: showEasterEggTooltip ? 1 : 0,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid #e2e8f0'
              }}>
                {/* <FaIdCard size={18} style={{ color: '#6DA9F3' }} /> */}
                <span>{language === 'th' ? 'ความลับ!' : 'Easter Egg!'}</span>
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#ffffff',
                  borderLeft: '1px solid #e2e8f0',
                  borderTop: '1px solid #e2e8f0',
                }}></div>
              </div>

              {/* Ring Decoration */}
              {/* <div style={{
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'conic-gradient(from 210deg, transparent 0deg, transparent 30deg, white 30deg, white 360deg)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 15px), #fff calc(100% - 15px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 15px), #fff calc(100% - 15px))',
                zIndex: 1
              }}></div> */}

              {/* Dot Decoration */}
              {/* <div style={{
              <div style={{
                position: 'absolute',
                width: isMobile ? '22px' : '30px',
                height: isMobile ? '22px' : '30px',
                backgroundColor: 'white',
                borderRadius: '50%',
                bottom: isMobile ? '25px' : '30px',
                left: isMobile ? '35px' : '45px',
                zIndex: 1
              }}></div> */}

              {/* Profile Image */}
              <div style={{
                width: 'clamp(130px, 40vw, 260px)',
                height: 'clamp(130px, 40vw, 260px)',
                borderRadius: '50%',
                overflow: 'hidden',
                zIndex: 2,
                position: 'relative',
                backgroundColor: '#ddd'
              }}>
                <Image
                  src="/1.png"
                  alt="Ratchanon Noknoy Profile"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Main Text */}
            <div style={{ textAlign: 'center', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: isMobile ? '0' : '80px' }}>
              <h1 className={styles.headerTitle} style={{ fontWeight: 800, letterSpacing: '2px', margin: 0, fontSize: 'clamp(3rem, 8vw, 5rem)' }}>THANK<br />YOU</h1>
              <h2 className={styles.headerSubtitle} style={{ fontWeight: 700, margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>ขอบคุณ</h2>
              
            </div>

            {/* Footer / Contact Info */}
            <div style={{
              position: isMobile ? 'relative' : 'absolute',
              bottom: isMobile ? 'auto' : '50px',
              left: isMobile ? 'auto' : 0,
              width: isMobile ? 'auto' : '100%',
              display: 'flex',
              gap: 'clamp(1rem, 3vw, 2rem)',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: 400,
              flexWrap: 'wrap',
              justifyContent: 'center',
              opacity: 0.9,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              marginTop: isMobile ? '0' : '0'
            }}>
              <a
                href="tel:+66987462598"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', transition: 'transform 0.2s' }}
                title={language === 'th' ? 'โทรออก' : 'Call Now'}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaPhone size={18} />
                <span>+66 98 746 2598</span>
              </a>
              <a
                href="mailto:ratchanon.noknoy2318@gmail.com"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', transition: 'transform 0.2s' }}
                title={language === 'th' ? 'ส่งอีเมล' : 'Send Email'}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaEnvelope size={18} />
                <span>ratchanon.noknoy2318@gmail.com</span>
              </a>
              <a
                href="https://www.google.com/maps/place/%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%94%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B8%9B%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%84+%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5+%E0%B9%83%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87+%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+%E0%B8%81%E0%B8%B3%E0%B9%81%E0%B8%9E%E0%B8%87%E0%B9%80%E0%B8%9E%E0%B8%8A%E0%B8%A3+62000/@16.448905,99.5309929,15z/data=!4m6!3m5!1s0x30de1889625cac4d:0xc4e9477440dd2c5e!8m2!3d16.454875!4d99.52852!16s%2Fg%2F1hdz3r7wd?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', transition: 'transform 0.2s' }}
                title={language === 'th' ? 'ดูแผนที่' : 'View Map'}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaMapMarkerAlt size={18} />
                <span>{language === 'th' ? 'กำแพงเพชร, ประเทศไทย' : 'Kamphaeng Phet, Thailand'}</span>
              </a>
              {/* <a
              
                href={language === 'th' ? 'pdf/resume-th1.pdf' : 'pdf/resume-en.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#6fa9f3',
                  backgroundColor: '#ffffff',
                  padding: '14px 36px',
                  borderRadius: '50px',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  border: '2px solid #ffffff'
                }}
                title={language === 'th' ? 'ดาวน์โหลดเรซูเม่' : 'Download Resume'}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = 'scale(1) translateY(-3px)'; 
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)'; 
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'; 
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)'; 
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <FaDownload size={20} />
                <span>{language === 'th' ? 'ดาวน์โหลดเรซูเม่' : 'Download Resume'}</span>
              </a> */}
            </div>

            <a
              href="https://www.canva.com/design/DAG82WrwRSs/4CTVR50SckrP9EAB94ukCQ/view?utm_content=DAG82WrwRSs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h02d1414c12"
              target="_blank"
              rel="noopener noreferrer"
              title={language === 'th' ? 'ดูดีไซน์ต้นฉบับบน Canva' : 'View original design on Canva'}
              style={{
                position: 'absolute',
                bottom: '5px',
                right: '10px',
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.5)',
                textDecoration: 'none',
                zIndex: 20
              }}
            >
           Ref. No. DAG82WrwRSs
            </a>

          </div>
        </section>
      </main>

      <Footer language={language} />

      {/* --- Modals --- */}
      {/* 1. Project Detail Modal: แสดงรายละเอียดโปรเจกต์เมื่อคลิกปุ่ม "อ่านเพิ่มเติม" */}
      <Modal
        project={selectedProject}
        onClose={closeModal}
        language={language}
      />

      {/* 2. Image Zoom Modal: แสดงรูปภาพขยายใหญ่เมื่อคลิกที่รูป */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)',
            overflow: isZoomed ? 'auto' : 'hidden'
          }}
          onClick={(e) => {
            // ป้องกันไม่ให้ปิด Modal เมื่อกดที่ปุ่มเลื่อนรูป (ตรวจสอบว่ากดที่พื้นหลังจริงๆ)
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
            }
          }}
        >
          {/* Zoom Controls */}
          <div
            style={{ position: 'fixed', bottom: 30, right: 30, color: 'white', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10002, background: 'rgba(255,255,255,0.2)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
          >
            {isZoomed ? <FaSearchMinus /> : <FaSearchPlus />}
          </div>

          {/* Close Button */}
          <div
            style={{ position: 'fixed', top: 20, right: 20, color: 'white', fontSize: '2rem', cursor: 'pointer', background: 'rgba(0,0,0,0.5)', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10002 }}
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            &times;
          </div>

          {/* Navigation Buttons */}
          {selectedImage.gallery && (
            <>
              <div
                style={{
                  position: 'fixed',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  zIndex: 10002,
                  background: 'rgba(255,255,255,0.1)',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                  transition: 'background 0.3s'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const currentIndex = selectedImage.gallery.findIndex(img => img.src === selectedImage.src);
                  const prevIndex = (currentIndex - 1 + selectedImage.gallery.length) % selectedImage.gallery.length;
                  const prevImg = selectedImage.gallery[prevIndex];
                  setSelectedImage({ ...selectedImage, ...prevImg });
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <FaChevronLeft />
              </div>
              <div
                style={{
                  position: 'fixed',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  zIndex: 10002,
                  background: 'rgba(255,255,255,0.1)',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                  transition: 'background 0.3s'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const currentIndex = selectedImage.gallery.findIndex(img => img.src === selectedImage.src);
                  const nextIndex = (currentIndex + 1) % selectedImage.gallery.length;
                  const nextImg = selectedImage.gallery[nextIndex];
                  setSelectedImage({ ...selectedImage, ...nextImg });
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <FaChevronRight />
              </div>
            </>
          )}

          <div
            style={{
              position: 'relative',
              width: isZoomed ? 'auto' : '100%',
              height: isZoomed ? 'auto' : '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: isZoomed ? 'flex-start' : 'center',
              minHeight: isZoomed ? '100%' : '0',
              minWidth: isZoomed ? '100%' : '0',
              padding: isZoomed ? '0' : '0'
            }}
            onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
          >
            {isZoomed ? (
              <Image
                src={selectedImage.src}
                alt="Full View"
                width={selectedImage.width || 800}
                height={selectedImage.height || 1131}
                style={{ width: '100%', maxWidth: '100%', height: 'auto', objectFit: 'contain', cursor: 'zoom-out' }}
                quality={100}
              />
            ) : (
              <Image
                src={selectedImage.src}
                alt="Full View"
                fill
                style={{ objectFit: 'contain', cursor: 'zoom-in' }}
                quality={100}
              />
            )}
          </div>

          {/* Image Caption Overlay */}
          {(selectedImage.title || selectedImage.description) && (
            <div
              style={{
                position: 'fixed',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '16px 24px',
                borderRadius: '16px',
                maxWidth: '85%',
                zIndex: 10003,
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.title && <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{selectedImage.title}</h3>}
              {selectedImage.date && (
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#486e9f', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  {selectedImage.id === 24 ? <FaUser size={12} /> : <FaCalendarAlt size={12} />}
                  {selectedImage.date}
                </p>
              )}
              {selectedImage.description && <p style={{ margin: '8px 0 0', fontSize: '0.95rem', color: '#64748b' }}>{selectedImage.description}</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
}
