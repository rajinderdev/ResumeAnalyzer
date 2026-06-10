<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\ImpersonateController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResumeBuilderController;
use App\Http\Controllers\ResumeController;
use App\Services\ResumeAnalysisService;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/privacy-policy', fn() => Inertia::render('PrivacyPolicy'))->name('privacy-policy');
Route::get('/terms-of-service', fn() => Inertia::render('TermsOfService'))->name('terms-of-service');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/create-profile', function () {
        return Inertia::render('CreateProfile');
    })->name('profile.create');

    Route::post('/create-profile', function (\Illuminate\Http\Request $request, ResumeAnalysisService $analysisService) {
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $userId = $request->user()->id;
            $fileName = time() . '_' . $file->hashName();
            $path = $file->storeAs("resumes/{$userId}", $fileName, 'local');

            $resume = \App\Models\Resume::create([
                'user_id' => $userId,
                'file_name' => $fileName,
                'original_name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'status' => 'pending',
            ]);

            $analysisService->analyze($resume);
        }

        return redirect()->route('dashboard');
    })->name('profile.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Resume routes
    Route::post('/resumes/upload', [ResumeController::class, 'upload'])->name('resumes.upload');
    Route::get('/resumes/{resume}', [ResumeController::class, 'show'])->name('resumes.show');
    Route::delete('/resumes/{resume}', [ResumeController::class, 'destroy'])->name('resumes.destroy');
    Route::get('/resumes/{resume}/download', [ResumeController::class, 'download'])->name('resumes.download');

    // Chat routes for regular users
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/messages/{user}', [ChatController::class, 'getMessages'])->name('chat.messages');
    Route::post('/chat/send', [ChatController::class, 'sendMessage'])->name('chat.send');
    Route::get('/chat/unread-count', [ChatController::class, 'unreadCount'])->name('chat.unread');

    // Resume Builder routes
    Route::get('/resume-builder', [ResumeBuilderController::class, 'index'])->name('resume-builder.index');
    Route::post('/resume-builder', [ResumeBuilderController::class, 'store'])->name('resume-builder.store');
    Route::get('/resume-builder/{builtResume}/edit', [ResumeBuilderController::class, 'edit'])->name('resume-builder.edit');
    Route::put('/resume-builder/{builtResume}', [ResumeBuilderController::class, 'update'])->name('resume-builder.update');
    Route::delete('/resume-builder/{builtResume}', [ResumeBuilderController::class, 'destroy'])->name('resume-builder.destroy');
    Route::get('/resume-builder/{builtResume}/download', [ResumeBuilderController::class, 'download'])->name('resume-builder.download');

    // Impersonation stop (accessible by impersonated session)
    Route::post('/impersonate/stop', [ImpersonateController::class, 'stop'])->name('impersonate.stop');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole'])->name('users.updateRole');
    Route::patch('/users/{user}/toggle-active', [AdminUserController::class, 'toggleActive'])->name('users.toggleActive');
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

    Route::post('/impersonate/{user}', [ImpersonateController::class, 'start'])->name('impersonate.start');

    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::get('/chat', [ChatController::class, 'adminIndex'])->name('chat.index');
    Route::get('/chat/messages/{user}', [ChatController::class, 'getMessages'])->name('chat.messages');
    Route::post('/chat/send', [ChatController::class, 'sendMessage'])->name('chat.send');
});

require __DIR__.'/auth.php';
