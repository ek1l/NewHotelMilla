import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
const Home = lazy(() => import('./pages/home/Home'));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
