import { getSectionByType, formatDate, hasContent } from './templateHelpers';

export default function ProfessionalTemplate({ sections }) {
    const personal = getSectionByType(sections, 'personal')?.data || {};
    const accent = '#1e40af';

    const renderSection = (section) => {
        if (!hasContent(section) || section.type === 'personal') return null;
        const d = section.data;
        const label = section.label || section.type.charAt(0).toUpperCase() + section.type.slice(1);

        const headingBlock = (title) => (
            <div style={{ marginBottom: 8 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, color: accent, margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</h2>
                <hr style={{ border: 'none', borderTop: `1.5px solid ${accent}`, margin: 0 }} />
            </div>
        );

        switch (section.type) {
            case 'summary':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Professional Summary')}
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151' }}>{d.content}</p>
                    </div>
                );
            case 'experience':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Professional Experience')}
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.title}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: accent, fontWeight: 500 }}>{item.company}{item.location ? `, ${item.location}` : ''}</div>
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#374151', marginTop: 4, whiteSpace: 'pre-line' }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Education')}
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.degree}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.graduationDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#4b5563' }}>{item.school}{item.location ? `, ${item.location}` : ''}{item.gpa ? ` | GPA: ${item.gpa}` : ''}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Core Competencies')}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {d.items.map((skill, i) => (
                                <span key={i} style={{ fontSize: 10.5, backgroundColor: '#eff6ff', color: accent, padding: '3px 10px', borderRadius: 4, border: `1px solid ${accent}33` }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'certifications':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Certifications')}
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                <div style={{ fontSize: 10, color: '#6b7280' }}>{item.issuer} {item.date && `| ${formatDate(item.date)}`}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Projects')}
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                {item.technologies && <div style={{ fontSize: 10, color: accent }}>{item.technologies}</div>}
                                {item.description && <p style={{ fontSize: 10.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'languages':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Languages')}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                            {d.items.map((item, i) => (
                                <span key={i} style={{ fontSize: 11, color: '#374151' }}>{item.language} — <span style={{ color: '#6b7280' }}>{item.proficiency}</span></span>
                            ))}
                        </div>
                    </div>
                );
            case 'awards':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Awards & Honors')}
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.title}</strong>
                                <span style={{ fontSize: 10, color: '#6b7280' }}> — {item.issuer} {item.date && `(${formatDate(item.date)})`}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'volunteer':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock('Volunteer Experience')}
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
                );
            case 'custom':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        {headingBlock(label)}
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151', whiteSpace: 'pre-line' }}>{d.content}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: "'DejaVu Sans', Arial, sans-serif", minHeight: 1123, backgroundColor: '#ffffff', padding: 40 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 8, paddingBottom: 16, borderBottom: `3px solid ${accent}` }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: accent, margin: 0, letterSpacing: '0.02em' }}>{personal.name || 'Your Name'}</h1>
                <div style={{ fontSize: 10.5, color: '#6b7280', marginTop: 6, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>|  {personal.phone}</span>}
                    {personal.location && <span>|  {personal.location}</span>}
                    {personal.linkedin && <span>|  {personal.linkedin}</span>}
                    {personal.website && <span>|  {personal.website}</span>}
                </div>
            </div>

            {/* Sections */}
            <div style={{ marginTop: 16 }}>
                {sections.map(renderSection)}
            </div>
        </div>
    );
}
