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
                                <h2 className="text-headline-md font-headline-md text-primary">Comprehensive Hearing Test</h2>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">hearing</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">
                            Our gold-standard diagnostic assessment goes beyond a simple beep test. We conduct a battery of advanced audiometric tests, including pure-tone audiometry, bone conduction, and speech discrimination testing, to identify the exact nature, degree, and anatomical location of any hearing impairment.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-sm text-body-lg">
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Pinpoint Accuracy:</strong> High-fidelity frequency mapping identifies hidden hearing loss.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Structural Insights:</strong> Middle-ear function analysis via advanced tympanometry.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Clinical Transparency:</strong> You receive a detailed, easy-to-understand audiological report.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">1</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Otoscopic Examination</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Visual inspection of the ear canal and eardrum.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">2</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Complete Audiometry</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Thorough testing in our calibrated sound-treated booth.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">3</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Lifestyle Consultation</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Matching your audiogram results with daily acoustic needs.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Service 2: Tinnitus Management  */}
                <div id="tinnitus" className="glass-card rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row-reverse gap-lg p-lg">
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
                        <p className="text-body-lg font-body-lg text-on-surface-variant">
                            Tinnitus isn't a disease; it's a symptom, and it requires highly specialized care. We utilize advanced Tinnitus Retraining Therapy (TRT) and customized sound-masking strategies to help your brain habituate to the ringing, significantly reducing its psychological impact and restoring your peace of mind.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-sm text-body-lg">
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Habituation Strategies:</strong> Train your brain to safely ignore the phantom sounds.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Anxiety Reduction:</strong> Clinically proven techniques to lower stress levels.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Better Sleep:</strong> Nighttime masking profiles to restore healthy sleep cycles.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">1</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Psychoacoustic Matching</p>
                                            <p className="text-sm text-on-surface-variant mt-1">We scientifically identify the exact pitch of your tinnitus.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">2</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Device Programming</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Fitting specialized masking or amplification devices.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">3</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Ongoing Counseling</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Continuous psychological and clinical support.</p>
                                        </div>
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
                                <h2 className="text-headline-md font-headline-md text-primary">Speech &amp; Language Therapy</h2>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-secondary">record_voice_over</span>
                        </div>
                        <p className="text-body-lg font-body-lg text-on-surface-variant">
                            Hearing loss can often impact articulation and speech comprehension. Our certified speech-language pathologists provide expert, evidence-based therapy to help patients rebuild communication skills, enhance vocal clarity, and develop powerful compensatory strategies for challenging acoustic environments.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-sm text-body-lg">
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Vocal Confidence:</strong> Rebuild your ability to project and articulate clearly.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Comprehension Tactics:</strong> Learn lip-reading and contextual listening strategies.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Cognitive Stimulation:</strong> Engage the brain's auditory processing centers.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">1</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Baseline Evaluation</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Comprehensive assessment of speech and language abilities.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">2</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Targeted Therapy Plan</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Goal-setting tailored to your specific communication needs.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">3</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Active Rehabilitation</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Engaging exercises to strengthen auditory processing.</p>
                                        </div>
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
                        <p className="text-body-lg font-body-lg text-on-surface-variant">
                            Purchasing a hearing aid is a major medical decision, which is why we offer a comprehensive, no-obligation trial period. Experience the incredible clarity of next-generation digital signal processing in your own real-world environments—from noisy restaurants to quiet living rooms—before making any commitment.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-sm text-body-lg">
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Real-World Testing:</strong> Experience the difference in your daily life.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Advanced AI Features:</strong> Try the latest Bluetooth and directional microphone tech.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Zero Pressure:</strong> A supportive, patient-first approach to finding the right fit.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">1</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Needs Assessment</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Discussing your lifestyle, budget, and aesthetic preferences.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">2</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Trial Device Fitting</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Programming a demo unit specifically to your audiogram.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">3</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Follow-Up Evaluation</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Reviewing your experience and fine-tuning the settings.</p>
                                        </div>
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
                        <p className="text-body-lg font-body-lg text-on-surface-variant">
                            Brainstem Evoked Response Audiometry (BERA/ABR) is a highly sophisticated, objective neurophysiological test. By measuring the electrical activity of the auditory nerve and brainstem pathways, we can accurately assess hearing function without requiring active patient participation, making it essential for infants and individuals with developmental challenges.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-sm text-body-lg">
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Objective Diagnostics:</strong> No patient response required for accurate results.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Neurological Insights:</strong> Detects lesions or abnormalities in the auditory pathway.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Pediatric Friendly:</strong> Safe, painless, and highly effective for newborns.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">1</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Surface Electrode Placement</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Gently attaching sensors to the forehead and ears.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">2</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Click Stimulation</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Delivering calibrated sounds through specialized earphones.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">3</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Waveform Analysis</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Our audiologists interpret the neuro-electrical responses.</p>
                                        </div>
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
                        <p className="text-body-lg font-body-lg text-on-surface-variant">
                            Hearing loss is complex, and treatment requires more than just amplification. We provide holistic, medically-grounded therapeutic strategies that address the cognitive, emotional, and physical impacts of auditory deprivation, ensuring a comprehensive journey toward auditory rehabilitation.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-sm text-body-lg">
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Cognitive Preservation:</strong> Proactive treatment reduces the risk of auditory decline.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Customized Interventions:</strong> Solutions ranging from assistive devices to surgical referrals.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Preventative Care:</strong> Strategies to protect your remaining residual hearing.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">1</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Medical Review</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Analyzing your complete medical and audiological history.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">2</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Holistic Planning</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Developing a multi-faceted rehabilitation strategy.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">3</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Continual Monitoring</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Regular check-ups to track your auditory progress.</p>
                                        </div>
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
                        <p className="text-body-lg font-body-lg text-on-surface-variant">
                            The most advanced hearing aid in the world is only as good as its programming. Our clinical audiologists use Real-Ear Measurement (REM) equipment to meticulously verify that your devices are delivering the precise amplification your prescription requires. We also provide rapid, expert repairs to keep you connected.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg pt-md">
                            <div>
                                <h3 className="font-bold text-primary mb-base">Key Benefits</h3>
                                <ul className="space-y-sm text-body-lg">
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Real-Ear Verification:</strong> Scientifically proven, perfectly matched amplification.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Firmware Updates:</strong> Keeping your devices running on the latest software.</span>
                                    </li>
                                    <li className="flex items-start gap-xs">
                                        <span className="material-symbols-outlined text-secondary text-base mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        <span><strong>Rapid Diagnostics:</strong> In-clinic deep cleaning, vacuuming, and parts replacement.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-base">The Process</h3>
                                <div className="space-y-base">
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">1</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Acoustic Verification</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Placing a microscopic tube in your ear to measure output.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start relative step-line pb-base">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">2</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Fine-Tuning</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Adjusting compression ratios, noise reduction, and feedback managers.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-sm items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 z-10 font-bold text-primary">3</div>
                                        <div>
                                            <p className="text-label-lg font-bold pt-2">Maintenance Training</p>
                                            <p className="text-sm text-on-surface-variant mt-1">Teaching you how to care for your premium devices.</p>
                                        </div>
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

