{{-- Blank Resume Template --}}
{{-- Accent: #0d9488 | Basic headings + content, no decorative elements, simple and clean --}}

@php
    $accentColor = $settings['accent_color'] ?? '#0d9488';

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
            line-height: 1.5;
            color: #374151;
        }

        .header {
            margin-bottom: 16px;
        }

        .header h1 {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 4px;
        }

        .header .job-title {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 6px;
        }

        .contact-info {
            font-size: 9px;
            color: #6b7280;
            line-height: 1.6;
        }

        .section {
            margin-bottom: 14px;
        }

        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: {{ $accentColor }};
            margin-bottom: 6px;
        }

        .entry {
            margin-bottom: 10px;
        }

        .entry-title {
            font-size: 10.5px;
            font-weight: bold;
            color: #1f2937;
        }

        .entry-subtitle {
            font-size: 10px;
            color: #4b5563;
        }

        .entry-date {
            font-size: 9px;
            color: #6b7280;
            margin-bottom: 2px;
        }

        .entry-description {
            font-size: 9.5px;
            color: #4b5563;
            line-height: 1.5;
        }

        .entry-description ul {
            margin-left: 14px;
            margin-top: 2px;
        }

        .entry-description li {
            margin-bottom: 1px;
        }

        .skills-list {
            font-size: 9.5px;
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
            background: #f3f4f6;
            color: #374151;
            padding: 1px 6px;
            margin: 1px 2px;
            font-size: 8.5px;
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
            line-height: 1.6;
        }
    </style>
</head>
<body>
<div style="padding: 20mm 18mm;">

    {{-- Header --}}
    <div class="header">
        <h1>{{ $personal['name'] ?? 'Your Name' }}</h1>
        <div class="contact-info">
            @php
                $contactParts = [];
                if (!empty($personal['email'])) $contactParts[] = $personal['email'];
                if (!empty($personal['phone'])) $contactParts[] = $personal['phone'];
                if (!empty($personal['location'])) {
                    $contactParts[] = $personal['location'];
                }
                if (!empty($personal['linkedin'])) $contactParts[] = $personal['linkedin'];
                if (!empty($personal['website'])) $contactParts[] = $personal['website'];
            @endphp
            {{ implode('  |  ', $contactParts) }}
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
