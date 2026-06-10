@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Volunteer Experience' }}
    </div>

    @foreach($section['data']['items'] as $item)
    <div style="margin-bottom: 10px;">
        <div style="display: table; width: 100%;">
            <div style="display: table-cell; text-align: left;">
                <span style="font-size: 11px; font-weight: bold; color: #111827;">{{ $item['role'] ?? '' }}</span>
                @if(!empty($item['organization']))
                    <span style="font-size: 10px; color: #4b5563;"> | {{ $item['organization'] }}</span>
                @endif
            </div>
            <div style="display: table-cell; text-align: right; font-size: 10px; color: #6b7280; white-space: nowrap;">
                @if(!empty($item['startDate']))
                    @php
                        $vsParts = explode('-', $item['startDate']);
                        $months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        $vStartFormatted = (isset($vsParts[1]) ? ($months[(int)$vsParts[1] - 1] ?? '') . ' ' : '') . $vsParts[0];
                    @endphp
                    {{ $vStartFormatted }}
                    <span style="margin: 0 3px;">&ndash;</span>
                    @if(!empty($item['endDate']))
                        @php
                            $veParts = explode('-', $item['endDate']);
                            $vEndFormatted = (isset($veParts[1]) ? ($months[(int)$veParts[1] - 1] ?? '') . ' ' : '') . $veParts[0];
                        @endphp
                        {{ $vEndFormatted }}
                    @else
                        Present
                    @endif
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
