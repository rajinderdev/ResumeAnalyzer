<?php

namespace App\Http\Controllers;

use App\Models\BuiltResume;
use App\Services\ResumeBuilderPdfService;
use App\Services\TemplateRegistry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResumeBuilderController extends Controller
{
    public function index()
    {
        $resumes = BuiltResume::forUser(auth()->id())
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('ResumeBuilder/Index', [
            'resumes' => $resumes,
            'templates' => TemplateRegistry::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'template' => ['required', 'string', 'in:' . implode(',', TemplateRegistry::slugs())],
        ]);

        $resume = BuiltResume::create([
            'user_id' => auth()->id(),
            'title' => 'Untitled Resume',
            'template' => $request->template,
            'sections' => TemplateRegistry::defaultSections(),
            'status' => 'draft',
        ]);

        return redirect()->route('resume-builder.edit', $resume);
    }

    public function edit(BuiltResume $builtResume)
    {
        if ($builtResume->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('ResumeBuilder/Edit', [
            'resume' => $builtResume,
            'templates' => TemplateRegistry::all(),
        ]);
    }

    public function update(Request $request, BuiltResume $builtResume)
    {
        if ($builtResume->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'template' => ['sometimes', 'string', 'in:' . implode(',', TemplateRegistry::slugs())],
            'sections' => ['sometimes', 'array'],
            'settings' => ['sometimes', 'nullable', 'array'],
            'status' => ['sometimes', 'in:draft,completed'],
        ]);

        $builtResume->update($validated);

        return response()->json(['success' => true, 'resume' => $builtResume->fresh()]);
    }

    public function destroy(BuiltResume $builtResume)
    {
        if ($builtResume->user_id !== auth()->id()) {
            abort(403);
        }

        $builtResume->delete();

        return response()->json(['success' => true]);
    }

    public function download(BuiltResume $builtResume, ResumeBuilderPdfService $pdfService)
    {
        if ($builtResume->user_id !== auth()->id()) {
            abort(403);
        }

        $pdf = $pdfService->generate($builtResume);
        $filename = str_replace(' ', '_', $builtResume->title) . '.pdf';

        return $pdf->download($filename);
    }
}
