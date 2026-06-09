import { useEffect, useRef, useState } from 'react';

export default function AnimatedScoreGauge({ score = 0, size = 144, strokeWidth = 8, label = 'Resume Score' }) {
    const ref = useRef(null);
    const [animatedScore, setAnimatedScore] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const radius = (size / 2) - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    let color = '#ef4444';
    if (animatedScore >= 50) color = '#f59e0b';
    if (animatedScore >= 70) color = '#14b8a6';
    if (animatedScore >= 85) color = '#10b981';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let start;
        const duration = 1500;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedScore(eased * score);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isVisible, score]);

    return (
        <div ref={ref} className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {/* Background track */}
                    <circle
                        cx={size / 2} cy={size / 2} r={radius}
                        fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth}
                    />
                    {/* Animated arc */}
                    <circle
                        cx={size / 2} cy={size / 2} r={radius}
                        fill="none" stroke={color} strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: 'stroke 0.5s ease' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900" style={{ transition: 'color 0.5s ease' }}>
                        {Math.round(animatedScore)}
                    </span>
                    <span className="text-xs text-gray-500">/100</span>
                </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-3">{label}</p>
        </div>
    );
}
