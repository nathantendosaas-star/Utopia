import React, { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StoreProvider } from './context/StoreContext';
import { logAnalyticsEvent } from './lib/firebase';
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
import { Prestige } from './pages/Prestige';
import { Support } from './pages/Support';

const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center gap-6">
      <div className="relative w-48 h-[2px] bg-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-[marquee_1.5s_linear_infinite]" />
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-white/20 animate-pulse" />
        <div className="w-2 h-2 bg-white/20 animate-pulse [animation-delay:0.2s]" />
        <div className="w-2 h-2 bg-white/20 animate-pulse [animation-delay:0.4s]" />
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    logAnalyticsEvent('page_view');
  }, []);

  return (
    <StoreProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
              
              <Route path="adminforutopiaug" element={<Admin />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StoreProvider>
  );
}
