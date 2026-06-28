import React, { useEffect, useRef, useState } from 'react';

const RevealOnScroll = ({ children, className = '', delay = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div ref={ref} className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} ${delay} ${className}`}>
            {children}
        </div>
    );
};

export default RevealOnScroll;
