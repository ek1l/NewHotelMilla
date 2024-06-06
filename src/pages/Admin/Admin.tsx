import HeaderAdmin from '../../Components/HeaderAdmin/HeaderAdmin';
import LoginAdmin from '../../Components/LoginAdmin/LoginAdmin';

import styles from './Admin.module.scss';
const Admin = () => {
  return (
    <>
      <HeaderAdmin />
      <div className={styles.containerAdmin}>
        <LoginAdmin />
      </div>
    </>
  );
};

export default Admin;
