<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(): Response
    {
        $roles = Role::withCount('users')
            ->with('permissions')
            ->get()
            ->map(fn ($role) => [
                'id' => $role->id,
                'name' => $role->name,
                'slug' => $role->slug,
                'description' => $role->description,
                'users_count' => $role->users_count,
                'permissions' => $role->permissions->map(fn ($p) => [
                    'id' => $p->id,
                    'name' => $p->name,
                    'slug' => $p->slug,
                    'group' => $p->group,
                ]),
            ]);

        $permissions = Permission::all()->groupBy('group')->map(fn ($group) => $group->map(fn ($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
        ]));

        return Inertia::render('Admin/Roles', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string|max:255',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role = Role::create($request->only('name', 'slug', 'description'));

        if ($request->filled('permissions')) {
            $role->permissions()->sync($request->permissions);
        }

        return back()->with('success', "Role '{$role->name}' created successfully.");
    }

    public function update(Request $request, Role $role): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role->update($request->only('name', 'description'));
        $role->permissions()->sync($request->permissions ?? []);

        return back()->with('success', "Role '{$role->name}' updated successfully.");
    }

    public function destroy(Role $role): RedirectResponse
    {
        if (in_array($role->slug, ['admin', 'super-admin'])) {
            return back()->with('error', 'System roles cannot be deleted.');
        }

        $role->delete();

        return back()->with('success', "Role '{$role->name}' deleted successfully.");
    }
}
