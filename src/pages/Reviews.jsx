import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import RevealOnScroll from '../components/RevealOnScroll';

const Reviews = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadAllFeedbacks();
    }, []);

    const loadAllFeedbacks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('patient_feedback')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false });
            
        if (!error && data) {
            setFeedbacks(data);
        }
        setLoading(false);
    };

    return (
        <div className="bg-surface-container-lowest min-h-screen text-on-surface font-body-lg flex flex-col">
            
            <main className="flex-grow pt-32 pb-xl px-gutter max-w-container-max mx-auto w-full">
                <div className="text-center mb-xl">
                    <h1 className="text-headline-lg md:text-display-sm font-headline-lg text-primary mb-sm">Patient Stories</h1>
                    <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                        Read what our patients have to say about their experience with Life Hearing Care. We are committed to providing the best audiology services.
                    </p>
                    
                    {!loading && feedbacks.length > 0 && (
                        <div className="flex items-center justify-center gap-xs mt-md">
                            <span className="text-secondary font-bold text-2xl">
                                {(feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1)}
                            </span>
                            <div className="flex text-secondary text-lg">
                                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                            </div>
                            <span className="text-on-surface-variant">Average Rating ({feedbacks.length} reviews)</span>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="material-symbols-outlined text-[48px] text-primary animate-spin">progress_activity</span>
                    </div>
                ) : feedbacks.length === 0 ? (
                    <div className="text-center py-lg text-on-surface-variant bg-surface-container-low rounded-3xl p-xl">
                        No feedback available yet.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
                        {feedbacks.map(fb => (
                            <RevealOnScroll key={fb.id} className="bg-white p-lg rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col relative group hover:shadow-lg hover:-translate-y-1 transition-all">
                                <div className="flex text-secondary mb-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`material-symbols-outlined ${i < fb.rating ? 'font-bold' : 'opacity-30'}`} style={i < fb.rating ? {fontVariationSettings: "'FILL' 1"} : {}}>star</span>
                                    ))}
                                </div>
                                <p className="text-on-surface mb-md italic flex-grow text-lg">"{fb.feedback_text}"</p>
                                <div className="flex justify-between items-end mt-auto pt-4 border-t border-outline-variant/10">
                                    <div className="font-bold text-sm text-primary">- {fb.author_name}</div>
                                    <div className="text-xs text-on-surface-variant">{new Date(fb.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                )}
            </main>
            
        </div>
    );
};

export default Reviews;
