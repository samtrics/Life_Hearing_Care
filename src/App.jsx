import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';
import { reportWebVitals } from './utils/vitals';

// Lazy load all route components
import Home from './pages/Home';
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
      const { supabase } = await import('./supabaseClient');
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

// SEO TITLE UPDATER
const DocumentMetaUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      '/': 'Life Hearing Care | Best Hearing Aid Center In Kota',
      '/about': 'About Us | Life Hearing Care Kota',
      '/services': 'Audiometry & Speech Therapy Services | Life Hearing Care',
      '/hearing-aids': 'Premium Hearing Aids in Kota | Life Hearing Care',
      '/book': 'Book Appointment | Life Hearing Care Kota',
      '/blog': 'Hearing Health Blog | Life Hearing Care',
      '/reviews': 'Patient Reviews | Life Hearing Care'
    };

    const title = routeTitles[location.pathname] || 'Life Hearing Care | Best Hearing Aid Center In Kota';
    document.title = title;
    
    // Update OpenGraph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    // Update Twitter title
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

  }, [location]);

  return null;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          // Offset for fixed navbar
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const InnerApp = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <SamtricsTracker />
      <DocumentMetaUpdater />
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
      {!isAdminRoute && (
        <>
          <FloatingCallButton />
          <Footer />
        </>
      )}
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
