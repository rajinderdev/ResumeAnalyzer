import { getSectionByType, formatDate, hasContent } from './templateHelpers';

export default function CreativeTemplate({ sections }) {
    const personal = getSectionByType(sections, 'personal')?.data || {};
    const accent = '#7c3aed';

    const renderSection = (section) => {
        if (!hasContent(section) || section.type === 'personal') return null;
        const d = section.data;
        const label = section.label || section.type.charAt(0).toUpperCase() + section.type.slice(1);

        const headingBlock = (title) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 3, height: 20, backgroundColor: accent, borderRadius: 2 }} />
                <h2 style={{ fontSize: 13, fontWeight: 700, color: accent, margin: 0 }}>{title}</h2>
            </div>
        );

        switch (section.type) {
            case 'summary':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Professional Summary')}
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151', paddingLeft: 11 }}>{d.content}</p>
                    </div>
                );
            case 'experience':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Work Experience')}
                        <div style={{ paddingLeft: 11 }}>
                            {d.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: 10 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.title}</strong>
                                        <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: accent }}>{item.company}{item.location ? ` · ${item.location}` : ''}</div>
                                    {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#374151', marginTop: 4, whiteSpace: 'pre-line' }}>{item.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Education')}
                        <div style={{ paddingLeft: 11 }}>
                            {d.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.degree}</strong>
                                        <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.graduationDate)}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: '#4b5563' }}>{item.school}{item.gpa ? ` — GPA: ${item.gpa}` : ''}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Skills')}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 11 }}>
                            {d.items.map((skill, i) => (
                                <span key={i} style={{ fontSize: 10, backgroundColor: `${accent}15`, color: '#5b21b6', padding: '4px 12px', borderRadius: 14, fontWeight: 500 }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'certifications':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Certifications')}
                        <div style={{ paddingLeft: 11 }}>
                            {d.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: 6 }}>
                                    <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}> — {item.issuer} {item.date && `(${formatDate(item.date)})`}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Projects')}
                        <div style={{ paddingLeft: 11 }}>
                            {d.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: 8 }}>
                                    <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                    {item.technologies && <div style={{ fontSize: 10, color: accent }}>{item.technologies}</div>}
                                    {item.description && <p style={{ fontSize: 10.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'languages':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Languages')}
                        <div style={{ paddingLeft: 11, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {d.items.map((item, i) => (
                                <span key={i} style={{ fontSize: 11, color: '#374151' }}>{item.language} <span style={{ color: '#6b7280', fontSize: 10 }}>({item.proficiency})</span></span>
                            ))}
                        </div>
                    </div>
                );
            case 'awards':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Awards')}
                        <div style={{ paddingLeft: 11 }}>
                            {d.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: 6 }}>
                                    <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.title}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}> — {item.issuer} {item.date && `(${formatDate(item.date)})`}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'volunteer':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Volunteer')}
                        <div style={{ paddingLeft: 11 }}>
                            {d.items.map((item, i) => (
                                <div key={i} style={{ marginBottom: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.role}</strong>
                                        <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.startDate)} – {formatDate(item.endDate)}</span>
                                    </div>
                                    <div style={{ fontSize: 10.5, color: '#4b5563' }}>{item.organization}</div>
                                    {item.description && <p style={{ fontSize: 10.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'custom':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock(label)}
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151', paddingLeft: 11, whiteSpace: 'pre-line' }}>{d.content}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: "'DejaVu Sans', Arial, sans-serif", minHeight: 1123, backgroundColor: '#ffffff' }}>
            {/* Header */}
            <div style={{ backgroundColor: `${accent}0d`, padding: '32px 40px 24px', borderBottom: `3px solid ${accent}` }}>
                <h1 style={{ fontSize: 26, fontWeight: 700, color: accent, margin: 0 }}>{personal.name || 'Your Name'}</h1>
                <div style={{ fontSize: 10.5, color: '#6b7280', marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '24px 40px' }}>
                {sections.map(renderSection)}
            </div>
        </div>
    );
}
