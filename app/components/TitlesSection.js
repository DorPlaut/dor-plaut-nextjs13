import styles from '@/styles/Section.module.css';
import Image from 'next/image';

const TitlesSection = ({ children }) => {
  return (
    <section className={styles.titles_section}>
      <div className={`container ${styles.titles_container}`}>{children}</div>
    </section>
  );
};

export default TitlesSection;
