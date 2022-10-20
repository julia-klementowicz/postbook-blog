import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className='bg-[rgb(24,25,26)] min-h-screen text-white' style={{ fontFamily: "'Lato', sans-serif" }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
