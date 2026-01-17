import Link from 'next/link';
import { FaHome, FaUser, FaEnvelope, FaImages, FaSitemap, FaArrowLeft, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/sitemap.module.css';

export const metadata = {
  title: 'Sitemap | Ratchanon Noknoy',
  description: 'HTML Sitemap for Ratchanon Noknoy Portfolio',
};

export default function Sitemap() {
  const links = [
    { href: '/', label: 'Home', subLabel: 'หน้าแรก', icon: <FaHome />, description: 'หน้าหลักของเว็บไซต์รวมผลงานและข้อมูลเบื้องต้น' },
    { href: '/about', label: 'About Me', subLabel: 'เกี่ยวกับฉัน', icon: <FaUser />, description: 'ข้อมูลประวัติส่วนตัว การศึกษา และประสบการณ์ทำงาน' },
    { href: '/contact', label: 'Contact', subLabel: 'ติดต่อ', icon: <FaEnvelope />, description: 'ช่องทางการติดต่อและส่งข้อความถึงฉัน' },
    { href: '/all-activities', label: 'All Activities', subLabel: 'กิจกรรมทั้งหมด', icon: <FaImages />, description: 'รวมภาพกิจกรรมและผลงานต่างๆ ที่ผ่านมา' },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
            <Link href="/" title="Back to Home" className={styles.backLink}>
                <FaArrowLeft /> Back to Home
            </Link>
            <a
                href="https://ratchanon-portfolio.vercel.app/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                title="Open raw sitemap.xml file"
                className={styles.rawFileLink}
            >
                <FaFileAlt /> View Raw File
            </a>
        </div>
        <h1 className={styles.title}>
          <FaSitemap /> Sitemap
        </h1>
        
        <p className={styles.description}>
            แผนผังเว็บไซต์และโครงสร้างการนำทาง
        </p>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th>Page</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {links.map((link, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td style={{ padding: '0' }}>
                                <Link href={link.href} className={styles.pageLink}>
                                    <span className={styles.icon}>{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            </td>
                            <td style={{ padding: '1rem', color: '#64748b' }}>
                                {link.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </main>
  );
}
