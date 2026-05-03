import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StoreProvider } from './context/StoreContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { analytics } from './lib/firebase';
import { logEvent } from 'firebase/analytics';

// Lazy load all pages
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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-technical text-[10px] animate-pulse uppercase tracking-[0.4em] text-white">
        SYNCING_RESOURCES...
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
              
              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="adminforutopiaug" element={<Admin />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StoreProvider>
  );
}
