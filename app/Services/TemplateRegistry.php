<?php

namespace App\Services;

class TemplateRegistry
{
    public static function all(): array
    {
        return [
            [
                'slug' => 'classic',
                'name' => 'Classic',
                'description' => 'Traditional single-column layout with clean headings and structured sections.',
                'accentColor' => '#1f2937', // gray-800
            ],
            [
                'slug' => 'modern',
                'name' => 'Modern',
                'description' => 'Two-column design with a teal sidebar for a contemporary professional look.',
                'accentColor' => '#0d9488', // teal-600
            ],
            [
                'slug' => 'minimal',
                'name' => 'Minimal',
                'description' => 'Maximum whitespace with thin dividers for a clean, focused presentation.',
                'accentColor' => '#6b7280', // gray-500
            ],
            [
                'slug' => 'creative',
                'name' => 'Creative',
                'description' => 'Bold header block with accent bars for a distinctive, eye-catching style.',
                'accentColor' => '#7c3aed', // violet-600
            ],
            [
                'slug' => 'professional',
                'name' => 'Professional',
                'description' => 'Navy accents with formal rules for a polished, corporate appearance.',
                'accentColor' => '#1e40af', // blue-800
            ],
            [
                'slug' => 'blank',
                'name' => 'Blank Canvas',
                'description' => 'Start from scratch with basic formatting and no decorative elements.',
                'accentColor' => '#0d9488', // teal-600
            ],
        ];
    }

    public static function slugs(): array
    {
        return array_column(self::all(), 'slug');
    }

    public static function defaultSections(): array
    {
        return [
            [
                'type' => 'personal',
                'label' => 'Personal Info',
                'order' => 0,
                'data' => [
                    'name' => '',
                    'email' => '',
                    'phone' => '',
                    'location' => '',
                    'linkedin' => '',
                    'website' => '',
                ],
            ],
            [
                'type' => 'summary',
                'label' => 'Professional Summary',
                'order' => 1,
                'data' => [
                    'content' => '',
                ],
            ],
            [
                'type' => 'experience',
                'label' => 'Work Experience',
                'order' => 2,
                'data' => [
                    'items' => [],
                ],
            ],
            [
                'type' => 'education',
                'label' => 'Education',
                'order' => 3,
                'data' => [
                    'items' => [],
                ],
            ],
            [
                'type' => 'skills',
                'label' => 'Skills',
                'order' => 4,
                'data' => [
                    'items' => [],
                ],
            ],
        ];
    }
}
