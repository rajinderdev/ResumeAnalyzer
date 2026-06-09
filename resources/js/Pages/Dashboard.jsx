import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimatedScoreGauge from '@/Components/AnimatedScoreGauge';
import ScrollReveal from '@/Components/ScrollReveal';
import { Head, usePage } from '@inertiajs/react';
import { useState, useCallback } from 'react';

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

function UploadZone() {
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) simulateUpload(file);
    }, []);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) simulateUpload(file);
    };

    const simulateUpload = (file) => {
        setUploadedFile(null);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadedFile(file);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 200);
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

                {uploadProgress !== null && uploadProgress < 100 ? (
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
                        <p className="text-xs text-gray-500 mb-3">Uploaded successfully</p>
                        <button
                            onClick={() => { setUploadedFile(null); setUploadProgress(null); }}
                            className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                        >
                            Upload another file
                        </button>
                    </div>
                ) : (
                    <>
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

export default function Dashboard() {
    const { auth } = usePage().props;
    const firstName = auth.user.name.split(' ')[0];

    const recentHistory = [
        { name: 'resume_v3.pdf', date: 'Jun 8, 2026', score: 78 },
        { name: 'resume_v2.pdf', date: 'Jun 5, 2026', score: 65 },
        { name: 'resume_v1.pdf', date: 'Jun 1, 2026', score: 52 },
    ];

    const suggestions = [
        { type: 'warning', text: 'Add more quantifiable achievements to your experience section' },
        { type: 'warning', text: 'Include 2-3 more industry-specific keywords from the job description' },
        { type: 'info', text: 'Consider using a single-column layout for better ATS compatibility' },
        { type: 'success', text: 'Good use of action verbs in bullet points' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <ScrollReveal animation="fade-in-down">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {firstName} 👋</h1>
                            <p className="text-gray-500 text-sm mt-1">Here's your resume analysis overview and improvement suggestions.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <ScrollReveal animation="fade-in-up">
                                <UploadZone />
                            </ScrollReveal>

                            {/* Recent History */}
                            <ScrollReveal animation="fade-in-up" delay={100}>
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Recent History</h2>
                                        <button className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors">View all</button>
                                    </div>
                                    <div className="space-y-2">
                                        {recentHistory.map((item, i) => (
                                            <div
                                                key={item.name}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
                                                style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.1}s forwards`, opacity: 0 }}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                                                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                            <div
                                                                className={`h-1.5 rounded-full ${item.score >= 70 ? 'bg-teal-500' : item.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                                style={{ width: `${item.score}%`, transition: 'width 1s ease-out' }}
                                                            />
                                                        </div>
                                                        <span className={`text-sm font-semibold min-w-[45px] text-right ${item.score >= 70 ? 'text-teal-600' : item.score >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                                                            {item.score}/100
                                                        </span>
                                                    </div>
                                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Formatting Suggestions */}
                            <ScrollReveal animation="fade-in-up" delay={200}>
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900">Formatting Suggestions</h2>
                                        <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">{suggestions.filter(s => s.type !== 'success').length} items</span>
                                    </div>
                                    <div className="space-y-2.5">
                                        {suggestions.map((item, i) => {
                                            const styles = {
                                                warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500', iconBg: 'bg-amber-100' },
                                                info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', iconBg: 'bg-blue-100' },
                                                success: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-500', iconBg: 'bg-green-100' },
                                            };
                                            const s = styles[item.type];
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
                                    <AnimatedScoreGauge score={78} />

                                    <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                                        {[
                                            { label: 'ATS Compatibility', value: 82, color: '#14b8a6' },
                                            { label: 'Keyword Match', value: 75, color: '#f59e0b' },
                                            { label: 'Formatting', value: 90, color: '#10b981' },
                                            { label: 'Content Quality', value: 68, color: '#f59e0b' },
                                        ].map((item) => (
                                            <div key={item.label}>
                                                <div className="flex justify-between text-xs mb-1.5">
                                                    <span className="text-gray-600">{item.label}</span>
                                                    <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${item.value}%`,
                                                            backgroundColor: item.color,
                                                            animation: `fillBar 1.2s ease-out`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            <StatCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                                label="Average Score"
                                value="72"
                                color="blue"
                                delay={100}
                            />
                            <StatCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
                                label="Keywords Found"
                                value="18/24"
                                color="teal"
                                delay={200}
                            />
                            <StatCard
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                label="Keywords Missing"
                                value="6"
                                color="red"
                                delay={300}
                            />

                            <ScrollReveal animation="fade-in-right" delay={400}>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Missing Keywords</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Agile', 'CI/CD', 'TypeScript', 'Docker', 'AWS', 'GraphQL'].map((kw, i) => (
                                            <span
                                                key={kw}
                                                className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-200 hover:bg-red-100 transition-colors cursor-default"
                                                style={{ animation: `scaleIn 0.3s ease-out ${i * 0.05}s forwards`, opacity: 0 }}
                                            >
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
