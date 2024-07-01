import styles from './Footer.module.scss';
import IMGLogoFooter from '../../assets/img/logoFooter.png';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EmailSend } from '../../interfaces/emailSendInterface';
import { emailSendSchema } from '../../schemas/emailSend';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { sendEmailMailChimp } from '../../redux/reducers/sendEmail';
const Footer = () => {
  const { dutch } = useAppSelector((state) => state.changeIdiomaSlice);
  const notify = () => toast.success('Email successfully sent!');
  const notifyError = () => toast.error('Email Invalid!');
  const notifyErrorSend = () => toast.error('Email not sent!');
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.sendEmailMailChimpSlice);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EmailSend>({
    resolver: zodResolver(emailSendSchema),
  });

  const submit = async (formData: EmailSend) => {
    const response = await dispatch(sendEmailMailChimp(formData));
    if (response.type === 'sendEmailMailChimp/fulfilled') {
      notify();
      reset();
      return;
    } else {
      notifyErrorSend();
      reset();
      return;
    }
  };
  useEffect(() => {
    if (errors.email) {
      notifyError();
    }
  }, [errors]);
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
            <h1 className={styles.titleAbout}>
              {dutch ? 'Over (ons)' : 'About (us)'}
            </h1>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <Link className={styles.link} to="/">
                  Home
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} to="/our-team">
                  {dutch ? 'Over ons' : 'Our team'}
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} to="/offers">
                  {dutch ? 'Aanbod' : 'Offers'}
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} to="/news">
                  {dutch ? 'Nieuws' : 'News'}
                </Link>
              </li>
              <li className={styles.li}>
                <Link className={styles.link} to="/gallery">
                  {dutch ? 'Gallerij' : 'Gallery'}
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.getUpdatedAndMailSend}>
            <h1 className={styles.getUpdatedTitle}>
              {dutch ? 'Blijf op de hoogte!' : 'Get updated'}
            </h1>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
              <input
                {...register('email')}
                type="text"
                placeholder="Enter your email"
                className={styles.inputEmail}
              />
              {loading ? (
                <button disabled type="submit" className={styles.button}>
                  Loading...
                </button>
              ) : (
                <button type="submit" className={styles.button}>
                  Subscribe
                </button>
              )}
            </form>
            <div className={styles.bolaContainer}>
              <Link
                to={'https://facebook.com/trainingskampen/'}
                target="_blank"
                className={`${styles.bola} ${styles.bola1}`}
              ></Link>
              <Link
                to={'https://www.instagram.com/trainingskampen.nl_/'}
                target="_blank"
                className={`${styles.bola} ${styles.bola2}`}
              ></Link>
              <Link
                to={'https://linkedin.com/company/trainingskampen.nl'}
                target="_blank"
                className={`${styles.bola} ${styles.bola3}`}
              ></Link>
            </div>
          </div>
        </div>
        <div className={styles.filtersHotel}>
          <div className={styles.filtersContainer}>
            <Link className={styles.linkFilter} to="/">
              {dutch ? 'Voetbal' : 'Football'}
            </Link>
            <Link className={styles.linkFilter} to="/">
              {dutch ? 'Hockey' : 'Hockey'}
            </Link>
            <Link className={styles.linkFilter} to="/">
              Padel
            </Link>
            <Link className={styles.linkFilter} to="/">
              {dutch ? 'Atletiek' : 'Athletics'}
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
