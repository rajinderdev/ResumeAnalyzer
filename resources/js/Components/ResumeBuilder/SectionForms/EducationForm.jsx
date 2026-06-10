import RepeaterField from './RepeaterField';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

const emptyItem = { degree: '', school: '', location: '', graduationDate: '', gpa: '', description: '' };

export default function EducationForm({ data, onChange }) {
    const items = data.items || [];

    return (
        <RepeaterField
            items={items}
            onAdd={() => onChange({ ...data, items: [...items, { ...emptyItem }] })}
            onRemove={(i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) })}
            onChange={(i, item) => onChange({ ...data, items: items.map((it, idx) => idx === i ? item : it) })}
            addLabel="Add Education"
            renderItem={(item, index, update) => (
                <div className="space-y-3 pr-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Degree</label>
                            <input type="text" value={item.degree || ''} onChange={(e) => update('degree', e.target.value)} className={inputClass} placeholder="Bachelor of Science in Computer Science" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">School</label>
                            <input type="text" value={item.school || ''} onChange={(e) => update('school', e.target.value)} className={inputClass} placeholder="MIT" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" value={item.location || ''} onChange={(e) => update('location', e.target.value)} className={inputClass} placeholder="Cambridge, MA" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Graduation Date</label>
                            <input type="month" value={item.graduationDate || ''} onChange={(e) => update('graduationDate', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">GPA</label>
                            <input type="text" value={item.gpa || ''} onChange={(e) => update('gpa', e.target.value)} className={inputClass} placeholder="3.8/4.0" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={item.description || ''} onChange={(e) => update('description', e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} placeholder="Relevant coursework, honors, activities..." />
                    </div>
                </div>
            )}
        />
    );
}
