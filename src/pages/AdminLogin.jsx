import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { supabase } from '../supabaseClient';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const allowedEmail = import.meta.env.VITE_STAFF_EMAIL;
      if (email.toLowerCase() !== allowedEmail.toLowerCase()) {
        setError('Access Denied: You are not authorized to access this portal.');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // SECURITY: Supabase session is the real auth token. No localStorage needed.
        navigate('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-surface-container-lowest font-body-lg overflow-hidden">
      <Navbar />

      <main className="flex-grow flex pt-20 relative z-10">

        {/* Left Branding Panel (Hidden on Mobile) */}
        <div className="hidden lg:flex flex-1 relative bg-primary flex-col justify-center items-center overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary via-primary to-primary-container opacity-90 z-0"></div>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-30 z-0"></div>

          <div className="relative z-10 p-20 text-on-primary max-w-2xl">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl">
              <span className="material-symbols-outlined text-[48px] text-white">admin_panel_settings</span>
            </div>
            <h1 className="text-display-lg font-display-lg font-bold mb-6 leading-tight">
              Clinical Control <br />Center
            </h1>
            <p className="text-headline-sm text-white/80 font-normal leading-relaxed mb-12">
              Manage patient records, schedule appointments, and review feedback through our secure, HIPAA-compliant portal.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-white/70">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              End-to-End Encrypted
            </div>
          </div>
        </div>

        {/* Right Login Panel */}
        <div className="flex-1 flex items-center justify-center p-gutter relative bg-surface-container-lowest lg:rounded-l-[3rem] lg:-ml-8 z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">

          {/* Mobile Decorative Blobs */}
          <div className="lg:hidden absolute top-20 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
          <div className="lg:hidden absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 z-0 pointer-events-none"></div>

          <div className="max-w-md w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

            <div className="lg:hidden text-center mb-xl">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-lg border border-primary/20">
                <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
              </div>
              <h1 className="text-display-sm font-display-sm font-bold text-primary tracking-tight">Admin Secure</h1>
              <p className="text-body-lg text-on-surface-variant mt-2">Authenticate to access the dashboard</p>
            </div>

            <div className="hidden lg:block mb-xl">
              <h2 className="text-headline-lg font-headline-lg font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-body-lg text-on-surface-variant">Please sign in to your administrator account.</p>
            </div>

            {error && (
              <div className="bg-error/10 text-error p-md rounded-xl flex items-start gap-sm mb-lg animate-in slide-in-from-top-2 border border-error/20">
                <span className="material-symbols-outlined mt-1 text-[20px]">error</span>
                <p className="text-body-md font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-lg">
              <div className="group">
                <label className="block text-sm font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Administrator Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface border-2 border-outline-variant/30 rounded-xl pl-12 pr-4 py-4 text-on-surface font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all hover:border-outline-variant/60"
                    placeholder="Enter Admin Email"
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-on-surface-variant uppercase tracking-wider">Secure Password</label>
                  <a href="#" className="text-sm font-bold text-primary hover:text-primary-container transition-colors">Recover Access</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface border-2 border-outline-variant/30 rounded-xl pl-12 pr-4 py-4 text-on-surface font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all hover:border-outline-variant/60"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-sm">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-label-lg hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Access Dashboard <span className="material-symbols-outlined text-[20px]">login</span>
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-xl pt-lg border-t border-outline-variant/20 text-center lg:text-left">
              <p className="text-xs font-medium text-on-surface-variant flex items-center justify-center lg:justify-start gap-1">
                <span className="material-symbols-outlined text-[14px]">gpp_good</span>
                Protected by Advanced Security Protocols
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLogin;
