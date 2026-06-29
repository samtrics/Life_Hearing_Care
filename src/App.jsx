import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { supabase } from './supabaseClient';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { reportWebVitals } from './utils/vitals';

// Lazy load all route components
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const HearingAids = lazy(() => import('./pages/HearingAids'));
const Blog = lazy(() => import('./pages/Blog'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Reviews = lazy(() => import('./pages/Reviews'));

// Global Loading Fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="flex flex-col items-center gap-md">
      <span className="material-symbols-outlined text-[48px] text-primary animate-spin">progress_activity</span>
      <p className="text-on-surface-variant font-label-md">Loading Life Hearing Care...</p>
    </div>
  </div>
);

// SECURITY: Strict Route Guard for Admin Panel
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const allowedEmail = import.meta.env.VITE_STAFF_EMAIL;
      
      if (!data.session || (allowedEmail && data.session.user.email?.toLowerCase() !== allowedEmail.toLowerCase())) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <LoadingFallback />;
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

// SAMTRICS TRACKING HOOK
const SamtricsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Send telemetry to the Admin Portal bridge
    // Send telemetry to the Admin Portal bridge via Vite/Vercel proxy
    fetch(`/api/samtrics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    }).catch(() => {}); // Fail silently if the monitor is offline
  }, [location]);

  return null;
};

const InnerApp = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <SamtricsTracker />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/hearing-aids" element={<HearingAids />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  useEffect(() => {
    reportWebVitals()
  }, [])

  return (
    <>
      <SettingsProvider>
        <Router>
          <InnerApp />
        </Router>
      </SettingsProvider>
      <Analytics />
    </>
  );
}

export default App;
