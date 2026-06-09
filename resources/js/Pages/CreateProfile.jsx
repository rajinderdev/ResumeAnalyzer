import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import ScrollReveal from '@/Components/ScrollReveal';
import { useState } from 'react';

export default function CreateProfile() {
    const { auth } = usePage().props;
    const [fileName, setFileName] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [focusedField, setFocusedField] = useState(null);
    const [completedFields, setCompletedFields] = useState(new Set());

    const { data, setData, post, processing, errors } = useForm({
        full_name: auth.user.name || '',
        email: auth.user.email || '',
        phone: '',
        job_title: '',
        experience_level: '',
        industry: '',
        resume: null,
    });

    const totalFields = 6;
    const filledFields = ['full_name', 'email', 'phone', 'job_title', 'experience_level', 'industry']
        .filter((f) => data[f]).length;
    const profileCompletion = Math.round((filledFields / totalFields) * 100);

    const handleFieldChange = (field, value) => {
        setData(field, value);
        if (value) setCompletedFields((prev) => new Set(prev).add(field));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) simulateUpload(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) simulateUpload(file);
    };

    const simulateUpload = (file) => {
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setFileName(file.name);
                    setData('resume', file);
                    return 100;
                }
                return prev + Math.random() * 20 + 10;
            });
        }, 150);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.store'));
    };

    const inputClass = (field) =>
        `w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow ${
            focusedField === field ? 'border-teal-400' : 'border-gray-300'
        }`;

    return (
        <AuthenticatedLayout>
            <Head title="Create Resume Profile" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal animation="fade-in-down">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Create Your Resume Profile</h1>
                            <p className="text-gray-500 text-sm mt-1">Fill in your details to get started with your resume analysis</p>
                        </div>
                    </ScrollReveal>

                    {/* Progress indicator */}
                    <ScrollReveal animation="fade-in-up" delay={100}>
                        <div className="mb-8 bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                                <span className="text-sm font-bold text-teal-600">{profileCompletion}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-teal-500 to-teal-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${profileCompletion}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                {['Details', 'Upload', 'Calibrate'].map((step, i) => (
                                    <div key={step} className="flex items-center gap-1.5">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                            i === 0 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            {i + 1}
                                        </div>
                                        <span className="text-xs text-gray-500">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <form onSubmit={submit}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Form */}
                            <div className="lg:col-span-2 space-y-6">
                                <ScrollReveal animation="fade-in-up" delay={150}>
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <div className="flex items-center mb-6">
                                            <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center mr-3">
                                                <svg className="w-4.5 h-4.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
                                                <p className="text-xs text-gray-500">Required information for your profile</p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            {[
                                                { key: 'full_name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                                                { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                                { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                                                { key: 'job_title', label: 'Target Job Title', type: 'text', placeholder: 'Software Engineer', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                            ].map((field) => (
                                                <div key={field.key}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                            <svg className={`w-4 h-4 transition-colors ${focusedField === field.key ? 'text-teal-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={field.icon} />
                                                            </svg>
                                                        </div>
                                                        <input
                                                            type={field.type}
                                                            value={data[field.key]}
                                                            onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                                            onFocus={() => setFocusedField(field.key)}
                                                            onBlur={() => setFocusedField(null)}
                                                            className={`${inputClass(field.key)} pl-10`}
                                                            placeholder={field.placeholder}
                                                        />
                                                        {data[field.key] && (
                                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <InputError message={errors[field.key]} className="mt-1" />
                                                </div>
                                            ))}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience Level</label>
                                                <select
                                                    value={data.experience_level}
                                                    onChange={(e) => handleFieldChange('experience_level', e.target.value)}
                                                    onFocus={() => setFocusedField('experience_level')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={inputClass('experience_level')}
                                                >
                                                    <option value="">Select level</option>
                                                    <option value="entry">Entry Level (0-2 years)</option>
                                                    <option value="mid">Mid Level (3-5 years)</option>
                                                    <option value="senior">Senior Level (6-10 years)</option>
                                                    <option value="executive">Executive (10+ years)</option>
                                                </select>
                                                <InputError message={errors.experience_level} className="mt-1" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Industry</label>
                                                <select
                                                    value={data.industry}
                                                    onChange={(e) => handleFieldChange('industry', e.target.value)}
                                                    onFocus={() => setFocusedField('industry')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={inputClass('industry')}
                                                >
                                                    <option value="">Select industry</option>
                                                    <option value="technology">Technology</option>
                                                    <option value="finance">Finance</option>
                                                    <option value="healthcare">Healthcare</option>
                                                    <option value="marketing">Marketing</option>
                                                    <option value="education">Education</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                <InputError message={errors.industry} className="mt-1" />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Upload Resume */}
                                <ScrollReveal animation="fade-in-up" delay={250}>
                                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                                        <div className="flex items-center mb-6">
                                            <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center mr-3">
                                                <svg className="w-4.5 h-4.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">Upload Existing Resume</h2>
                                                <p className="text-xs text-gray-500">We'll analyze your current resume</p>
                                            </div>
                                        </div>

                                        <div
                                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                                dragActive ? 'border-teal-400 bg-teal-50 scale-[1.02]' : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
                                            }`}
                                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                            onDragLeave={() => setDragActive(false)}
                                            onDrop={handleDrop}
                                        >
                                            <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />

                                            {uploadProgress !== null && uploadProgress < 100 ? (
                                                <div className="animate-fade-in">
                                                    <svg className="w-10 h-10 text-teal-500 mx-auto mb-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="text-sm text-teal-600 font-medium mb-3">Uploading...</p>
                                                    <div className="w-48 mx-auto bg-gray-200 rounded-full h-2">
                                                        <div className="bg-teal-500 h-2 rounded-full transition-all duration-200" style={{ width: `${Math.min(uploadProgress, 100)}%` }} />
                                                    </div>
                                                </div>
                                            ) : fileName ? (
                                                <div className="animate-scale-in">
                                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm font-medium text-green-700 mb-1">{fileName}</p>
                                                    <p className="text-xs text-gray-500">Ready for analysis</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        Drag and drop your resume, or{' '}
                                                        <label htmlFor="resume-upload" className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer hover:underline">browse files</label>
                                                    </p>
                                                    <p className="text-xs text-gray-400">PDF or DOCX up to 5MB</p>
                                                    <label htmlFor="resume-upload" className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all cursor-pointer hover:shadow-sm">
                                                        Select File
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                        <InputError message={errors.resume} className="mt-2" />
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Column - Score Preview */}
                            <div className="lg:col-span-1">
                                <ScrollReveal animation="fade-in-right" delay={200}>
                                    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Resume Score</h3>

                                        <div className="flex justify-center mb-6">
                                            <div className="relative w-32 h-32">
                                                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
                                                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                                                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#d1d5db" strokeWidth="3" strokeDasharray="0, 100" className="transition-all duration-1000" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-bold text-gray-300">--</span>
                                                    <span className="text-xs text-gray-400">Upload to score</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            {['ATS Compatibility', 'Keyword Match', 'Formatting', 'Content Quality'].map((item) => (
                                                <div key={item}>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-600">{item}</span>
                                                        <span className="text-gray-400">--</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                        <div className="bg-gray-200 h-1.5 rounded-full" style={{ width: '0%' }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
                                            onClick={submit}
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    Continue to Calibration
                                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
