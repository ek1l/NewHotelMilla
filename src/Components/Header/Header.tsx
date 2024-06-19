import styles from './Header.module.scss';
import IMGLogo from '../../assets/img/logo.png';
import IMGAdidas from '../../assets/img/adidas.png';
import IMGUefa from '../../assets/img/uefa.png';
import IMGSgrz from '../../assets/img/sgrz.png';
import { NavLink, useLocation } from 'react-router-dom';
import IMGIcoMenuMobile from '../../assets/img/iconMenuMobile.svg';
import { useState } from 'react';
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  if (location.pathname.startsWith('/admin/login')) {
    return;
  }
  const setMobileOpenFunction = () => setMobileOpen(!mobileOpen);
  return (
    <header className={styles.header}>
      <div className={styles.colorOrange}></div>
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div className={styles.imgAndInfo}>
            <img src={IMGLogo} alt="Logo" />
            <span className={styles.info}>
              MORE THAN 100 LOCATIONS OVER THE WORLD
            </span>
            <span className={styles.info}>SINCE 2004</span>
          </div>
          <div className={styles.times}>
            <img className={styles.img} src={IMGAdidas} alt="Adidas" />
            <img
              className={`${styles.img} ${styles.imgUefa}`}
              src={IMGUefa}
              alt="Uefa"
            />
            <img className={styles.img} src={IMGSgrz} alt="Sgrz" />
          </div>
        </div>
        <div className={styles.colorGray}></div>
        <div className={styles.bottomHeader}>
          <nav className={styles.nav}>
            <ul className={styles.ul}>
              <NavLink className={styles.navLink} to="/">
                Home
              </NavLink>
              <NavLink className={styles.navLink} to="/our-team">
                Our team
              </NavLink>
              <NavLink className={styles.navLink} to="/offers">
                Offers
              </NavLink>
              <NavLink className={styles.navLink} to="/news">
                News
              </NavLink>
              <NavLink className={styles.navLink} to="/gallery">
                Gallery
              </NavLink>
            </ul>
          </nav>

          <nav className={styles.navHamburguer}>
            <ul className={styles.ulHamburguer}>
              {!mobileOpen && (
                <button onClick={setMobileOpenFunction}>
                  <img src={IMGIcoMenuMobile} alt="Menu Mobile Ico" />
                </button>
              )}
            </ul>
          </nav>

          <select className={styles.select}>
            <option value="en">EN</option>
            <option value="dt">DT</option>
          </select>
        </div>
      </div>
      {mobileOpen && (
        <div className={styles.menuHamburguer}>
          <div className={styles.closeMobile}>
            <button onClick={setMobileOpenFunction}>X</button>
          </div>
          <div className={styles.containerMenuHamburguer}>
            <NavLink className={styles.navLinkhamburguer} to="/">
              Home
            </NavLink>
            <NavLink className={styles.navLinkhamburguer} to="/our-team">
              Our team
            </NavLink>
            <NavLink className={styles.navLinkhamburguer} to="/offers">
              Offers
            </NavLink>
            <NavLink className={styles.navLinkhamburguer} to="/news">
              News
            </NavLink>
            <NavLink className={styles.navLinkhamburguer} to="/gallery">
              Gallery
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
