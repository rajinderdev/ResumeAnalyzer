<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $resumes = $user->resumes()
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($r) => [
                'id' => $r->id,
                'original_name' => $r->original_name,
                'overall_score' => $r->overall_score,
                'status' => $r->status,
                'created_at' => $r->created_at->toDateTimeString(),
                'created_at_formatted' => $r->created_at->format('M j, Y'),
            ]);

        $latestResume = $user->resumes()
            ->completed()
            ->orderByDesc('analyzed_at')
            ->first();

        $latestData = null;
        if ($latestResume) {
            $latestData = [
                'id' => $latestResume->id,
                'original_name' => $latestResume->original_name,
                'overall_score' => $latestResume->overall_score,
                'ats_score' => $latestResume->ats_score,
                'keyword_score' => $latestResume->keyword_score,
                'formatting_score' => $latestResume->formatting_score,
                'content_score' => $latestResume->content_score,
                'keywords_found' => $latestResume->keywords_found,
                'keywords_missing' => $latestResume->keywords_missing,
                'suggestions' => $latestResume->suggestions,
                'status' => $latestResume->status,
                'analyzed_at' => $latestResume->analyzed_at?->toDateTimeString(),
            ];
        }

        return Inertia::render('Dashboard', [
            'resumes' => $resumes,
            'latestResume' => $latestData,
        ]);
    }
}
