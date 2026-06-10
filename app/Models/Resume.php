<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resume extends Model
{
    protected $fillable = [
        'user_id',
        'file_name',
        'original_name',
        'file_path',
        'file_size',
        'mime_type',
        'overall_score',
        'ats_score',
        'keyword_score',
        'formatting_score',
        'content_score',
        'keywords_found',
        'keywords_missing',
        'suggestions',
        'parsed_content',
        'status',
        'analyzed_at',
    ];

    protected function casts(): array
    {
        return [
            'keywords_found' => 'array',
            'keywords_missing' => 'array',
            'suggestions' => 'array',
            'overall_score' => 'integer',
            'ats_score' => 'integer',
            'keyword_score' => 'integer',
            'formatting_score' => 'integer',
            'content_score' => 'integer',
            'file_size' => 'integer',
            'analyzed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }
}
