import { getSectionByType, formatDate, hasContent } from './templateHelpers';

export default function BlankTemplate({ sections }) {
    const personal = getSectionByType(sections, 'personal')?.data || {};

    const renderSection = (section) => {
        if (!hasContent(section) || section.type === 'personal') return null;
        const d = section.data;
        const label = section.label || section.type.charAt(0).toUpperCase() + section.type.slice(1);
        const headingStyle = { fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 };

        switch (section.type) {
            case 'summary':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Summary</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#4b5563' }}>{d.content}</p>
                    </div>
                );
            case 'experience':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Experience</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.title}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#4b5563' }}>{item.company}{item.location ? `, ${item.location}` : ''}</div>
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#4b5563', marginTop: 4, whiteSpace: 'pre-line' }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Education</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.degree}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.graduationDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#4b5563' }}>{item.school}{item.gpa ? ` — ${item.gpa}` : ''}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Skills</h2>
                        <p style={{ fontSize: 11, color: '#4b5563' }}>{d.items.join(', ')}</p>
                    </div>
                );
            case 'certifications':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Certifications</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 4, fontSize: 11, color: '#4b5563' }}>
                                {item.name} — {item.issuer} {item.date && `(${formatDate(item.date)})`}
                            </div>
                        ))}
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Projects</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                {item.technologies && <span style={{ fontSize: 10, color: '#6b7280' }}> — {item.technologies}</span>}
                                {item.description && <p style={{ fontSize: 10.5, color: '#4b5563', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'languages':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Languages</h2>
                        <p style={{ fontSize: 11, color: '#4b5563' }}>{d.items.map(l => `${l.language} (${l.proficiency})`).join(', ')}</p>
                    </div>
                );
            case 'awards':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Awards</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 4, fontSize: 11, color: '#4b5563' }}>
                                {item.title} — {item.issuer} {item.date && `(${formatDate(item.date)})`}
                            </div>
                        ))}
                    </div>
                );
            case 'volunteer':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>Volunteer</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.role}</strong> at {item.organization}
                                {item.description && <p style={{ fontSize: 10.5, color: '#4b5563', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'custom':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={headingStyle}>{label}</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#4b5563', whiteSpace: 'pre-line' }}>{d.content}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: "'DejaVu Sans', Arial, sans-serif", padding: 40, minHeight: 1123, backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', margin: 0 }}>{personal.name || 'Your Name'}</h1>
            <div style={{ fontSize: 10.5, color: '#6b7280', marginTop: 4, marginBottom: 16 }}>
                {[personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean).join(' | ')}
            </div>
            {sections.map(renderSection)}
        </div>
    );
}
