import InputError from '@/Components/InputError';
import Navbar from '@/Components/Navbar';
import PasswordStrength from '@/Components/PasswordStrength';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <div className="flex min-h-[calc(100vh-64px)]">
                    {/* Left Side - Marketing */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-12 flex-col justify-center relative overflow-hidden">
                        {/* Animated background grid */}
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                        }} />

                        {/* Glowing orbs */}
                        <div className="absolute top-20 right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float" />
                        <div className="absolute bottom-20 left-10 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl animate-float-slow" />

                        <div className="relative z-10 max-w-lg mx-auto">
                            <div className="animate-fade-in-left" style={{ animationDuration: '0.7s' }}>
                                <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                                    Elevate your career<br />
                                    with <span className="animate-gradient-text">data-driven<br />clarity.</span>
                                </h2>
                                <p className="text-gray-300 mb-10 leading-relaxed">
                                    Join 10,000+ professionals using AI-powered resume analysis to land their dream jobs faster.
                                </p>
                            </div>

                            <div className="space-y-4 mb-12 stagger-children">
                                {[
                                    { icon: '🎯', label: 'ATS Optimization', desc: 'Pass automated screening systems' },
                                    { icon: '📊', label: 'Resume Scoring', desc: 'Get detailed performance metrics' },
                                    { icon: '🔑', label: 'Keyword Analysis', desc: 'Match job description requirements' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center space-x-3 group">
                                        <div className="w-11 h-11 glass rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{item.label}</p>
                                            <p className="text-gray-400 text-xs">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Animated chart */}
                            <div className="glass rounded-xl p-5 animate-fade-in-up" style={{ animationDelay: '0.5s', animationDuration: '0.6s' }}>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs text-gray-400">Average score improvement</p>
                                    <span className="text-xs text-teal-400 font-medium">+47%</span>
                                </div>
                                <div className="flex items-end gap-1.5 h-20">
                                    {[35, 45, 40, 55, 50, 65, 60, 75, 70, 85, 80, 90].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t transition-all duration-500 hover:opacity-100"
                                            style={{
                                                height: `${h}%`,
                                                background: i < 6
                                                    ? `rgba(148, 163, 184, ${0.3 + i * 0.05})`
                                                    : `rgba(20, 184, 166, ${0.4 + (i - 6) * 0.1})`,
                                                animation: `fadeInUp 0.4s ease-out ${i * 0.06}s forwards`,
                                                opacity: 0,
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-xs text-gray-500">Before</span>
                                    <span className="text-xs text-teal-400 font-medium">After</span>
                                </div>
                            </div>

                            {/* Social proof */}
                            <div className="mt-8 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                                <div className="flex -space-x-2">
                                    {['bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500'].map((color, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-slate-800 flex items-center justify-center text-white text-xs font-semibold`}>
                                            {['JD', 'SK', 'AL', 'MR'][i]}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-xs">
                                    <span className="text-white font-medium">2,400+</span> people joined this week
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                        <div className="w-full max-w-md animate-fade-in-up" style={{ animationDuration: '0.5s' }}>
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                                <p className="text-gray-500 text-sm mt-1.5">Start optimizing your resume today</p>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <svg className={`w-4 h-4 transition-colors ${focusedField === 'name' ? 'text-teal-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="name" type="text" value={data.name}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm input-glow"
                                            placeholder="John Doe"
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.name} className="mt-1.5" />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <svg className={`w-4 h-4 transition-colors ${focusedField === 'email' ? 'text-teal-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="email" type="email" value={data.email}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm input-glow"
                                            placeholder="you@example.com"
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-1.5" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <svg className={`w-4 h-4 transition-colors ${focusedField === 'password' ? 'text-teal-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="password" type={showPassword ? 'text' : 'password'} value={data.password}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm input-glow"
                                            placeholder="Create a password"
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            )}
                                        </button>
                                    </div>
                                    <PasswordStrength password={data.password} />
                                    <InputError message={errors.password} className="mt-1.5" />
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <svg className={`w-4 h-4 transition-colors ${focusedField === 'confirm' ? 'text-teal-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="password_confirmation" type="password" value={data.password_confirmation}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm input-glow"
                                            placeholder="Confirm your password"
                                            onFocus={() => setFocusedField('confirm')}
                                            onBlur={() => setFocusedField(null)}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        {data.password_confirmation && data.password === data.password_confirmation && (
                                            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                                </div>

                                <div className="flex items-start pt-1">
                                    <input id="terms" type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                        I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Creating account...
                                        </>
                                    ) : 'Create Account'}
                                </button>
                            </form>

                            <p className="text-center text-sm text-gray-500 mt-6">
                                Already have an account?{' '}
                                <Link href={route('login')} className="text-teal-600 hover:text-teal-700 font-medium transition-colors">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
