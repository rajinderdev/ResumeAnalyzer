<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Services\ResumeAnalysisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResumeController extends Controller
{
    public function upload(Request $request, ResumeAnalysisService $analysisService)
    {
        $request->validate([
            'resume' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ]);

        $file = $request->file('resume');
        $userId = $request->user()->id;
        $fileName = time() . '_' . $file->hashName();
        $path = $file->storeAs("resumes/{$userId}", $fileName, 'local');

        $resume = Resume::create([
            'user_id' => $userId,
            'file_name' => $fileName,
            'original_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'status' => 'pending',
        ]);

        $resume = $analysisService->analyze($resume);

        return response()->json([
            'message' => 'Resume uploaded and analyzed successfully.',
            'resume' => [
                'id' => $resume->id,
                'original_name' => $resume->original_name,
                'overall_score' => $resume->overall_score,
                'ats_score' => $resume->ats_score,
                'keyword_score' => $resume->keyword_score,
                'formatting_score' => $resume->formatting_score,
                'content_score' => $resume->content_score,
                'keywords_found' => $resume->keywords_found,
                'keywords_missing' => $resume->keywords_missing,
                'suggestions' => $resume->suggestions,
                'status' => $resume->status,
                'analyzed_at' => optional($resume->analyzed_at)->toDateTimeString(),
                'created_at' => optional($resume->created_at)->toDateTimeString(),
            ],
        ]);
    }

    public function show(Resume $resume)
    {
        abort_unless($resume->user_id === auth()->id(), 403);

        return response()->json([
            'resume' => [
                'id' => $resume->id,
                'original_name' => $resume->original_name,
                'file_size' => $resume->file_size,
                'mime_type' => $resume->mime_type,
                'overall_score' => $resume->overall_score,
                'ats_score' => $resume->ats_score,
                'keyword_score' => $resume->keyword_score,
                'formatting_score' => $resume->formatting_score,
                'content_score' => $resume->content_score,
                'keywords_found' => $resume->keywords_found,
                'keywords_missing' => $resume->keywords_missing,
                'suggestions' => $resume->suggestions,
                'parsed_content' => $resume->parsed_content
                    ? mb_substr($resume->parsed_content, 0, 2000)
                    : null,
                'status' => $resume->status,
                'analyzed_at' => optional($resume->analyzed_at)->toDateTimeString(),
                'created_at' => optional($resume->created_at)->toDateTimeString(),
            ],
        ]);
    }

    public function destroy(Resume $resume)
    {
        abort_unless($resume->user_id === auth()->id(), 403);

        Storage::disk('local')->delete($resume->file_path);
        $resume->delete();

        return response()->json(['message' => 'Resume deleted successfully.']);
    }

    public function download(Resume $resume)
    {
        abort_unless($resume->user_id === auth()->id(), 403);

        return Storage::disk('local')->download(
            $resume->file_path,
            $resume->original_name
        );
    }
}
