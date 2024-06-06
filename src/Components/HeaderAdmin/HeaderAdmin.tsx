import { Link } from 'react-router-dom';
import styles from './HeaderAdmin.module.scss';
const HeaderAdmin = () => {
  return (
    <header className={styles.header}>
      <h1>ADMINISTRATIVE AREA</h1>
      <p>
        If you are not an administrator <Link to={'/'}>click here</Link>.
      </p>
    </header>
  );
};

export default HeaderAdmin;
