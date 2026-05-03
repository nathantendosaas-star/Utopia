import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MotionProvider } from './components/MotionProvider.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MotionProvider>
        <App />
      </MotionProvider>
    </ErrorBoundary>
  </StrictMode>,
);
