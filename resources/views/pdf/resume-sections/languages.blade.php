@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Languages' }}
    </div>

    <div style="font-size: 10px; color: #374151; line-height: 1.8;">
        @foreach($section['data']['items'] as $index => $item)
            <span style="display: inline-block; margin-right: 12px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #111827;">{{ $item['language'] ?? '' }}</span>@if(!empty($item['proficiency']))<span style="color: #6b7280;"> &ndash; {{ $item['proficiency'] }}</span>@endif
                @if($index < count($section['data']['items']) - 1)
                    <span style="color: #d1d5db; margin-left: 12px;">|</span>
                @endif
            </span>
        @endforeach
    </div>
</div>
@endif
