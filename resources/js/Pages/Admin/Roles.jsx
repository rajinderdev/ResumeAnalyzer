import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const roleIcons = {
    'super-admin': { color: 'from-red-500 to-rose-600', bg: 'bg-red-50', border: 'border-l-red-500' },
    'admin': { color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', border: 'border-l-purple-500' },
    'editor': { color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', border: 'border-l-blue-500' },
    'default': { color: 'from-teal-500 to-emerald-600', bg: 'bg-teal-50', border: 'border-l-teal-500' },
};

function getRoleStyle(slug) {
    return roleIcons[slug] || roleIcons['default'];
}

export default function Roles({ roles, permissions }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [form, setForm] = useState({ name: '', slug: '', description: '', permissions: [] });
    const [saving, setSaving] = useState(false);

    const openCreate = () => {
        setForm({ name: '', slug: '', description: '', permissions: [] });
        setShowCreateModal(true);
    };

    const openEdit = (role) => {
        setForm({
            name: role.name,
            slug: role.slug,
            description: role.description || '',
            permissions: role.permissions.map(p => p.id),
        });
        setShowEditModal(role);
    };

    const handleNameChange = (name) => {
        setForm({
            ...form,
            name,
            slug: showCreateModal ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : form.slug,
        });
    };

    const togglePermission = (permId) => {
        setForm({
            ...form,
            permissions: form.permissions.includes(permId)
                ? form.permissions.filter(id => id !== permId)
                : [...form.permissions, permId],
        });
    };

    const toggleGroupAll = (perms) => {
        const allIds = perms.map(p => p.id);
        const allSelected = allIds.every(id => form.permissions.includes(id));
        setForm({
            ...form,
            permissions: allSelected
                ? form.permissions.filter(id => !allIds.includes(id))
                : [...new Set([...form.permissions, ...allIds])],
        });
    };

    const handleCreate = () => {
        setSaving(true);
        router.post(route('admin.roles.store'), form, {
            preserveState: true,
            onSuccess: () => { setShowCreateModal(false); setSaving(false); },
            onError: () => setSaving(false),
        });
    };

    const handleUpdate = () => {
        setSaving(true);
        router.put(route('admin.roles.update', showEditModal.id), form, {
            preserveState: true,
            onSuccess: () => { setShowEditModal(null); setSaving(false); },
            onError: () => setSaving(false),
        });
    };

    const handleDelete = (roleId) => {
        router.delete(route('admin.roles.destroy', roleId), {
            preserveState: true,
            onSuccess: () => setShowDeleteModal(null),
        });
    };

    const permissionGroups = Object.entries(permissions);
    const totalPermissions = permissionGroups.reduce((sum, [, p]) => sum + p.length, 0);

    const RoleFormModal = ({ title, onSubmit, onClose }) => (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-overlay-in" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto animate-modal-in" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Configure role details and permissions</p>
                    </div>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
                            placeholder="e.g. Editor"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Slug</label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 font-mono transition-shadow"
                            placeholder="e.g. editor"
                            disabled={!!showEditModal}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Description</label>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
                            placeholder="Brief role description"
                        />
                    </div>

                    {permissionGroups.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Permissions
                                    <span className="text-gray-400 ml-1">({form.permissions.length}/{totalPermissions})</span>
                                </label>
                                {/* Progress indicator */}
                                <div className="w-20 bg-gray-100 rounded-full h-1.5">
                                    <div
                                        className="bg-teal-500 h-1.5 rounded-full transition-all duration-300"
                                        style={{ width: `${totalPermissions > 0 ? (form.permissions.length / totalPermissions) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {permissionGroups.map(([group, perms]) => {
                                    const allIds = perms.map(p => p.id);
                                    const allSelected = allIds.every(id => form.permissions.includes(id));
                                    const someSelected = allIds.some(id => form.permissions.includes(id));
                                    return (
                                        <div key={group} className="border border-gray-100 rounded-xl overflow-hidden">
                                            <div className="flex items-center justify-between bg-gray-50/50 px-3.5 py-2">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                                                        {group || 'General'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => toggleGroupAll(perms)}
                                                    className="text-[10px] text-teal-600 hover:text-teal-700 font-medium"
                                                >
                                                    {allSelected ? 'Deselect all' : 'Select all'}
                                                </button>
                                            </div>
                                            <div className="px-3.5 py-2 space-y-1">
                                                {perms.map((perm) => (
                                                    <label key={perm.id} className="flex items-center gap-2.5 cursor-pointer py-1 px-1 rounded-lg hover:bg-gray-50 transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            checked={form.permissions.includes(perm.id)}
                                                            onChange={() => togglePermission(perm.id)}
                                                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
                                                        />
                                                        <span className="text-sm text-gray-700">{perm.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={saving || !form.name || !form.slug}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl text-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : null}
                        {showEditModal ? 'Update Role' : 'Create Role'}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <Head title="Roles & Permissions" />

            <div className="space-y-6">
                <div className="flex items-center justify-between animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
                        <p className="text-sm text-gray-500 mt-1">{roles.length} roles configured with {totalPermissions} permissions</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all hover:-translate-y-0.5 font-medium flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Role
                    </button>
                </div>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roles.map((role, i) => {
                        const style = getRoleStyle(role.slug);
                        return (
                            <div
                                key={role.id}
                                className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 border-l-4 ${style.border} hover:shadow-lg hover:border-gray-200 transition-all duration-300 group animate-fade-in-up`}
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all flex-shrink-0`}>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-base font-semibold text-gray-900">{role.name}</h3>
                                                {(role.slug === 'admin' || role.slug === 'super-admin') && (
                                                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-100 text-amber-700 uppercase tracking-wider">System</span>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">{role.slug}</p>
                                            {role.description && (
                                                <p className="text-xs text-gray-500 mt-1.5">{role.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${style.bg} flex items-center gap-1`}>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {role.users_count}
                                    </span>
                                </div>

                                {/* Permissions */}
                                {role.permissions.length > 0 ? (
                                    <div className="mt-4">
                                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">
                                            {role.permissions.length} Permission{role.permissions.length > 1 ? 's' : ''}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {role.permissions.slice(0, 4).map((perm) => (
                                                <span key={perm.id} className="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-600 rounded-md font-medium">
                                                    {perm.name}
                                                </span>
                                            ))}
                                            {role.permissions.length > 4 && (
                                                <span className="px-2 py-0.5 text-[10px] bg-teal-50 text-teal-600 rounded-md font-medium">
                                                    +{role.permissions.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <p className="text-[11px] text-gray-400 italic">No permissions assigned</p>
                                    </div>
                                )}

                                <div className="mt-5 flex gap-2 pt-4 border-t border-gray-50">
                                    <button
                                        onClick={() => openEdit(role)}
                                        className="flex-1 px-3 py-2 text-xs font-medium text-teal-700 bg-teal-50 rounded-xl hover:bg-teal-100 transition-all flex items-center justify-center gap-1.5 hover:shadow-sm"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                    {!['admin', 'super-admin'].includes(role.slug) && (
                                        <button
                                            onClick={() => setShowDeleteModal(role)}
                                            className="px-3 py-2 text-xs font-medium text-red-700 bg-red-50 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-1.5 hover:shadow-sm"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {roles.length === 0 && (
                        <div className="col-span-full bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 font-medium">No roles created yet</p>
                            <p className="text-sm text-gray-400 mt-1">Define roles to manage user access</p>
                            <button
                                onClick={openCreate}
                                className="mt-4 px-5 py-2 bg-teal-600 text-white text-sm rounded-xl hover:bg-teal-700 transition-colors font-medium"
                            >
                                Create first role →
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showCreateModal && <RoleFormModal title="Create New Role" onSubmit={handleCreate} onClose={() => setShowCreateModal(false)} />}
            {showEditModal && <RoleFormModal title={`Edit: ${showEditModal.name}`} onSubmit={handleUpdate} onClose={() => setShowEditModal(null)} />}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-overlay-in" onClick={() => setShowDeleteModal(null)}>
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-modal-in" onClick={(e) => e.stopPropagation()}>
                        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 text-center">Delete Role</h3>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Permanently delete <strong className="text-gray-700">{showDeleteModal.name}</strong>?
                            {showDeleteModal.users_count > 0 && (
                                <span className="block mt-1 text-amber-600 text-xs font-medium">
                                    This will affect {showDeleteModal.users_count} user(s).
                                </span>
                            )}
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
                                Delete Role
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
