import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import drPic from '../assets/dr_pic.jpeg';

function About() {
    useEffect(() => {
        // Simple scroll animation observer
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <main className="pt-20">
                {/*  Hero Section with Animation  */}
                <section className="relative h-[614px] flex items-center justify-center overflow-hidden bg-primary-container">

                    <div className="relative z-10 text-center px-gutter max-w-4xl">
                        <h1 className="text-display-lg font-display-lg text-white mb-base">Precision Care for Your Ears</h1>
                        <p className="text-body-lg font-body-lg text-on-primary-container/90 max-w-2xl mx-auto">Discover the legacy
                            of Life Hearing Care, where clinical excellence meets compassionate technology.</p>
                    </div>
                </section>
                {/*  Clinic Story Section  */}
                <section className="py-xl px-gutter max-w-container-max mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
                        <div className="space-y-md">
                            <span className="text-secondary font-label-md text-label-md tracking-wider uppercase">Our Legacy</span>
                            <h2 className="text-headline-md font-headline-md text-primary">A Vision for Better Hearing</h2>
                            <div className="space-y-base text-on-surface-variant">
                                <p>Founded in 2019, Life Hearing Care began with a simple yet profound realization: hearing is
                                    not just about sound; it's about connection. Our founder, Dr. Manish Singh, envisioned a
                                    clinic that treated the patient, not just the audiogram.</p>
                                <p>Over the past fifteen years, we have evolved from a small local practice into a
                                    state-of-the-art clinical center. We've stayed true to our roots by prioritizing high-touch
                                    care while adopting the most sophisticated diagnostic tools available in modern audiology.
                                </p>
                                <p>Today, we serve thousands of patients across three locations, providing life-changing hearing
                                    solutions that restore the music of everyday life.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-md">
                            <div className="space-y-md pt-lg">
                                <img className="rounded-xl shadow-lg w-full h-64 object-cover"
                                    alt="A clean, modern clinical examination room in a professional hearing care facility."
                                    src="/tech_images/about_1.webp" />
                                <img className="rounded-xl shadow-lg w-full h-48 object-cover"
                                    alt="A macro shot of a sophisticated, modern behind-the-ear hearing aid resting on a soft, light grey velvet surface."
                                    src="/tech_images/about_2.webp" />
                            </div>
                            <div className="space-y-md">
                                <img className="rounded-xl shadow-lg w-full h-80 object-cover"
                                    alt="An expert audiologist in professional clinical attire warmly smiling while speaking with an elderly patient."
                                    src="/tech_images/about_3.webp" />
                                <img className="rounded-xl shadow-lg w-full h-32 object-cover"
                                    alt="A close-up of a digital hearing test screen displaying complex but clean audiogram data."
                                    src="/tech_images/about_4.webp" />
                            </div>
                        </div>
                    </div>
                </section>
                {/*  Mission & Vision Section  */}
                <section className="py-xl bg-surface-container-low px-gutter">
                    <div className="max-w-container-max mx-auto">
                        <div className="text-center mb-lg">
                            <h2 className="text-headline-md font-headline-md text-primary">The Principles That Guide Us</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                            {/*  Mission Card  */}
                            <div
                                className="bg-white p-lg rounded-xl shadow-[0px_4px_20px_rgba(15,76,129,0.05)] border-t-4 border-primary hover:translate-y-[-4px] transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-md">
                                    <span className="material-symbols-outlined text-primary">flag</span>
                                </div>
                                <h3 className="text-title-lg font-title-lg text-primary mb-base">Our Mission</h3>
                                <p className="text-on-surface-variant">To empower individuals through personalized hearing
                                    solutions, ensuring no one is left out of life's most meaningful conversations.</p>
                            </div>
                            {/*  Vision Card  */}
                            <div
                                className="bg-white p-lg rounded-xl shadow-[0px_4px_20px_rgba(15,76_129,0.05)] border-t-4 border-secondary hover:translate-y-[-4px] transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-md">
                                    <span className="material-symbols-outlined text-secondary">visibility</span>
                                </div>
                                <h3 className="text-title-lg font-title-lg text-secondary mb-base">Our Vision</h3>
                                <p className="text-on-surface-variant">To be the global benchmark for clinical audiology, bridging
                                    the gap between medical science and human connection.</p>
                            </div>
                            {/*  Values Card  */}
                            <div
                                className="bg-white p-lg rounded-xl shadow-[0px_4px_20px_rgba(15,76_129,0.05)] border-t-4 border-tertiary-fixed-dim hover:translate-y-[-4px] transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center mb-md">
                                    <span className="material-symbols-outlined text-tertiary">favorite</span>
                                </div>
                                <h3 className="text-title-lg font-title-lg text-tertiary mb-base">Our Values</h3>
                                <p className="text-on-surface-variant">Integrity in diagnostics, innovation in solutions, and
                                    unwavering empathy for every person who walks through our doors.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  Interactive Timeline Component  */}
                <section className="py-xl px-gutter max-w-4xl mx-auto">
                    <h2 className="text-headline-md font-headline-md text-primary text-center mb-xl">Our Journey Through Time</h2>
                    <div className="relative">
                        {/*  Vertical Line  */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-outline-variant"></div>
                        {/*  Timeline Item 1  */}
                        <div className="relative z-10 mb-xl flex items-center justify-between group">
                            <div className="w-[45%] text-right pr-md">
                                <span className="text-primary font-bold text-headline-md">2019</span>
                                <h4 className="text-title-lg font-title-lg">The Foundation</h4>
                                <p className="text-body-lg text-on-surface-variant">First clinic opened in the heart of the city
                                    with two treatment rooms and a dream.</p>
                            </div>
                            <div
                                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-white shadow-md relative z-20 transition-transform group-hover:scale-125">
                                <span className="material-symbols-outlined text-white text-sm">home</span>
                            </div>
                            <div className="w-[45%]"></div>
                        </div>
                        {/*  Timeline Item 2  */}
                        <div className="relative z-10 mb-xl flex items-center justify-between group">
                            <div className="w-[45%]"></div>
                            <div
                                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-4 border-white shadow-md relative z-20 transition-transform group-hover:scale-125">
                                <span className="material-symbols-outlined text-white text-sm">rocket_launch</span>
                            </div>
                            <div className="w-[45%] pl-md">
                                <span className="text-secondary font-bold text-headline-md">2022</span>
                                <h4 className="text-title-lg font-title-lg">Digital Expansion</h4>
                                <p className="text-body-lg text-on-surface-variant">Adopted 100% digital diagnostic standards and
                                    pioneered remote fitting protocols.</p>
                            </div>
                        </div>
                        {/*  Timeline Item 3  */}
                        <div className="relative z-10 mb-xl flex items-center justify-between group">
                            <div className="w-[45%] text-right pr-md">
                                <span className="text-primary font-bold text-headline-md">Today</span>
                                <h4 className="text-title-lg font-title-lg">A Growing Community</h4>
                                <p className="text-body-lg text-on-surface-variant">Serving over 5,000 active patients across
                                    regional clinics.</p>
                            </div>
                            <div
                                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-white shadow-md relative z-20 transition-transform group-hover:scale-125">
                                <span className="material-symbols-outlined text-white text-sm">emoji_events</span>
                            </div>
                            <div className="w-[45%]"></div>
                        </div>
                    </div>
                </section>

                {/*  Leadership Team Section  */}
                <section className="py-xl px-gutter max-w-container-max mx-auto bg-surface-container-highest/20 rounded-3xl">
                    <div className="text-center mb-lg">
                        <span className="text-secondary font-label-md text-label-md tracking-wider uppercase">Our Experts</span>
                        <h2 className="text-headline-md font-headline-md text-primary">Led by Clinical Pioneers</h2>
                    </div>
                    <div className="max-w-sm mx-auto">
                        {/*  Leader 1  */}
                        <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-outline-variant/30">
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <img className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                    alt="Professional studio portrait of Dr. Sarah Jenkins"
                                    src={drPic} />
                                <div
                                    className="absolute bottom-0 left-0 right-0 p-md bg-gradient-to-t from-primary/80 to-transparent">
                                    <p className="text-white font-label-md">Founder &amp; Chief Audiologist</p>
                                </div>
                            </div>
                            <div className="p-md">
                                <h4 className="text-title-lg font-title-lg text-primary">Mr. Manish Singh</h4>
                                <p className="text-body-lg text-on-surface-variant mt-xs">Batchelor In Audiology And Speech Language Pathology,
                                    Over 8 years of clinical experience specializing in pediatric care.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  Certifications & Gallery Section  */}
                <section className="py-xl px-gutter max-w-container-max mx-auto">
                    <div className="flex flex-col lg:flex-row gap-xl">
                        {/*  Certifications  */}
                        <div className="w-full lg:w-1/3">
                            <h2 className="text-headline-md font-headline-md text-primary mb-md">Our Credentials</h2>
                            <div className="space-y-sm">
                                <div
                                    className="flex items-center gap-md p-md bg-white rounded-xl border border-outline-variant/20 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <div>
                                        <h5 className="font-bold text-on-surface">ASHA Certified</h5>
                                        <p className="text-sm text-on-surface-variant">American Speech-Language-Hearing Association
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center gap-md p-md bg-white rounded-xl border border-outline-variant/20 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <div>
                                        <h5 className="font-bold text-on-surface">ISO 9001:2015</h5>
                                        <p className="text-sm text-on-surface-variant">Quality Management System Standard</p>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center gap-md p-md bg-white rounded-xl border border-outline-variant/20 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary"
                                        style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    <div>
                                        <h5 className="font-bold text-on-surface">HI-PRO Certified</h5>
                                        <p className="text-sm text-on-surface-variant">Advanced Audiology Programming Systems</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Facility Gallery (Bento Grid Style)  */}
                        <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-sm h-[500px]">
                            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt="A wide-angle shot of the main lobby of Life Hearing Care clinic."
                                    src="/tech_images/about_5.webp" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                            </div>
                            <div className="rounded-2xl overflow-hidden relative group">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt="A specialized soundproof booth used for clinical hearing tests."
                                    src="/tech_images/about_6.webp" />
                            </div>
                            <div className="rounded-2xl overflow-hidden relative group">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt="A modern laboratory workbench where a technician is working on a miniature hearing aid component."
                                    src="/tech_images/about_7.webp" />
                            </div>
                        </div>
                    </div>
                </section>
                {/*  CTA Section  */}
                <section className="py-xl px-gutter">
                    <div className="max-w-4xl mx-auto rounded-3xl bg-primary overflow-hidden relative p-lg md:p-xl text-center">

                        <div className="relative z-10">
                            <h2 className="text-display-lg-mobile md:text-display-lg font-display-lg text-white mb-md">Ready to
                                Experience Better Hearing?</h2>
                            <p className="text-on-primary-container text-body-xl mb-lg max-w-2xl mx-auto">Join the thousands who
                                have rediscovered the sounds they love. Schedule your comprehensive evaluation today.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-md">
                                <Link
                                    to="/book"
                                    className="w-full md:w-auto bg-white text-primary font-bold px-xl py-md rounded-xl shadow-lg hover:scale-105 transition-transform text-center">Book
                                    Your Visit</Link>
                                <Link
                                    to="/book"
                                    className="w-full md:w-auto border-2 border-white/30 text-white font-bold px-xl py-md rounded-xl hover:bg-white/10 transition-colors text-center">Contact
                                    Our Team</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default About;
