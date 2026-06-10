import { getSectionByType, formatDate, hasContent } from './templateHelpers';

export default function MinimalTemplate({ sections }) {
    const personal = getSectionByType(sections, 'personal')?.data || {};

    const renderSection = (section) => {
        if (!hasContent(section) || section.type === 'personal') return null;
        const d = section.data;
        const headingStyle = { fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, paddingTop: 14, borderTop: '1px solid #e5e7eb' };

        switch (section.type) {
            case 'summary':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Summary</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.7, color: '#374151' }}>{d.content}</p>
                    </div>
                );
            case 'experience':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Experience</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{item.title}</span>
                                    <span style={{ fontSize: 10, color: '#9ca3af' }}>{formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#6b7280' }}>{item.company}{item.location ? `, ${item.location}` : ''}</div>
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.6, color: '#4b5563', marginTop: 4, whiteSpace: 'pre-line' }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Education</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{item.degree}</span>
                                    <span style={{ fontSize: 10, color: '#9ca3af' }}>{formatDate(item.graduationDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#6b7280' }}>{item.school}{item.gpa ? ` — ${item.gpa}` : ''}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Skills</h2>
                        <p style={{ fontSize: 11, color: '#374151', lineHeight: 1.8 }}>{d.items.join('  ·  ')}</p>
                    </div>
                );
            case 'certifications':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Certifications</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 4, fontSize: 11, color: '#374151' }}>
                                {item.name} — {item.issuer} {item.date && `(${formatDate(item.date)})`}
                            </div>
                        ))}
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Projects</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{item.name}</span>
                                {item.technologies && <span style={{ fontSize: 10, color: '#9ca3af' }}> — {item.technologies}</span>}
                                {item.description && <p style={{ fontSize: 10.5, color: '#4b5563', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'languages':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Languages</h2>
                        <p style={{ fontSize: 11, color: '#374151' }}>{d.items.map(l => `${l.language} (${l.proficiency})`).join('  ·  ')}</p>
                    </div>
                );
            case 'awards':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Awards</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 4, fontSize: 11, color: '#374151' }}>
                                {item.title} — {item.issuer} {item.date && `(${formatDate(item.date)})`}
                            </div>
                        ))}
                    </div>
                );
            case 'volunteer':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>Volunteer</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{item.role}</span>
                                <span style={{ fontSize: 10, color: '#9ca3af' }}> at {item.organization}</span>
                                {item.description && <p style={{ fontSize: 10.5, color: '#4b5563', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'custom':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 14 }}>
                        <h2 style={headingStyle}>{section.label || 'Custom Section'}</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.7, color: '#374151', whiteSpace: 'pre-line' }}>{d.content}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: "'DejaVu Sans', Arial, sans-serif", padding: '48px 50px', minHeight: 1123, backgroundColor: '#ffffff' }}>
            <div style={{ marginBottom: 12 }}>
                <h1 style={{ fontSize: 24, fontWeight: 300, color: '#111827', margin: 0, letterSpacing: '0.02em' }}>{personal.name || 'Your Name'}</h1>
                <div style={{ fontSize: 10.5, color: '#9ca3af', marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                </div>
            </div>
            {sections.map(renderSection)}
        </div>
    );
}
