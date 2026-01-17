import { Sarabun, Montserrat } from 'next/font/google';
import './styles/globals.css';
import BackToTopButton from './components/BackToTopButton';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-sarabun',
});

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://ratchanon-portfolio.vercel.app'),
  title: {
    default: 'Ratchanon Noknoy – Professional Portfolio',
    template: '%s | Ratchanon Noknoy',
  },
  description: 'Portfolio of Ratchanon Noknoy, a Software Engineer & Full Stack Developer specializing in Health Tech, Hospital Information Systems (HOSxP), Telemedicine, LINE OA, and Web Applications. รับพัฒนาเว็บไซต์และระบบโรงพยาบาล เชื่อมต่อ API และฐานข้อมูล',
  keywords: ['Ratchanon Noknoy', 'Portfolio', 'Software Engineer', 'Full Stack Developer', 'Health Tech', 'Healthcare IT', 'Medical Informatics', 'Next.js', 'React', 'Node.js', 'Google Apps Script', 'HOSxP', 'HOSxP XE', 'LINE API', 'LINE OA', 'Telemedicine', 'Digital Transformation', 'Hospital Information Systems', 'Smart Hospital', 'Health Data Center', 'HDC', 'MySQL', 'Tailwind CSS', 'Developer โรงพยาบาล', 'นักพัฒนา Health Tech', 'Kamphaeng Phet', 'รับทำเว็บไซต์', 'รับเขียนโปรแกรม', 'จ้างทำเว็บ', 'โปรแกรมเมอร์', 'ระบบบริหารจัดการโรงพยาบาล', 'รัชชานนท์ นกน้อย', 'Web Developer', 'Frontend Developer', 'Backend Developer', 'Ratchanon Noknoy Resume', 'Ratchanon Noknoy CV', 'รัชชานนท์ นกน้อย Portfolio'],
  authors: [{ name: 'Ratchanon Noknoy' }],
  manifest: '/site.webmanifest',
  creator: 'Ratchanon Noknoy',
  publisher: 'Ratchanon Noknoy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ratchanon-portfolio.vercel.app',
  },
  appleWebApp: {
    title: 'Ratchanon Portfolio',
    statusBarStyle: 'default',
    capable: true,
  },
  openGraph: {
    type: 'profile',
    profile: {
      firstName: 'Ratchanon',
      lastName: 'Noknoy',
      username: 'ratchanon2318',
    },
    siteName: 'Ratchanon Noknoy Portfolio',
    title: 'Portfolio of Ratchanon Noknoy',
    locale: 'en_US',
    alternateLocale: 'th_TH',
    description: 'Portfolio of Ratchanon Noknoy. Full Stack Developer & Health Tech Expert. Specializing in hospital web apps, telemedicine, and patient services.',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Portfolio Cover' },
    ],
    url: 'https://ratchanon-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio of Ratchanon Noknoy',
    description: 'Portfolio of Ratchanon Noknoy. Full Stack Developer & Health Tech Expert. Specializing in hospital web apps, telemedicine, and patient services.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },

    ],
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'googlea064b9df4eeee16b',
  },
  formatDetection: {
    telephone: false,
  },
  category: 'technology',
  other: {
    'geo.region': 'TH-62',
    'geo.placename': 'Kamphaeng Phet',
    'geo.position': '16.4828;99.5227',
    'ICBM': '16.4828, 99.5227',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ratchanon Noknoy',
    alternateName: 'รัชชานนท์ นกน้อย',
    gender: 'Male',
    nationality: 'Thai',
    birthDate: '1999-07-04',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://ratchanon-portfolio.vercel.app/'
    },
    url: 'https://ratchanon-portfolio.vercel.app/',
    image: 'https://ratchanon-portfolio.vercel.app/og-image.png',
    sameAs: [
      'https://github.com/ratchanon2318',
      'https://www.linkedin.com/in/ratchanon-noknoy/',
      'https://gitlab.com/ratchanon.noknoy2318',
      'https://www.tiktok.com/@kpp.pr/video/7506431498870902037?is_from_webapp=1',
      'https://www.kppmu.go.th/news-detail?hd=1&id=124000',
    ],
    jobTitle: 'Software Engineer & Health Tech Expert',
    worksFor: {
      '@type': 'Organization',
      'name': 'Kamphaeng Phet Municipality Community Hospital'
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      'name': 'Mae Fah Luang University',
      'sameAs': 'https://www.mfu.ac.th/'
    },
    award: 'Silver Medal in Student Science Project Competition',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kamphaeng Phet',
      addressCountry: 'TH'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      'email': 'ratchanon.noknoy2318@gmail.com',
      'contactType': 'Work',
      'availableLanguage': ['Thai', 'English']
    },
    email: 'mailto:ratchanon.noknoy2318@gmail.com',
    knowsAbout: ['Health Tech', 'Next.js', 'React', 'HOSxP', 'LINE API', 'Hospital Information Systems', 'Google Apps Script', 'Telemedicine', 'Node.js', 'MySQL', 'Tailwind CSS', 'Git', 'CI/CD', 'Agile', 'Full Stack Development', 'Web Development'],
    description: 'Full Stack Developer specializing in Health Tech, LINE OA, and Digital Transformation for hospitals. เชี่ยวชาญระบบโรงพยาบาลและเทคโนโลยีสุขภาพ',
  };

  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${montserrat.variable} ${sarabun.variable}`} style={{ fontFamily: 'var(--font-montserrat), var(--font-sarabun), sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <BackToTopButton />
      </body>
    </html>
  )
}