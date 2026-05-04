import React, { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StoreProvider } from './context/StoreContext';
import { analytics } from './lib/firebase';
import { logEvent } from 'firebase/analytics';

// Fully lazy load all pages to minimize initial bundle size
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Collection = lazy(() => import('./pages/Collection').then(m => ({ default: m.Collection })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const TheSignature = lazy(() => import('./pages/TheSignature').then(m => ({ default: m.TheSignature })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Archives = lazy(() => import('./pages/Archives').then(m => ({ default: m.Archives })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Shipping = lazy(() => import('./pages/Shipping').then(m => ({ default: m.Shipping })));
const Returns = lazy(() => import('./pages/Returns').then(m => ({ default: m.Returns })));
const SizeGuide = lazy(() => import('./pages/SizeGuide').then(m => ({ default: m.SizeGuide })));
const Philosophy = lazy(() => import('./pages/Philosophy').then(m => ({ default: m.Philosophy })));
const Retail = lazy(() => import('./pages/Retail').then(m => ({ default: m.Retail })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazy(() => import('./pages/TermsConditions').then(m => ({ default: m.TermsConditions })));
const Prestige = lazy(() => import('./pages/Prestige').then(m => ({ default: m.Prestige })));
const Support = lazy(() => import('./pages/Support').then(m => ({ default: m.Support })));
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
    if (analytics) {
      logEvent(analytics, 'page_view');
    }
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
