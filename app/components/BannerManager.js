'use client';

import styles from '../styles/Banner.module.css';
import { useState, useEffect } from 'react';
import Banner from './ActivitesBanner';
 
const allBanners = {
  th: [
    //   {
    //   id: 'featured-1',
    //   placement: 'top-left',
    //   // date: 'เมษายน 2568',
    //   tag: 'telemedicine',
    //   title: 'ระบบลงทะเบียน Telemedicine',
    //   text: 'ระบบลงทะเบียนออนไลน์ ลดภาระงานเจ้าหน้าที่ ผู้ป่วยลงทะเบียนได้ทุกที่ทุกเวลา',
    //   link: 'https://gitlab.com/ratchanon.noknoy2318/register/-/blob/master/app/PatientRegister/page.js?ref_type=heads',
    //   imageUrl: '/featured/featured-1.png',
    //   buttonText: 'ดูซอร์สโค้ด',
    //   isFeatured: true,
    // },
     {
      id: 'activity-1',
      placement: 'top-left',
      date: '31 กรกฎาคม 2568',
      tag: 'activity',
      title: 'อบรมป้องกันทุจริตและประพฤติมิชอบ เทศบาลกำแพงเพชร 2568',
      text: 'นายเก่งกล้า เกตุแก้ว รองนายกเทศมนตรีเมืองกำแพงเพชร เปิดโครงการส่งเสริมป้องกันการทุจริตและประพฤติมิชอบ ประจำปี 2568',
      link: 'https://www.kppmu.go.th/news-detail?hd=1&id=126854',
      imageUrl: '/activities/activity-1.png',
      buttonText: 'อ่านเพิ่มเติม',
    },
    {
      id: 'activity-2',
      placement: 'top-left',
      date: '8 กรกฎาคม 2568',
      tag: 'activity',
      title: 'โครงการอบรมพัฒนาความรู้ด้านสื่อดิจิทัล ประจำปี 2568',
      text: 'นางสาวธันย์ชนก ศุภอรรถพานิช เลขานุการนายกเทศมนตรีเมืองกำแพงเพชร เปิดโครงการอบรมความรู้สื่อดิจิทัลสำหรับประชาชน ปี 2568',
      link: 'https://www.kppmu.go.th/news-detail?hd=1&id=126007',
      imageUrl: '/activities/activity-2.png',
      buttonText: 'อ่านเพิ่มเติม',
    },
     {
      id: 'activity-3',
      placement: 'top-left',
      date: '20 พฤษภาคม 2568',
      tag: 'activity',
      title: 'บริการ Telemedicine โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
      text: 'เทศบาลเมืองกำแพงเพชร จัดทำเว็บไซต์ลงทะเบียนรับบริการแพทย์ทางไกล (Telemedicine) สำหรับผู้ป่วยติดเตียงและโรคเรื้อรัง',
      link: 'https://www.kppmu.go.th/news-detail?hd=1&id=124000',
      imageUrl: '/activities/activity-3.1.jpg',
      buttonText: 'อ่านเพิ่มเติม',
    },
   
    //  {
    //   id: 'canva-ai-1',
    //   placement: 'top-left',
    //   // date: 'กรกฎาคม 2568',
    //   tag: 'canva-ai',
    //   title: 'สร้างงานง่าย ด้วย Canva AI',
    //   text: 'ออกแบบป้าย โพสต์ และสื่อโปรโมชันได้ภายในไม่กี่นาทีด้วยพลัง AI ใช้งานง่าย สวยระดับมืออาชีพ',
    //   link: 'https://ratchanonnoknoy.my.canva.site/canva-ai-introduction',
    //   imageUrl: '/featured/canva.png',
    //   buttonText: 'เริ่มออกแบบเลย',
    // },
    // {
    //   id: 'gitlab-1',
    //   placement: 'top-left',
    //   tag: 'devops',
    //   title: 'ติดตามฉันบน GitLab',
    //   text: 'ลองเข้าไปดูโปรเจกต์ส่วนตัวและผลงานที่ฉันมีส่วนร่วมบน GitLab',
    //   link: 'https://gitlab.com/ratchanon.noknoy2318',
    //   imageUrl: '/featured/gitlab.png',
    //   buttonText: 'ดูโปรไฟล์ GitLab',
      
    // },
    //  {
    //   id: 'linkedin-1',
    //   placement: 'top-left',
    //   tag: 'devops',
    //   title: 'เชื่อมต่อบน LinkedIn',
    //   text: 'มาเชื่อมต่อกันและขยายเครือข่ายสายอาชีพไปด้วยกัน',
    //   link: 'https://www.linkedin.com/in/ratchanon-noknoy/',
    //   imageUrl: '/featured/linkedin-101-hero@2x.png',
    //   buttonText: 'เชื่อมต่อ',
      
    // },
  ],
  en: [
       {
      id: 'activity-1',
      placement: 'top-left',
      date: 'July 31, 2025',
      tag: 'activity',
      title: 'Anti-Corruption and Misconduct Prevention Training 2025',
      text: 'Mr. Kengkla Ketkaew, Deputy Mayor, opened the 2025 project to promote the prevention of corruption and misconduct.',
      link: 'https://www.kppmu.go.th/news-detail?hd=1&id=126854',
      imageUrl: '/activities/activity-1.png',
      buttonText: 'Read More',
    },
    {
      id: 'activity-2',
      placement: 'top-left',
      date: 'July 8, 2025',
      tag: 'activity',
      title: 'Digital Media Knowledge Development Training 2025',
      text: 'Ms. Thanchanok Supa-atthapanich, Secretary to the Mayor, opened the 2025 digital media knowledge training project for the public.',
      link: 'https://www.kppmu.go.th/news-detail?hd=1&id=126007',
      imageUrl: '/activities/activity-2.png',
      buttonText: 'Read More',
    },
     {
      id: 'activity-3',
      placement: 'top-left',
      date: 'May 20, 2025',
      tag: 'activity',
      title: 'Telemedicine Service at Community Hospital',
      text: 'Kamphaeng Phet Municipality launched a Telemedicine registration website for bedridden and chronic disease patients.',
      link: 'https://www.kppmu.go.th/news-detail?hd=1&id=124000',
      imageUrl: '/activities/activity-3.1.jpg',
      buttonText: 'Read More',
    },
    // {
    //   id: 'featured-1',
    //   placement: 'top-left',
    //   // date: 'April 2025',
    //   tag: 'telemedicine',
    //   title: 'Telemedicine Registration System',
    //   text: 'An online system for patients to register for Telemedicine services.',
    //   link: 'http://gitlab.com/ratchanon.noknoy2318/register/-/blob/master/app/PatientRegister/page.js?ref_type=heads',
    //   imageUrl: '/featured/featured-1.png',
    //   buttonText: 'View Source Code',
    //   isFeatured: true,
    // },
    // {
    //   id: 'featured-2',
    //   placement: 'top-left',
    //   date: 'April 2025',
    //   tag: 'line-oa',
    //   title: 'LINE Official Account',
    //   text: 'Designed Rich Menus and Flex Messages for core services.',
    //   link: 'https://ratchanonnoknoy.my.canva.site/line-oa-workflow/line-oa-kppmch',
    //   imageUrl: '/featured/kppmch-richmenu.png',
    //   buttonText: 'See More',
    // },
    // {
    //   id: 'featured-3',
    //   placement: 'top-left',
    //   // date: 'July 2025',
    //   tag: 'Portfolio',
    //   title: 'Canva AI',
    //   text: 'Designed and developed a web application entirely using Canva AI',
    //   link: 'https://kppmch.my.canva.site/bmi',
    //   imageUrl: '/featured/featured-3.png',
    //   buttonText: 'See More',
    // },
    // {
    //   id: 'gitlab-1',
    //   placement: 'top-left',
    //   tag: 'devops',
    //   title: 'Follow me on GitLab',
    //   text: 'Check out my personal projects and contributions on GitLab.',
    //   link: 'https://gitlab.com/ratchanon.noknoy2318',
    //   imageUrl: '/featured/gitlab.png',
    //   buttonText: 'View GitLab'
    // },
    //  {
    //   id: 'linkedin-1',
    //   placement: 'top-left',
    //   tag: 'devops',
    //   title: 'Connect on LinkedIn',
    //   text: 'Connect and expand our professional network',
    //   link: 'https://www.linkedin.com/in/ratchanon-noknoy/',
    //   imageUrl: '/featured/linkedin-101-hero@2x.png',
    //   buttonText: 'Connect'
    // },
  ]
};
 
export default function BannerManager({ language }) {
  const [visibleBanners, setVisibleBanners] = useState([]);
 
  useEffect(() => {
    const bannersForLanguage = allBanners[language] || allBanners.th;
    setVisibleBanners(bannersForLanguage);
  }, [language]);
 
  const handleDismiss = (bannerId) => {
    setVisibleBanners(prevBanners => prevBanners.filter(b => b.id !== bannerId));
  };
 
  return (
    <div className={styles.bannerRowContainer}>
      {visibleBanners.map((banner) => (
        <Banner
          key={banner.id}
          banner={banner}
          isFeatured={banner.isFeatured} // Pass the new prop
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  );
}