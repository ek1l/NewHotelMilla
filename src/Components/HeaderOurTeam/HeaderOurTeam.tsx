import styles from './HeaderOurTeam.module.scss';
import IMGLogoOurTeam from '../../assets/img/logoOurTeams.png';
import { Link } from 'react-router-dom';
import IMGSearchInputOurTeam from '../../assets/img/searchInputOurTeam.png';
const HeaderOurTeam = () => {
  return (
    <header className={styles.header}>
      <div className={styles.containerHeader}>
        <img src={IMGLogoOurTeam} alt="Logo" />
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link className={styles.link} to="/">
              Home
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} to="/our-team">
              Our team
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} to="/offers">
              Offers
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} to="/news">
              News
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} to="/gallery">
              Gallery
            </Link>
          </li>
        </ul>
        <div className={styles.inputSearchContainer}>
          <input className={styles.inputSearch} type="text" />
          <img
            className={styles.ico}
            src={IMGSearchInputOurTeam}
            alt="Search Input ICO"
          />
        </div>
        <select className={styles.select}>
          <option className={styles.option} value="en">
            EN
          </option>
          <option className={styles.option} value="dt">
            DT
          </option>
        </select>
      </div>
    </header>
  );
};

export default HeaderOurTeam;
