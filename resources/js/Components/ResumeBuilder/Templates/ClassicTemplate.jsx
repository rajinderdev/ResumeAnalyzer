import { getSectionByType, formatDate, hasContent } from './templateHelpers';

export default function ClassicTemplate({ sections }) {
    const personal = getSectionByType(sections, 'personal')?.data || {};

    const renderSection = (section) => {
        if (!hasContent(section)) return null;
        const d = section.data;

        switch (section.type) {
            case 'personal':
                return null; // Rendered in header
            case 'summary':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Professional Summary</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151' }}>{d.content}</p>
                    </div>
                );
            case 'experience':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Work Experience</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.title}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.startDate)} – {item.current ? 'Present' : formatDate(item.endDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#4b5563' }}>{item.company}{item.location ? `, ${item.location}` : ''}</div>
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#374151', marginTop: 4, whiteSpace: 'pre-line' }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'education':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Education</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: 12, color: '#1f2937' }}>{item.degree}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.graduationDate)}</span>
                                </div>
                                <div style={{ fontSize: 11, color: '#4b5563' }}>{item.school}{item.location ? `, ${item.location}` : ''}{item.gpa ? ` | GPA: ${item.gpa}` : ''}</div>
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'skills':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Skills</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {d.items.map((skill, i) => (
                                <span key={i} style={{ fontSize: 10.5, color: '#374151', backgroundColor: '#f3f4f6', padding: '3px 10px', borderRadius: 12 }}>{skill}</span>
                            ))}
                        </div>
                    </div>
                );
            case 'certifications':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Certifications</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.date)}</span>
                                </div>
                                <div style={{ fontSize: 10.5, color: '#4b5563' }}>{item.issuer}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'projects':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Projects</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.name}</strong>
                                {item.technologies && <div style={{ fontSize: 10, color: '#6b7280', marginTop: 1 }}>{item.technologies}</div>}
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'languages':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Languages</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {d.items.map((item, i) => (
                                <span key={i} style={{ fontSize: 11, color: '#374151' }}>{item.language} <span style={{ color: '#6b7280', fontSize: 10 }}>({item.proficiency})</span></span>
                            ))}
                        </div>
                    </div>
                );
            case 'awards':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Awards</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.title}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.date)}</span>
                                </div>
                                <div style={{ fontSize: 10.5, color: '#4b5563' }}>{item.issuer}</div>
                                {item.description && <p style={{ fontSize: 10, color: '#6b7280', marginTop: 1 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'volunteer':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>Volunteer Experience</h2>
                        {d.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: 11, color: '#1f2937' }}>{item.role}</strong>
                                    <span style={{ fontSize: 10, color: '#6b7280' }}>{formatDate(item.startDate)} – {formatDate(item.endDate)}</span>
                                </div>
                                <div style={{ fontSize: 10.5, color: '#4b5563' }}>{item.organization}</div>
                                {item.description && <p style={{ fontSize: 10.5, lineHeight: 1.5, color: '#374151', marginTop: 2 }}>{item.description}</p>}
                            </div>
                        ))}
                    </div>
                );
            case 'custom':
                return (
                    <div key={section.type + section.order} style={{ marginBottom: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#1f2937', letterSpacing: '0.05em', borderBottom: '2px solid #1f2937', paddingBottom: 4, marginBottom: 8 }}>{section.label || 'Custom Section'}</h2>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: '#374151', whiteSpace: 'pre-line' }}>{d.content}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: "'DejaVu Sans', Arial, sans-serif", padding: 40, minHeight: 1123, backgroundColor: '#ffffff' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', margin: 0 }}>{personal.name || 'Your Name'}</h1>
                <div style={{ fontSize: 10.5, color: '#6b7280', marginTop: 6, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                </div>
            </div>

            {/* Sections */}
            {sections.map(renderSection)}
        </div>
    );
}
