import { Link } from '@inertiajs/react';

export default function BuilderToolbar({ title, onTitleChange, saveStatus, onDownload, downloading }) {
    const statusConfig = {
        saved: { dot: 'bg-green-500', text: 'Saved', color: 'text-green-600' },
        saving: { dot: 'bg-amber-500 animate-pulse', text: 'Saving...', color: 'text-amber-600' },
        unsaved: { dot: 'bg-red-500', text: 'Unsaved', color: 'text-red-600' },
    };
    const status = statusConfig[saveStatus] || statusConfig.saved;

    return (
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Link
                            href={route('resume-builder.index')}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className="text-sm font-semibold text-gray-900 border-0 bg-transparent p-0 focus:ring-0 focus:outline-none min-w-0 flex-1 truncate"
                            placeholder="Resume title..."
                        />
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${status.dot}`} />
                            <span className={`text-xs font-medium ${status.color}`}>{status.text}</span>
                        </div>

                        <button
                            onClick={onDownload}
                            disabled={downloading}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                        >
                            {downloading ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )}
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
