import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { clinicName } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path;

  // Reusable Link Component with slide-animation
  const AnimatedNavLink = ({ to, children }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to}
        className={`relative font-label-md transition-colors duration-300 text-on-surface-variant hover:text-primary py-2
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300
          ${active ? 'text-primary after:w-full' : 'after:w-0 hover:after:w-full'}
        `}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-surface/80 backdrop-blur-lg shadow-md py-1' : 'bg-surface/50 backdrop-blur-sm py-3'}`}>
      <div className="px-gutter max-w-container-max mx-auto h-16 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
        
        {/* Left: Desktop Nav Links */}
        <div className="hidden md:flex justify-start items-center gap-6 lg:gap-8">
          <AnimatedNavLink to="/">Home</AnimatedNavLink>
          <AnimatedNavLink to="/about">About</AnimatedNavLink>
          <AnimatedNavLink to="/services">Services</AnimatedNavLink>
        </div>

        {/* Center: Brand */}
        <div className="flex justify-start md:justify-center">
          <Link to="/" className="group flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary group-hover:rotate-12 transition-transform duration-300">hearing</span>
            <div className="text-title-lg font-title-lg font-bold text-primary tracking-tight">{clinicName}</div>
          </Link>
        </div>
        
        {/* Right: Buttons / More Links */}
        <div className="hidden md:flex justify-end items-center gap-4 lg:gap-6">
          <AnimatedNavLink to="/hearing-aids">Hearing Aids</AnimatedNavLink>
          <AnimatedNavLink to="/blog">Blog</AnimatedNavLink>
          <div className="h-6 w-px bg-outline-variant/30"></div>
          <Link to="/book" className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md hover:bg-primary-container hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
            Book
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center justify-end">
          <button 
            onClick={toggleMobileMenu} 
            className="text-primary hover:text-primary-container transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className={`material-symbols-outlined text-[32px] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90 scale-110' : 'rotate-0'}`}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-t border-outline-variant/20 py-md px-gutter flex flex-col gap-md transition-all duration-300 origin-top overflow-hidden
          ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 py-0 border-transparent'}
        `}
      >
        <Link 
          onClick={closeMobileMenu}
          className={`font-label-md text-lg transition-colors duration-200 ${isActive('/') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} 
          to="/"
        >
          Home
        </Link>
        <Link 
          onClick={closeMobileMenu}
          className={`font-label-md text-lg transition-colors duration-200 ${isActive('/about') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} 
          to="/about"
        >
          About
        </Link>
        <Link 
          onClick={closeMobileMenu}
          className={`font-label-md text-lg transition-colors duration-200 ${isActive('/services') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} 
          to="/services"
        >
          Services
        </Link>
        <Link 
          onClick={closeMobileMenu}
          className={`font-label-md text-lg transition-colors duration-200 ${isActive('/hearing-aids') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} 
          to="/hearing-aids"
        >
          Hearing Aids
        </Link>
        <Link 
          onClick={closeMobileMenu}
          className={`font-label-md text-lg transition-colors duration-200 ${isActive('/blog') ? 'text-primary font-bold' : 'text-on-surface-variant'}`} 
          to="/blog"
        >
          Blog
        </Link>
        
        <div className="h-px w-full bg-outline-variant/30 my-sm"></div>
        <Link to="/book" onClick={closeMobileMenu} className="block w-full text-center bg-primary text-on-primary py-sm rounded-xl font-label-md text-lg shadow-md hover:bg-primary-container active:scale-95 transition-all">
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
