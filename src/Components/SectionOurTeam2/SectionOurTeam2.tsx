import styles from './SectionTeam2.module.scss';
const SectionOurTeam2 = () => {
  return (
    <section className={`${styles.section} animationEntrando`}>
      <div className={styles.sectionContainer}>
        <h1 className={styles.title}>Lorem Ipsum</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </section>
  );
};

export default SectionOurTeam2;
