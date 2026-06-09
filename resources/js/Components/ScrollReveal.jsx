import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
    children,
    animation = 'fade-in-up',
    delay = 0,
    duration = 600,
    threshold = 0.15,
    className = '',
}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const animations = {
        'fade-in-up': 'translate-y-8 opacity-0',
        'fade-in-down': '-translate-y-8 opacity-0',
        'fade-in-left': '-translate-x-8 opacity-0',
        'fade-in-right': 'translate-x-8 opacity-0',
        'fade-in': 'opacity-0',
        'scale-in': 'scale-95 opacity-0',
        'zoom-in': 'scale-75 opacity-0',
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={`transition-all ease-out ${className} ${
                isVisible ? 'translate-y-0 translate-x-0 scale-100 opacity-100' : animations[animation]
            }`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
