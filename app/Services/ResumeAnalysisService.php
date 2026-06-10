<?php

namespace App\Services;

use App\Models\Resume;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;
use Smalot\PdfParser\Parser as PdfParser;

class ResumeAnalysisService
{
    protected array $professionalKeywords = [
        'leadership', 'management', 'communication', 'teamwork', 'problem-solving',
        'analytical', 'strategic', 'project management', 'collaboration', 'innovation',
        'adaptability', 'critical thinking', 'organization', 'planning', 'negotiation',
    ];

    protected array $techKeywords = [
        'javascript', 'python', 'java', 'react', 'node.js', 'sql', 'aws',
        'docker', 'kubernetes', 'git', 'agile', 'ci/cd', 'typescript',
        'api', 'rest', 'graphql', 'html', 'css', 'linux', 'cloud',
    ];

    protected array $actionVerbs = [
        'achieved', 'managed', 'developed', 'led', 'created', 'implemented',
        'designed', 'built', 'improved', 'increased', 'reduced', 'delivered',
        'launched', 'optimized', 'streamlined', 'coordinated', 'established',
        'analyzed', 'resolved', 'generated', 'negotiated', 'mentored',
        'spearheaded', 'orchestrated', 'transformed', 'pioneered',
    ];

    protected array $requiredSections = [
        'education', 'experience', 'skills', 'summary', 'objective',
        'work experience', 'professional experience', 'employment',
        'qualifications', 'certifications', 'projects',
    ];

    public function analyze(Resume $resume): Resume
    {
        $resume->update(['status' => 'analyzing']);

        try {
            $fullPath = Storage::disk('local')->path($resume->file_path);
            $text = $this->extractText($fullPath, $resume->mime_type);

            if (empty(trim($text))) {
                $resume->update([
                    'status' => 'failed',
                    'suggestions' => [['type' => 'warning', 'text' => 'Could not extract text from the uploaded file. The file may be image-based or corrupted.']],
                ]);
                return $resume->fresh();
            }

            $resume->update(['parsed_content' => $text]);

            $atsScore = $this->scoreAtsCompatibility($text);
            $keywordResult = $this->scoreKeywordMatch($text);
            $formattingScore = $this->scoreFormatting($text);
            $contentScore = $this->scoreContentQuality($text);

            $overallScore = (int) round(
                $atsScore * 0.30 +
                $keywordResult['score'] * 0.25 +
                $formattingScore * 0.20 +
                $contentScore * 0.25
            );

            $suggestions = $this->generateSuggestions($atsScore, $keywordResult, $formattingScore, $contentScore, $text);

            $resume->update([
                'overall_score' => min($overallScore, 100),
                'ats_score' => $atsScore,
                'keyword_score' => $keywordResult['score'],
                'formatting_score' => $formattingScore,
                'content_score' => $contentScore,
                'keywords_found' => $keywordResult['found'],
                'keywords_missing' => $keywordResult['missing'],
                'suggestions' => $suggestions,
                'status' => 'completed',
                'analyzed_at' => now(),
            ]);

            return $resume->fresh();
        } catch (\Throwable $e) {
            $resume->update([
                'status' => 'failed',
                'suggestions' => [['type' => 'warning', 'text' => 'Analysis failed: ' . $e->getMessage()]],
            ]);
            return $resume->fresh();
        }
    }

    public function extractText(string $filePath, string $mimeType): string
    {
        if ($mimeType === 'application/pdf') {
            return $this->extractFromPdf($filePath);
        }

        if (in_array($mimeType, [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
        ])) {
            return $this->extractFromDocx($filePath);
        }

        return '';
    }

    protected function extractFromPdf(string $filePath): string
    {
        $parser = new PdfParser();
        $pdf = $parser->parseFile($filePath);
        return $pdf->getText();
    }

    protected function extractFromDocx(string $filePath): string
    {
        $phpWord = IOFactory::load($filePath);
        $text = '';

        foreach ($phpWord->getSections() as $section) {
            foreach ($section->getElements() as $element) {
                $text .= $this->extractElementText($element) . "\n";
            }
        }

        return $text;
    }

    protected function extractElementText($element): string
    {
        $text = '';

        if (method_exists($element, 'getText')) {
            $text .= $element->getText();
        }

        if (method_exists($element, 'getElements')) {
            foreach ($element->getElements() as $child) {
                $text .= $this->extractElementText($child);
            }
        }

        return $text;
    }

