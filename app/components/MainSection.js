import styles from '@/styles/Section.module.css';

const MainSection = ({ children }) => {
  return (
    <section className={`${styles.section} section`} id="about">
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default MainSection;
