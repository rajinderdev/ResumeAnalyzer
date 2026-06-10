import RepeaterField from './RepeaterField';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

const emptyItem = { language: '', proficiency: 'intermediate' };

const proficiencyLevels = [
    { value: 'native', label: 'Native' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'basic', label: 'Basic' },
];

export default function LanguagesForm({ data, onChange }) {
    const items = data.items || [];

    return (
        <RepeaterField
            items={items}
            onAdd={() => onChange({ ...data, items: [...items, { ...emptyItem }] })}
            onRemove={(i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) })}
            onChange={(i, item) => onChange({ ...data, items: items.map((it, idx) => idx === i ? item : it) })}
            addLabel="Add Language"
            renderItem={(item, index, update) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Language</label>
                        <input type="text" value={item.language || ''} onChange={(e) => update('language', e.target.value)} className={inputClass} placeholder="Spanish" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Proficiency</label>
                        <select value={item.proficiency || 'intermediate'} onChange={(e) => update('proficiency', e.target.value)} className={inputClass}>
                            {proficiencyLevels.map((level) => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        />
    );
}
