import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import NotifyEmail from './Components/NotifyEmail/NotifyEmail';
import { useAppSelector } from './redux/store';
const Home = lazy(() => import('./pages/home/Home'));
const OurTeam = lazy(() => import('./pages/OurTeam/OurTeam'));

const App = () => {
  const { active } = useAppSelector((state) => state.notifyEmailSendSlice);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          {active && <NotifyEmail />}
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
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
