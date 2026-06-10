@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Projects' }}
    </div>

    @foreach($section['data']['items'] as $item)
    <div style="margin-bottom: 10px;">
        <div style="font-size: 11px; font-weight: bold; color: #111827;">
            {{ $item['name'] ?? '' }}
        </div>

        @if(!empty($item['url']))
            <div style="font-size: 9px; color: {{ $accentColor }}; margin-top: 1px;">
                {{ $item['url'] }}
            </div>
        @endif

        @if(!empty($item['description']))
            <div style="font-size: 10px; color: #374151; line-height: 1.6; margin-top: 4px;">
                {!! nl2br(e($item['description'])) !!}
            </div>
        @endif

        @if(!empty($item['technologies']))
            <div style="margin-top: 4px;">
                @php
                    $techs = is_array($item['technologies']) ? $item['technologies'] : explode(',', $item['technologies']);
                @endphp
                @foreach($techs as $tech)
                    <span style="display: inline-block; background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 3px; padding: 1px 6px; margin: 0 3px 3px 0; font-size: 9px; color: #4b5563;">{{ trim($tech) }}</span>
                @endforeach
            </div>
        @endif
    </div>
    @endforeach
</div>
@endif
