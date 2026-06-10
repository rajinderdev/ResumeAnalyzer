import RepeaterField from './RepeaterField';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

const emptyItem = { name: '', description: '', url: '', technologies: '' };

export default function ProjectsForm({ data, onChange }) {
    const items = data.items || [];

    return (
        <RepeaterField
            items={items}
            onAdd={() => onChange({ ...data, items: [...items, { ...emptyItem }] })}
            onRemove={(i) => onChange({ ...data, items: items.filter((_, idx) => idx !== i) })}
            onChange={(i, item) => onChange({ ...data, items: items.map((it, idx) => idx === i ? item : it) })}
            addLabel="Add Project"
            renderItem={(item, index, update) => (
                <div className="space-y-3 pr-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Project Name</label>
                            <input type="text" value={item.name || ''} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="E-commerce Platform" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">URL (optional)</label>
                            <input type="url" value={item.url || ''} onChange={(e) => update('url', e.target.value)} className={inputClass} placeholder="https://github.com/..." />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Technologies</label>
                        <input type="text" value={item.technologies || ''} onChange={(e) => update('technologies', e.target.value)} className={inputClass} placeholder="React, Node.js, PostgreSQL" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={item.description || ''} onChange={(e) => update('description', e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} placeholder="Describe the project, your role, and key outcomes..." />
                    </div>
                </div>
            )}
        />
    );
}
