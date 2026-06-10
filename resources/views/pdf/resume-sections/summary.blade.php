@if(!empty($section['data']['content']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Professional Summary' }}
    </div>
    <div style="font-size: 10px; color: #374151; line-height: 1.6;">
        {{ $section['data']['content'] }}
    </div>
</div>
@endif
