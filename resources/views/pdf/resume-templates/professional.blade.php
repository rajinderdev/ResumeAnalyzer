{{-- Professional Resume Template --}}
{{-- Accent: #1e40af | Navy/blue accents, formal horizontal rules, centered header, uppercase headings --}}

@php
    $accentColor = $settings['accent_color'] ?? '#1e40af';

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
            text-align: center;
            padding-bottom: 14px;
            margin-bottom: 18px;
            border-bottom: 3px solid {{ $accentColor }};
        }

        .header h1 {
            font-size: 26px;
            font-weight: bold;
            color: {{ $accentColor }};
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 4px;
        }

        .header .job-title {
            font-size: 11px;
            color: #4b5563;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }

        .contact-info {
            font-size: 9px;
            color: #6b7280;
        }

        .contact-info span {
            margin: 0 8px;
        }

        .contact-separator {
            color: {{ $accentColor }};
            font-weight: bold;
        }

        .section {
            margin-bottom: 16px;
        }

        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: {{ $accentColor }};
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 2px;
        }

        .section-hr {
            border: none;
            border-top: 1.5px solid {{ $accentColor }};
            margin-bottom: 10px;
        }

        .entry {
            margin-bottom: 12px;
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
            color: #4b5563;
            font-style: italic;
        }

        .entry-date {
            font-size: 9px;
            color: {{ $accentColor }};
            font-weight: bold;
            margin-bottom: 2px;
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
            background: #eff6ff;
            color: {{ $accentColor }};
            padding: 1px 7px;
            margin: 1px 2px;
            font-size: 8.5px;
            border: 1px solid #dbeafe;
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
            color: #4b5563;
            line-height: 1.65;
        }
    </style>
</head>
<body>
<div style="padding: 20mm;">

    {{-- Header --}}
    <div class="header">
        <h1>{{ $personal['name'] ?? 'Your Name' }}</h1>
        <div class="contact-info">
            @php
                $contactItems = [];
                if (!empty($personal['email'])) $contactItems[] = $personal['email'];
                if (!empty($personal['phone'])) $contactItems[] = $personal['phone'];
                if (!empty($personal['location'])) {
                    $contactItems[] = $personal['location'];
                }
                if (!empty($personal['linkedin'])) $contactItems[] = $personal['linkedin'];
                if (!empty($personal['website'])) $contactItems[] = $personal['website'];
            @endphp
            @foreach($contactItems as $i => $item)
                <span>{{ $item }}</span>
                @if($i < count($contactItems) - 1)
                    <span class="contact-separator">|</span>
                @endif
            @endforeach
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