    public function scoreAtsCompatibility(string $text): int
    {
        $score = 0;
        $textLower = strtolower($text);

        // Check for standard sections (up to 40 points)
        $sectionsFound = 0;
        foreach ($this->requiredSections as $section) {
            if (str_contains($textLower, $section)) {
                $sectionsFound++;
            }
        }
        $score += min($sectionsFound * 10, 40);

        // Check for contact information (up to 25 points)
        if (preg_match('/[\w.+-]+@[\w-]+\.[\w.]+/', $text)) {
            $score += 15;
        }
        if (preg_match('/(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/', $text)) {
            $score += 10;
        }

        // Check text quality - no excessive special characters (up to 15 points)
        $alphaRatio = preg_match_all('/[a-zA-Z]/', $text) / max(strlen($text), 1);
        if ($alphaRatio > 0.5) {
            $score += 15;
        } elseif ($alphaRatio > 0.3) {
            $score += 8;
        }

        // Check for consistent formatting (up to 20 points)
        $lines = array_filter(explode("\n", $text), fn($l) => trim($l) !== '');
        $lineCount = count($lines);
        if ($lineCount >= 10 && $lineCount <= 200) {
            $score += 10;
        } elseif ($lineCount > 0) {
            $score += 5;
        }

        // Check for dates (employment history indicator)
        if (preg_match('/\b(19|20)\d{2}\b/', $text)) {
            $score += 10;
        }

        return min($score, 100);
    }

    public function scoreKeywordMatch(string $text): array
    {
        $textLower = strtolower($text);
        $allKeywords = array_merge($this->professionalKeywords, $this->techKeywords);
        $found = [];
        $missing = [];

        foreach ($allKeywords as $keyword) {
            if (str_contains($textLower, strtolower($keyword))) {
                $found[] = $keyword;
            } else {
                $missing[] = $keyword;
            }
        }

        $total = count($allKeywords);
        $score = $total > 0 ? (int) round((count($found) / $total) * 100) : 0;

        return [
            'score' => min($score, 100),
            'found' => $found,
            'missing' => $missing,
        ];
    }

    public function scoreFormatting(string $text): int
    {
        $score = 0;

        // Word count check (up to 30 points) - ideal 300-1000
        $wordCount = str_word_count($text);
        if ($wordCount >= 300 && $wordCount <= 1000) {
            $score += 30;
        } elseif ($wordCount >= 150 && $wordCount <= 1500) {
            $score += 20;
        } elseif ($wordCount >= 50) {
            $score += 10;
        }

        // Bullet points check (up to 25 points)
        $bulletCount = preg_match_all('/^[\s]*[•\-\*\→\►\●\○]/m', $text);
        if ($bulletCount >= 8) {
            $score += 25;
        } elseif ($bulletCount >= 4) {
            $score += 15;
        } elseif ($bulletCount >= 1) {
            $score += 8;
        }

        // Section count check (up to 25 points)
        $textLower = strtolower($text);
        $sectionCount = 0;
        foreach ($this->requiredSections as $section) {
            if (str_contains($textLower, $section)) {
                $sectionCount++;
            }
        }
        if ($sectionCount >= 4) {
            $score += 25;
        } elseif ($sectionCount >= 2) {
            $score += 15;
        } elseif ($sectionCount >= 1) {
            $score += 8;
        }

        // Structure - paragraph separation (up to 20 points)
        $paragraphs = preg_split('/\n\s*\n/', $text);
        $paragraphCount = count(array_filter($paragraphs, fn($p) => trim($p) !== ''));
        if ($paragraphCount >= 4 && $paragraphCount <= 20) {
            $score += 20;
        } elseif ($paragraphCount >= 2) {
            $score += 10;
        }

        return min($score, 100);
    }

