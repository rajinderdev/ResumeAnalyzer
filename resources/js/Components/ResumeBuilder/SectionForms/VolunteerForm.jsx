import RepeaterField from './RepeaterField';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

const emptyItem = { role: '', organization: '', startDate: '', endDate: '', description: '' };

export default function VolunteerForm({ data, onChange }) {
    const items = data.items || [];

    return (
        <RepeaterField
            items={items}
            onAdd={() => onChange({ ...data, items: [...items, { ...emptyItem }] })}
            onRemove={(i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) })}
            onChange={(i, item) => onChange({ ...data, items: items.map((it, idx) => idx === i ? item : it) })}
            addLabel="Add Volunteer Experience"
            renderItem={(item, index, update) => (
                <div className="space-y-3 pr-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                            <input type="text" value={item.role || ''} onChange={(e) => update('role', e.target.value)} className={inputClass} placeholder="Volunteer Coordinator" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Organization</label>
                            <input type="text" value={item.organization || ''} onChange={(e) => update('organization', e.target.value)} className={inputClass} placeholder="Local Food Bank" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                            <input type="month" value={item.startDate || ''} onChange={(e) => update('startDate', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                            <input type="month" value={item.endDate || ''} onChange={(e) => update('endDate', e.target.value)} className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={item.description || ''} onChange={(e) => update('description', e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} placeholder="Describe your volunteer work and impact..." />
                    </div>
                </div>
            )}
        />
    );
}
