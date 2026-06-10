export function getSectionByType(sections, type) {
    return sections.find(s => s.type === type);
}

export function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export function hasContent(section) {
    if (!section || !section.data) return false;
    const d = section.data;
    switch (section.type) {
        case 'personal':
            return d.name || d.email || d.phone || d.location;
        case 'summary':
            return d.content;
        case 'experience':
        case 'education':
        case 'certifications':
        case 'projects':
        case 'languages':
        case 'awards':
        case 'volunteer':
            return d.items && d.items.length > 0;
        case 'skills':
            return d.items && d.items.length > 0;
        case 'custom':
            return d.content;
        default:
            return false;
    }
}
