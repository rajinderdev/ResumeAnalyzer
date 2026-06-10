@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Experience' }}
    </div>

    @foreach($section['data']['items'] as $item)
    <div style="margin-bottom: 10px;">
        <div style="display: table; width: 100%;">
            <div style="display: table-cell; text-align: left;">
                <span style="font-size: 11px; font-weight: bold; color: #111827;">{{ $item['title'] ?? '' }}</span>
                @if(!empty($item['company']))
                    <span style="font-size: 10px; color: #4b5563;"> | {{ $item['company'] }}</span>
                @endif
            </div>
            <div style="display: table-cell; text-align: right; font-size: 10px; color: #6b7280; white-space: nowrap;">
                @if(!empty($item['location']))
                    {{ $item['location'] }}
                    @if(!empty($item['startDate']))
                        <span style="margin: 0 4px;">|</span>
                    @endif
                @endif
                @if(!empty($item['startDate']))
                    @php
                        $sParts = explode('-', $item['startDate']);
                        $months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        $startFormatted = (isset($sParts[1]) ? ($months[(int)$sParts[1] - 1] ?? '') . ' ' : '') . $sParts[0];
                    @endphp
                    {{ $startFormatted }}
                    <span style="margin: 0 3px;">&ndash;</span>
                    @if(!empty($item['current']))
                        Present
                    @elseif(!empty($item['endDate']))
                        @php
                            $eParts = explode('-', $item['endDate']);
                            $endFormatted = (isset($eParts[1]) ? ($months[(int)$eParts[1] - 1] ?? '') . ' ' : '') . $eParts[0];
                        @endphp
                        {{ $endFormatted }}
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
