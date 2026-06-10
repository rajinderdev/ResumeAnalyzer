<?php

namespace App\Services;

use App\Models\BuiltResume;
use Barryvdh\DomPDF\Facade\Pdf;

class ResumeBuilderPdfService
{
    public function generate(BuiltResume $resume)
    {
        $sections = collect($resume->sections)->sortBy('order')->values()->all();
        $template = $resume->template;
        $settings = $resume->settings ?? [];

        $viewName = "pdf.resume-templates.{$template}";

        if (!view()->exists($viewName)) {
            $viewName = 'pdf.resume-templates.blank';
        }

        $html = view($viewName, [
            'sections' => $sections,
            'title' => $resume->title,
            'settings' => $settings,
        ])->render();

        return Pdf::loadHTML($html)->setPaper('a4', 'portrait');
    }
}
