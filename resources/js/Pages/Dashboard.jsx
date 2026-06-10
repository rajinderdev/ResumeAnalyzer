import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimatedScoreGauge from '@/Components/AnimatedScoreGauge';
import ScrollReveal from '@/Components/ScrollReveal';
import ResumeDetailModal from '@/Components/ResumeDetailModal';
import { Head, usePage, router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import axios from 'axios';

function StatCard({ icon, label, value, color = 'teal', delay = 0 }) {
    const colors = {
        teal: 'bg-teal-50 text-teal-600 border-teal-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        red: 'bg-red-50 text-red-600 border-red-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
    };

    return (
        <ScrollReveal animation="fade-in-up" delay={delay}>
            <div className="card-hover bg-white rounded-xl border border-gray-200 p-4 cursor-default">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colors[color]}`}>
                        {icon}
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">{label}</p>
                        <p className="text-lg font-bold text-gray-900">{value}</p>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}

function UploadZone({ onUploadComplete }) {
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) uploadFile(file);
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) uploadFile(file);
    };

    const uploadFile = async (file) => {
        setUploadedFile(null);
        setUploadError(null);
        setUploadProgress(0);
        setAnalyzing(false);

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post(route('resumes.upload'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    const percent = Math.round((e.loaded * 100) / e.total);
                    setUploadProgress(percent);
                    if (percent >= 100) {
                        setAnalyzing(true);
                    }
                },
            });

            setUploadedFile(file);
            setAnalyzing(false);
            onUploadComplete?.(response.data.resume);
        } catch (err) {
            setAnalyzing(false);
            setUploadProgress(null);
            const message = err.response?.data?.errors?.resume?.[0]
                || err.response?.data?.message
                || 'Upload failed. Please try again.';
            setUploadError(message);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload your resume</h2>
            <p className="text-sm text-gray-500 mb-4">Drop your resume file here or click to browse. We accept PDF and DOCX formats.</p>

            <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                        ? 'border-teal-400 bg-teal-50 scale-[1.02]'
                        : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
            >
                <input type="file" id="dashboard-upload" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileSelect} />

                {analyzing ? (
                    <div className="animate-fade-in">
                        <svg className="w-10 h-10 text-teal-500 mx-auto mb-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <p className="text-sm text-teal-600 font-medium mb-1">Analyzing your resume...</p>
                        <p className="text-xs text-gray-500">Extracting text and scoring</p>
                    </div>
                ) : uploadProgress !== null && uploadProgress < 100 ? (
                    <div className="animate-fade-in">
                        <svg className="w-10 h-10 text-teal-500 mx-auto mb-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-teal-600 font-medium mb-3">Uploading...</p>
                        <div className="w-48 mx-auto bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-teal-500 h-2 rounded-full transition-all duration-200"
                                style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{Math.round(Math.min(uploadProgress, 100))}%</p>
                    </div>
                ) : uploadedFile ? (
                    <div className="animate-scale-in">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-green-700 mb-1">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500 mb-3">Uploaded and analyzed successfully</p>
                        <button
                            onClick={() => { setUploadedFile(null); setUploadProgress(null); }}
                            className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                        >
                            Upload another file
                        </button>
                    </div>
                ) : (
                    <>
                        {uploadError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{uploadError}</p>
                            </div>
                        )}
                        <svg className={`w-10 h-10 mx-auto mb-3 transition-colors duration-300 ${dragActive ? 'text-teal-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-1">
                            Drag & drop or{' '}
                            <label htmlFor="dashboard-upload" className="text-teal-600 font-medium hover:underline cursor-pointer">browse files</label>
                        </p>
                        <p className="text-xs text-gray-400">PDF, DOCX up to 5MB</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Dashboard({ resumes = [], latestResume = null }) {
    const { auth } = usePage().props;
    const firstName = auth.user.name.split(' ')[0];

    const [modalResume, setModalResume] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingResumeId, setLoadingResumeId] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const hasResumes = resumes.length > 0;
    const overallScore = latestResume?.overall_score ?? 0;
    const atsScore = latestResume?.ats_score ?? 0;
    const keywordScore = latestResume?.keyword_score ?? 0;
    const formattingScore = latestResume?.formatting_score ?? 0;
    const contentScore = latestResume?.content_score ?? 0;
    const keywordsFound = latestResume?.keywords_found ?? [];
    const keywordsMissing = latestResume?.keywords_missing ?? [];
    const suggestions = latestResume?.suggestions ?? [];

    const averageScore = hasResumes
        ? Math.round(resumes.filter(r => r.overall_score !== null).reduce((sum, r) => sum + r.overall_score, 0) / Math.max(resumes.filter(r => r.overall_score !== null).length, 1))
        : 0;

    const handleUploadComplete = () => {
        router.reload({ only: ['resumes', 'latestResume'] });
    };

    const openResumeModal = async (resumeId) => {
        setLoadingResumeId(resumeId);
        try {
            const response = await axios.get(route('resumes.show', resumeId));
            setModalResume(response.data.resume);
            setShowModal(true);
        } catch {
            // silently fail
        } finally {
            setLoadingResumeId(null);
        }
    };

    const handleDelete = async (resumeId) => {
        if (deleteConfirmId !== resumeId) {
            setDeleteConfirmId(resumeId);
            return;
        }

        setDeleting(true);
        try {
            await axios.delete(route('resumes.destroy', resumeId));
            setShowModal(false);
            setModalResume(null);
            setDeleteConfirmId(null);
            router.reload({ only: ['resumes', 'latestResume'] });
        } catch {
            // silently fail
        } finally {
            setDeleting(false);
        }
    };

    const scoreColor = (val) => {
        if (val >= 70) return '#14b8a6';
        if (val >= 50) return '#f59e0b';
        return '#ef4444';
    };

    const scoreColorClass = (val) => {
        if (val >= 70) return 'text-teal-600';
        if (val >= 50) return 'text-amber-600';
        return 'text-red-500';
    };

    const barColorClass = (val) => {
        if (val >= 70) return 'bg-teal-500';
        if (val >= 50) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <ScrollReveal animation="fade-in-down">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {firstName}</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                {hasResumes
                                    ? 'Here\'s your resume analysis overview and improvement suggestions.'
                                    : 'Upload your first resume to get started with analysis.'}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <ScrollReveal animation="fade-in-up">
                                <UploadZone onUploadComplete={handleUploadComplete} />
                            </ScrollReveal>

                            {/* Recent History */}
                            <ScrollReveal animation="fade-in-up" delay={100}>
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Recent History</h2>
                                        {hasResumes && (
                                            <span className="text-xs text-gray-500">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</span>
                                        )}
                                    </div>
                                    {hasResumes ? (
                                        <div className="space-y-2">
                                            {resumes.slice(0, 5).map((item, i) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
                                                    style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.1}s forwards`, opacity: 0 }}
                                                    onClick={() => openResumeModal(item.id)}
                                                >
                                                    <div className="flex items-center space-x-3 min-w-0">
                                                        <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors flex-shrink-0">
                                                            {loadingResumeId === item.id ? (
                                                                <svg className="w-4 h-4 text-teal-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">{item.original_name}</p>
                                                            <p className="text-xs text-gray-500">{item.created_at_formatted}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3 flex-shrink-0">
                                                        {item.status === 'completed' && item.overall_score !== null ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                                    <div
                                                                        className={`h-1.5 rounded-full ${barColorClass(item.overall_score)}`}
                                                                        style={{ width: `${item.overall_score}%`, transition: 'width 1s ease-out' }}
                                                                    />
                                                                </div>
                                                                <span className={`text-sm font-semibold min-w-[45px] text-right ${scoreColorClass(item.overall_score)}`}>
                                                                    {item.overall_score}/100
                                                                </span>
                                                            </div>
                                                        ) : item.status === 'failed' ? (
                                                            <span className="text-xs text-red-500 font-medium">Failed</span>
                                                        ) : (
                                                            <span className="text-xs text-amber-500 font-medium">Processing...</span>
                                                        )}
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                                            className={`p-1.5 rounded-lg transition-all ${
                                                                deleteConfirmId === item.id
                                                                    ? 'bg-red-100 text-red-600'
                                                                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100'
                                                            }`}
                                                            title={deleteConfirmId === item.id ? 'Click again to confirm' : 'Delete'}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                        <svg className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-sm text-gray-500">No resumes uploaded yet</p>
                                            <p className="text-xs text-gray-400 mt-1">Upload your first resume above to get started</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>

                            {/* Formatting Suggestions */}
                            <ScrollReveal animation="fade-in-up" delay={200}>
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Formatting Suggestions</h2>
                                        {suggestions.length > 0 && (
                                            <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                                                {suggestions.filter(s => s.type !== 'success').length} items
                                            </span>
                                        )}
                                    </div>
                                    {suggestions.length > 0 ? (
                                        <div className="space-y-2.5">
                                            {suggestions.map((item, i) => {
                                                const styles = {
                                                    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500', iconBg: 'bg-amber-100' },
                                                    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', iconBg: 'bg-blue-100' },
                                                    success: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-500', iconBg: 'bg-green-100' },
                                                };
                                                const s = styles[item.type] || styles.info;
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`flex items-start space-x-3 p-3.5 rounded-xl ${s.bg} border ${s.border} transition-all duration-200 hover:shadow-sm cursor-default`}
                                                        style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.08}s forwards`, opacity: 0 }}
                                                    >
                                                        <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                            <svg className={`w-4 h-4 ${s.icon}`} fill="currentColor" viewBox="0 0 20 20">
                                                                {item.type === 'success' ? (
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                ) : item.type === 'info' ? (
                                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                                ) : (
                                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                )}
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6">
                                            <p className="text-sm text-gray-500">Upload a resume to get personalized suggestions</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>

                            {/* Pro Tip */}
                            <ScrollReveal animation="fade-in-up" delay={300}>
                                <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white overflow-hidden group">
                                    {/* Decorative elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/4" />

                                    <div className="flex items-start space-x-4 relative z-10">
                                        <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1z" />
                                                <path fillRule="evenodd" d="M8 10a2 2 0 114 0 2 2 0 01-4 0zm2 6a1 1 0 01-1-1v-1h2v1a1 1 0 01-1 1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1.5">Pro Tip</h3>
                                            <p className="text-teal-100 text-sm leading-relaxed">
                                                Keep your resume and cover letter tailored to each specific job description.
                                                Our AI can help match keywords from job postings to improve your ATS score significantly.
                                            </p>
                                            <button className="mt-4 text-sm font-medium bg-white/20 hover:bg-white/30 px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-100 backdrop-blur-sm">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right Column - Score & Stats */}
                        <div className="space-y-5">
                            <ScrollReveal animation="fade-in-right">
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    {hasResumes && latestResume ? (
                                        <>
                                            <AnimatedScoreGauge score={overallScore} />
                                            <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                                                {[
                                                    { label: 'ATS Compatibility', value: atsScore },
                                                    { label: 'Keyword Match', value: keywordScore },
                                                    { label: 'Formatting', value: formattingScore },
                                                    { label: 'Content Quality', value: contentScore },
                                                ].map((item) => (
                                                    <div key={item.label}>
                                                        <div className="flex justify-between text-xs mb-1.5">
                                                            <span className="text-gray-600">{item.label}</span>
                                                            <span className="font-semibold" style={{ color: scoreColor(item.value) }}>{item.value}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                                            <div
                                                                className="h-2 rounded-full transition-all duration-1000 ease-out"
                                                                style={{
                                                                    width: `${item.value}%`,
                                                                    backgroundColor: scoreColor(item.value),
                                                                    animation: `fillBar 1.2s ease-out`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-4">
                                            <div className="relative w-36 h-36 mx-auto">
                                                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 144 144">
                                                    <circle cx="72" cy="72" r="64" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-bold text-gray-300">--</span>
                                                    <span className="text-xs text-gray-400">/100</span>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-400 mt-3">Resume Score</p>
                                            <p className="text-xs text-gray-400 mt-1">Upload a resume to see your score</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>

                            <StatCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                label="Average Score"
                                value={hasResumes ? averageScore : '--'}
                                color="blue"
                                delay={100}
                            />
                            <StatCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
                                label="Keywords Found"
                                value={latestResume ? `${keywordsFound.length}/${keywordsFound.length + keywordsMissing.length}` : '--'}
                                color="teal"
                                delay={200}
                            />
                            <StatCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                label="Keywords Missing"
                                value={latestResume ? keywordsMissing.length : '--'}
                                color="red"
                                delay={300}
                            />

                            <ScrollReveal animation="fade-in-right" delay={400}>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Missing Keywords</h3>
                                    {keywordsMissing.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {keywordsMissing.slice(0, 12).map((kw, i) => (
                                                <span
                                                    key={kw}
                                                    className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-200 hover:bg-red-100 transition-colors cursor-default"
                                                    style={{ animation: `scaleIn 0.3s ease-out ${i * 0.05}s forwards`, opacity: 0 }}
                                                >
                                                    {kw}
                                                </span>
                                            ))}
                                            {keywordsMissing.length > 12 && (
                                                <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                                                    +{keywordsMissing.length - 12} more
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400">
                                            {hasResumes ? 'No missing keywords detected' : 'Upload a resume to see keyword analysis'}
                                        </p>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>

            <ResumeDetailModal
                show={showModal}
                resume={modalResume}
                onClose={() => { setShowModal(false); setModalResume(null); setDeleteConfirmId(null); }}
                onDelete={handleDelete}
                deleting={deleting}
            />
        </AuthenticatedLayout>
    );
}
