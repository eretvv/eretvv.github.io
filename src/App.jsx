import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import "./App.css"

const Home = lazy(() => import('./components/Home/Home'));
const ProductList = lazy(() => import('./components/ProductList/ProductList'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Suspense fallback={<Loading/>}><Home /></Suspense>} />
        <Route path="/products" element={<Suspense fallback={<Loading/>}><ProductList /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
