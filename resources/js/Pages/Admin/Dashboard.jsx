import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, duration = 1200 }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = value / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= value) { setDisplay(value); clearInterval(timer); }
            else setDisplay(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [value, visible]);

    return <span ref={ref}>{display.toLocaleString()}</span>;
}

function MiniSparkline({ data, color = '#0d9488' }) {
    if (!data || data.length < 2) return null;
    const max = Math.max(...data, 1);
    const w = 80, h = 28;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
    const areaPoints = `0,${h} ${points} ${w},${h}`;
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-20 h-7" preserveAspectRatio="none">
            <defs>
                <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            <polygon points={areaPoints} fill={`url(#spark-${color})`} />
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Dashboard({ stats, recentUsers, userGrowth }) {
    const growthData = userGrowth.map(d => d.count);

    const statCards = [
        {
            label: 'Total Users', value: stats.totalUsers, change: `+${stats.newUsersToday} today`,
            positive: true, gradient: 'from-blue-500 to-blue-600', sparkData: growthData,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            label: 'Active Users', value: stats.activeUsers,
            change: `${stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}% of total`,
            positive: true, gradient: 'from-teal-500 to-emerald-500',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            label: 'New This Week', value: stats.newUsersThisWeek,
            change: `${stats.newUsersThisMonth} this month`,
            positive: stats.newUsersThisWeek > 0, gradient: 'from-purple-500 to-violet-500',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
        {
            label: 'Unread Messages', value: stats.unreadMessages,
            change: 'Pending support',
            positive: false, gradient: 'from-amber-500 to-orange-500',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
    ];

    const maxGrowth = Math.max(...(userGrowth.length ? userGrowth.map(d => d.count) : [1]));
    const roleColors = ['bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500'];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-sm text-gray-500 mt-1">Monitor your platform's performance at a glance.</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={route('admin.users.index')}
                            className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all hover:-translate-y-0.5 font-medium flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
                            </svg>
                            View All Users
                        </Link>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((card, i) => (
                        <div
                            key={card.label}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 stat-card-shine animate-fade-in-up group"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">
                                        <AnimatedNumber value={card.value} />
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                                            card.positive ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {card.positive ? '↑' : '●'} {card.change}
                                        </span>
                                    </div>
                                </div>
                                <div className={`w-11 h-11 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                            </div>
                            {card.sparkData && card.sparkData.length > 1 && (
                                <div className="mt-3 -mb-1">
                                    <MiniSparkline data={card.sparkData} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Growth Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">User Growth</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Last 30 days</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                                New signups
                            </div>
                        </div>
                        {userGrowth.length > 0 ? (
                            <div className="relative">
                                {/* Y-axis labels */}
                                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-300 pr-2">
                                    <span>{maxGrowth}</span>
                                    <span>{Math.round(maxGrowth / 2)}</span>
                                    <span>0</span>
                                </div>
                                <div className="ml-6">
                                    {/* Grid lines */}
                                    <div className="relative h-48 border-b border-gray-100">
                                        <div className="absolute top-0 left-0 right-0 border-t border-dashed border-gray-50" />
                                        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-50" />
                                        <div className="flex items-end gap-[2px] h-full">
                                            {userGrowth.map((day, i) => (
                                                <div key={day.date} className="flex-1 flex flex-col items-center justify-end group relative">
                                                    <div className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-xl z-10 pointer-events-none">
                                                        <div className="font-semibold">{day.count} users</div>
                                                        <div className="text-slate-400">{day.date}</div>
                                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-slate-800" />
                                                    </div>
                                                    <div
                                                        className="w-full rounded-t-sm cursor-pointer transition-all duration-200 hover:opacity-80 animate-grow-bar"
                                                        style={{
                                                            height: `${Math.max((day.count / maxGrowth) * 100, 3)}%`,
                                                            background: `linear-gradient(to top, #0d9488, #14b8a6)`,
                                                            animationDelay: `${i * 25}ms`,
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-48 flex items-center justify-center text-gray-400 bg-gray-50/50 rounded-xl">
                                <div className="text-center">
                                    <svg className="w-10 h-10 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <p className="text-sm">No data yet. Users will appear here.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Roles Distribution */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-semibold text-gray-900">Roles</h3>
                            <Link href={route('admin.roles.index')} className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                                Manage →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {stats.roles.map((role, i) => {
                                const percentage = stats.totalUsers > 0 ? Math.round((role.users_count / stats.totalUsers) * 100) : 0;
                                return (
                                    <div key={role.id} className="group">
                                        <div className="flex justify-between items-center text-sm mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${roleColors[i % roleColors.length]}`} />
                                                <span className="font-medium text-gray-700">{role.name}</span>
                                            </div>
                                            <span className="text-xs text-gray-400 tabular-nums">{role.users_count} <span className="text-gray-300">({percentage}%)</span></span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`${roleColors[i % roleColors.length]} h-full rounded-full transition-all duration-1000 ease-out`}
                                                style={{ width: `${Math.max(percentage, 2)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {stats.roles.length === 0 && (
                                <p className="text-sm text-gray-400 text-center py-4">No roles configured yet.</p>
                            )}
                        </div>

                        {/* Total */}
                        <div className="mt-5 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Total assigned</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {stats.roles.reduce((sum, r) => sum + r.users_count, 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">Recent Users</h3>
                                <p className="text-[11px] text-gray-400">Latest registrations</p>
                            </div>
                        </div>
                        <Link href={route('admin.users.index')} className="text-xs text-teal-600 hover:text-teal-700 font-medium px-3 py-1.5 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                    <th className="px-5 py-3">User</th>
                                    <th className="px-5 py-3">Role</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Joined</th>
                                    <th className="px-5 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentUsers.map((user, i) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors animate-row-slide" style={{ animationDelay: `${(i + 1) * 60}ms` }}>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                                                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                    </div>
                                                    {user.is_active && (
                                                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-[11px] text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${
                                                user.role === 'Super Admin' ? 'bg-red-50 text-red-600' :
                                                user.role === 'Admin' ? 'bg-purple-50 text-purple-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>{user.role}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`flex items-center gap-1.5 text-[11px] font-medium ${user.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-green-500 online-pulse' : 'bg-gray-300'}`} />
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{user.created_at}</td>
                                        <td className="px-5 py-3.5">
                                            <Link
                                                href={route('admin.users.index', { search: user.email })}
                                                className="text-[11px] text-teal-600 hover:text-teal-700 font-medium opacity-0 group-hover:opacity-100"
                                            >
                                                View →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {recentUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                                            <svg className="w-10 h-10 mx-auto mb-2 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="text-sm">No users yet.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    {[
                        { href: route('admin.users.index'), label: 'Manage Users', desc: 'View, edit & impersonate', iconBg: 'from-blue-500 to-blue-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" /> },
                        { href: route('admin.roles.index'), label: 'Roles & Permissions', desc: 'Configure access control', iconBg: 'from-purple-500 to-violet-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
                        { href: route('admin.chat.index'), label: 'Chat Support', desc: `${stats.unreadMessages} unread messages`, iconBg: 'from-amber-500 to-orange-500', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group admin-card-border"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className={`w-11 h-11 bg-gradient-to-br ${item.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{item.label}</p>
                                    <p className="text-[11px] text-gray-400">{item.desc}</p>
                                </div>
                                <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
