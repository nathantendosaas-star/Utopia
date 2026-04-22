import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { TheSignature } from './pages/TheSignature';
import { About } from './pages/About';
import { Archives } from './pages/Archives';
import { Contact } from './pages/Contact';
import { StoreProvider } from './context/StoreContext';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signature" element={<TheSignature />} />
            <Route path="shop" element={<ProductDetail />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="archives" element={<Archives />} />
            <Route path="contact" element={<Contact />} />
            <Route path="collection" element={<Navigate to="/shop" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
