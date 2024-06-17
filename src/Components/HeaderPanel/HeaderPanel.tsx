/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/store';
import styles from './HeaderPanel.module.scss';
import { logout } from '../../redux/reducers/loginPanelAdmin';
const HeaderPanel = ({
  manageHotels,
  manageTeam,
  manageUsers,
  manageFilters,
  manageGallery,
  manageNews,
  manageSlider,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <header className={styles.header}>
      <nav>
        <h1>Edit</h1>
        <hr />
        <ul>
          <li onClick={manageUsers}>Manage Users</li>
          <li onClick={manageHotels}>Manage hotels</li>
          <li onClick={manageTeam}>Manage team</li>
          <li onClick={manageNews}>Manage news</li>
          <li onClick={manageFilters}>Manage filters</li>
          <li onClick={manageGallery}>Manage Gallery</li>
          <li onClick={manageSlider}>Manage Slider</li>
        </ul>
      </nav>
      <hr />
      <button onClick={handleLogout} className={styles.logout}>
        Log out
      </button>
    </header>
  );
};

export default HeaderPanel;
