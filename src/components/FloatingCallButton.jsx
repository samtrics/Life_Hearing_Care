import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

const FloatingCallButton = () => {
    const { contactPhone } = useSettings();
    const [isVisible, setIsVisible] = useState(false);

    // Show button after a short delay or slightly scrolling to not aggressively bombard them immediately
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Also just show it after 3 seconds anyway if they don't scroll
        const timer = setTimeout(() => setIsVisible(true), 3000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Format phone number for tel: link (remove spaces and special chars)
    const telLink = 'tel:+919219559322';
    const displayPhone = '+91 92195 59322';

    return (
        <div
            className={`fixed bottom-[112px] right-8 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
        >
            <div className="relative group">
                {/* Ping Animation Effect */}
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>

                {/* Main Button */}
                <a
                    href={telLink}
                    className="relative flex items-center justify-center w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
                    aria-label="Call Clinic"
                    title={`Call us at ${displayPhone}`}
                >
                    <span className="material-symbols-outlined text-[32px]">call</span>
                </a>

                {/* Tooltip on hover */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-inverse-surface text-inverse-on-surface text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
                    Call {displayPhone}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-inverse-surface rotate-45"></div>
                </div>
            </div>
        </div>
    );
};

export default FloatingCallButton;
