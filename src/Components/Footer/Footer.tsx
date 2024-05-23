import styles from './Footer.module.scss';
import IMGLogoFooter from '../../assets/img/logoFooter.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerFooter}>
        <div className={styles.containerInformacoes}>
          <div className={styles.logoAndDescription}>
            <img
              className={styles.logo}
              src={IMGLogoFooter}
              alt="Logo Footer"
            />
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className={styles.contact}>
            <h1 className={styles.titleContact}>Contact</h1>
            <span className={styles.infoContact}>+31 0000000</span>
            <span className={styles.infoContact}>info@trainingskampen.nl</span>
            <span className={styles.infoContact}>
              Langesteijn 130 3342 LG Hendrik-Ido-Ambacht
            </span>
          </div>
          <div className={styles.about}>
            <h1 className={styles.titleAbout}>About</h1>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <Link className={styles.link} to="/">
                  Home
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} to="/">
                  Our team
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} to="/">
                  Our team
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} to="/">
                  Our team
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.getUpdatedAndMailSend}>
            <h1 className={styles.getUpdatedTitle}>Get updated</h1>
            <form className={styles.form}>
              <input
                type="text"
                placeholder="Enter your email"
                className={styles.inputEmail}
              />
              <button type="submit" className={styles.button}>
                Subscribe
              </button>
            </form>
            <div className={styles.bolaContainer}>
              <div className={styles.bola}></div>
              <div className={styles.bola}></div>
              <div className={styles.bola}></div>
              <div className={styles.bola}></div>
            </div>
          </div>
        </div>
        <div className={styles.filtersHotel}>
          <div className={styles.filtersContainer}>
            <Link className={styles.linkFilter} to="/">
              Football
            </Link>
            <Link className={styles.linkFilter} to="/">
              Hockey
            </Link>
            <Link className={styles.linkFilter} to="/">
              Athletics
            </Link>
            <Link className={styles.linkFilter} to="/">
              Padel
            </Link>
          </div>
          <div className={styles.privacyAndTermsAndReserved}>
            <span className={styles.privacy}>
              Privacy Policy | Terms and conditions | All rights reserved, 2024
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
