import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Navbar({ auth }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { label: 'Features', href: '/#features' },
        { label: 'How It Works', href: '/#how-it-works' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Testimonials', href: '/#testimonials' },
        { label: 'FAQ', href: '/#faq' },
    ];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                : 'bg-white border-b border-gray-100'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">ResumeExpert</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="relative px-3 py-2 text-sm text-gray-600 hover:text-teal-600 transition-colors rounded-lg hover:bg-teal-50/50 group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-teal-600 rounded-full transition-all duration-300 group-hover:w-4/5" />
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-all duration-300 shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 hover:-translate-y-0.5"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-all duration-300 shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <svg className="w-6 h-6 transition-transform duration-300" style={{ transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu with animation */}
            <div className={`md:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ${
                mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-4 py-3 space-y-1">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors"
                            style={{ animationDelay: `${i * 50}ms` }}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="block w-full text-center bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Log In</Link>
                                <Link href={route('register')} className="block w-full text-center bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
