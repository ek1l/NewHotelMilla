/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './Header.module.scss';
import IMGLogo from '../../assets/img/logo.png';
import IMGAdidas from '../../assets/img/adidas.png';
import IMGUefa from '../../assets/img/uefa.png';
import IMGSgrz from '../../assets/img/sgrz.png';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IMGCloseSetaVerde from '../../assets/img/img/setaVerde.svg';
import IMGIcoMenuMobile from '../../assets/img/iconMenuMobile.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { alternateIdioma } from '../../redux/reducers/idioma';

const Header = () => {
  const dispatch = useAppDispatch();
  const { dutch } = useAppSelector((state) => state.changeIdiomaSlice);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(dutch ? 'dt' : 'en');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/admin/login')) {
      return;
    }
    setSelectedLanguage(dutch ? 'dt' : 'en');
  }, [dutch, location.pathname]);

  const setMobileOpenFunction = () => setMobileOpen(!mobileOpen);
  const alternateIdiomaFunc = () => {
    dispatch(alternateIdioma());
  };

  if (location.pathname.startsWith('/admin/login')) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.colorOrange}></div>
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div className={styles.imgAndInfo}>
            <img src={IMGLogo} alt="Logo" />
            <span className={styles.info}>
              {dutch
                ? 'Meer dan 100 locaties in binnen- en buitenland'
                : 'More than 100 locations over the world'}
            </span>
            <span className={styles.info}>
              {dutch
                ? 'Sinds 2004 dé kampioen in trainingskampen'
                : 'Since 2004 the champion of training camps'}
            </span>
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
                {dutch ? 'Over ons' : 'About us'}
              </NavLink>
              <NavLink className={styles.navLink} to="/offers">
                {dutch ? 'Aanbod' : 'Offers'}
              </NavLink>
              <NavLink className={styles.navLink} to="/news">
                {dutch ? 'Nieuws' : 'News'}
              </NavLink>
              <NavLink className={styles.navLink} to="/gallery">
                {dutch ? 'Gallerij' : 'Gallery'}
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

          <select
            onChange={alternateIdiomaFunc}
            className={styles.select}
            value={selectedLanguage}
          >
            <option value="dt">DT</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
      {mobileOpen && (
        <div className={styles.menuHamburguer}>
          <div className={styles.closeMobile}>
            <button onClick={setMobileOpenFunction}>
              <img src={IMGCloseSetaVerde} alt="Seta verde" />
            </button>
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
