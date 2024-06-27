import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import NotifyEmail from './Components/NotifyEmail/NotifyEmail';
import { useAppDispatch, useAppSelector } from './redux/store';
import Header from './Components/Header/Header';
import ModalForm from './Components/ModalForm/ModalForm';
import OpenModal from './Components/OpenModal/OpenModal';
import FormAddNewHotel from './Components/FormAddNewHotel/FormAddNewHotel';
import { setDutch, setEnglish } from './redux/reducers/idioma';

const Home = lazy(() => import('./pages/home/Home'));
const OurTeam = lazy(() => import('./pages/OurTeam/OurTeam'));
const Offers = lazy(() => import('./pages/Offers/Offers'));
const HotelUnique = lazy(() => import('./pages/hotelUnique/HotelUnique'));
const News = lazy(() => import('./pages/News/News'));
const NewsUnique = lazy(() => import('./pages/NewsUnique/NewsUnique'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const GalleryUnique = lazy(() => import('./pages/GalleryUnique/GalleryUnique'));
const AdminPanel = lazy(() => import('./pages/AdminPanel/AdminPanel'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const App = () => {
  const dispatch = useAppDispatch();
  const { active } = useAppSelector((state) => state.notifyEmailSendSlice);
  const { toggleModal } = useAppSelector((state) => state.toggleModalSlice);
  const { toggleModalAdmin } = useAppSelector(
    (state) => state.toggleModalAdminSlice,
  );
  useEffect(() => {
    if (localStorage.getItem('language') === 'dutch') {
      dispatch(setDutch());
    } else {
      dispatch(setEnglish());
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          {active && <NotifyEmail />}
          {toggleModal && <ModalForm />}
          <OpenModal />
          {toggleModalAdmin ? <FormAddNewHotel /> : null}
          <Header />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/offers/:id" element={<HotelUnique />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsUnique />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<GalleryUnique />} />
            <Route path="/admin/login" element={<Admin />} />
            <Route path="/admin/login/panel" element={<AdminPanel />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