    public function scoreContentQuality(string $text): int
    {
        $score = 0;
        $textLower = strtolower($text);

        // Action verbs (up to 35 points)
        $verbsFound = 0;
        foreach ($this->actionVerbs as $verb) {
            if (str_contains($textLower, $verb)) {
                $verbsFound++;
            }
        }
        if ($verbsFound >= 8) {
            $score += 35;
        } elseif ($verbsFound >= 5) {
            $score += 25;
        } elseif ($verbsFound >= 2) {
            $score += 15;
        } elseif ($verbsFound >= 1) {
            $score += 5;
        }

        // Quantifiable achievements - numbers/percentages (up to 35 points)
        $numberMatches = preg_match_all('/\b\d+[%+]?\b/', $text);
        $percentageMatches = preg_match_all('/\d+\s*%/', $text);
        $dollarMatches = preg_match_all('/\$[\d,]+/', $text);
        $quantifiableCount = $percentageMatches + $dollarMatches + min($numberMatches, 10);

        if ($quantifiableCount >= 8) {
            $score += 35;
        } elseif ($quantifiableCount >= 4) {
            $score += 25;
        } elseif ($quantifiableCount >= 2) {
            $score += 15;
        } elseif ($quantifiableCount >= 1) {
            $score += 5;
        }

        // Dates present - shows timeline (up to 15 points)
        $dateMatches = preg_match_all('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|August|September|October|November|December)\s+\d{4}\b/i', $text);
        if ($dateMatches >= 3) {
            $score += 15;
        } elseif ($dateMatches >= 1) {
            $score += 8;
        }

        // Length and detail (up to 15 points)
        $wordCount = str_word_count($text);
        if ($wordCount >= 200) {
            $score += 15;
        } elseif ($wordCount >= 100) {
            $score += 10;
        } elseif ($wordCount >= 50) {
            $score += 5;
        }

        return min($score, 100);
    }

    public function generateSuggestions(int $atsScore, array $keywordResult, int $formattingScore, int $contentScore, string $text): array
    {
        $suggestions = [];
        $textLower = strtolower($text);

        // ATS suggestions
        if ($atsScore < 50) {
            $suggestions[] = ['type' => 'warning', 'text' => 'Your resume has low ATS compatibility. Add clear section headers like "Experience", "Education", and "Skills".'];
        }
        if (!preg_match('/[\w.+-]+@[\w-]+\.[\w.]+/', $text)) {
            $suggestions[] = ['type' => 'warning', 'text' => 'No email address detected. Include your contact email for recruiters to reach you.'];
        }
        if (!preg_match('/(\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/', $text)) {
            $suggestions[] = ['type' => 'info', 'text' => 'Consider adding a phone number to your contact information.'];
        }

        // Keyword suggestions
        if ($keywordResult['score'] < 40) {
            $suggestions[] = ['type' => 'warning', 'text' => 'Include 2-3 more industry-specific keywords from the job description to improve ATS matching.'];
        } elseif ($keywordResult['score'] < 70) {
            $suggestions[] = ['type' => 'info', 'text' => 'Your keyword coverage is moderate. Review the missing keywords and add relevant ones to strengthen your profile.'];
        } else {
            $suggestions[] = ['type' => 'success', 'text' => 'Strong keyword coverage detected across your resume.'];
        }

        // Formatting suggestions
        $wordCount = str_word_count($text);
        if ($wordCount < 150) {
            $suggestions[] = ['type' => 'warning', 'text' => 'Your resume appears too short. Aim for 300-700 words to adequately describe your experience.'];
        } elseif ($wordCount > 1200) {
            $suggestions[] = ['type' => 'info', 'text' => 'Your resume is quite long. Consider condensing to 1-2 pages for better readability.'];
        }

        $bulletCount = preg_match_all('/^[\s]*[•\-\*\→\►\●\○]/m', $text);
        if ($bulletCount < 3) {
            $suggestions[] = ['type' => 'warning', 'text' => 'Use more bullet points to list your achievements. Recruiters scan for bullet points quickly.'];
        }

        if ($formattingScore >= 70) {
            $suggestions[] = ['type' => 'success', 'text' => 'Good document structure and formatting detected.'];
        }

        // Content suggestions
        $verbsFound = 0;
        foreach ($this->actionVerbs as $verb) {
            if (str_contains($textLower, $verb)) {
                $verbsFound++;
            }
        }
        if ($verbsFound < 3) {
            $suggestions[] = ['type' => 'warning', 'text' => 'Add more quantifiable achievements to your experience section. Use action verbs like "achieved", "improved", "delivered".'];
        } else {
            $suggestions[] = ['type' => 'success', 'text' => 'Good use of action verbs in bullet points.'];
        }

        $quantifiableCount = preg_match_all('/\d+\s*%|\$[\d,]+/', $text);
        if ($quantifiableCount < 2) {
            $suggestions[] = ['type' => 'info', 'text' => 'Include more quantifiable achievements (e.g., "Increased sales by 25%", "Managed $50K budget").'];
        }

        if ($contentScore >= 70) {
            $suggestions[] = ['type' => 'success', 'text' => 'Strong content quality with clear achievements and metrics.'];
        }

        return $suggestions;
    }
}
