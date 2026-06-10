<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImpersonateController extends Controller
{
    public function start(User $user): RedirectResponse
    {
        $admin = Auth::user();

        if ($user->id === $admin->id) {
            return back()->with('error', 'You cannot impersonate yourself.');
        }

        if ($user->isSuperAdmin()) {
            return back()->with('error', 'You cannot impersonate a super admin.');
        }

        session()->put('impersonator_id', $admin->id);
        Auth::login($user);

        return redirect()->route('dashboard')->with('success', "You are now impersonating {$user->name}.");
    }

    public function stop(): RedirectResponse
    {
        $impersonatorId = session()->get('impersonator_id');

        if (!$impersonatorId) {
            return redirect()->route('dashboard');
        }

        $admin = User::findOrFail($impersonatorId);
        session()->forget('impersonator_id');
        Auth::login($admin);

        return redirect()->route('admin.dashboard')->with('success', 'Impersonation ended. Welcome back!');
    }
}
