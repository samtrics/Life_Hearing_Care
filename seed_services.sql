-- Create the services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    image TEXT NOT NULL,
    hash_id TEXT NOT NULL,
    key_benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    process JSONB NOT NULL DEFAULT '[]'::jsonb,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so the website can fetch the services)
DROP POLICY IF EXISTS "Allow public read access on services" ON public.services;
CREATE POLICY "Allow public read access on services"
    ON public.services
    FOR SELECT
    USING (true);

-- Allow authenticated users to insert/update/delete (Admin Portal)
DROP POLICY IF EXISTS "Allow authenticated users to insert services" ON public.services;
CREATE POLICY "Allow authenticated users to insert services"
    ON public.services
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update services" ON public.services;
CREATE POLICY "Allow authenticated users to update services"
    ON public.services
    FOR UPDATE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete services" ON public.services;
CREATE POLICY "Allow authenticated users to delete services"
    ON public.services
    FOR DELETE
    TO authenticated
    USING (true);

-- Insert the initial 7 services
INSERT INTO public.services (title, description, icon, image, hash_id, order_index, key_benefits, process)
VALUES
(
    'Comprehensive Hearing Test',
    'Our gold-standard diagnostic assessment goes beyond a simple beep test. We conduct a battery of advanced audiometric tests, including pure-tone audiometry, bone conduction, and speech discrimination testing, to identify the exact nature, degree, and anatomical location of any hearing impairment.',
    'hearing',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCC3cgvTwQb3RmQ7rsvqhny9nLlRM4VRtgO3tUC2WzbKU81CNBkAtk3utlS79Yj9C2B2_mTmHeso-OqUIcqjLA6AGI4VirzyPSLpEehG_0lADrZhDomP4C-R9s4mnAVgOwxOagssXkRRxUb9_Fa5-IbOC_nMtGZBV51sT8hiIyiDyF0RYyIt6vg-_ek7r18jNeCoEOHrPeIkpalSk9NKilHzMMqbVrYCkaMoGgujvV1gEu5wAA-KLPqprUr1UYZ9gTgYwjD5k_N7E1Y',
    'hearing-test',
    1,
    '["Pinpoint Accuracy: High-fidelity frequency mapping identifies hidden hearing loss.", "Structural Insights: Middle-ear function analysis via advanced tympanometry.", "Clinical Transparency: You receive a detailed, easy-to-understand audiological report."]'::jsonb,
    '[{"title": "Otoscopic Examination", "description": "Visual inspection of the ear canal and eardrum."}, {"title": "Complete Audiometry", "description": "Thorough testing in our calibrated sound-treated booth."}, {"title": "Lifestyle Consultation", "description": "Matching your audiogram results with daily acoustic needs."}]'::jsonb
),
(
    'Tinnitus Management',
    'Tinnitus isn''t a disease; it''s a symptom, and it requires highly specialized care. We utilize advanced Tinnitus Retraining Therapy (TRT) and customized sound-masking strategies to help your brain habituate to the ringing, significantly reducing its psychological impact and restoring your peace of mind.',
    'waves',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDP-unxEF0I_609NkuDpj6WPnB6f4vRhNbz_tDH5GIjtJ3kMe9lLjHJPdJNj7amvRzQO_kXZwEse6kPmBVc4H6ZLGwpEJrMfQvx8JhexXK4P99f6LllbyYGeiTCc-MkQdLyiwT5yqRfSe3FslwHabBdYfBB2EfALspTewOBdbDsQ0pOUT2RoBMmQEy899mzsnOFm1AduvshZHyC2OkkwsmYSMhb504DnnFWTlRonGE5ignDn3M5ilOcqeue8ADaAL2aBNSnfI7OJrfg',
    'tinnitus',
    2,
    '["Habituation Strategies: Train your brain to safely ignore the phantom sounds.", "Anxiety Reduction: Clinically proven techniques to lower stress levels.", "Better Sleep: Nighttime masking profiles to restore healthy sleep cycles."]'::jsonb,
    '[{"title": "Psychoacoustic Matching", "description": "We scientifically identify the exact pitch of your tinnitus."}, {"title": "Device Programming", "description": "Fitting specialized masking or amplification devices."}, {"title": "Ongoing Counseling", "description": "Continuous psychological and clinical support."}]'::jsonb
),
(
    'Speech & Language Therapy',
    'Hearing loss can often impact articulation and speech comprehension. Our certified speech-language pathologists provide expert, evidence-based therapy to help patients rebuild communication skills, enhance vocal clarity, and develop powerful compensatory strategies for challenging acoustic environments.',
    'record_voice_over',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBI3EpbJ1_73iwlqhcynIVQ0H1PNj6GoBv9kpF-7eOFzdFDEF9VCKmAInUYgk4_bXnWS_PFKNoguk7-fY2v9v9DDxmMwfD1bbaNVkdgLvVG3-z2nGTk48IPQiSfCEZ-5Ko-Ne7r5jytvzr6g7XLUw--yI-3DEP68V9_Ti7d6RHYdPQooiegwOLx5FKZ-jUezmbVlAU2dUwvofsLR7GopctxyRor1U_1EFViU2Nh2fuUr7S8jmPDgvt-5hTPaIUD8zlSeEFGrcbFSjXe',
    'speech-therapy',
    3,
    '["Vocal Confidence: Rebuild your ability to project and articulate clearly.", "Comprehension Tactics: Learn lip-reading and contextual listening strategies.", "Cognitive Stimulation: Engage the brain''s auditory processing centers."]'::jsonb,
    '[{"title": "Baseline Evaluation", "description": "Comprehensive assessment of speech and language abilities."}, {"title": "Targeted Therapy Plan", "description": "Goal-setting tailored to your specific communication needs."}, {"title": "Active Rehabilitation", "description": "Engaging exercises to strengthen auditory processing."}]'::jsonb
),
(
    'Hearing Aid Trial',
    'Purchasing a hearing aid is a major medical decision, which is why we offer a comprehensive, no-obligation trial period. Experience the incredible clarity of next-generation digital signal processing in your own real-world environments—from noisy restaurants to quiet living rooms—before making any commitment.',
    'earbuds',
    '/assets/ric_hearing_aid.png',
    'hearing-aid-trial',
    4,
    '["Real-World Testing: Experience the difference in your daily life.", "Advanced AI Features: Try the latest Bluetooth and directional microphone tech.", "Zero Pressure: A supportive, patient-first approach to finding the right fit."]'::jsonb,
    '[{"title": "Needs Assessment", "description": "Discussing your lifestyle, budget, and aesthetic preferences."}, {"title": "Trial Device Fitting", "description": "Programming a demo unit specifically to your audiogram."}, {"title": "Follow-Up Evaluation", "description": "Reviewing your experience and fine-tuning the settings."}]'::jsonb
),
(
    'BERA / ABR Test Center',
    'Brainstem Evoked Response Audiometry (BERA/ABR) is a highly sophisticated, objective neurophysiological test. By measuring the electrical activity of the auditory nerve and brainstem pathways, we can accurately assess hearing function without requiring active patient participation, making it essential for infants and individuals with developmental challenges.',
    'monitor_heart',
    '/assets/bera_test.png',
    'bera-test',
    5,
    '["Objective Diagnostics: No patient response required for accurate results.", "Neurological Insights: Detects lesions or abnormalities in the auditory pathway.", "Pediatric Friendly: Safe, painless, and highly effective for newborns."]'::jsonb,
    '[{"title": "Surface Electrode Placement", "description": "Gently attaching sensors to the forehead and ears."}, {"title": "Click Stimulation", "description": "Delivering calibrated sounds through specialized earphones."}, {"title": "Waveform Analysis", "description": "Our audiologists interpret the neuro-electrical responses."}]'::jsonb
),
(
    'Hearing Loss Treatment',
    'Hearing loss is complex, and treatment requires more than just amplification. We provide holistic, medically-grounded therapeutic strategies that address the cognitive, emotional, and physical impacts of auditory deprivation, ensuring a comprehensive journey toward auditory rehabilitation.',
    'healing',
    '/assets/hearing_loss.png',
    'hearing-loss',
    6,
    '["Cognitive Preservation: Proactive treatment reduces the risk of auditory decline.", "Customized Interventions: Solutions ranging from assistive devices to surgical referrals.", "Preventative Care: Strategies to protect your remaining residual hearing."]'::jsonb,
    '[{"title": "Medical Review", "description": "Analyzing your complete medical and audiological history."}, {"title": "Holistic Planning", "description": "Developing a multi-faceted rehabilitation strategy."}, {"title": "Continual Monitoring", "description": "Regular check-ups to track your auditory progress."}]'::jsonb
),
(
    'Hearing Aid Fitting, Programming & Repair',
    'The most advanced hearing aid in the world is only as good as its programming. Our clinical audiologists use Real-Ear Measurement (REM) equipment to meticulously verify that your devices are delivering the precise amplification your prescription requires. We also provide rapid, expert repairs to keep you connected.',
    'build',
    '/assets/starkey_aids.png',
    'hearing-aid-fitting',
    7,
    '["Real-Ear Verification: Scientifically proven, perfectly matched amplification.", "Firmware Updates: Keeping your devices running on the latest software.", "Rapid Diagnostics: In-clinic deep cleaning, vacuuming, and parts replacement."]'::jsonb,
    '[{"title": "Acoustic Verification", "description": "Placing a microscopic tube in your ear to measure output."}, {"title": "Fine-Tuning", "description": "Adjusting compression ratios, noise reduction, and feedback managers."}, {"title": "Maintenance Training", "description": "Teaching you how to care for your premium devices."}]'::jsonb
);
