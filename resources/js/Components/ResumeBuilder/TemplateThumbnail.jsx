export default function TemplateThumbnail({ slug, accentColor }) {
    const base = 'rounded bg-gray-200';
    const accent = { backgroundColor: accentColor };

    const layouts = {
        classic: (
            <div className="space-y-2 p-3">
                <div className="h-3 w-3/4 mx-auto rounded" style={accent} />
                <div className="h-1.5 w-1/2 mx-auto rounded bg-gray-300" />
                <div className="border-t border-gray-300 my-2" />
                <div className="space-y-1.5">
                    <div className={`h-1.5 w-1/3 ${base}`} style={accent} />
                    <div className="h-1 w-full rounded bg-gray-300" />
                    <div className="h-1 w-5/6 rounded bg-gray-300" />
                    <div className="h-1 w-4/6 rounded bg-gray-300" />
                </div>
                <div className="space-y-1.5 mt-3">
                    <div className={`h-1.5 w-1/3 ${base}`} style={accent} />
                    <div className="h-1 w-full rounded bg-gray-300" />
                    <div className="h-1 w-5/6 rounded bg-gray-300" />
                </div>
                <div className="space-y-1.5 mt-3">
                    <div className={`h-1.5 w-1/4 ${base}`} style={accent} />
                    <div className="flex gap-1.5 flex-wrap">
                        <div className="h-2 w-8 rounded-full bg-gray-300" />
                        <div className="h-2 w-10 rounded-full bg-gray-300" />
                        <div className="h-2 w-7 rounded-full bg-gray-300" />
                    </div>
                </div>
            </div>
        ),
        modern: (
            <div className="flex h-full">
                <div className="w-1/3 p-2 rounded-l" style={{ backgroundColor: accentColor + '22' }}>
                    <div className="w-6 h-6 rounded-full mx-auto mb-2" style={accent} />
                    <div className="h-1 w-3/4 mx-auto rounded bg-gray-300 mb-1" />
                    <div className="h-1 w-2/3 mx-auto rounded bg-gray-300 mb-3" />
                    <div className="space-y-1">
                        <div className="h-1 w-full rounded" style={{ backgroundColor: accentColor + '44' }} />
                        <div className="h-1 w-full rounded" style={{ backgroundColor: accentColor + '44' }} />
                        <div className="h-1 w-3/4 rounded" style={{ backgroundColor: accentColor + '44' }} />
                    </div>
                    <div className="mt-3 space-y-1">
                        <div className="h-1.5 w-2/3 rounded" style={accent} />
                        <div className="flex gap-1 flex-wrap">
                            <div className="h-1.5 w-5 rounded-full" style={{ backgroundColor: accentColor + '44' }} />
                            <div className="h-1.5 w-7 rounded-full" style={{ backgroundColor: accentColor + '44' }} />
                            <div className="h-1.5 w-4 rounded-full" style={{ backgroundColor: accentColor + '44' }} />
                        </div>
                    </div>
                </div>
                <div className="w-2/3 p-2 space-y-2">
                    <div className="h-2 w-2/3 rounded" style={accent} />
                    <div className="h-1 w-full rounded bg-gray-300" />
                    <div className="h-1 w-5/6 rounded bg-gray-300" />
                    <div className="mt-2 space-y-1">
                        <div className="h-1.5 w-1/3 rounded" style={accent} />
                        <div className="h-1 w-full rounded bg-gray-300" />
                        <div className="h-1 w-4/5 rounded bg-gray-300" />
                    </div>
                    <div className="mt-2 space-y-1">
                        <div className="h-1.5 w-1/4 rounded" style={accent} />
                        <div className="h-1 w-full rounded bg-gray-300" />
                        <div className="h-1 w-3/4 rounded bg-gray-300" />
                    </div>
                </div>
            </div>
        ),
        minimal: (
            <div className="space-y-2 p-4">
                <div className="h-3 w-1/2 rounded bg-gray-400" />
                <div className="h-1 w-1/3 rounded bg-gray-300" />
                <div className="border-t border-gray-200 my-3" />
                <div className="space-y-1.5">
                    <div className="h-1 w-full rounded bg-gray-200" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                    <div className="h-1 w-3/4 rounded bg-gray-200" />
                </div>
                <div className="border-t border-gray-200 my-3" />
                <div className="space-y-1.5">
                    <div className="h-1.5 w-1/4 rounded bg-gray-400" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                    <div className="h-1 w-5/6 rounded bg-gray-200" />
                </div>
                <div className="border-t border-gray-200 my-3" />
                <div className="space-y-1.5">
                    <div className="h-1.5 w-1/5 rounded bg-gray-400" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                </div>
            </div>
        ),
        creative: (
            <div className="space-y-2">
                <div className="p-3 rounded-t" style={{ backgroundColor: accentColor + '18' }}>
                    <div className="h-3 w-2/3 rounded" style={accent} />
                    <div className="h-1 w-1/2 rounded bg-gray-300 mt-1" />
                </div>
                <div className="px-3 space-y-2">
                    <div className="flex items-center gap-1.5">
                        <div className="w-0.5 h-4 rounded" style={accent} />
                        <div className="h-1.5 w-1/3 rounded" style={accent} />
                    </div>
                    <div className="h-1 w-full rounded bg-gray-300 ml-2" />
                    <div className="h-1 w-5/6 rounded bg-gray-300 ml-2" />
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-0.5 h-4 rounded" style={accent} />
                        <div className="h-1.5 w-1/3 rounded" style={accent} />
                    </div>
                    <div className="h-1 w-full rounded bg-gray-300 ml-2" />
                    <div className="h-1 w-4/5 rounded bg-gray-300 ml-2" />
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-0.5 h-4 rounded" style={accent} />
                        <div className="h-1.5 w-1/4 rounded" style={accent} />
                    </div>
                    <div className="flex gap-1 flex-wrap ml-2">
                        <div className="h-2 w-8 rounded-full" style={{ backgroundColor: accentColor + '33' }} />
                        <div className="h-2 w-10 rounded-full" style={{ backgroundColor: accentColor + '33' }} />
                        <div className="h-2 w-6 rounded-full" style={{ backgroundColor: accentColor + '33' }} />
                    </div>
                </div>
            </div>
        ),
        professional: (
            <div className="space-y-2 p-3">
                <div className="text-center pb-2 border-b-2" style={{ borderColor: accentColor }}>
                    <div className="h-3 w-1/2 mx-auto rounded" style={accent} />
                    <div className="h-1 w-1/3 mx-auto rounded bg-gray-300 mt-1" />
                </div>
                <div className="space-y-1.5 mt-2">
                    <div className="h-1.5 w-1/3 rounded" style={accent} />
                    <hr className="border-gray-300" />
                    <div className="h-1 w-full rounded bg-gray-300" />
                    <div className="h-1 w-5/6 rounded bg-gray-300" />
                    <div className="h-1 w-4/6 rounded bg-gray-300" />
                </div>
                <div className="space-y-1.5 mt-2">
                    <div className="h-1.5 w-1/4 rounded" style={accent} />
                    <hr className="border-gray-300" />
                    <div className="h-1 w-full rounded bg-gray-300" />
                    <div className="h-1 w-5/6 rounded bg-gray-300" />
                </div>
                <div className="space-y-1.5 mt-2">
                    <div className="h-1.5 w-1/5 rounded" style={accent} />
                    <hr className="border-gray-300" />
                    <div className="flex gap-1 flex-wrap">
                        <div className="h-2 w-8 rounded bg-gray-300" />
                        <div className="h-2 w-10 rounded bg-gray-300" />
                        <div className="h-2 w-7 rounded bg-gray-300" />
                    </div>
                </div>
            </div>
        ),
        blank: (
            <div className="space-y-2 p-4">
                <div className="h-2.5 w-1/2 rounded bg-gray-400" />
                <div className="h-1 w-1/3 rounded bg-gray-300" />
                <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-1/4 rounded bg-gray-400" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                    <div className="h-1 w-5/6 rounded bg-gray-200" />
                </div>
                <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-1/4 rounded bg-gray-400" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                    <div className="h-1 w-4/5 rounded bg-gray-200" />
                </div>
                <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-1/5 rounded bg-gray-400" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                </div>
            </div>
        ),
    };

    return (
        <div className="w-full aspect-[210/297] bg-white rounded-lg border border-gray-200 overflow-hidden">
            {layouts[slug] || layouts.blank}
        </div>
    );
}
