import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { ProductDetail } from './pages/ProductDetail';
import { TheSignature } from './pages/TheSignature';
import { About } from './pages/About';
import { Archives } from './pages/Archives';
import { Contact } from './pages/Contact';
import { Shipping } from './pages/Shipping';
import { Returns } from './pages/Returns';
import { SizeGuide } from './pages/SizeGuide';
import { Philosophy } from './pages/Philosophy';
import { Retail } from './pages/Retail';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { StoreProvider } from './context/StoreContext';

import { Prestige } from './pages/Prestige';
import { Support } from './pages/Support';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Collection />} />
            <Route path="collection" element={<Collection />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="signature" element={<TheSignature />} />
            <Route path="about" element={<About />} />
            <Route path="archives" element={<Archives />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="returns" element={<Returns />} />
            <Route path="size-guide" element={<SizeGuide />} />
            <Route path="philosophy" element={<Philosophy />} />
            <Route path="retail" element={<Retail />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="prestige" element={<Prestige />} />
            <Route path="support" element={<Support />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
