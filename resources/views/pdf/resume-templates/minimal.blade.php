{{-- Minimal Resume Template --}}
{{-- Accent: #6b7280 | Maximum whitespace, thin gray dividers, clean section headings --}}

@php
    $accentColor = $settings['accent_color'] ?? '#6b7280';

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
            line-height: 1.6;
            color: #4b5563;
        }

        .header {
            padding-bottom: 18px;
            margin-bottom: 20px;
            border-bottom: 1px solid #e5e7eb;
        }

        .header h1 {
            font-size: 22px;
            font-weight: 300;
            color: #1f2937;
            letter-spacing: 2px;
            margin-bottom: 6px;
        }

        .header .job-title {
            font-size: 11px;
            color: {{ $accentColor }};
            font-weight: 300;
            margin-bottom: 10px;
        }

        .contact-info {
            font-size: 9px;
            color: #9ca3af;
        }

        .contact-info span {
            margin-right: 14px;
        }

        .section {
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f3f4f6;
        }

        .section:last-child {
            border-bottom: none;
        }

        .section-title {
            font-size: 11px;
            font-weight: 300;
            color: {{ $accentColor }};
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 12px;
        }

        .entry {
            margin-bottom: 14px;
        }

        .entry:last-child {
            margin-bottom: 0;
        }

        .entry-header {
            margin-bottom: 3px;
        }

        .entry-title {
            font-size: 10.5px;
            font-weight: bold;
            color: #1f2937;
        }

        .entry-subtitle {
            font-size: 10px;
            color: #6b7280;
            font-weight: 300;
        }

        .entry-date {
            font-size: 9px;
            color: #9ca3af;
            margin-bottom: 4px;
        }

        .entry-description {
            font-size: 9.5px;
            color: #6b7280;
            line-height: 1.6;
        }

        .entry-description ul {
            margin-left: 14px;
            margin-top: 3px;
        }

        .entry-description li {
            margin-bottom: 2px;
        }

        .skills-list {
            font-size: 9.5px;
        }

        .skill-category {
            margin-bottom: 4px;
        }

        .skill-category-name {
            font-weight: bold;
            color: #4b5563;
        }

        .tag {
            display: inline-block;
            background: #f9fafb;
            color: #6b7280;
            padding: 2px 8px;
            margin: 2px 2px;
            font-size: 8.5px;
            border: 1px solid #e5e7eb;
            border-radius: 2px;
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
            color: #6b7280;
            line-height: 1.7;
            font-weight: 300;
        }
    </style>
</head>
<body>
<div style="padding: 24mm 22mm;">

    {{-- Header --}}
    <div class="header">
        <h1>{{ $personal['name'] ?? 'Your Name' }}</h1>
        <div class="contact-info">
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

    {{-- Sections --}}
    @foreach($sections as $section)
        @if($section['type'] !== 'personal')
            @include('pdf.resume-sections.' . $section['type'], ['section' => $section, 'accentColor' => $accentColor])
        @endif
    @endforeach

</div>
</body>
</html>
