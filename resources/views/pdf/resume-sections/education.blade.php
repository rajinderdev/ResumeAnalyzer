@if(!empty($section['data']['items']))
<div style="margin-bottom: 14px;">
    <div style="font-size: 13px; font-weight: bold; color: {{ $accentColor }}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid {{ $accentColor }}; padding-bottom: 4px; margin-bottom: 8px;">
        {{ $section['label'] ?? 'Education' }}
    </div>

    @foreach($section['data']['items'] as $item)
    <div style="margin-bottom: 10px;">
        <div style="display: table; width: 100%;">
            <div style="display: table-cell; text-align: left;">
                <span style="font-size: 11px; font-weight: bold; color: #111827;">{{ $item['degree'] ?? '' }}</span>
                @if(!empty($item['school']))
                    <span style="font-size: 10px; color: #4b5563;"> | {{ $item['school'] }}</span>
                @endif
            </div>
            <div style="display: table-cell; text-align: right; font-size: 10px; color: #6b7280; white-space: nowrap;">
                @if(!empty($item['location']))
                    {{ $item['location'] }}
                    @if(!empty($item['graduationDate']))
                        <span style="margin: 0 4px;">|</span>
                    @endif
                @endif
                @if(!empty($item['graduationDate']))
                    @php
                        $gParts = explode('-', $item['graduationDate']);
                        $months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        $gradFormatted = (isset($gParts[1]) ? ($months[(int)$gParts[1] - 1] ?? '') . ' ' : '') . $gParts[0];
                    @endphp
                    {{ $gradFormatted }}
                @endif
            </div>
        </div>

        @if(!empty($item['gpa']))
            <div style="font-size: 10px; color: #4b5563; margin-top: 2px;">
                GPA: {{ $item['gpa'] }}
            </div>
        @endif

        @if(!empty($item['description']))
            <div style="font-size: 10px; color: #374151; line-height: 1.6; margin-top: 4px;">
                {!! nl2br(e($item['description'])) !!}
            </div>
        @endif
    </div>
    @endforeach
</div>
@endif
