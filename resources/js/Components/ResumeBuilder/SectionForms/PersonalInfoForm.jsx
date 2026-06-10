const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

export default function PersonalInfoForm({ data, onChange }) {
    const update = (field, value) => onChange({ ...data, [field]: value });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={data.name || ''} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="John Doe" />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={data.email || ''} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="john@example.com" />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={data.phone || ''} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="+1 (555) 123-4567" />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                <input type="text" value={data.location || ''} onChange={(e) => update('location', e.target.value)} className={inputClass} placeholder="New York, NY" />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
                <input type="url" value={data.linkedin || ''} onChange={(e) => update('linkedin', e.target.value)} className={inputClass} placeholder="linkedin.com/in/johndoe" />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
                <input type="url" value={data.website || ''} onChange={(e) => update('website', e.target.value)} className={inputClass} placeholder="johndoe.com" />
            </div>
        </div>
    );
}
