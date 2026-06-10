import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ScrollReveal from '@/Components/ScrollReveal';
import TemplateThumbnail from '@/Components/ResumeBuilder/TemplateThumbnail';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Index({ templates, resumes }) {
    const [creating, setCreating] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const handleSelectTemplate = (slug) => {
        setCreating(slug);
        router.post(route('resume-builder.store'), { template: slug }, {
            onFinish: () => setCreating(null),
        });
    };

    const handleDelete = async (id) => {
        if (deleteConfirmId !== id) {
            setDeleteConfirmId(id);
            return;
        }
        try {
            await axios.delete(route('resume-builder.destroy', id));
            router.reload({ only: ['resumes'] });
        } catch {
            // silently fail
        }
        setDeleteConfirmId(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Resume Builder" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal animation="fade-in-down">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Choose a template to get started, or continue editing an existing resume.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Template Grid */}
                    <ScrollReveal animation="fade-in-up" delay={100}>
                        <div className="mb-10">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Template</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {templates.map((tmpl, i) => (
                                    <div
                                        key={tmpl.slug}
                                        className="card-hover bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer group"
                                        style={{ animationDelay: `${i * 0.08}s` }}
                                        onClick={() => !creating && handleSelectTemplate(tmpl.slug)}
                                    >
                                        <div className="p-4 pb-3">
                                            <TemplateThumbnail slug={tmpl.slug} accentColor={tmpl.accentColor} />
                                        </div>
                                        <div className="px-4 pb-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div
                                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: tmpl.accentColor }}
                                                />
                                                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                    {tmpl.name}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                {tmpl.description}
                                            </p>
                                            {creating === tmpl.slug && (
                                                <div className="mt-2 flex items-center gap-1.5 text-xs text-teal-600">
                                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Creating...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Existing Resumes */}
                    {resumes.length > 0 && (
                        <ScrollReveal animation="fade-in-up" delay={200}>
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Resumes</h2>
                                <div className="space-y-2">
                                    {resumes.map((resume, i) => (
                                        <div
                                            key={resume.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                                            style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.08}s forwards`, opacity: 0 }}
                                        >
                                            <div className="flex items-center space-x-3 min-w-0">
                                                <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{resume.title}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)} template
                                                        <span className="mx-1.5 text-gray-300">|</span>
                                                        <span className={resume.status === 'completed' ? 'text-green-600' : 'text-amber-600'}>
                                                            {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1.5 flex-shrink-0">
                                                <a
                                                    href={route('resume-builder.edit', resume.id)}
                                                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                                                    title="Edit"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </a>
                                                <a
                                                    href={route('resume-builder.download', resume.id)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Download PDF"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </a>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(resume.id); }}
                                                    className={`p-2 rounded-lg transition-all ${
                                                        deleteConfirmId === resume.id
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                                    }`}
                                                    title={deleteConfirmId === resume.id ? 'Click again to confirm' : 'Delete'}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
