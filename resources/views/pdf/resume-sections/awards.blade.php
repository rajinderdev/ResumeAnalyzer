@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Awards' }}
    </div>

    @foreach($section['data']['items'] as $item)
    <div style="margin-bottom: 8px;">
        <div style="display: table; width: 100%;">
            <div style="display: table-cell; text-align: left;">
                <span style="font-size: 11px; font-weight: bold; color: #111827;">{{ $item['title'] ?? '' }}</span>
                @if(!empty($item['issuer']))
                    <span style="font-size: 10px; color: #4b5563;"> &ndash; {{ $item['issuer'] }}</span>
                @endif
            </div>
            <div style="display: table-cell; text-align: right; font-size: 10px; color: #6b7280; white-space: nowrap;">
                @if(!empty($item['date']))
                    @php
                        $aParts = explode('-', $item['date']);
                        $months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        $awardDateFormatted = (isset($aParts[1]) ? ($months[(int)$aParts[1] - 1] ?? '') . ' ' : '') . $aParts[0];
                    @endphp
                    {{ $awardDateFormatted }}
                @endif
            </div>
        </div>

        @if(!empty($item['description']))
            <div style="font-size: 10px; color: #374151; line-height: 1.6; margin-top: 4px;">
                {!! nl2br(e($item['description'])) !!}
            </div>
        @endif
    </div>
    @endforeach
</div>
@endif
