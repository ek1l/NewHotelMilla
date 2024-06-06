import styles from './AdminPanel.module.scss';
import { lazy, Suspense } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import HeaderPanel from '../../Components/HeaderPanel/HeaderPanel';

import ManageUsers from '../../Components/ManageUsers/ManageUsers';
import { verifyTokenUser } from '../../redux/reducers/verifyToken';
import Loading from '../../Components/Loader/Loading';
import ManageFilters from '../../Components/ManageFilters/ManageFilters';
import ManageGallery from '../../Components/ManageGallery/ManageGallery';
import ManageNews from '../../Components/ManageNews/ManageNews';

const ManageTeam = lazy(() => import('../../Components/ManageTeam/ManageTeam'));
const ManageHotels = lazy(
  () => import('../../Components/ManageHotels/ManageHotels'),
);

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pageManageHotels, setPageManageHotels] = useState<boolean>(false);
  const [pageManageTeam, setPageManageTeam] = useState<boolean>(false);
  const [pageManageUsers, setPageManageUsers] = useState<boolean>(false);
  const [pageManageFilters, setPageManageFilters] = useState<boolean>(false);
  const [pageManageGallery, setPageManageGallery] = useState<boolean>(false);
  const [pageManageNews, setPageManageNews] = useState<boolean>(false);
  const manageTeam = useCallback(() => {
    setPageManageHotels(false);
    setPageManageUsers(false);
    setPageManageFilters(false);
    setPageManageGallery(false);
    setPageManageNews(false);
    setPageManageTeam(true);
  }, []);

  const manageHotels = useCallback(() => {
    setPageManageTeam(false);
    setPageManageUsers(false);
    setPageManageFilters(false);
    setPageManageGallery(false);
    setPageManageNews(false);
    setPageManageHotels(true);
  }, []);

  const manageUsers = useCallback(() => {
    setPageManageTeam(false);
    setPageManageHotels(false);
    setPageManageFilters(false);
    setPageManageGallery(false);
    setPageManageNews(false);
    setPageManageUsers(true);
  }, []);

  const manageFilters = useCallback(() => {
    setPageManageTeam(false);
    setPageManageHotels(false);
    setPageManageUsers(false);
    setPageManageGallery(false);
    setPageManageNews(false);
    setPageManageFilters(true);
  }, []);

  const manageGallery = useCallback(() => {
    setPageManageTeam(false);
    setPageManageHotels(false);
    setPageManageUsers(false);
    setPageManageFilters(false);
    setPageManageNews(false);
    setPageManageGallery(true);
  }, []);

  const manageNews = useCallback(() => {
    setPageManageTeam(false);
    setPageManageHotels(false);
    setPageManageUsers(false);
    setPageManageFilters(false);
    setPageManageGallery(false);
    setPageManageNews(true);
  }, []);

  const verifyTokenIsValid = useCallback(async () => {
    const response = await dispatch(verifyTokenUser());
    if (response.type === 'verifyToken/fulfilled') {
      navigate('/admin/login/panel');
    } else {
      localStorage.clear();
      navigate('/');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      verifyTokenIsValid();
    } else {
      navigate('/');
      localStorage.clear();
    }
  }, [verifyTokenIsValid, navigate]);

  return (
    <div className={styles.container}>
      <HeaderPanel
        manageTeam={manageTeam}
        manageHotels={manageHotels}
        manageUsers={manageUsers}
        manageFilters={manageFilters}
        manageGallery={manageGallery}
        manageNews={manageNews}
      />
      <main className={styles.main}>
        {!pageManageHotels &&
          !pageManageTeam &&
          !pageManageUsers &&
          !pageManageFilters &&
          !pageManageGallery &&
          !pageManageNews && (
            <div className={styles.welcome}>
              <h1>PANEL ADMIN </h1>
            </div>
          )}
        <Suspense fallback={<Loading />}>
          {pageManageHotels && <ManageHotels />}
          {pageManageTeam && <ManageTeam />}
          {pageManageUsers && <ManageUsers />}
          {pageManageFilters && <ManageFilters />}
          {pageManageGallery && <ManageGallery />}
          {pageManageNews && <ManageNews />}
        </Suspense>
      </main>
    </div>
  );
};

export default AdminPanel;
