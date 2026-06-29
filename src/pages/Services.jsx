import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { supabase } from '../supabaseClient';
import ricImg from '../assets/ric_hearing_aid.png';
import beraImg from '../assets/bera_test.png';
import lossImg from '../assets/hearing_loss.png';
import starkeyImg from '../assets/starkey_aids.png';

function Services() {
  const { clinicName, supportEmail } = useSettings();

  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from('services').select('*').order('order_index', { ascending: true });
        if (error && error.code !== '42P01') throw error;
        if (data) setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);


  useEffect(() => {
    // Use rootMargin to trigger slightly before visible — avoids jank
    const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0');
                entry.target.style.willChange = 'auto'; // release GPU after animation
                observer.unobserve(entry.target); // stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-opacity', 'duration-700', 'opacity-0');
        section.style.willChange = 'opacity';
        observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <main className="pt-32">
        {/*  Hero Section  */}
        <section className="relative px-gutter max-w-container-max mx-auto mb-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
                <div className="space-y-md">
                    <span
                        className="inline-block py-xs px-md bg-secondary-container text-on-secondary-container rounded-full text-label-md font-label-md uppercase tracking-wider">Our
                        Services</span>
                    <h1 className="text-display-lg font-display-lg text-primary">Precision Care for Every Frequency of Life.
                    </h1>
                    <p className="text-body-xl font-body-xl text-on-surface-variant max-w-xl">We offer a comprehensive suite
                        of clinical audiology services designed to restore your connection with the world. From advanced
                        diagnostics to personalized therapy.</p>
                </div>
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl hidden lg:block">
                    <img className="w-full h-full object-cover"
                        fetchpriority="high"
                        decoding="async"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCubAoZNqHvSIGT5FUB1g1VmglxGLIlJGGSadch5SIV0RgYoigKLO4m220r3uUUJ1HiFqLPBzoc-Ys9CLj2vZDn_0FmSwgVySHs2ANJoHBE42J8ukfREX4LR87JXw33xv6XjKbXr5VTzKBLjHM1lwLyKLpRArujNWeQyLKRqHmkjx02rNk-B7BFlBZd8ywRtlQsr6-VybIstWcUXMhlNiesE8SL_ZBY-pgPYNRWx465-U6A6c310Lw4ciTHwvypCqZfHhOTAMz0jmvH" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                </div>
            </div>
        </section>
        {/*  Service Catalog  */}
        <section className="px-gutter max-w-container-max mx-auto py-xl">
            <div className="space-y-xl">
                
                {loading ? (
                    <div className="py-xl text-center">
                        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-on-surface-variant font-medium">Loading clinical services...</p>
                    </div>
                ) : services.length === 0 ? (
                    <div className="py-xl text-center bg-surface-container-low rounded-3xl border border-outline-variant/30">
                        <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30 mb-2">medical_services</span>
                        <h3 className="text-title-lg font-bold text-on-surface">No Services Available</h3>
                        <p className="text-on-surface-variant">Services will appear here once added in the Admin Portal.</p>
                    </div>
                ) : (
                    services.map((service, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div key={service.id} id={service.hash_id || `service-${service.id}`} className={`glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-lg p-lg`}>
                                <div className="lg:w-2/5 rounded-2xl overflow-hidden bg-surface-container">
                                    <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async" alt={service.title} src={service.image} />
                                </div>
                                <div className="lg:w-3/5 space-y-md text-left">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-headline-md font-headline-md text-primary">{service.title}</h2>
                                        </div>
                                        <span className="material-symbols-outlined text-4xl text-secondary">{service.icon}</span>
                                    </div>
                                    <p className="text-body-lg font-body-lg text-on-surface-variant">{service.description}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                                        {/* Key Benefits */}
                                        {service.key_benefits && service.key_benefits.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                                <ul className="space-y-sm text-body-lg">
                                                    {service.key_benefits.map((benefit, bIdx) => (
                                                        <li key={bIdx} className="flex items-start gap-xs">
                                                            <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                                            <span dangerouslySetInnerHTML={{ __html: benefit.replace(/^([^:]+:)/, '<strong>$1</strong>') }}></span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        
                                        {/* The Process */}
                                        {service.process && service.process.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                                <div className="space-y-base">
                                                    {service.process.map((step, sIdx) => {
                                                        const isLast = sIdx === service.process.length - 1;
                                                        return (
                                                            <div key={sIdx} className={`flex gap-sm items-start relative ${!isLast ? 'step-line pb-base' : ''}`}>
                                                                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">{sIdx + 1}</div>
                                                                <div>
                                                                    <p className="text-label-lg font-bold pt-2">{step.title}</p>
                                                                    <p className="text-sm text-on-surface-variant mt-1">{step.description}</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
        
        {/*  FAQ Section  */}
        <section className="bg-surface-container-low py-xl px-gutter">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-lg">
                    <h2 className="text-headline-md font-headline-md text-primary">Service FAQ</h2>
                    <p className="text-body-lg text-on-surface-variant">Everything you need to know about your clinical
                        visit.</p>
                </div>
                <div className="space-y-md">
                    <div
                        className="bg-surface rounded-xl p-md border border-outline-variant/30 hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-primary">How long does a full hearing test take?</h4>
                            <span
                                className="material-symbols-outlined group-hover:rotate-180 transition-transform">expand_more</span>
                        </div>
                        <div className="mt-sm text-body-lg text-on-surface-variant">A comprehensive diagnostic test
                            typically takes 45 to 60 minutes. This includes the testing phase and a thorough explanation
                            of your results.</div>
                    </div>
                    <div
                        className="bg-surface rounded-xl p-md border border-outline-variant/30 hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-primary">Will my insurance cover the services?</h4>
                            <span
                                className="material-symbols-outlined group-hover:rotate-180 transition-transform">expand_more</span>
                        </div>
                        <div className="mt-sm text-body-lg text-on-surface-variant">We work with most major medical
                            insurance providers. We recommend checking with your carrier specifically for 'Audiology
                            Services' coverage before your appointment.</div>
                    </div>
                    <div
                        className="bg-surface rounded-xl p-md border border-outline-variant/30 hover:border-primary transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-primary">Do I need a doctor's referral?</h4>
                            <span
                                className="material-symbols-outlined group-hover:rotate-180 transition-transform">expand_more</span>
                        </div>
                        <div className="mt-sm text-body-lg text-on-surface-variant">Generally, no referral is needed for a
                            standard hearing test, though some insurance plans may require one for specialized
                            diagnostic services.</div>
                    </div>
                </div>
            </div>
        </section>
        {/*  Final CTA Section  */}
        <section className="py-xl px-gutter">
            <div
                className="max-w-container-max mx-auto rounded-[3rem] bg-primary relative overflow-hidden p-lg md:p-xl flex flex-col items-center text-center">

                <div className="relative z-10 space-y-md">
                    <h2 className="text-display-lg-mobile md:text-display-lg text-on-primary font-display-lg">Ready to
                        experience clarity?</h2>
                    <p className="text-on-primary/80 text-body-xl max-w-2xl mx-auto">Book your comprehensive assessment
                        today and take the first step toward better hearing health.</p>
                    <div className="flex flex-col sm:flex-row gap-md justify-center pt-md">
                        <Link
                            to="/book"
                            className="bg-surface-container-lowest text-primary px-xl py-md rounded-xl font-bold text-lg hover:bg-white transition-all shadow-lg active:scale-95 text-center">Book
                            Appointment</Link>
                        <Link
                            to="/book"
                            className="border border-white/30 text-white px-xl py-md rounded-xl font-bold text-lg hover:bg-white/10 transition-all active:scale-95 text-center">Contact
                            Clinic</Link>
                    </div>
                </div>
            </div>
        </section>
    </main>
    </>
  );
}

export default Services;

