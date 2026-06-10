import { useRef, useState, useEffect, useCallback } from 'react';
import TemplateRenderer from './TemplateRenderer';

export default function ResumePreview({ sections, template, settings }) {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(0.5);

    const A4_WIDTH = 794; // 210mm at 96dpi
    const A4_MIN_HEIGHT = 1123; // 297mm at 96dpi

    const updateScale = useCallback(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            setScale(Math.min(containerWidth / A4_WIDTH, 1));
        }
    }, []);

    useEffect(() => {
        updateScale();
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [updateScale]);

    return (
        <div ref={containerRef} className="w-full">
            <div
                className="overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white"
                style={{ height: A4_MIN_HEIGHT * scale }}
            >
                <div
                    style={{
                        width: A4_WIDTH,
                        minHeight: A4_MIN_HEIGHT,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                    }}
                >
                    <TemplateRenderer
                        template={template}
                        sections={sections}
                        settings={settings}
                    />
                </div>
            </div>
        </div>
    );
}
