import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import ricImg from '../assets/ric_hearing_aid.png';
import beraImg from '../assets/bera_test.png';
import lossImg from '../assets/hearing_loss.png';
import starkeyImg from '../assets/starkey_aids.png';

function Services() {
  const { clinicName, supportEmail } = useSettings();

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
                {/*  Service 1: Comprehensive Hearing Test  */}
                <div id="hearing-test" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row gap-lg p-lg">
                    <div className="lg:w-2/5 rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async"
                            data-alt="Close up of a high-tech hearing assessment station in a clinical environment. A pair of premium clinical headphones rests on a sleek white desk next to a digital tablet displaying sound frequency waves. The lighting is soft and professional, using cool blue and white tones to emphasize clinical precision and modern healthcare aesthetics."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC3cgvTwQb3RmQ7rsvqhny9nLlRM4VRtgO3tUC2WzbKU81CNBkAtk3utlS79Yj9C2B2_mTmHeso-OqUIcqjLA6AGI4VirzyPSLpEehG_0lADrZhDomP4C-R9s4mnAVgOwxOagssXkRRxUb9_Fa5-IbOC_nMtGZBV51sT8hiIyiDyF0RYyIt6vg-_ek7r18jNeCoEOHrPeIkpalSk9NKilHzMMqbVrYCkaMoGgujvV1gEu5wAA-KLPqprUr1UYZ9gTgYwjD5k_N7E1Y" />
                    </div>
                    <div className="lg:w-3/5 space-y-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-headline-md font-headline-md text-primary">Comprehensive Hearing Test
                                </h2>
                                
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">hearing</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">Our gold-standard diagnostic
                            assessment identifies the precise type and degree of hearing loss using state-of-the-art
                            audiometric equipment.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-xs text-body-lg">
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Precise
                                        frequency mapping</li>
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Speech
                                        clarity analysis</li>
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Detailed
                                        clinical report</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            1</div>
                                        <p className="text-label-md font-label-md pt-base">Visual Ear Examination</p>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            2</div>
                                        <p className="text-label-md font-label-md pt-base">Pure Tone Audiometry</p>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            3</div>
                                        <p className="text-label-md font-label-md pt-base">Results Consultation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Service 2: Tinnitus Management  */}
                <div
                    id="tinnitus" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row-reverse gap-lg p-lg">
                    <div className="lg:w-2/5 rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async"
                            data-alt="A serene, minimalist wellness room designed for tinnitus therapy. The scene features a comfortable ergonomic chair, soft ambient lighting coming from a circular wall lamp, and a small Zen garden on a side table. The color palette consists of calming teals, off-whites, and natural wood textures, creating a sense of peace and professional care."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP-unxEF0I_609NkuDpj6WPnB6f4vRhNbz_tDH5GIjtJ3kMe9lLjHJPdJNj7amvRzQO_kXZwEse6kPmBVc4H6ZLGwpEJrMfQvx8JhexXK4P99f6LllbyYGeiTCc-MkQdLyiwT5yqRfSe3FslwHabBdYfBB2EfALspTewOBdbDsQ0pOUT2RoBMmQEy899mzsnOFm1AduvshZHyC2OkkwsmYSMhb504DnnFWTlRonGE5ignDn3M5ilOcqeue8ADaAL2aBNSnfI7OJrfg" />
                    </div>
                    <div className="lg:w-3/5 space-y-md text-left">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-headline-md font-headline-md text-primary">Tinnitus Management</h2>
                                
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">waves</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">Customized therapeutic approaches
                            to reduce the impact of persistent ringing or buzzing in the ears, focusing on habituation
                            and relief.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-xs text-body-lg">
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Reduced
                                        stress &amp; anxiety</li>
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Personalized
                                        sound therapy</li>
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Improved
                                        sleep quality</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            1</div>
                                        <p className="text-label-md font-label-md pt-base">Psychological Assessment</p>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            2</div>
                                        <p className="text-label-md font-label-md pt-base">Tinnitus Pitch Matching</p>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            3</div>
                                        <p className="text-label-md font-label-md pt-base">Custom Masking Plan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Service 3: Speech Therapy  */}
                <div id="speech-therapy" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row gap-lg p-lg">
                    <div className="lg:w-2/5 rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async"
                            data-alt="A warm and inviting speech therapy session room. A therapist is engaged in a friendly conversation with an elderly patient. The room features high-quality acoustics, light oak furniture, and large windows revealing a soft green garden outside. The mood is supportive, modern, and clinical with high-end glass accents and soft-toned furniture."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI3EpbJ1_73iwlqhcynIVQ0H1PNj6GoBv9kpF-7eOFzdFDEF9VCKmAInUYgk4_bXnWS_PFKNoguk7-fY2v9v9DDxmMwfD1bbaNVkdgLvVG3-z2nGTk48IPQiSfCEZ-5Ko-Ne7r5jytvzr6g7XLUw--yI-3DEP68V9_Ti7d6RHYdPQooiegwOLx5FKZ-jUezmbVlAU2dUwvofsLR7GopctxyRor1U_1EFViU2Nh2fuUr7S8jmPDgvt-5hTPaIUD8zlSeEFGrcbFSjXe" />
                    </div>
                    <div className="lg:w-3/5 space-y-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-headline-md font-headline-md text-primary">Speech &amp; Language Therapy
                                </h2>
                                
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">record_voice_over</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">Expert guidance for speech
                            disorders often associated with hearing loss, focusing on articulation, voice quality, and
                            communication strategies.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-xs text-body-lg">
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Clearer
                                        communication</li>
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Increased
                                        social confidence</li>
                                    <li className="flex items-center gap-xs"><span
                                            className="material-symbols-outlined text-secondary text-sm"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Expert vocal
                                        training</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            1</div>
                                        <p className="text-label-md font-label-md pt-base">Initial Evaluation</p>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            2</div>
                                        <p className="text-label-md font-label-md pt-base">Goal Setting</p>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div
                                            className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">
                                            3</div>
                                        <p className="text-label-md font-label-md pt-base">Active Therapy Cycles</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Service 4: RIC Hearing Aid  */}
                <div id="hearing-aid-trial" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row-reverse gap-lg p-lg">
                    <div className="lg:w-2/5 rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async"
                            alt="RIC Hearing Aid"
                            src={ricImg} />
                    </div>
                    <div className="lg:w-3/5 space-y-md text-left">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-headline-md font-headline-md text-primary">Hearing Aid Trial</h2>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">earbuds</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">Experience the latest hearing aid technology firsthand with a no-obligation trial. We help you find the perfect discreet and comfortable solution.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-xs text-body-lg">
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Nearly invisible design</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Crisp, clear sound quality</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Comfortable fit</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">1</div>
                                        <p className="text-label-md font-label-md pt-base">Hearing Evaluation</p>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">2</div>
                                        <p className="text-label-md font-label-md pt-base">Device Selection</p>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">3</div>
                                        <p className="text-label-md font-label-md pt-base">Custom Fitting</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Service 5: BERA Test Center  */}
                <div id="bera-test" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row gap-lg p-lg">
                    <div className="lg:w-2/5 rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async"
                            alt="BERA Test Center"
                            src={beraImg} />
                    </div>
                    <div className="lg:w-3/5 space-y-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-headline-md font-headline-md text-primary">BERA / ABR Test Center</h2>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">monitor_heart</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">Brainstem Evoked Response Audiometry (BERA/ABR) provides an objective measurement of hearing function, crucial for infants, children, and complex auditory evaluations.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-xs text-body-lg">
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Completely objective</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Safe &amp; painless</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> High accuracy</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">1</div>
                                        <p className="text-label-md font-label-md pt-base">Electrode Placement</p>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">2</div>
                                        <p className="text-label-md font-label-md pt-base">Sound Stimulation</p>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">3</div>
                                        <p className="text-label-md font-label-md pt-base">Brainwave Analysis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Service 6: Hearing Loss Treatment  */}
                <div id="hearing-loss" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row-reverse gap-lg p-lg">
                    <div className="lg:w-2/5 rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async"
                            alt="Hearing Loss Treatment"
                            src={lossImg} />
                    </div>
                    <div className="lg:w-3/5 space-y-md text-left">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-headline-md font-headline-md text-primary">Hearing Loss Treatment</h2>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">healing</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">Comprehensive management and therapeutic strategies tailored to address all degrees and types of hearing loss, improving your quality of life.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-xs text-body-lg">
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Holistic care approach</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Lifestyle integration</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Ongoing support</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">1</div>
                                        <p className="text-label-md font-label-md pt-base">Medical Review</p>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">2</div>
                                        <p className="text-label-md font-label-md pt-base">Treatment Planning</p>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">3</div>
                                        <p className="text-label-md font-label-md pt-base">Rehabilitation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Service 7: Starkey Hearing Aids  */}
                <div id="hearing-aid-fitting" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row gap-lg p-lg">
                    <div className="lg:w-2/5 rounded-2xl overflow-hidden">
                        <img className="w-full h-full object-cover min-h-[300px]" loading="lazy" decoding="async"
                            alt="Starkey Hearing Aids"
                            src={starkeyImg} />
                    </div>
                    <div className="lg:w-3/5 space-y-md">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-headline-md font-headline-md text-primary">Hearing Aid Fitting, Programming & Repair</h2>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">build</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">Professional fitting, fine-tuning, and expert repair services for all major brands, ensuring your devices deliver exceptional sound engineering and seamless connectivity.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-xs text-body-lg">
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Advanced AI sound processing</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Bluetooth connectivity</li>
                                    <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Long-lasting battery</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">1</div>
                                        <p className="text-label-md font-label-md pt-base">Demonstration</p>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">2</div>
                                        <p className="text-label-md font-label-md pt-base">Fitting &amp; Programming</p>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10">3</div>
                                        <p className="text-label-md font-label-md pt-base">Follow-up Fine Tuning</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

