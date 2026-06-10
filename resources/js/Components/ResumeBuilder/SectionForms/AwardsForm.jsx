import RepeaterField from './RepeaterField';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

const emptyItem = { title: '', issuer: '', date: '', description: '' };

export default function AwardsForm({ data, onChange }) {
    const items = data.items || [];

    return (
        <RepeaterField
            items={items}
            onAdd={() => onChange({ ...data, items: [...items, { ...emptyItem }] })}
            onRemove={(i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) })}
            onChange={(i, item) => onChange({ ...data, items: items.map((it, idx) => idx === i ? item : it) })}
            addLabel="Add Award"
            renderItem={(item, index, update) => (
                <div className="space-y-3 pr-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Award Title</label>
                            <input type="text" value={item.title || ''} onChange={(e) => update('title', e.target.value)} className={inputClass} placeholder="Employee of the Year" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Issuer</label>
                            <input type="text" value={item.issuer || ''} onChange={(e) => update('issuer', e.target.value)} className={inputClass} placeholder="Acme Corp" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                            <input type="month" value={item.date || ''} onChange={(e) => update('date', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Description (optional)</label>
                            <input type="text" value={item.description || ''} onChange={(e) => update('description', e.target.value)} className={inputClass} placeholder="Brief description" />
                        </div>
                    </div>
                </div>
            )}
        />
    );
}
