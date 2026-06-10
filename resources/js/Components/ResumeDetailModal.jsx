import Modal from '@/Components/Modal';
import AnimatedScoreGauge from '@/Components/AnimatedScoreGauge';

function ScoreBar({ label, value, color }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600">{label}</span>
                <span className="font-semibold" style={{ color }}>{value ?? '--'}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${value ?? 0}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}

function SuggestionItem({ type, text }) {
    const styles = {
        warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500', iconBg: 'bg-amber-100' },
        info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', iconBg: 'bg-blue-100' },
        success: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-500', iconBg: 'bg-green-100' },
    };
    const s = styles[type] || styles.info;

    return (
        <div className={`flex items-start space-x-3 p-3 rounded-xl ${s.bg} border ${s.border}`}>
            <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <svg className={`w-4 h-4 ${s.icon}`} fill="currentColor" viewBox="0 0 20 20">
                    {type === 'success' ? (
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    ) : type === 'info' ? (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    ) : (
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    )}
                </svg>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
        </div>
    );
}

export default function ResumeDetailModal({ show, resume, onClose, onDelete, deleting }) {
    if (!resume) return null;

    const scoreColor = (val) => {
        if (val >= 70) return '#14b8a6';
        if (val >= 50) return '#f59e0b';
        return '#ef4444';
    };

    const formattedDate = resume.created_at
        ? new Date(resume.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : '';

    const formatFileSize = (bytes) => {
        if (!bytes) return '';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <Modal show={show} maxWidth="4xl" onClose={onClose}>
            <div className="p-6 max-h-[85vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg font-semibold text-gray-900 truncate">{resume.original_name}</h2>
                            <p className="text-xs text-gray-500">{formattedDate}{resume.file_size ? ` \u00B7 ${formatFileSize(resume.file_size)}` : ''}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <a
                            href={route('resumes.download', resume.id)}
                            className="inline-flex items-center px-3 py-2 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download
                        </a>
                        <button
                            onClick={() => onDelete(resume.id)}
                            disabled={deleting}
                            className="inline-flex items-center px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {resume.status === 'failed' ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 font-medium">Analysis failed</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {resume.suggestions?.[0]?.text || 'Could not process this resume. Please try uploading again.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Left - Scores */}
                        <div className="md:col-span-1 space-y-4">
                            <div className="bg-gray-50 rounded-xl p-5">
                                <AnimatedScoreGauge score={resume.overall_score ?? 0} size={120} />
                                <div className="mt-4 space-y-3">
                                    <ScoreBar label="ATS Compatibility" value={resume.ats_score} color={scoreColor(resume.ats_score ?? 0)} />
                                    <ScoreBar label="Keyword Match" value={resume.keyword_score} color={scoreColor(resume.keyword_score ?? 0)} />
                                    <ScoreBar label="Formatting" value={resume.formatting_score} color={scoreColor(resume.formatting_score ?? 0)} />
                                    <ScoreBar label="Content Quality" value={resume.content_score} color={scoreColor(resume.content_score ?? 0)} />
                                </div>
                            </div>
                        </div>

                        {/* Right - Details */}
                        <div className="md:col-span-2 space-y-5">
                            {/* Keywords */}
                            {(resume.keywords_found?.length > 0 || resume.keywords_missing?.length > 0) && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Keywords</h3>
                                    {resume.keywords_found?.length > 0 && (
                                        <div className="mb-3">
                                            <p className="text-xs text-gray-500 mb-2">Found ({resume.keywords_found.length})</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {resume.keywords_found.map((kw) => (
                                                    <span key={kw} className="px-2.5 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">{kw}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {resume.keywords_missing?.length > 0 && (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">Missing ({resume.keywords_missing.length})</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {resume.keywords_missing.map((kw) => (
                                                    <span key={kw} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-200">{kw}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Suggestions */}
                            {resume.suggestions?.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Suggestions</h3>
                                    <div className="space-y-2">
                                        {resume.suggestions.map((s, i) => (
                                            <SuggestionItem key={i} type={s.type} text={s.text} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Extracted Content Preview */}
                            {resume.parsed_content && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Content Preview</h3>
                                    <div className="bg-gray-50 rounded-xl p-4 max-h-48 overflow-y-auto">
                                        <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
                                            {resume.parsed_content.length > 2000
                                                ? resume.parsed_content.substring(0, 2000) + '...'
                                                : resume.parsed_content}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
