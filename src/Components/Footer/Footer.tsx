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
            <h1 className={styles.titleAbout}>About</h1>
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
          </div>
          <div className={styles.getUpdatedAndMailSend}>
            <h1 className={styles.getUpdatedTitle}>Get updated</h1>
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
