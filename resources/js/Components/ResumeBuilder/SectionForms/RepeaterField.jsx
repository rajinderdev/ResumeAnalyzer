export default function RepeaterField({ items, onAdd, onRemove, onChange, renderItem, addLabel = 'Add Item' }) {
    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="relative bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Remove"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {renderItem(item, index, (field, value) => {
                        onChange(index, { ...item, [field]: value });
                    })}
                </div>
            ))}
            <button
                type="button"
                onClick={onAdd}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {addLabel}
            </button>
        </div>
    );
}
