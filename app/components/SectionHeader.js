import styles from '../styles/page.module.css';

export default function SectionHeader({ title }) {
  return (
    <div className={styles.pageHeader}>
      <h2>{title}</h2>
    </div>
  );
}