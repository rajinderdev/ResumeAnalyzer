const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

export default function SummaryForm({ data, onChange }) {
    const content = data.content || '';
    const maxLength = 500;

    return (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Professional Summary</label>
            <textarea
                value={content}
                onChange={(e) => onChange({ ...data, content: e.target.value })}
                className={`${inputClass} min-h-[120px] resize-y`}
                placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
                maxLength={maxLength}
            />
            <p className={`text-xs mt-1 text-right ${content.length > maxLength * 0.9 ? 'text-amber-600' : 'text-gray-400'}`}>
                {content.length}/{maxLength}
            </p>
        </div>
    );
}
