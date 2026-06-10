import RepeaterField from './RepeaterField';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

const emptyItem = { name: '', issuer: '', date: '', url: '' };

export default function CertificationsForm({ data, onChange }) {
    const items = data.items || [];

    return (
        <RepeaterField
            items={items}
            onAdd={() => onChange({ ...data, items: [...items, { ...emptyItem }] })}
            onRemove={(i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) })}
            onChange={(i, item) => onChange({ ...data, items: items.map((it, idx) => idx === i ? item : it) })}
            addLabel="Add Certification"
            renderItem={(item, index, update) => (
                <div className="space-y-3 pr-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Certification Name</label>
                            <input type="text" value={item.name || ''} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="AWS Solutions Architect" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Issuer</label>
                            <input type="text" value={item.issuer || ''} onChange={(e) => update('issuer', e.target.value)} className={inputClass} placeholder="Amazon Web Services" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                            <input type="month" value={item.date || ''} onChange={(e) => update('date', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">URL (optional)</label>
                            <input type="url" value={item.url || ''} onChange={(e) => update('url', e.target.value)} className={inputClass} placeholder="https://credential.example.com" />
                        </div>
                    </div>
                </div>
            )}
        />
    );
}
