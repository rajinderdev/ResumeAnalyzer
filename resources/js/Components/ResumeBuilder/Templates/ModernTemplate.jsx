import { getSectionByType, formatDate, hasContent } from './templateHelpers';

export default function ModernTemplate({ sections }) {
    const personal = getSectionByType(sections, 'personal')?.data || {};
    const skills = getSectionByType(sections, 'skills');
    const languages = getSectionByType(sections, 'languages');
    const accent = '#0d9488';

    const sidebarSections = ['personal', 'skills', 'languages'];
    const mainSections = sections.filter(s => !sidebarSections.includes(s.type));

    const renderMainSection = (section) => {
        if (!hasContent(section)) return null;
        const d = section.data;
        const headingStyle = { fontSize: 13, fontWeight: 700, color: accent, marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid ${accent}44` };

        switch (section.type) {
            case 'summary':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        <h2 style={headingStyle}>Professional Summary</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151' }}>{d.content}</p>
                    </div>
                );
            case 'experience':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        <h2 style={headingStyle}>Work Experience</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.title}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: accent, fontWeight: 500 }}>{item.company}{item.location ? ` | ${item.location}` : ''}</div>
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#374151', marginTop: 4, whiteSpace: 'pre-line' }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        <h2 style={headingStyle}>Education</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.degree}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.graduationDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#4b5563' }}>{item.school}{item.location ? `, ${item.location}` : ''}{item.gpa ? ` | GPA: ${item.gpa}` : ''}</div>
                                {item.description && <p style={{ fontSize: 10.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'certifications':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        <h2 style={headingStyle}>Certifications</h2>
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
                        <h2 style={headingStyle}>Projects</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                {item.technologies && <div style={{ fontSize: 10, color: accent }}>{item.technologies}</div>}
                                {item.description && <p style={{ fontSize: 10.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'awards':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        <h2 style={headingStyle}>Awards</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.title}</strong>
                                <div style={{ fontSize: 10, color: '#6b7280' }}>{item.issuer} {item.date && `| ${formatDate(item.date)}`}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'volunteer':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 18 }}>
                        <h2 style={headingStyle}>Volunteer Experience</h2>
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
                        <h2 style={headingStyle}>{section.label || 'Custom Section'}</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151', whiteSpace: 'pre-line' }}>{d.content}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: "'DejaVu Sans', Arial, sans-serif", display: 'flex', minHeight: 1123, backgroundColor: '#ffffff' }}>
            {/* Sidebar */}
            <div style={{ width: 220, backgroundColor: '#f0fdfa', padding: '32px 20px', borderRight: `3px solid ${accent}` }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: accent, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700 }}>{(personal.name || 'U')[0].toUpperCase()}</span>
                    </div>
                    <h1 style={{ fontSize: 16, fontWeight: 700, color: '#1f2937', margin: 0 }}>{personal.name || 'Your Name'}</h1>
                </div>

                {/* Contact Info */}
                <div style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Contact</h3>
                    {personal.email && <div style={{ fontSize: 10, color: '#374151', marginBottom: 4, wordBreak: 'break-all' }}>{personal.email}</div>}
                    {personal.phone && <div style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>{personal.phone}</div>}
                    {personal.location && <div style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>{personal.location}</div>}
                    {personal.linkedin && <div style={{ fontSize: 10, color: '#374151', marginBottom: 4, wordBreak: 'break-all' }}>{personal.linkedin}</div>}
                    {personal.website && <div style={{ fontSize: 10, color: '#374151', marginBottom: 4, wordBreak: 'break-all' }}>{personal.website}</div>}
                </div>

                {/* Skills */}
                {hasContent(skills) && (
                    <div style={{ marginBottom: 20 }}>
                        <h3 style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {skills.data.items.map((skill, i) => (
                                <span key={i} style={{ fontSize: 9.5, backgroundColor: `${accent}18`, color: '#134e4a', padding: '3px 8px', borderRadius: 10 }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {hasContent(languages) && (
                    <div style={{ marginBottom: 20 }}>
                        <h3 style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Languages</h3>
                        {languages.data.items.map((item, i) => (
                            <div key={i} style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>
                                {item.language} <span style={{ color: '#6b7280' }}>- {item.proficiency}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px 30px' }}>
                {mainSections.map(renderMainSection)}
            </div>
        </div>
    );
}
