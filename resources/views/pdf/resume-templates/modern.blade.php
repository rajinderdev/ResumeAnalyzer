{{-- Modern Resume Template --}}
{{-- Accent: #0d9488 | Two-column layout: teal sidebar (left) + main content (right) --}}
{{-- Uses table-based layout for dompdf compatibility --}}

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

    $sidebarTypes = ['skills', 'languages'];
    $sidebarSections = collect($sections)->filter(fn($s) => in_array($s['type'], $sidebarTypes));
    $mainSections = collect($sections)->filter(fn($s) => $s['type'] !== 'personal' && !in_array($s['type'], $sidebarTypes));

    $initials = strtoupper(substr($personal['name'] ?? 'U', 0, 1));
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

        .layout-table {
            width: 100%;
            border-collapse: collapse;
            min-height: 297mm;
        }

        .layout-table td {
            vertical-align: top;
        }

        .sidebar {
            width: 220px;
            background-color: {{ $accentColor }};
            color: #ffffff;
            padding: 24px 18px;
        }

        .sidebar .avatar-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.2);
            text-align: center;
            line-height: 80px;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin: 0 auto 16px auto;
        }

        .sidebar .name {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 4px;
        }

        .sidebar .job-title {
            font-size: 10px;
            text-align: center;
            opacity: 0.85;
            margin-bottom: 20px;
        }

        .sidebar .sidebar-section {
            margin-bottom: 18px;
        }

        .sidebar .sidebar-section-title {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding-bottom: 4px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.35);
            margin-bottom: 8px;
            color: #ffffff;
        }

        .sidebar .contact-item {
            font-size: 9px;
            margin-bottom: 5px;
            word-wrap: break-word;
            color: rgba(255, 255, 255, 0.9);
        }

        .sidebar .contact-label {
            font-weight: bold;
            font-size: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: rgba(255, 255, 255, 0.65);
            margin-bottom: 1px;
        }

        .sidebar .skill-item {
            font-size: 9px;
            margin-bottom: 4px;
            color: rgba(255, 255, 255, 0.9);
        }

        .sidebar .skill-bar-bg {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin-top: 2px;
        }

        .sidebar .skill-bar-fill {
            height: 4px;
            background: #ffffff;
            border-radius: 2px;
        }

        .sidebar .language-item {
            font-size: 9px;
            margin-bottom: 4px;
            color: rgba(255, 255, 255, 0.9);
        }

        .sidebar .language-level {
            font-size: 8px;
            opacity: 0.7;
        }

        .main-content {
            padding: 24px 22px 24px 30px;
        }

        .section {
            margin-bottom: 16px;
        }

        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: {{ $accentColor }};
            text-transform: uppercase;
            letter-spacing: 1px;
            padding-bottom: 4px;
            border-bottom: 2px solid {{ $accentColor }};
            margin-bottom: 10px;
        }

        .entry {
            margin-bottom: 10px;
        }

        .entry-title {
            font-size: 11px;
            font-weight: bold;
            color: #1f2937;
        }

        .entry-subtitle {
            font-size: 10px;
            color: #4b5563;
        }

        .entry-date {
            font-size: 9px;
            color: {{ $accentColor }};
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

        .tag {
            display: inline-block;
            background: #f0fdfa;
            color: {{ $accentColor }};
            padding: 1px 6px;
            margin: 1px 2px;
            font-size: 8.5px;
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
            line-height: 1.6;
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
    </style>
</head>
<body>

    <table class="layout-table">
        <tr>
            {{-- Sidebar --}}
            <td class="sidebar">
                {{-- Avatar Initial --}}
                <div class="avatar-circle">{{ $initials }}</div>

                {{-- Name --}}
                <div class="name">{{ $personal['name'] ?? 'Your Name' }}</div>

                {{-- Contact Info --}}
                <div class="sidebar-section">
                    <div class="sidebar-section-title">Contact</div>

                    @if(!empty($personal['email']))
                        <div class="contact-item">
                            <div class="contact-label">Email</div>
                            {{ $personal['email'] }}
                        </div>
                    @endif

                    @if(!empty($personal['phone']))
                        <div class="contact-item">
                            <div class="contact-label">Phone</div>
                            {{ $personal['phone'] }}
                        </div>
                    @endif

                    @if(!empty($personal['location']))
                        <div class="contact-item">
                            <div class="contact-label">Location</div>
                            {{ $personal['location'] }}
                        </div>
                    @endif

                    @if(!empty($personal['linkedin']))
                        <div class="contact-item">
                            <div class="contact-label">LinkedIn</div>
                            {{ $personal['linkedin'] }}
                        </div>
                    @endif

                    @if(!empty($personal['website']))
                        <div class="contact-item">
                            <div class="contact-label">Website</div>
                            {{ $personal['website'] }}
                        </div>
                    @endif
                </div>

                {{-- Sidebar Sections (Skills, Languages) --}}
                @foreach($sidebarSections as $section)
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">{{ $section['label'] }}</div>

                        @if($section['type'] === 'skills')
                            @if(!empty($section['data']['items']))
                                @foreach($section['data']['items'] as $skill)
                                    <div class="skill-item">
                                        {{ $skill }}
                                    </div>
                                @endforeach
                            @endif
                        @elseif($section['type'] === 'languages')
                            @if(!empty($section['data']['items']))
                                @foreach($section['data']['items'] as $language)
                                    <div class="language-item">
                                        {{ $language['language'] ?? '' }}
                                        @if(!empty($language['proficiency']))
                                            <span class="language-level">&mdash; {{ $language['proficiency'] }}</span>
                                        @endif
                                    </div>
                                @endforeach
                            @endif
                        @endif
                    </div>
                @endforeach
            </td>

            {{-- Main Content --}}
            <td class="main-content">
                @foreach($mainSections as $section)
                    @include('pdf.resume-sections.' . $section['type'], ['section' => $section, 'accentColor' => $accentColor])
                @endforeach
            </td>
        </tr>
    </table>

</body>
</html>
