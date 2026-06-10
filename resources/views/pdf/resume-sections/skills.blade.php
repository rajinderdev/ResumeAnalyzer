@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Skills' }}
    </div>

    <div style="font-size: 10px; color: #374151; line-height: 1.8;">
        @foreach($section['data']['items'] as $index => $skill)
            <span style="display: inline-block; background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 3px; padding: 2px 8px; margin: 0 4px 4px 0; font-size: 10px; color: #374151;">{{ is_array($skill) ? ($skill['name'] ?? $skill[0] ?? '') : $skill }}</span>
        @endforeach
    </div>
</div>
@endif
