{{-- Personal info fallback partial - typically rendered by the parent template header --}}
@if(!empty($section['data']))
@php $d = $section['data']; @endphp
<div style="margin-bottom: 12px;">
    @if(!empty($d['name']))
        <div style="font-size: 18px; font-weight: bold; color: {{ $accentColor }}; margin-bottom: 4px;">
            {{ $d['name'] }}
        </div>
    @endif
    <div style="font-size: 10px; color: #4b5563; line-height: 1.6;">
        @php
            $details = [];
            if (!empty($d['email'])) $details[] = $d['email'];
            if (!empty($d['phone'])) $details[] = $d['phone'];
            if (!empty($d['location'])) $details[] = $d['location'];
        @endphp
        @if(count($details))
            <span>{{ implode('  |  ', $details) }}</span>
        @endif
        @if(!empty($d['linkedin']) || !empty($d['website']))
            <br>
            @if(!empty($d['linkedin']))
                <span>{{ $d['linkedin'] }}</span>
            @endif
            @if(!empty($d['linkedin']) && !empty($d['website']))
                <span style="margin: 0 6px;">|</span>
            @endif
            @if(!empty($d['website']))
                <span>{{ $d['website'] }}</span>
            @endif
        @endif
    </div>
</div>
@endif
