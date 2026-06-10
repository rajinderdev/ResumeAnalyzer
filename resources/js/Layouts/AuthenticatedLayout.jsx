import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { auth, impersonating } = usePage().props;
    const user = auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: 'Dashboard', href: route('dashboard'), active: route().current('dashboard') },
        { label: 'Build', href: route('resume-builder.index'), active: route().current('resume-builder.*') },
        { label: 'Chat Support', href: route('chat.index'), active: route().current('chat.*') },
        { label: 'Settings', href: route('profile.edit'), active: route().current('profile.edit') },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Impersonation Banner */}
            {impersonating && (
                <div className="bg-amber-500 text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-3 z-[60] relative">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    You are being viewed as <strong className="mx-1">{user.name}</strong> by an admin
                    <Link
                        href={route('impersonate.stop')}
                        method="post"
                        as="button"
                        className="ml-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs font-semibold transition-colors"
                    >
                        Stop Impersonating
                    </Link>
                </div>
            )}

            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href={route('dashboard')} className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-gray-900">CVPilot</span>
                            </Link>

                            <div className="hidden md:flex items-center ml-10 space-x-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-teal-50 text-teal-700'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            {user.is_admin && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors"
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-xs">
                                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        {user.is_admin && (
                                            <Dropdown.Link href={route('admin.dashboard')}>Admin Panel</Dropdown.Link>
                                        )}
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white">
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                                        link.active ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-3 border-t border-gray-100 mt-3">
                                <div className="px-3 py-2 text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="px-3 py-1 text-xs text-gray-500">{user.email}</div>
                                <Link
                                    href={route('profile.edit')}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <main>{children}</main>
        </div>
    );
}
