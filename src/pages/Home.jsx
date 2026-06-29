import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { supabase } from '../supabaseClient';

import RevealOnScroll from '../components/RevealOnScroll';

function Home() {
    const [heroVisible, setHeroVisible] = useState(false);
    const { clinicName } = useSettings();

    // Hero Slider Data & State
    const heroSlides = [
        {
            id: 1,
            title: "Hear Better. Live Better.",
            subtitle: "Advanced hearing care solutions for every age. Rediscover the joy of sound with our expert audiologists.",
            image: "/hero_slides/slide1.png",
            buttonText: "Book Appointment",
            buttonLink: "/book"
        },
        {
            id: 2,
            title: "Zero Cost EMI Available",
            subtitle: "Upgrade to premium hearing aids with easy, interest-free monthly installments.",
            image: "/hero_slides/slide2.png",
            buttonText: "Explore Hearing Aids",
            buttonLink: "/hearing-aids"
        },
        {
            id: 3,
            title: "Expert Care at Your Doorstep",
            subtitle: "Exclusive Home Visit services available across Kota, Rajasthan.",
            image: "/hero_slides/slide3.png",
            buttonText: "Book a Home Visit",
            buttonLink: "/book"
        },
        {
            id: 4,
            title: "Free Trial on Premium Devices",
            subtitle: "Experience crystal clear sound before you commit. Available on select advanced hearing aids.",
            image: "/hero_slides/slide4.png",
            buttonText: "Claim Free Trial",
            buttonLink: "/hearing-aids"
        },
        {
            id: 5,
            title: "Say Goodbye to Batteries",
            subtitle: "Discover our range of advanced rechargeable hearing aids that last all day on a single charge.",
            image: "/hero_slides/slide5.png",
            buttonText: "View Rechargeable Devices",
            buttonLink: "/hearing-aids"
        },
        {
            id: 6,
            title: "Tinnitus Relief & Management",
            subtitle: "Struggling with ringing in your ears? Our expert audiologists can help you find lasting relief.",
            image: "/hero_slides/slide6.png",
            buttonText: "Consult an Audiologist",
            buttonLink: "/services"
        }
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    // Feedback State
    const [feedbacks, setFeedbacks] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackForm, setFeedbackForm] = useState({ name: '', rating: 5, text: '' });

    // Newsletter State
    const [newsletterEmail, setNewsletterEmail] = useState('');

    // FAQ State
    const [activeFAQ, setActiveFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    // Technology Scroll State
    const techScrollRef = useRef(null);
    const scrollTech = (direction) => {
        if (techScrollRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            techScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const loadFeedbacks = async () => {
        const { data } = await supabase.from('patient_feedback').select('*').eq('status', 'approved').order('created_at', { ascending: false }).limit(6);
        if (data) setFeedbacks(data);
    };

    useEffect(() => {
        // Trigger hero animations on mount
        setTimeout(() => setHeroVisible(true), 100);
        loadFeedbacks();
    }, []);

    // Auto-play Slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        // SECURITY: Always insert as 'pending' — admin must approve before it goes live
        const { error } = await supabase.from('patient_feedback').insert([{
            author_name: feedbackForm.name,
            rating: parseInt(feedbackForm.rating),
            feedback_text: feedbackForm.text,
            status: 'pending'
        }]);
        if (!error) {
            setShowFeedbackModal(false);
            setFeedbackForm({ name: '', rating: 5, text: '' });
            alert("Thank you for your feedback! It will appear after review by our team.");
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;

        // SECURITY: Validate email format before DB insertion
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newsletterEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        const { error } = await supabase.from('newsletter_subscribers').insert([{
            email: newsletterEmail
        }]);

        if (!error) {
            setNewsletterEmail('');
            alert("Thank you for subscribing to our newsletter!");
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <main className="pt-20">

                {/*  1. Dynamic Hero Slider Section  */}
                <section className="relative w-full h-[80vh] min-h-[600px] lg:min-h-[750px] overflow-hidden bg-black">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            {/* Background Image with Dark Gradient Overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 md:to-transparent"></div>
                            </div>

                            {/* Slide Content */}
                            <div className="relative z-20 h-full max-w-container-max mx-auto px-gutter flex flex-col justify-center items-start">
                                <div className={`max-w-2xl transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                    <div className="inline-flex items-center gap-xs px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full text-label-md mb-6 border border-white/20 shadow-lg">
                                        <span className="material-symbols-outlined text-[18px]">verified</span>
                                        India's Leading Hearing Care Clinic
                                    </div>
                                    <h1 className="font-display-lg text-4xl md:text-6xl text-white mb-6 leading-tight font-bold drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                    <p className="text-body-xl text-gray-100 mb-8 max-w-lg drop-shadow-md">
                                        {slide.subtitle}
                                    </p>
                                    <Link
                                        to={slide.buttonLink}
                                        className="inline-flex h-[56px] items-center justify-center px-8 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary-container hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 text-lg"
                                    >
                                        {slide.buttonText}
                                        <span className="material-symbols-outlined ml-2">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Dots */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-3 rounded-full transition-all duration-300 shadow-md ${index === currentSlide ? 'bg-primary w-10' : 'bg-white/60 hover:bg-white w-3'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </section>

                {/* Minimalist Stats Banner */}
                <section className="bg-surface-container-lowest pt-16 pb-4 md:pb-8 border-b border-outline-variant/10">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">

                            <RevealOnScroll delay="delay-100" className="flex flex-col items-center justify-center pt-6 md:pt-0">
                                <h3 className="font-display-lg text-5xl font-light text-on-surface mb-3 tracking-tight">10,000<span className="text-primary font-bold">+</span></h3>
                                <p className="text-on-surface-variant font-medium uppercase tracking-widest text-xs flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span> Happy Patients
                                </p>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-200" className="flex flex-col items-center justify-center pt-8 md:pt-0">
                                <h3 className="font-display-lg text-5xl font-light text-on-surface mb-3 tracking-tight">8<span className="text-primary font-bold">+</span></h3>
                                <p className="text-on-surface-variant font-medium uppercase tracking-widest text-xs flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">workspace_premium</span> Years Experience
                                </p>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-300" className="flex flex-col items-center justify-center pt-8 md:pt-0">
                                <h3 className="font-display-lg text-5xl font-light text-on-surface mb-3 tracking-tight">100<span className="text-primary font-bold">%</span></h3>
                                <p className="text-on-surface-variant font-medium uppercase tracking-widest text-xs flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">verified</span> Certified Experts
                                </p>
                            </RevealOnScroll>

                        </div>
                    </div>
                </section>

                {/* 2. Hearing Aid Showcase (Moved Up) */}
                <section className="py-xl bg-surface-container-lowest">
                    <div className="max-w-container-max mx-auto px-gutter">
                        <RevealOnScroll className="flex flex-col md:flex-row justify-between md:items-end mb-8 md:mb-xl gap-6">
                            <div>
                                <h2 className="font-headline-md text-3xl md:text-headline-md text-primary mb-2">Explore Our Technology</h2>
                                <p className="text-on-surface-variant">Discrete, powerful, and connected devices from world-leading brands.</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => scrollTech('left')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 bg-white"><span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_back</span></button>
                                <button onClick={() => scrollTech('right')} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 bg-white"><span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_forward</span></button>
                            </div>
                        </RevealOnScroll>

                        <div ref={techScrollRef} className="flex gap-lg overflow-x-auto pb-lg hide-scrollbar snap-x scroll-smooth">
                            <RevealOnScroll delay="delay-100" className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                                <div className="h-64 bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="IIC" loading="lazy" decoding="async" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzriLabfO1yqsppbImFISeINGugdl5n5XWrl7W0AY4CL3lw13ojazF7V-JFPciL5ICZQVwiZjcafsFtzj1_A5d9eFIiraxW6Um7FbTZmC86kZfeHhbKiehLQthen3QUEjl6cmqDCNWPPWg36H04iDP4SQaTaSSYoR7eVD79bay9Tk6rWcLZkIJ0lmSnDBLOOtfuyXQHgQn8YbsACZQCjp342WnJKUc-UM2upkIin_YsStY2dSfIOJ5TQwa5AqCwG16nIAk3tEZnWxB=w600" />
                                </div>
                                <div className="p-lg">
                                    <h4 className="font-bold text-primary mb-xs group-hover:text-secondary transition-colors">Invisible (IIC)</h4>
                                    <p className="text-sm text-on-surface-variant mb-md">Deep-seated placement in the canal for total discretion.</p>
                                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</span>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-200" className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                                <div className="h-64 bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Rechargeable" loading="lazy" decoding="async" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtdXDtCWBI3XBmozDGJUhoQ8Ztbnswhoys2CqD81XicddvTu-TiHeIf8Q_QYAv1hDjWITzI9hkRIQABURbkaMM6Bb7xzqtNKfWRaKgUtpLSyQDgXI-thA09HYmPbnEGD4gjb_bqyVBPEQ8ZqPImGvzKwiv8Og98zqICacTCmjdvkQK40s6Lzd5l8BYaWhe00NQS9Zv8DHpcoVfoKQqcJQ39CRQiL1ii-5xWR5iNQiLkQjAz8kT7QHnc9nVJjtQfx_AYqhnmLqLZ8Hk=w600" />
                                </div>
                                <div className="p-lg">
                                    <h4 className="font-bold text-primary mb-xs group-hover:text-secondary transition-colors">Rechargeable</h4>
                                    <p className="text-sm text-on-surface-variant mb-md">24-hour battery life with convenient magnetic charging.</p>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Eco-Friendly</span>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-300" className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                                <div className="h-64 bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Bluetooth" loading="lazy" decoding="async" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpncrGZfGYGImxcGVEkiQ8R5Mu48ZK3BWa8Q6fvwWdYamaO1hfOpN2JW2KgaNyqErjsN9JYqAtIGoZ2u5Q-qctg2-qh7-60Z9w8khJgLFLEDnZ4NST5AiOuk-JZapwDHIPQmLmgpBARbybir2DvxUZOi5Kex1g05hQ_XPFQGngxdCAVCTOkBAR42Ehbqv9dcFjiVxM2g3bomVAsb6Ag8b-wVxybaFI3t17T1FmQVolQTI3TBmSe5NtK_hsCTIOMvGTiPQE0ze2gw2d=w600" />
                                </div>
                                <div className="p-lg">
                                    <h4 className="font-bold text-primary mb-xs group-hover:text-secondary transition-colors">Bluetooth Connected</h4>
                                    <p className="text-sm text-on-surface-variant mb-md">Stream calls, music, and TV directly to your ears.</p>
                                    <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Smart Tech</span>
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-400" className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                                <div className="h-64 bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Pediatric" loading="lazy" decoding="async" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBui1H2umKS2xnzMJay0DQGhtroh2gqol5AubcsVVWaJmkb4CRbfP9EBXOo_djzUUBYRdkfI2-JOmnzqQ4Pxb5HpZQ9BnOyaAh7vULUC-mVh1vxRDPecuDNw3zUb5iynE-PcpLchuKQBpl3z7tXvTpAAJZErfz9VPlctgwsMlJFsxVW2rQuf3bidz6XcxsN90TvyTFbTO4OkeemzYR2OgrjXV0jJcRVl8mPtZnz0kwGwn5DG_zhAK_zIOoTy_9f4xc7q-RpuXHHIJwJ=w600" />
                                </div>
                                <div className="p-lg">
                                    <h4 className="font-bold text-primary mb-xs group-hover:text-secondary transition-colors">Pediatric Solutions</h4>
                                    <p className="text-sm text-on-surface-variant mb-md">Durable, colorful designs for small ears and active lives.</p>
                                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Kids Care</span>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* 3. Services Section */}
                <section id="services" className="py-xl bg-surface">
                    <div className="max-w-container-max mx-auto px-gutter">
                        <RevealOnScroll className="text-center mb-xl">
                            <h2 className="font-headline-md text-headline-md text-primary mb-sm">Comprehensive Hearing Services</h2>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">From diagnostic assessments to therapeutic interventions, we offer a full spectrum of audiological care.</p>
                        </RevealOnScroll>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
                            <RevealOnScroll delay="delay-100" className="bg-white p-lg rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group border border-outline-variant/20">
                                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[28px]">hearing</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-sm group-hover:text-secondary transition-colors">Hearing Assessment</h4>
                                <p className="text-on-surface-variant mb-md">Complete diagnostic evaluation to identify the type and degree of hearing loss.</p>
                                <a className="text-primary font-bold inline-flex items-center gap-xs group-hover:gap-sm transition-all" href="#">Learn More <span className="material-symbols-outlined text-[20px]">arrow_forward</span></a>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-200" className="bg-white p-lg rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group border border-outline-variant/20">
                                <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center mb-md group-hover:bg-secondary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[28px]">equalizer</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-sm group-hover:text-secondary transition-colors">Audiometry</h4>
                                <p className="text-on-surface-variant mb-md">Precision pure-tone and speech audiometry testing in soundproof environments.</p>
                                <a className="text-primary font-bold inline-flex items-center gap-xs group-hover:gap-sm transition-all" href="#">Learn More <span className="material-symbols-outlined text-[20px]">arrow_forward</span></a>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-300" className="bg-white p-lg rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group border border-outline-variant/20">
                                <div className="w-14 h-14 bg-tertiary/5 rounded-2xl flex items-center justify-center mb-md group-hover:bg-tertiary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[28px]">ecg</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-sm group-hover:text-secondary transition-colors">OAE & BERA</h4>
                                <p className="text-on-surface-variant mb-md">Objective electrophysiological tests for infants and difficult-to-test populations.</p>
                                <a className="text-primary font-bold inline-flex items-center gap-xs group-hover:gap-sm transition-all" href="#">Learn More <span className="material-symbols-outlined text-[20px]">arrow_forward</span></a>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-100" className="bg-white p-lg rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group border border-outline-variant/20">
                                <div className="w-14 h-14 bg-primary-fixed-dim/5 rounded-2xl flex items-center justify-center mb-md group-hover:bg-primary-fixed-dim group-hover:text-on-primary-fixed transition-colors">
                                    <span className="material-symbols-outlined text-[28px]">record_voice_over</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-sm group-hover:text-secondary transition-colors">Speech Therapy</h4>
                                <p className="text-on-surface-variant mb-md">Individualized programs to improve communication skills and auditory rehabilitation.</p>
                                <a className="text-primary font-bold inline-flex items-center gap-xs group-hover:gap-sm transition-all" href="#">Learn More <span className="material-symbols-outlined text-[20px]">arrow_forward</span></a>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-200" className="bg-white p-lg rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group border border-outline-variant/20">
                                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-[28px]">tune</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-sm group-hover:text-secondary transition-colors">Aid Fitting</h4>
                                <p className="text-on-surface-variant mb-md">Professional fitting and programming of digital hearing aids for optimal performance.</p>
                                <a className="text-primary font-bold inline-flex items-center gap-xs group-hover:gap-sm transition-all" href="#">Learn More <span className="material-symbols-outlined text-[20px]">arrow_forward</span></a>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-300" className="bg-surface-container-high p-lg rounded-3xl flex flex-col justify-center items-center text-center border-2 border-dashed border-outline-variant hover:border-primary/50 transition-colors">
                                <h4 className="text-title-lg font-bold text-primary mb-sm">Need a Custom Solution?</h4>
                                <p className="text-on-surface-variant mb-md">Consult with our doctors for a personalized care plan.</p>
                                <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="bg-white text-primary px-6 py-2 rounded-full font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all">Contact Us</button>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* 4. Why Choose Us */}
                <section className="py-xl bg-surface-container-low overflow-hidden">
                    <div className="max-w-container-max mx-auto px-gutter">
                        <div className="grid lg:grid-cols-2 gap-xl items-center">
                            <RevealOnScroll className="relative">
                                <div className="rounded-3xl overflow-hidden shadow-2xl relative group">
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                                    <img className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" alt="Clinic Interior" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" />
                                </div>
                                <div className="absolute -bottom-10 -right-10 hidden lg:block bg-white p-lg rounded-3xl shadow-2xl border border-outline-variant/20 max-w-[300px] z-20 animate-float">
                                    <div className="space-y-md">
                                        <div className="flex items-center gap-md">
                                            <div className="text-headline-md font-bold text-primary">98%</div>
                                            <div className="text-sm text-on-surface-variant font-medium">Patient Satisfaction Rate</div>
                                        </div>
                                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                                            <div className="bg-secondary h-full" style={{ width: '98%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>

                            <div className="space-y-lg">
                                <RevealOnScroll delay="delay-100">
                                    <h2 className="font-headline-md text-headline-md text-primary">Why {clinicName} Stands Out</h2>
                                    <p className="text-body-lg text-on-surface-variant leading-relaxed mt-4">
                                        We don't just sell hearing aids; we provide a lifecycle of care. Our holistic approach
                                        ensures that every patient receives the attention and precision they deserve.
                                    </p>
                                    <div className="mt-6 inline-flex items-center gap-3 bg-white p-3 pr-5 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 bg-[#fff] rounded-full flex items-center justify-center border border-outline-variant/20 shadow-sm p-2 shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1 mb-0.5">
                                                <span className="font-bold text-primary text-lg leading-none">4.9</span>
                                                <div className="flex text-[#FBBC05] text-[14px]">
                                                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                                </div>
                                            </div>
                                            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Based on 2,500+ Reviews</div>
                                        </div>
                                    </div>
                                </RevealOnScroll>

                                <ul className="space-y-md">
                                    <RevealOnScroll delay="delay-200" className="flex gap-md group">
                                        <span className="material-symbols-outlined text-secondary group-hover:scale-125 group-hover:rotate-12 transition-transform">check_circle</span>
                                        <div>
                                            <h4 className="font-bold text-primary">Ethical Practices</h4>
                                            <p className="text-on-surface-variant text-sm">Transparent pricing and evidence-based clinical recommendations.</p>
                                        </div>
                                    </RevealOnScroll>
                                    <RevealOnScroll delay="delay-300" className="flex gap-md group">
                                        <span className="material-symbols-outlined text-secondary group-hover:scale-125 group-hover:rotate-12 transition-transform">check_circle</span>
                                        <div>
                                            <h4 className="font-bold text-primary">Lifelong Support</h4>
                                            <p className="text-on-surface-variant text-sm">Continuous adjustment, cleaning, and maintenance services for your devices.</p>
                                        </div>
                                    </RevealOnScroll>
                                    <RevealOnScroll delay="delay-400" className="flex gap-md group">
                                        <span className="material-symbols-outlined text-secondary group-hover:scale-125 group-hover:rotate-12 transition-transform">check_circle</span>
                                        <div>
                                            <h4 className="font-bold text-primary">Painless Diagnostics</h4>
                                            <p className="text-on-surface-variant text-sm">Advanced non-invasive testing methods for all ages, including newborns.</p>
                                        </div>
                                    </RevealOnScroll>
                                </ul>

                                <RevealOnScroll delay="delay-400" className="grid grid-cols-2 gap-lg pt-md">
                                    <div>
                                        <div className="text-display-lg-mobile font-display-lg text-primary">10k+</div>
                                        <div className="text-label-md text-on-surface-variant">Patients Treated</div>
                                    </div>
                                    <div>
                                        <div className="text-display-lg-mobile font-display-lg text-secondary">5k+</div>
                                        <div className="text-label-md text-on-surface-variant">Hearing Aids Fitted</div>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Government Schemes & Reimbursements */}
                <section className="py-xl bg-gradient-to-br from-primary/5 via-surface to-secondary/5 border-y border-outline-variant/20 overflow-hidden">
                    <div className="max-w-container-max mx-auto px-gutter relative">
                        <div className="text-center mb-12">
                            <span className="inline-block py-1 px-4 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                                100% Documentation Support
                            </span>
                            <h2 className="font-headline-md text-3xl md:text-headline-md text-primary mb-4">Government Reimbursement Available</h2>
                            <p className="text-body-lg text-on-surface-variant max-w-3xl mx-auto">
                                We are committed to making premium hearing care accessible. We provide full documentation and assistance for reimbursement claims under various government schemes.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                            {[
                                { title: 'Central Govt', subtitle: 'Employees', icon: 'account_balance', desc: 'Seamless hearing aid reimbursement processing for central government workers.' },
                                { title: 'State Govt', subtitle: 'Employees', icon: 'holiday_village', desc: 'Easy claim assistance on hearing care for Rajasthan state government employees.' },
                                { title: 'CGHS', subtitle: 'Beneficiaries', icon: 'health_and_safety', desc: 'Complete documentation support for CGHS beneficiaries seeking hearing aids.' },
                                { title: 'RGHS', subtitle: 'Beneficiaries', icon: 'medical_services', desc: 'Dedicated hearing care assistance for Rajasthan Government Health Scheme cardholders.' },
                                { title: 'RAPP', subtitle: 'Employees', icon: 'factory', desc: 'Specialized hearing care and claim support for Rajasthan Atomic Power Project staff.' }
                            ].map((scheme, i) => (
                                <RevealOnScroll key={i} delay={`delay-${(i % 5 + 1) * 100}`} className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 transition-all group flex flex-col items-center text-center cursor-default h-full">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary transition-all shadow-inner shrink-0">
                                        <span className="material-symbols-outlined text-primary group-hover:text-white text-[32px] transition-colors">{scheme.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-primary text-lg leading-tight">{scheme.title}</h3>
                                    <p className="text-[10px] text-primary/70 mt-1 font-bold uppercase tracking-widest mb-3">{scheme.subtitle}</p>
                                    <p className="text-sm text-on-surface-variant leading-relaxed">{scheme.desc}</p>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Trust Indicators (Moved Down) */}
                <section className="py-xl bg-surface-container-lowest relative z-10 border-b border-outline-variant/10">
                    <div className="max-w-container-max mx-auto px-gutter">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
                            <RevealOnScroll delay="delay-100" className="p-lg bg-white rounded-2xl shadow-sm border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg transition-all group">
                                <span className="material-symbols-outlined text-primary text-4xl mb-base group-hover:scale-125 group-hover:-translate-y-2 transition-transform block">clinical_notes</span>
                                <h3 className="font-bold text-primary mb-xs">Specialists</h3>
                                <p className="text-on-surface-variant text-sm">Expert clinical team dedicated to your health.</p>
                            </RevealOnScroll>
                            <RevealOnScroll delay="delay-200" className="p-lg bg-white rounded-2xl shadow-sm border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg transition-all group">
                                <span className="material-symbols-outlined text-secondary text-4xl mb-base group-hover:scale-125 group-hover:-translate-y-2 transition-transform block">precision_manufacturing</span>
                                <h3 className="font-bold text-primary mb-xs">Advanced Equipment</h3>
                                <p className="text-on-surface-variant text-sm">Latest diagnostic tools for accurate results.</p>
                            </RevealOnScroll>
                            <RevealOnScroll delay="delay-300" className="p-lg bg-white rounded-2xl shadow-sm border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg transition-all group">
                                <span className="material-symbols-outlined text-tertiary text-4xl mb-base group-hover:scale-125 group-hover:-translate-y-2 transition-transform block">settings_accessibility</span>
                                <h3 className="font-bold text-primary mb-xs">Personalized Plans</h3>
                                <p className="text-on-surface-variant text-sm">Tailored treatment for your unique needs.</p>
                            </RevealOnScroll>
                            <RevealOnScroll delay="delay-400" className="p-lg bg-white rounded-2xl shadow-sm border border-outline-variant/30 hover:border-primary/50 hover:shadow-lg transition-all group">
                                <span className="material-symbols-outlined text-primary-fixed-dim text-4xl mb-base group-hover:scale-125 group-hover:-translate-y-2 transition-transform block">verified_user</span>
                                <h3 className="font-bold text-primary mb-xs">Leading Brands</h3>
                                <p className="text-on-surface-variant text-sm">Top-tier global hearing aid partners.</p>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Government Schemes Section */}
                <section id="schemes" className="py-xl bg-surface relative overflow-hidden border-b border-outline-variant/10">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                    <div className="max-w-container-max mx-auto px-gutter relative z-10">
                        <RevealOnScroll className="text-center mb-xl">
                            <span className="inline-block py-xs px-md bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-label-md font-label-md uppercase tracking-wider mb-md">
                                Financial Assistance
                            </span>
                            <h2 className="font-headline-md text-headline-md text-primary mb-sm">Government & Health Schemes</h2>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">We are proud partners with leading government and insurance schemes to make premium hearing care accessible to everyone.</p>
                        </RevealOnScroll>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-md">
                            <RevealOnScroll delay="delay-100" className="glass-card p-lg rounded-3xl border border-outline-variant/30 hover:border-tertiary hover:shadow-lg hover:-translate-y-2 transition-all group bg-white">
                                <div className="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center mb-md group-hover:bg-tertiary group-hover:text-white transition-colors text-tertiary">
                                    <span className="material-symbols-outlined text-[28px]">health_and_safety</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-xs group-hover:text-tertiary transition-colors">CGHS</h4>
                                <div className="text-xs font-bold text-tertiary mb-sm uppercase tracking-wide">Central Govt. Health Scheme</div>
                                <p className="text-on-surface-variant text-sm mb-md">Empanelled to provide top-tier hearing diagnostics and aids for central government employees and pensioners.</p>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-200" className="glass-card p-lg rounded-3xl border border-outline-variant/30 hover:border-secondary hover:shadow-lg hover:-translate-y-2 transition-all group bg-white">
                                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-md group-hover:bg-secondary group-hover:text-white transition-colors text-secondary">
                                    <span className="material-symbols-outlined text-[28px]">military_tech</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-xs group-hover:text-secondary transition-colors">ECHS</h4>
                                <div className="text-xs font-bold text-secondary mb-sm uppercase tracking-wide">Ex-Servicemen Health Scheme</div>
                                <p className="text-on-surface-variant text-sm mb-md">Dedicated support and comprehensive hearing care coverage for our armed forces veterans and their dependents.</p>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-300" className="glass-card p-lg rounded-3xl border border-outline-variant/30 hover:border-primary hover:shadow-lg hover:-translate-y-2 transition-all group bg-white">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <span className="material-symbols-outlined text-[28px]">accessibility_new</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-xs group-hover:text-primary transition-colors">ADIP Scheme</h4>
                                <div className="text-xs font-bold text-primary mb-sm uppercase tracking-wide">Assistance to Disabled Persons</div>
                                <p className="text-on-surface-variant text-sm mb-md">Helping eligible citizens acquire scientifically manufactured, modern, standard hearing aids and appliances.</p>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-400" className="glass-card p-lg rounded-3xl border border-outline-variant/30 hover:border-primary-fixed-dim hover:shadow-lg hover:-translate-y-2 transition-all group bg-white">
                                <div className="w-14 h-14 bg-primary-fixed-dim/10 rounded-2xl flex items-center justify-center mb-md group-hover:bg-primary-fixed-dim group-hover:text-white transition-colors text-primary-fixed-dim">
                                    <span className="material-symbols-outlined text-[28px]">family_home</span>
                                </div>
                                <h4 className="text-title-lg font-bold text-primary mb-xs group-hover:text-primary-fixed-dim transition-colors">Ayushman Bharat</h4>
                                <div className="text-xs font-bold text-primary-fixed-dim mb-sm uppercase tracking-wide">PM-JAY Coverage</div>
                                <p className="text-on-surface-variant text-sm mb-md">Providing cashless diagnostic treatments and consultations under the world's largest health insurance scheme.</p>
                            </RevealOnScroll>
                        </div>

                        <RevealOnScroll delay="delay-200" className="mt-lg text-center">
                            <p className="text-sm text-on-surface-variant mb-md max-w-2xl mx-auto">Not sure if you qualify for these schemes? Our dedicated administration team will help you verify your eligibility and process your documentation.</p>
                            <Link to="/book" className="inline-flex items-center gap-xs px-6 py-3 bg-white border border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors active:scale-95 shadow-sm">
                                Verify Eligibility <span className="material-symbols-outlined text-[20px]">verified</span>
                            </Link>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* 6. FAQ Section */}
                <section className="py-xl bg-surface">
                    <div className="max-w-3xl mx-auto px-gutter">
                        <RevealOnScroll>
                            <h2 className="font-headline-md text-headline-md text-primary text-center mb-xl">Frequently Asked Questions</h2>
                        </RevealOnScroll>
                        <div className="space-y-md">
                            <RevealOnScroll delay="delay-100" className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button onClick={() => toggleFAQ(0)} className="w-full px-lg py-md flex justify-between items-center text-left hover:bg-surface-container transition-colors group">
                                    <span className="font-bold text-primary">How do I know if I need a hearing aid?</span>
                                    <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${activeFAQ === 0 ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                <div className={`px-lg pb-md text-on-surface-variant text-sm overflow-hidden transition-all duration-300 ${activeFAQ === 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
                                    Common signs include asking people to repeat themselves, turning up the TV volume higher
                                    than others prefer, and difficulty following conversations in noisy environments.
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-200" className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button onClick={() => toggleFAQ(1)} className="w-full px-lg py-md flex justify-between items-center text-left hover:bg-surface-container transition-colors group">
                                    <span className="font-bold text-primary">Are invisible hearing aids suitable for everyone?</span>
                                    <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${activeFAQ === 1 ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                <div className={`px-lg pb-md text-on-surface-variant text-sm overflow-hidden transition-all duration-300 ${activeFAQ === 1 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
                                    IIC aids depend on the shape and size of your ear canal and the severity of your hearing
                                    loss. Our audiologists will determine the best fit for you.
                                </div>
                            </RevealOnScroll>

                            <RevealOnScroll delay="delay-300" className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button onClick={() => toggleFAQ(2)} className="w-full px-lg py-md flex justify-between items-center text-left hover:bg-surface-container transition-colors group">
                                    <span className="font-bold text-primary">Do you offer home visit services?</span>
                                    <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${activeFAQ === 2 ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                <div className={`px-lg pb-md text-on-surface-variant text-sm overflow-hidden transition-all duration-300 ${activeFAQ === 2 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
                                    Yes, we provide home-based hearing tests and aid fitting for senior citizens and individuals
                                    with mobility issues in selected cities.
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Patient Feedback Section */}
                <section className="py-xl bg-surface relative overflow-hidden border-b border-outline-variant/10">
                    <div className="max-w-container-max mx-auto px-gutter relative z-10">
                        <RevealOnScroll className="flex flex-col md:flex-row justify-between items-center mb-xl gap-md">
                            <div>
                                <h2 className="font-headline-md text-headline-md text-primary mb-sm">Patient Stories & Feedback</h2>
                                {feedbacks.length > 0 && (
                                    <div className="flex items-center gap-xs mb-sm">
                                        <span className="text-secondary font-bold text-lg">
                                            {(feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1)}
                                        </span>
                                        <div className="flex text-secondary text-sm">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        </div>
                                        <span className="text-on-surface-variant text-sm">({feedbacks.length} reviews)</span>
                                    </div>
                                )}
                                <p className="text-on-surface-variant max-w-2xl">Hear from the people whose lives have been transformed through better hearing.</p>
                            </div>
                            <button onClick={() => setShowFeedbackModal(true)} className="px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary-container transition-colors shadow-sm">
                                Leave Feedback
                            </button>
                        </RevealOnScroll>

                        {feedbacks.length === 0 ? (
                            <div className="text-center py-lg text-on-surface-variant">No feedback available yet. Be the first!</div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
                                    {feedbacks.map(fb => (
                                        <RevealOnScroll key={fb.id} className="bg-white p-lg rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col relative group hover:shadow-lg hover:-translate-y-1 transition-all">
                                            <div className="flex text-secondary mb-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`material-symbols-outlined ${i < fb.rating ? 'font-bold' : 'opacity-30'}`} style={i < fb.rating ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                                                ))}
                                            </div>
                                            <p className="text-on-surface mb-md italic flex-grow">"{fb.feedback_text}"</p>
                                            <div className="font-bold text-sm text-primary mt-auto">- {fb.author_name}</div>
                                        </RevealOnScroll>
                                    ))}
                                </div>
                                <div className="mt-xl flex justify-center">
                                    <Link to="/reviews" className="px-8 py-3 bg-surface text-primary border-2 border-primary font-bold rounded-xl hover:bg-primary/5 transition-colors flex items-center gap-2">
                                        See All Feedback <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                <section id="contact" className="py-xl bg-surface-container-low border-t border-outline-variant/10 relative overflow-hidden">
                    {/* Decorative background blob */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                    <div className="max-w-container-max mx-auto px-gutter relative z-10">
                        <RevealOnScroll className="text-center mb-xl">
                            <h2 className="font-headline-md text-headline-lg text-primary mb-sm">Visit Our Clinic</h2>
                            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">Find a world-class hearing center near you. We're here to help.</p>
                        </RevealOnScroll>

                        {/* Cards row — always stack on mobile, side by side on md+ */}
                        <div className="flex flex-col md:flex-row gap-lg mb-lg">
                            {/* Clinic Location Card */}
                            <RevealOnScroll delay="delay-100" className="flex-1">
                                <div className="p-xl bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1 relative overflow-hidden h-full">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                                    <div className="flex items-start gap-md mb-md">
                                        <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:rotate-12 transition-transform">
                                            <span className="material-symbols-outlined text-[24px]">location_on</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline-sm text-primary mb-1">Kota Clinic</h4>
                                            <p className="text-on-surface-variant font-medium">Life Hearing Care, Kota, Rajasthan</p>
                                            <p className="text-sm text-secondary font-bold mt-1">Mon-Sat: 10:00 AM - 7:00 PM</p>
                                            <p className="text-sm text-secondary font-bold mt-1">Sunday: 10:00 AM - 1:00 PM</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 pl-[64px]">
                                        <a href="tel:+91 9219559322" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-medium">
                                            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">call</span></div> +91 9219559322
                                        </a>
                                        <a href="mailto:lifehearcare@gmail.com" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-medium">
                                            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">mail</span></div> lifehearcare@gmail.com
                                        </a>
                                        <a href="https://www.google.com/maps/place/Life+Hearing+Care/@25.153423,75.8520923,17.5z/data=!4m16!1m9!3m8!1s0x396f85f70140ed13:0xdfdb28470156842c!2sLife+Hearing+Care!8m2!3d25.1528616!4d75.8523502!9m1!1b1!16s%2Fg%2F11j1_gkc3h!3m5!1s0x396f85f70140ed13:0xdfdb28470156842c!8m2!3d25.1528616!4d75.8523502!16s%2Fg%2F11j1_gkc3h!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary px-4 py-2.5 rounded-xl hover:bg-primary-container hover:text-primary transition-colors mt-2 w-max shadow-sm hover:shadow-md">
                                            Get Directions <span className="material-symbols-outlined text-[16px]">directions</span>
                                        </a>
                                    </div>
                                </div>
                            </RevealOnScroll>

                            {/* Home Visit Card */}
                            <RevealOnScroll delay="delay-200" className="flex-1">
                                <div className="p-xl bg-secondary/5 backdrop-blur-md rounded-3xl border border-secondary/20 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-1 relative overflow-hidden h-full">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                                    <div className="flex items-start gap-md mb-md">
                                        <div className="w-12 h-12 bg-secondary text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:rotate-12 transition-transform">
                                            <span className="material-symbols-outlined text-[24px]">home_health</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline-sm text-secondary mb-1">Home Visit Services</h4>
                                            <p className="text-on-surface-variant font-medium">Available exclusively in <strong className="text-on-surface">Kota, Rajasthan</strong></p>
                                            <p className="text-sm text-primary font-bold mt-1">Bringing expert hearing care to your doorstep.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 pl-[64px]">
                                        <Link to="/book" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-secondary px-6 py-3 rounded-xl hover:bg-secondary-container hover:text-secondary transition-colors mt-2 w-max shadow-md hover:shadow-lg">
                                            Book a Home Visit <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                        </Link>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>

                        {/* Map — full width below cards */}
                        <RevealOnScroll delay="delay-300" className="w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white group relative bg-surface-container-high">
                            <div className="absolute inset-0 bg-primary/5 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                            <iframe
                                title="Clinic Location"
                                src="https://maps.google.com/maps?q=Life+Hearing+Care,+Kota,+Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="group-hover:scale-105 transition-transform duration-1000 relative z-0"
                            ></iframe>
                        </RevealOnScroll>
                    </div>
                </section>
            </main>

            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div className="fixed inset-0 bg-on-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-gutter animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-md p-lg shadow-2xl relative">
                        <button onClick={() => setShowFeedbackModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
                            <span className="material-symbols-outlined text-[32px]">cancel</span>
                        </button>
                        <h2 className="text-title-lg text-primary mb-md">Share Your Experience</h2>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-md">
                            {/* Honeypot — hidden from humans, traps bots */}
                            <input
                                type="text"
                                name="website"
                                value={feedbackForm.honeypot}
                                onChange={e => setFeedbackForm({ ...feedbackForm, honeypot: e.target.value })}
                                style={{ display: 'none' }}
                                tabIndex="-1"
                                autoComplete="off"
                            />
                            <div>
                                <label className="block text-sm font-bold mb-1">Your Name</label>
                                <input required type="text" minLength={2} value={feedbackForm.name} onChange={e => setFeedbackForm({ ...feedbackForm, name: e.target.value })} className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Rating</label>
                                <select value={feedbackForm.rating} onChange={e => setFeedbackForm({ ...feedbackForm, rating: e.target.value })} className="w-full border rounded-xl p-2 bg-white focus:ring-2 focus:ring-primary/20">
                                    <option value="5">5 Stars - Excellent</option>
                                    <option value="4">4 Stars - Very Good</option>
                                    <option value="3">3 Stars - Good</option>
                                    <option value="2">2 Stars - Fair</option>
                                    <option value="1">1 Star - Poor</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Your Feedback <span className="text-on-surface-variant font-normal">(min. 20 characters)</span></label>
                                <textarea required minLength={20} rows="4" value={feedbackForm.text} onChange={e => setFeedbackForm({ ...feedbackForm, text: e.target.value })} className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-primary/20" placeholder="Share your experience with Life Hearing Care..."></textarea>
                                <p className="text-xs text-on-surface-variant mt-1">{feedbackForm.text.length}/20 characters minimum</p>
                            </div>
                            <div className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface-variant flex items-start gap-2">
                                <span className="material-symbols-outlined text-[16px] mt-0.5">info</span>
                                Your feedback will be reviewed by our team before being published. Thank you for helping us improve!
                            </div>
                            <button type="submit" className="w-full bg-secondary text-white py-3 rounded-xl font-bold hover:bg-secondary-container transition-colors shadow-md hover:shadow-lg">
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
}

export default Home;
