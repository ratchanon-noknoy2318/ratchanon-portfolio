'use client';

import { FaGitlab, FaLinkedin, FaGithub, FaGlobe, FaBuilding, FaReddit, FaBarcode, FaBook } from 'react-icons/fa';
import styles from '../styles/Footer.module.css';

const socialLinksData = [
 
  {
    href: 'https://www.linkedin.com/in/ratchanon-noknoy/',
    label: 'View profile on LinkedIn',
    icon: <FaLinkedin />,
  },
  {
    href: 'https://github.com/ratchanon-noknoy2318',
    label: 'View source on GitHub',
    icon: <FaGithub />,
  }, 
  {
    href: 'https://gitlab.com/ratchanon.noknoy2318',
    label: 'View source on GitLab',
    icon: <FaGitlab />,
  },
  // {
  //   href: 'https://github.com/ratchanon-noknoy2318/ratchanon-noknoy2318/wiki',
  //   label: 'View GitHub Wiki',
  //   icon: <FaBook />,
  // },
  //  {
  //   href: 'https://ratchanonnoknoy.vercel.app/',
  //   label: 'View Official Website',
  //   icon: <FaGlobe />,
  // },
  //  {
  //   href: 'https://www.reddit.com/user/QuantitySoggy4885/',
  //   label: 'View profile on Reddit',
  //   icon: <FaReddit />,
  // },
  // {
  //   href: 'https://www.canva.com/design/DAG82WrwRSs/4CTVR50SckrP9EAB94ukCQ/view?utm_content=DAG82WrwRSs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h02d1414c12',
  //   label: 'View Canva Design',
  //   icon: <FaBarcode />,
  // },
  {
    href: 'https://ratchanonnoknoy.vercel.app/',
    label: 'View Official Website',
    icon: <FaGlobe />,
  }
];

const SocialLinks = ({ language = 'en' }) => {
  return (
    <div className={styles.socialLinks} style={{ display: 'flex', gap: '16px' }}>
      {socialLinksData.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={styles.socialLink}
          title={
            link.href.includes('linkedin')
              ? (language === 'th' ? 'ดูโปรไฟล์ LinkedIn' : 'View LinkedIn Profile')
              : link.href.includes('wiki')
              ? (language === 'th' ? 'ดู Wiki บน GitHub' : 'View GitHub Wiki')
              : link.href.includes('github')
              ? (language === 'th' ? 'ดูซอร์สโค้ดบน GitHub' : 'View source on GitHub')
              : link.href.includes('gitlab')
              ? (language === 'th' ? 'ดูซอร์สโค้ดบน GitLab' : 'View source on GitLab')
              : link.href.includes('reddit')
              ? (language === 'th' ? 'ดูโปรไฟล์ Reddit' : 'View Reddit Profile')
              : link.href.includes('canva')
              ? (language === 'th' ? 'ดูดีไซน์ต้นฉบับบน Canva' : 'View original design on Canva')
              : link.href.includes('kppmu')
              ? (language === 'th' ? 'เว็บไซต์เทศบาลเมืองกำแพงเพชร' : 'Kamphaeng Phet Municipality Website')
              : (language === 'th' ? 'เข้าดูเว็บไซต์หลัก' : 'View Official Website')
          }
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;