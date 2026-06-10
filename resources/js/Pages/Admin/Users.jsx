import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef } from 'react';

function ToggleSwitch({ active, onChange, title }) {
    return (
        <button
            onClick={onChange}
            title={title}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                active ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                active ? 'translate-x-[18px]' : 'translate-x-[3px]'
            }`} />
        </button>
    );
}

function ActionTooltip({ children, text }) {
    return (
        <div className="relative group/tip">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-md opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {text}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
            </div>
        </div>
    );
}

export default function Users({ users, roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const searchRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search, role: filters.role, status: filters.status }, { preserveState: true });
    };

    const handleFilter = (key, value) => {
        router.get(route('admin.users.index'), { ...filters, search, [key]: value || undefined }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        router.get(route('admin.users.index'), {}, { preserveState: true });
    };

    const hasFilters = filters.search || filters.role || filters.status;

    const handleImpersonate = (userId) => {
        router.post(route('admin.impersonate.start', userId));
    };

    const handleToggleActive = (userId) => {
        router.patch(route('admin.users.toggleActive', userId), {}, { preserveState: true });
    };

    const handleDelete = (userId) => {
        router.delete(route('admin.users.destroy', userId), { preserveState: true });
        setShowDeleteModal(null);
    };

    const handleUpdateRole = (userId, roleId) => {
        router.patch(route('admin.users.updateRole', userId), { role_id: roleId || null }, { preserveState: true });
        setShowRoleModal(null);
    };

    const toggleSelectUser = (id) => {
        setSelectedUsers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === users.data.length) setSelectedUsers([]);
        else setSelectedUsers(users.data.map(u => u.id));
    };

    return (
        <AdminLayout>
            <Head title="Users Management" />

            <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {users.total} registered user{users.total !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {selectedUsers.length > 0 && (
                        <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100 animate-scale-in">
                            <span className="text-sm text-teal-700 font-medium">{selectedUsers.length} selected</span>
                            <button onClick={() => setSelectedUsers([])} className="text-xs text-teal-600 hover:text-teal-800 font-medium">Clear</button>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name or email..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => { setSearch(''); searchRef.current?.focus(); }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all font-medium"
                            >
                                Search
                            </button>
                        </form>
                        <select
                            value={filters.role || ''}
                            onChange={(e) => handleFilter('role', e.target.value)}
                            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                        >
                            <option value="">All Roles</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.slug}>{role.name}</option>
                            ))}
                        </select>
                        <select
                            value={filters.status || ''}
                            onChange={(e) => handleFilter('status', e.target.value)}
                            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Active Filters Chips */}
                    {hasFilters && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 animate-fade-in">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Active:</span>
                            {filters.search && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full text-[11px] font-medium">
                                    "{filters.search}"
                                    <button onClick={() => handleFilter('search', '')} className="hover:text-teal-900">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </span>
                            )}
                            {filters.role && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-[11px] font-medium">
                                    {filters.role}
                                    <button onClick={() => handleFilter('role', '')} className="hover:text-purple-900">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </span>
                            )}
                            {filters.status && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-medium">
                                    {filters.status}
                                    <button onClick={() => handleFilter('status', '')} className="hover:text-blue-900">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </span>
                            )}
                            <button onClick={clearFilters} className="text-[11px] text-gray-500 hover:text-gray-700 font-medium ml-auto">
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/70">
                                    <th className="px-5 py-3 w-8">
                                        <input
                                            type="checkbox"
                                            checked={users.data.length > 0 && selectedUsers.length === users.data.length}
                                            onChange={toggleSelectAll}
                                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
                                        />
                                    </th>
                                    <th className="px-5 py-3">User</th>
                                    <th className="px-5 py-3">Role</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Last Login</th>
                                    <th className="px-5 py-3">Joined</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.data.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className={`transition-all duration-200 animate-row-slide group ${
                                            selectedUsers.includes(user.id) ? 'bg-teal-50/50' : 'hover:bg-gray-50/50'
                                        }`}
                                        style={{ animationDelay: `${i * 30}ms` }}
                                    >
                                        <td className="px-5 py-3.5">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => toggleSelectUser(user.id)}
                                                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
                                            />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm ${
                                                        user.role_slug === 'super-admin' ? 'bg-gradient-to-br from-red-400 to-red-600 ring-2 ring-red-200' :
                                                        user.role_slug === 'admin' ? 'bg-gradient-to-br from-purple-400 to-purple-600 ring-2 ring-purple-200' :
                                                        'bg-gradient-to-br from-teal-400 to-teal-600'
                                                    }`}>
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
                                            <button
                                                onClick={() => setShowRoleModal(user)}
                                                className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all cursor-pointer hover:scale-105 ${
                                                    user.role_slug === 'super-admin' ? 'bg-red-50 text-red-600 hover:bg-red-100' :
                                                    user.role_slug === 'admin' ? 'bg-purple-50 text-purple-600 hover:bg-purple-100' :
                                                    user.role_slug === 'editor' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
                                                    'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {user.role}
                                            </button>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <ToggleSwitch
                                                active={user.is_active}
                                                onChange={() => handleToggleActive(user.id)}
                                                title={`Click to ${user.is_active ? 'deactivate' : 'activate'}`}
                                            />
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{user.last_login_at || <span className="text-gray-300">Never</span>}</td>
                                        <td className="px-5 py-3.5 text-xs text-gray-400">{user.created_at}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <ActionTooltip text="Impersonate">
                                                    <button
                                                        onClick={() => handleImpersonate(user.id)}
                                                        className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all hover:scale-110"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                </ActionTooltip>
                                                <ActionTooltip text="Delete">
                                                    <button
                                                        onClick={() => setShowDeleteModal(user)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </ActionTooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-16 text-center">
                                            <svg className="w-14 h-14 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="text-sm text-gray-500 font-medium">No users found</p>
                                            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                                            {hasFilters && (
                                                <button onClick={clearFilters} className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-medium">
                                                    Clear all filters →
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.last_page > 1 && (
                        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                            <p className="text-xs text-gray-500">
                                Showing <span className="font-semibold text-gray-700">{users.from}-{users.to}</span> of <span className="font-semibold text-gray-700">{users.total}</span>
                            </p>
                            <div className="flex gap-1">
                                {users.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                                            link.active
                                                ? 'bg-teal-600 text-white shadow-sm'
                                                : link.url
                                                ? 'text-gray-600 hover:bg-gray-100'
                                                : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-overlay-in" onClick={() => setShowDeleteModal(null)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-modal-in" onClick={(e) => e.stopPropagation()}>
                        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center">Delete User</h3>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            This will permanently remove <strong className="text-gray-700">{showDeleteModal.name}</strong> and all associated data.
                        </p>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteModal.id)}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700 transition-colors font-medium hover:shadow-lg hover:shadow-red-500/25"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Role Update Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-overlay-in" onClick={() => setShowRoleModal(null)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-modal-in" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                {showRoleModal.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Change Role</h3>
                                <p className="text-xs text-gray-500">{showRoleModal.name}</p>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <button
                                onClick={() => handleUpdateRole(showRoleModal.id, null)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between ${
                                    !showRoleModal.role_slug
                                        ? 'bg-teal-50 border-2 border-teal-500 text-teal-700 font-medium'
                                        : 'border border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-200'
                                }`}
                            >
                                <span>User (Default)</span>
                                {!showRoleModal.role_slug && (
                                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => handleUpdateRole(showRoleModal.id, role.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between ${
                                        showRoleModal.role_slug === role.slug
                                            ? 'bg-teal-50 border-2 border-teal-500 text-teal-700 font-medium'
                                            : 'border border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${
                                            role.slug === 'super-admin' ? 'bg-red-500' :
                                            role.slug === 'admin' ? 'bg-purple-500' :
                                            'bg-blue-500'
                                        }`} />
                                        <span>{role.name}</span>
                                    </div>
                                    {showRoleModal.role_slug === role.slug && (
                                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowRoleModal(null)}
                            className="w-full mt-4 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-50 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
