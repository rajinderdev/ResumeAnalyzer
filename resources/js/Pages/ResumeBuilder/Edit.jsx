import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BuilderToolbar from '@/Components/ResumeBuilder/BuilderToolbar';
import SectionAccordion from '@/Components/ResumeBuilder/SectionAccordion';
import AddSectionButton from '@/Components/ResumeBuilder/AddSectionButton';
import ResumePreview from '@/Components/ResumeBuilder/ResumePreview';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

export default function Edit({ resume, templates }) {
    const [sections, setSections] = useState(resume.sections || []);
    const [title, setTitle] = useState(resume.title || 'Untitled Resume');
    const [template, setTemplate] = useState(resume.template || 'classic');
    const [saveStatus, setSaveStatus] = useState('saved');
    const [downloading, setDownloading] = useState(false);
    const [mobileTab, setMobileTab] = useState('edit');

    const saveTimer = useRef(null);
    const isFirstRender = useRef(true);

    const save = useCallback(async () => {
        setSaveStatus('saving');
        try {
            await axios.put(route('resume-builder.update', resume.id), {
                title,
                template,
                sections,
            });
            setSaveStatus('saved');
        } catch {
            setSaveStatus('unsaved');
        }
    }, [title, template, sections, resume.id]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setSaveStatus('unsaved');
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(save, 1000);
        return () => clearTimeout(saveTimer.current);
    }, [title, template, sections, save]);

    const handleSectionChange = (index, updatedSection) => {
        setSections(prev => prev.map((s, i) => i === index ? updatedSection : s));
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        setSections(prev => {
            const next = [...prev];
            [next[index - 1], next[index]] = [next[index], next[index - 1]];
            return next.map((s, i) => ({ ...s, order: i }));
        });
    };

    const handleMoveDown = (index) => {
        setSections(prev => {
            if (index >= prev.length - 1) return prev;
            const next = [...prev];
            [next[index], next[index + 1]] = [next[index + 1], next[index]];
            return next.map((s, i) => ({ ...s, order: i }));
        });
    };

    const handleRemove = (index) => {
        setSections(prev => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i })));
    };

    const handleAddSection = (newSection) => {
        setSections(prev => [...prev, { ...newSection, order: prev.length }]);
    };

    const handleDownload = async () => {
        setDownloading(true);
        // Save first if unsaved
        if (saveStatus === 'unsaved') {
            await save();
        }
        try {
            const response = await axios.get(route('resume-builder.download', resume.id), {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title.replace(/\s+/g, '_')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            // silently fail
        } finally {
            setDownloading(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit - ${title}`} />

            <BuilderToolbar
                title={title}
                onTitleChange={setTitle}
                saveStatus={saveStatus}
                onDownload={handleDownload}
                downloading={downloading}
            />

            {/* Mobile Tab Toggle */}
            <div className="lg:hidden sticky top-[120px] z-30 bg-gray-50 border-b border-gray-200">
                <div className="flex max-w-[1400px] mx-auto">
                    <button
                        onClick={() => setMobileTab('edit')}
                        className={`flex-1 px-4 py-2.5 text-sm font-medium text-center transition-colors ${
                            mobileTab === 'edit' ? 'text-teal-700 border-b-2 border-teal-600 bg-white' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setMobileTab('preview')}
                        className={`flex-1 px-4 py-2.5 text-sm font-medium text-center transition-colors ${
                            mobileTab === 'preview' ? 'text-teal-700 border-b-2 border-teal-600 bg-white' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Preview
                    </button>
                </div>
            </div>

            <div className="py-6">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Template Selector */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Template</label>
                        <div className="flex flex-wrap gap-2">
                            {templates.map((tmpl) => (
                                <button
                                    key={tmpl.slug}
                                    onClick={() => setTemplate(tmpl.slug)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                        template === tmpl.slug
                                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    }`}
                                >
                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tmpl.accentColor }} />
                                    {tmpl.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left Panel - Form */}
                        <div className={`${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
                            <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1 space-y-3 scrollbar-thin">
                                {sections.map((section, index) => (
                                    <SectionAccordion
                                        key={section.type + index}
                                        section={section}
                                        index={index}
                                        total={sections.length}
                                        onChange={(updated) => handleSectionChange(index, updated)}
                                        onMoveUp={() => handleMoveUp(index)}
                                        onMoveDown={() => handleMoveDown(index)}
                                        onRemove={() => handleRemove(index)}
                                        defaultOpen={index === 0}
                                    />
                                ))}
                                <AddSectionButton sections={sections} onAdd={handleAddSection} />
                            </div>
                        </div>

                        {/* Right Panel - Preview */}
                        <div className={`${mobileTab === 'edit' ? 'hidden lg:block' : ''}`}>
                            <div className="lg:sticky lg:top-[140px]">
                                <ResumePreview
                                    sections={sections}
                                    template={template}
                                    settings={resume.settings}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
