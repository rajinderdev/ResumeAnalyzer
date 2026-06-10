import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function AdminLayout({ children, pageTitle }) {
    const { auth, impersonating, flash } = usePage().props;
    const user = auth.user;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [unreadChat, setUnreadChat] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Live clock
    useEffect(() => {
        const t = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(t);
    }, []);

    // Poll unread chat count
    useEffect(() => {
        const fetchUnread = async () => {
            try {
                const res = await axios.get(route('chat.unread'));
                setUnreadChat(res.data.count);
            } catch {}
        };
        fetchUnread();
        const interval = setInterval(fetchUnread, 15000);
        return () => clearInterval(interval);
    }, []);

    // Flash messages with auto-dismiss
    useEffect(() => {
        if (flash?.success || flash?.error) {
            setFlashMessage(flash);
            const timer = setTimeout(() => setFlashMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const getGreeting = () => {
        const h = currentTime.getHours();
        if (h < 12) return 'Good morning';
        if (h < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const sidebarLinks = [
        {
            label: 'Dashboard',
            href: route('admin.dashboard'),
            active: route().current('admin.dashboard'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            ),
        },
        {
            label: 'Users',
            href: route('admin.users.index'),
            active: route().current('admin.users.*'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            ),
        },
        {
            label: 'Roles & Permissions',
            href: route('admin.roles.index'),
            active: route().current('admin.roles.*'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            label: 'Chat Support',
            href: route('admin.chat.index'),
            active: route().current('admin.chat.*'),
            badge: unreadChat,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            {/* Flash Messages - Enhanced */}
            {flashMessage && (
                <div className="fixed top-4 right-4 z-[100] animate-slide-in-right">
                    <div className={`px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium flex items-center gap-3 ${
                        flashMessage.success ? 'bg-gradient-to-r from-teal-600 to-teal-500' : 'bg-gradient-to-r from-red-600 to-red-500'
                    }`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            flashMessage.success ? 'bg-teal-700/40' : 'bg-red-700/40'
                        }`}>
                            {flashMessage.success ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        <span>{flashMessage.success || flashMessage.error}</span>
                        <button onClick={() => setFlashMessage(null)} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-1 h-0.5 rounded-full overflow-hidden mx-2">
                        <div className={`h-full toast-progress rounded-full ${flashMessage.success ? 'bg-teal-400' : 'bg-red-400'}`} />
                    </div>
                </div>
            )}

            {/* Impersonation Banner */}
            {impersonating && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 text-center text-sm font-medium flex items-center justify-center gap-3 z-[60] relative animate-fade-in-down">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    You are impersonating <strong>{user.name}</strong>
                    <Link
                        href={route('impersonate.stop')}
                        method="post"
                        as="button"
                        className="ml-2 bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
                    >
                        Stop Impersonating
                    </Link>
                </div>
            )}

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden animate-overlay-in" onClick={() => setMobileOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white transition-all duration-300 z-50 ${
                sidebarCollapsed ? 'w-[68px]' : 'w-64'
            } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                {/* Logo area */}
                <div className={`flex items-center h-16 px-4 border-b border-white/5 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!sidebarCollapsed && (
                        <Link href={route('admin.dashboard')} className="flex items-center space-x-2.5 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                                <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-base font-bold tracking-tight">Admin</span>
                                <span className="text-[10px] text-teal-400 block -mt-0.5 font-medium">CVPilot</span>
                            </div>
                        </Link>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-all hidden md:block"
                    >
                        <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Nav Section Label */}
                {!sidebarCollapsed && (
                    <div className="px-4 pt-5 pb-2">
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Navigation</p>
                    </div>
                )}

                <nav className={`${sidebarCollapsed ? 'mt-4' : 'mt-1'} px-2.5 space-y-0.5`}>
                    {sidebarLinks.map((link) => (
                        <div key={link.label} className="relative sidebar-link">
                            <Link
                                href={link.href}
                                className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                                    link.active
                                        ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-600/25'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <span className={`flex-shrink-0 transition-transform duration-200 ${!link.active ? 'group-hover:scale-110' : ''}`}>
                                    {link.icon}
                                </span>
                                {!sidebarCollapsed && (
                                    <span className="flex-1">{link.label}</span>
                                )}
                                {!sidebarCollapsed && link.badge > 0 && (
                                    <span className="w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-pop-in">
                                        {link.badge}
                                    </span>
                                )}
                                {sidebarCollapsed && link.badge > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold animate-pop-in">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                            {/* Tooltip for collapsed */}
                            {sidebarCollapsed && (
                                <div className="sidebar-tooltip absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap shadow-xl border border-slate-700 z-[60]">
                                    {link.label}
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Divider */}
                <div className="mx-4 my-4 border-t border-white/5" />

                {/* Quick Info */}
                {!sidebarCollapsed && (
                    <div className="px-4">
                        <div className="bg-gradient-to-br from-teal-600/10 to-teal-500/5 border border-teal-500/10 rounded-xl p-3">
                            <p className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">System Status</p>
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full online-pulse" />
                                <span className="text-xs text-slate-300">All systems online</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Actions */}
                <div className={`absolute bottom-0 w-full p-3 border-t border-white/5 bg-slate-900/50 ${sidebarCollapsed ? 'px-2' : ''}`}>
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''} gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all group`}
                        title={sidebarCollapsed ? 'Back to Site' : undefined}
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {!sidebarCollapsed && <span>Back to Site</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-[68px]' : 'md:ml-64'}`}>
                {/* Top Bar */}
                <header className="h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="hidden md:block">
                            <p className="text-sm text-gray-500">{getGreeting()}, <span className="font-semibold text-gray-800">{user.name.split(' ')[0]}</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Date/Time */}
                        <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>

                        {/* Chat Notification Bell */}
                        <Link
                            href={route('admin.chat.index')}
                            className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {unreadChat > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold animate-pop-in ring-2 ring-white">
                                    {unreadChat}
                                </span>
                            )}
                        </Link>

                        {/* Divider */}
                        <div className="h-6 w-px bg-gray-200" />

                        {/* User Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors group">
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
                                    </div>
                                    <div className="text-left hidden sm:block">
                                        <p className="text-xs font-semibold text-gray-800 leading-tight">{user.name}</p>
                                        <p className="text-[10px] text-teal-600">{user.role_name}</p>
                                    </div>
                                    <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('dashboard')}>User Dashboard</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 animate-fade-in">{children}</main>
            </div>
        </div>
    );
}
