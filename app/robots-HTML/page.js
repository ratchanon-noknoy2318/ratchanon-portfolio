import Link from 'next/link';
import { FaRobot, FaArrowLeft, FaFileAlt } from 'react-icons/fa';
import styles from '../styles/robots.module.css';

export const metadata = {
  title: 'Robots.txt | Ratchanon Noknoy',
  description: 'Robots.txt HTML version for Ratchanon Noknoy Portfolio',
};

// Configuration that mirrors app/robots.js structure
const baseUrl = 'https://ratchanon-portfolio.vercel.app/';
const robotsConfig = {
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${baseUrl}/sitemap.xml`,
};

export default function Robots() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
            <Link href="/" title="Back to Home" className={styles.backLink}>
                <FaArrowLeft /> Back to Home
            </Link>
            <a 
                href={`${baseUrl}/robots.txt`}
                target="_blank" 
                rel="noopener noreferrer"
                title="Open raw robots.txt file"
                className={styles.rawFileLink}
            >
                <FaFileAlt /> View Raw File
            </a>
        </div>
        <h1 className={styles.title}>
          <FaRobot /> Robots.txt
        </h1>
        
        <p className={styles.description}>
            Standard configuration for web crawlers and robots.
        </p>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th>Directive</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    <tr>
                        <td className={styles.directive}>User-agent</td>
                        <td className={styles.value}>{robotsConfig.rules.userAgent}</td>
                        <td>Applies to all web crawlers</td>
                    </tr>
                    <tr>
                        <td className={styles.directive}>Allow</td>
                        <td className={styles.value}>{robotsConfig.rules.allow}</td>
                        <td>Allows access to the entire site</td>
                    </tr>
                    <tr>
                        <td className={styles.directive}>Sitemap</td>
                        <td className={styles.value}>
                            <a href={robotsConfig.sitemap} target="_blank" rel="noopener noreferrer" title="View Raw Sitemap" className={styles.sitemapLink}>{robotsConfig.sitemap}</a>
                        </td>
                        <td>Location of the XML Sitemap</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </main>
  );
}