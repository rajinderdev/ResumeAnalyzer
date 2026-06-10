import RepeaterField from './RepeaterField';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

const emptyItem = { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' };

export default function ExperienceForm({ data, onChange }) {
    const items = data.items || [];

    return (
        <RepeaterField
            items={items}
            onAdd={() => onChange({ ...data, items: [...items, { ...emptyItem }] })}
            onRemove={(i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) })}
            onChange={(i, item) => onChange({ ...data, items: items.map((it, idx) => idx === i ? item : it) })}
            addLabel="Add Experience"
            renderItem={(item, index, update) => (
                <div className="space-y-3 pr-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
                            <input type="text" value={item.title || ''} onChange={(e) => update('title', e.target.value)} className={inputClass} placeholder="Software Engineer" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                            <input type="text" value={item.company || ''} onChange={(e) => update('company', e.target.value)} className={inputClass} placeholder="Acme Corp" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" value={item.location || ''} onChange={(e) => update('location', e.target.value)} className={inputClass} placeholder="Remote" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                            <input type="month" value={item.startDate || ''} onChange={(e) => update('startDate', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                            <input type="month" value={item.endDate || ''} onChange={(e) => update('endDate', e.target.value)} className={inputClass} disabled={item.current} />
                            <label className="flex items-center gap-1.5 mt-1.5">
                                <input type="checkbox" checked={item.current || false} onChange={(e) => update('current', e.target.checked)} className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span className="text-xs text-gray-600">Current position</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={item.description || ''} onChange={(e) => update('description', e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} placeholder="Describe your responsibilities and achievements..." />
                    </div>
                </div>
            )}
        />
    );
}
