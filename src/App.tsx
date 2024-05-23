import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
const Home = lazy(() => import('./pages/home/Home'));
import { ToastContainer } from 'react-toastify';
import NotifyEmail from './Components/NotifyEmail/NotifyEmail';
import { useAppSelector } from './redux/store';
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
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-team" element={<Home />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
