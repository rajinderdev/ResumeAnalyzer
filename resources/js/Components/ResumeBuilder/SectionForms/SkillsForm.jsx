import { useState } from 'react';

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm transition-all input-glow';

export default function SkillsForm({ data, onChange }) {
    const [input, setInput] = useState('');
    const items = data.items || [];

    const addSkill = () => {
        const skill = input.trim();
        if (skill && !items.includes(skill)) {
            onChange({ ...data, items: [...items, skill] });
            setInput('');
        }
    };

    const removeSkill = (index) => {
        onChange({ ...data, items: items.filter((_, i) => i !== index) });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Skills</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={inputClass}
                    placeholder="Type a skill and press Enter..."
                />
                <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors flex-shrink-0"
                >
                    Add
                </button>
            </div>
            {items.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {items.map((skill, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-medium rounded-full border border-teal-200"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(i)}
                                className="text-teal-400 hover:text-teal-700 transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
