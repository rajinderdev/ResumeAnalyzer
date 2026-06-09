import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: 'Dashboard', href: route('dashboard'), active: route().current('dashboard') },
        { label: 'Analyze', href: route('dashboard'), active: false },
        { label: 'History', href: route('dashboard'), active: false },
        { label: 'Settings', href: route('profile.edit'), active: route().current('profile.edit') },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
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
                                <span className="text-xl font-bold text-gray-900">ResumeExpert</span>
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
