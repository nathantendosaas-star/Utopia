import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

const ADMIN_EMAILS = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];

export function ProtectedRoute() {
  const [authState, setAuthState] = useState<{
    isLoading: boolean;
    isAuthenticated: boolean;
  }>({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAuthorized = user && ADMIN_EMAILS.includes(user.email || '');
      setAuthState({
        isLoading: false,
        isAuthenticated: !!isAuthorized,
      });
    });

    return () => unsubscribe();
  }, []);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-technical text-[10px] animate-pulse text-white uppercase tracking-widest">
          VERIFYING_CREDENTIALS...
        </p>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
