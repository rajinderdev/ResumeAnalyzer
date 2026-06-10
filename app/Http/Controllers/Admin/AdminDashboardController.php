<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $totalUsers = User::count();
        $activeUsers = User::where('is_active', true)->count();
        $newUsersToday = User::whereDate('created_at', today())->count();
        $newUsersThisWeek = User::where('created_at', '>=', now()->subWeek())->count();
        $newUsersThisMonth = User::where('created_at', '>=', now()->subMonth())->count();

        $unreadMessages = ChatMessage::where('is_read', false)
            ->whereHas('receiver', fn ($q) => $q->whereHas('role', fn ($r) => $r->where('slug', 'admin')->orWhere('slug', 'super-admin')))
            ->count();

        $roles = Role::withCount('users')->get();

        $recentUsers = User::with('role')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => optional($user->role)->name ?? 'User',
                'is_active' => $user->is_active,
                'created_at' => $user->created_at->diffForHumans(),
            ]);

        $userGrowth = User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($item) => [
                'date' => $item->date,
                'count' => $item->count,
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'activeUsers' => $activeUsers,
                'newUsersToday' => $newUsersToday,
                'newUsersThisWeek' => $newUsersThisWeek,
                'newUsersThisMonth' => $newUsersThisMonth,
                'unreadMessages' => $unreadMessages,
                'roles' => $roles,
            ],
            'recentUsers' => $recentUsers,
            'userGrowth' => $userGrowth,
        ]);
    }
}
