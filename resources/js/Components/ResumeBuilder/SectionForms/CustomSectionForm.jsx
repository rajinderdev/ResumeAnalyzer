const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

export default function CustomSectionForm({ data, label, onChange, onLabelChange }) {
    return (
        <div className="space-y-4">
            {onLabelChange && (
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Section Title</label>
                    <input
                        type="text"
                        value={label || ''}
                        onChange={(e) => onLabelChange(e.target.value)}
                        className={inputClass}
                        placeholder="Section name..."
                    />
                </div>
            )}
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                <textarea
                    value={data.content || ''}
                    onChange={(e) => onChange({ ...data, content: e.target.value })}
                    className={`${inputClass} min-h-[120px] resize-y`}
                    placeholder="Enter your content here..."
                />
            </div>
        </div>
    );
}
