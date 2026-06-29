import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useSettings } from '../context/SettingsContext';

function Footer() {
    const { settings } = useSettings();
    const clinicName = "Life Hearing Care";
    const [newsletterEmail, setNewsletterEmail] = useState('');

    const FooterLink = ({ to, children }) => (
        <li>
            <Link to={to} className="group flex items-center text-on-surface-variant hover:text-primary transition-colors py-1.5 md:py-1">
                <span className="material-symbols-outlined text-[16px] opacity-0 md:-ml-4 w-0 md:group-hover:w-5 group-hover:opacity-100 md:group-hover:ml-0 transition-all duration-300 ease-out overflow-hidden flex-shrink-0 hidden md:block">
                    chevron_right
                </span>
                <span className="md:group-hover:translate-x-1 transition-transform duration-300 ease-out">
                    {children}
                </span>
            </Link>
        </li>
    );

    // Format phone for WhatsApp (remove all non-numeric characters)
    const whatsappNumber = settings?.contactPhone?.replace(/\D/g, '') || '919876543210';

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;

        const { error } = await supabase.from('newsletter_subscribers').insert([{
            email: newsletterEmail
        }]);

        if (!error) {
            setNewsletterEmail('');
            alert("Thank you for subscribing to our newsletter!");
        } else {
            alert("Error subscribing: " + error.message);
        }
    };

    return (
        <>
            <footer className="bg-surface-container-highest dark:bg-surface-dim pt-xl pb-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-lg px-gutter max-w-container-max mx-auto">
                    <div className="space-y-md">
                        <div className="text-headline-md font-headline-md text-primary">{clinicName}</div>
                        <p className="text-body-lg text-on-surface-variant">© 2026 {clinicName}. Precision care for your ears.
                            Dedicated to restoring the symphony of life for all our patients.</p>
                        <div className="flex gap-md">
                            <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-1"><span className="material-symbols-outlined">public</span></button>
                            <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-1"><span className="material-symbols-outlined">forum</span></button>
                            <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:-translate-y-1"><span className="material-symbols-outlined">video_library</span></button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-md">Quick Links</h4>
                        <ul className="space-y-2 flex flex-col items-start">
                            <FooterLink to="/">Home</FooterLink>
                            <FooterLink to="/about">About Us</FooterLink>
                            <FooterLink to="/services">Services</FooterLink>
                            <FooterLink to="/hearing-aids">Hearing Aids</FooterLink>
                            <FooterLink to="/blog">Blog</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-md">Services</h4>
                        <ul className="space-y-2 flex flex-col items-start">
                            <FooterLink to="/services">Hearing Loss Treatment</FooterLink>
                            <FooterLink to="/services">Tinnitus Management</FooterLink>
                            <FooterLink to="/services">Speech Therapy</FooterLink>
                            <FooterLink to="/services">BERA / ABR Test</FooterLink>
                            <FooterLink to="/services">Hearing Aid Trial</FooterLink>
                            <FooterLink to="/services">Hearing Aid Fitting</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-md">Newsletter</h4>
                        <p className="text-sm text-on-surface-variant mb-md">Join our mailing list for latest updates on hearing tech.</p>
                        <form onSubmit={handleNewsletterSubmit} className="flex gap-xs">
                            <input value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} required className="flex-1 bg-white border-outline-variant rounded-lg text-sm px-4 py-2 focus:ring-primary focus:border-primary" placeholder="Email address" type="email" />
                            <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:bg-primary-container hover:text-primary transition-colors"><span className="material-symbols-outlined">send</span></button>
                        </form>
                    </div>
                </div>
                <div className="max-w-container-max mx-auto px-gutter mt-xl pt-md border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center text-xs text-on-surface-variant gap-6 text-center md:text-left">
                    <span>Built with care for clinical excellence. All rights reserved {clinicName}.</span>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <span className="font-medium text-on-surface">Designed by Samtrics</span>
                        <Link to="/admin-login" className="text-primary hover:underline flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">admin_panel_settings</span> Admin Login</Link>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <a
                className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-[60]"
                href={`https://wa.me/${9219559322}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg fill="currentColor" height="32" viewBox="0 0 16 16" width="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.594l.001-.005zm-5.607 11.048c-1.185 0-2.34-.319-3.348-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                </svg>
            </a>
        </>
    );
}

export default Footer;
