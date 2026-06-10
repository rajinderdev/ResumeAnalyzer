@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Certifications' }}
    </div>

    @foreach($section['data']['items'] as $item)
    <div style="margin-bottom: 8px;">
        <div style="display: table; width: 100%;">
            <div style="display: table-cell; text-align: left;">
                <span style="font-size: 11px; font-weight: bold; color: #111827;">{{ $item['name'] ?? '' }}</span>
                @if(!empty($item['issuer']))
                    <span style="font-size: 10px; color: #4b5563;"> &ndash; {{ $item['issuer'] }}</span>
                @endif
            </div>
            <div style="display: table-cell; text-align: right; font-size: 10px; color: #6b7280; white-space: nowrap;">
                @if(!empty($item['date']))
                    @php
                        $cParts = explode('-', $item['date']);
                        $months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        $certDateFormatted = (isset($cParts[1]) ? ($months[(int)$cParts[1] - 1] ?? '') . ' ' : '') . $cParts[0];
                    @endphp
                    {{ $certDateFormatted }}
                @endif
            </div>
        </div>

        @if(!empty($item['url']))
            <div style="font-size: 9px; color: {{ $accentColor }}; margin-top: 2px;">
                {{ $item['url'] }}
            </div>
        @endif
    </div>
    @endforeach
</div>
@endif
