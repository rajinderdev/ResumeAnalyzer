import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ScrollReveal from '@/Components/ScrollReveal';
import AnimatedCounter from '@/Components/AnimatedCounter';
import ScrollToTop from '@/Components/ScrollToTop';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

/* ============ Floating Particles Background ============ */
function ParticlesBg() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-teal-500/5"
                    style={{
                        width: `${60 + i * 40}px`,
                        height: `${60 + i * 40}px`,
                        left: `${10 + i * 15}%`,
                        top: `${10 + i * 12}%`,
                        animation: `float ${4 + i * 0.8}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ============ Animated Phone Mockup ============ */
function PhoneMockup() {
    const [scores, setScores] = useState({ ats: 0, keywords: 0, formatting: 0 });

    useEffect(() => {
        const timer = setTimeout(() => {
            setScores({ ats: 92, keywords: 78, formatting: 95 });
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative animate-float-slow">
            {/* Glow behind phone */}
            <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full scale-75" />

            <div className="relative w-72 h-[500px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-slate-800 rounded-[2rem] p-4 overflow-hidden relative">
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 animate-shimmer rounded-[2rem]" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-white text-xs font-medium">Resume Score</div>
                            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div className="relative w-24 h-24">
                                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="3" />
                                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray="85, 100" style={{ transition: 'stroke-dasharray 1.5s ease-out' }} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">85</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {[
                                { label: 'ATS Score', value: scores.ats },
                                { label: 'Keywords', value: scores.keywords },
                                { label: 'Formatting', value: scores.formatting },
                            ].map((item) => (
                                <div key={item.label} className="bg-slate-700/50 rounded-lg p-2.5">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">{item.label}</span>
                                        <span className="text-teal-400">{item.value}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                                        <div
                                            className="bg-teal-400 h-1.5 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 space-y-1.5">
                            {['Contact info found', 'Strong action verbs', 'Quantified results'].map((item, i) => (
                                <div
                                    key={item}
                                    className="flex items-center text-xs text-gray-300 opacity-0 animate-fade-in-left"
                                    style={{ animationDelay: `${1.2 + i * 0.2}s`, animationFillMode: 'forwards' }}
                                >
                                    <svg className="w-3.5 h-3.5 text-teal-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ============ Hero Section ============ */
function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-teal-50/30 py-16 lg:py-24 overflow-hidden">
            <ParticlesBg />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <ScrollReveal animation="fade-in-left" duration={500}>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 mb-6 animate-pulse-glow">
                                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                                </svg>
                                AI-POWERED ANALYSIS
                            </span>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-in-up" delay={100}>
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Master Your Next<br />
                                <span className="animate-gradient-text">Job Application</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-in-up" delay={200}>
                            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                                Stop guessing why you're not getting callbacks. Our AI analyzes your resume against ATS filters and hiring standards, giving you actionable insights to improve.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-in-up" delay={300}>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={route('register')}
                                    className="group bg-teal-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-teal-700 transition-all duration-300 shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Analyze Now
                                    <svg className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <a
                                    href="#how-it-works"
                                    className="group border border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center"
                                >
                                    View Samples
                                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </ScrollReveal>

                        {/* Trust badges */}
                        <ScrollReveal animation="fade-in-up" delay={500}>
                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Trusted by professionals at</p>
                                <div className="flex items-center gap-6 text-gray-400">
                                    {['Google', 'Amazon', 'Meta', 'Microsoft'].map((name) => (
                                        <span key={name} className="text-sm font-semibold tracking-wide opacity-50">{name}</span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="hidden lg:flex justify-center">
                        <PhoneMockup />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============ Stats Bar ============ */
function StatsBar() {
    return (
        <section className="bg-white border-y border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: 50000, suffix: '+', label: 'Resumes Analyzed' },
                        { value: 94, suffix: '%', label: 'ATS Pass Rate' },
                        { value: 3, suffix: 'x', label: 'More Interviews' },
                        { value: 10000, suffix: '+', label: 'Users Hired' },
                    ].map((stat) => (
                        <ScrollReveal key={stat.label} animation="scale-in">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============ Features Section ============ */
function FeaturesSection() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'ATS Optimizer',
            description: 'Algorithmically checks your resume against known ATS filters to ensure you pass initial screenings.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            title: 'Smart Encoder',
            description: 'AI re-writes bullet points to match industry standards and include high-impact keywords.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'Score Tracker',
            description: 'Get a detailed score breakdown and track improvements as you refine your resume over time.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            ),
            title: 'Formatting Fixer',
            description: 'Auto-detects formatting issues that could trip up ATS and provides actionable fixes.',
        },
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal animation="fade-in-up">
                    <div className="text-center mb-16">
                        <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Features</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Why ResumeExpert AI?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Industry-grade AI-powered insights to give you the competitive edge in the job market.
                        </p>
                    </div>
                </ScrollReveal>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <ScrollReveal key={feature.title} animation="fade-in-up" delay={i * 100}>
                            <div className="card-hover bg-gray-50 rounded-xl p-6 border border-gray-100 group cursor-default h-full">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-4 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============ Steps Section ============ */
function StepsSection() {
    const steps = [
        {
            number: '1',
            title: 'Upload',
            description: 'Simply upload your current resume (PDF or DOCX format). Our system accepts all standard resume formats and processes them securely.',
            color: 'bg-teal-600',
            ringColor: 'ring-teal-200',
        },
        {
            number: '2',
            title: 'Get Insights',
            description: 'Our AI engine scans your resume, evaluating it against industry benchmarks, ATS requirements, and hiring best practices.',
            color: 'bg-slate-700',
            ringColor: 'ring-slate-200',
        },
        {
            number: '3',
            title: 'Improve',
            description: 'Review the detailed analysis and apply our tailored suggestions to optimize your resume. Track your score with each iteration.',
            color: 'bg-teal-800',
            ringColor: 'ring-teal-200',
        },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <ScrollReveal animation="fade-in-left">
                            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">How It Works</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-10">
                                Your Path to Career Success in <span className="animate-gradient-text">3 Steps</span>
                            </h2>
                        </ScrollReveal>
                        <div className="space-y-8 relative">
                            {/* Connecting line */}
                            <div className="absolute left-5 top-10 bottom-10 w-0.5 bg-gradient-to-b from-teal-600 via-slate-400 to-teal-800 hidden md:block" />

                            {steps.map((step, i) => (
                                <ScrollReveal key={step.number} animation="fade-in-left" delay={i * 150}>
                                    <div className="flex gap-5 group">
                                        <div className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ring-4 ${step.ringColor} relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                                            {step.number}
                                        </div>
                                        <div className="pb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{step.title}</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    <ScrollReveal animation="fade-in-right" delay={200}>
                        <div className="hidden lg:block">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                <div className="aspect-[4/3] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center relative overflow-hidden">
                                    {/* Animated grid background */}
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                        backgroundSize: '40px 40px',
                                    }} />

                                    <div className="text-center relative z-10">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-teal-500/20 flex items-center justify-center animate-pulse">
                                            <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-teal-300 text-sm font-medium mb-6">AI-Powered Analysis</p>
                                        <div className="flex justify-center gap-2 items-end">
                                            {[40, 65, 80, 55, 90, 70, 85].map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="w-5 rounded-t bg-teal-500/60 transition-all duration-700 hover:bg-teal-400"
                                                    style={{
                                                        height: `${h}px`,
                                                        animation: `fadeInUp 0.5s ease-out ${i * 0.1}s forwards`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-teal-600/0 group-hover:bg-teal-600/10 transition-colors duration-500" />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

/* ============ Testimonials Section ============ */
function TestimonialsSection() {
    const testimonials = [
        {
            text: "ResumeExpert was a game changer. I applied to over 50 positions before using it, and within 2 weeks of implementing their suggestions, I got 5 interviews.",
            name: 'David Chen',
            role: 'Software Engineer',
            company: 'Previously @ Startup',
            stars: 5,
        },
        {
            text: "The ATS optimization feature is fantastic. My resume is actually getting through to hiring managers now. The keyword analysis helped me tailor my resume perfectly.",
            name: 'Sarah Jenkins',
            role: 'Marketing Manager',
            company: 'Previously @ Agency',
            stars: 5,
        },
        {
            text: "Finally, a resume tool that actually focuses on what matters. The formatting suggestions fixed issues I didn't even know existed in my resume.",
            name: 'Ahmet Yilmaz',
            role: 'Product Manager',
            company: 'Previously @ Enterprise',
            stars: 5,
        },
    ];

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-teal-600/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal animation="fade-in-up">
                    <div className="text-center mb-14">
                        <span className="text-teal-300 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
                        <h2 className="text-3xl font-bold text-white mt-2 mb-3">Success Stories</h2>
                        <p className="text-teal-200">Thousands of job seekers have transformed their job search with ResumeExpert.</p>
                    </div>
                </ScrollReveal>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <ScrollReveal key={t.name} animation="fade-in-up" delay={i * 150}>
                            <div className="card-hover bg-white rounded-xl p-6 shadow-lg h-full flex flex-col">
                                <div className="flex mb-3">
                                    {[...Array(t.stars)].map((_, j) => (
                                        <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 text-sm mb-5 leading-relaxed flex-1">"{t.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                        {t.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                        <p className="text-xs text-gray-500">{t.role} &middot; {t.company}</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============ CTA Section ============ */
function CTASection() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700" />
            {/* Animated background shapes */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-float-slow" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <ScrollReveal animation="scale-in">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Land Your Dream Job?</h2>
                    <p className="text-teal-100 mb-8 text-lg">
                        Join thousands of job seekers who have optimized their resumes and landed interviews faster.
                    </p>
                    <Link
                        href={route('register')}
                        className="group inline-flex items-center bg-white text-teal-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                    >
                        Get Started Free
                        <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <p className="text-teal-200/70 text-sm mt-4">No credit card required &middot; Free forever</p>
                </ScrollReveal>
            </div>
        </section>
    );
}

/* ============ Main ============ */
export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Master Your Next Job Application" />
            <div className="min-h-screen bg-white">
                <Navbar auth={auth} />
                <HeroSection />
                <StatsBar />
                <FeaturesSection />
                <StepsSection />
                <TestimonialsSection />
                <CTASection />
                <Footer />
                <ScrollToTop />
            </div>
        </>
    );
}
