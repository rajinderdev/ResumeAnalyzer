{{-- Creative Resume Template --}}
{{-- Accent: #7c3aed | Violet header block, accent bars before section headings, decorative styling --}}

@php
    $accentColor = $settings['accent_color'] ?? '#7c3aed';

    if (!function_exists('formatResumeDate')) {
        function formatResumeDate($date) {
            if (empty($date)) return '';
            try {
                return \Carbon\Carbon::parse($date)->format('M Y');
            } catch (\Exception $e) {
                return $date;
            }
        }
    }

    $personalSection = collect($sections)->firstWhere('type', 'personal');
    $personal = $personalSection['data'] ?? [];

    // Compute a lighter tint for backgrounds
    $accentLight = $accentColor . '15';
@endphp

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Resume' }}</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 10px;
            line-height: 1.5;
            color: #374151;
        }

        .header-block {
            background-color: {{ $accentColor }};
            color: #ffffff;
            padding: 28px 24px 22px 24px;
        }

        .header-block h1 {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 4px;
            letter-spacing: 1px;
        }

        .header-block .job-title {
            font-size: 12px;
            font-weight: 300;
            opacity: 0.85;
            margin-bottom: 12px;
        }

        .header-block .contact-row {
            font-size: 9px;
            opacity: 0.8;
        }

        .header-block .contact-row span {
            margin-right: 12px;
        }

        .content {
            padding: 20px 24px;
        }

        .section {
            margin-bottom: 16px;
        }

        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: {{ $accentColor }};
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            padding-left: 12px;
            border-left: 3px solid {{ $accentColor }};
        }

        .entry {
            margin-bottom: 12px;
            padding-left: 12px;
        }

        .entry-header {
            margin-bottom: 2px;
        }

        .entry-title {
            font-size: 11px;
            font-weight: bold;
            color: #1f2937;
        }

        .entry-subtitle {
            font-size: 10px;
            color: {{ $accentColor }};
        }

        .entry-date {
            font-size: 9px;
            color: #9ca3af;
            margin-bottom: 3px;
        }

        .entry-description {
            font-size: 9.5px;
            color: #4b5563;
            line-height: 1.55;
        }

        .entry-description ul {
            margin-left: 14px;
            margin-top: 2px;
        }

        .entry-description li {
            margin-bottom: 2px;
        }

        .skills-list {
            font-size: 9.5px;
            padding-left: 12px;
        }

        .skill-category {
            margin-bottom: 4px;
        }

        .skill-category-name {
            font-weight: bold;
            color: #1f2937;
        }

        .tag {
            display: inline-block;
            background: #f5f3ff;
            color: {{ $accentColor }};
            padding: 2px 8px;
            margin: 2px 2px;
            font-size: 8.5px;
            border-radius: 10px;
            border: 1px solid #ede9fe;
        }

        table.entry-table {
            width: 100%;
            border-collapse: collapse;
        }

        table.entry-table td {
            vertical-align: top;
            padding: 0;
        }

        .text-right {
            text-align: right;
        }

        .summary-text {
            font-size: 10px;
            color: #4b5563;
            line-height: 1.65;
            padding-left: 12px;
        }

        .divider {
            border: none;
            border-top: 1px solid #ede9fe;
            margin: 12px 0;
        }
    </style>
</head>
<body>

    {{-- Colored Header Block --}}
    <div class="header-block">
        <h1>{{ $personal['name'] ?? 'Your Name' }}</h1>
        <div class="contact-row">
            @if(!empty($personal['email']))
                <span>{{ $personal['email'] }}</span>
            @endif
            @if(!empty($personal['phone']))
                <span>{{ $personal['phone'] }}</span>
            @endif
            @if(!empty($personal['location']))
                <span>{{ $personal['location'] }}</span>
            @endif
            @if(!empty($personal['linkedin']))
                <span>{{ $personal['linkedin'] }}</span>
            @endif
            @if(!empty($personal['website']))
                <span>{{ $personal['website'] }}</span>
            @endif
        </div>
    </div>

    {{-- Content --}}
    <div class="content">
        @foreach($sections as $section)
            @if($section['type'] !== 'personal')
                @include('pdf.resume-sections.' . $section['type'], ['section' => $section, 'accentColor' => $accentColor])
            @endif
        @endforeach
    </div>

</body>
</html>
