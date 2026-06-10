<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Create Roles
        $superAdmin = Role::create([
            'name' => 'Super Admin',
            'slug' => 'super-admin',
            'description' => 'Full system access',
        ]);

        $admin = Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'description' => 'Administrative access',
        ]);

        $editor = Role::create([
            'name' => 'Editor',
            'slug' => 'editor',
            'description' => 'Content management access',
        ]);

        // Create Permissions
        $permissions = [
            ['name' => 'View Users', 'slug' => 'users.view', 'group' => 'Users'],
            ['name' => 'Create Users', 'slug' => 'users.create', 'group' => 'Users'],
            ['name' => 'Edit Users', 'slug' => 'users.edit', 'group' => 'Users'],
            ['name' => 'Delete Users', 'slug' => 'users.delete', 'group' => 'Users'],
            ['name' => 'Impersonate Users', 'slug' => 'users.impersonate', 'group' => 'Users'],
            ['name' => 'Manage Roles', 'slug' => 'roles.manage', 'group' => 'Roles'],
            ['name' => 'Manage Permissions', 'slug' => 'permissions.manage', 'group' => 'Roles'],
            ['name' => 'View Dashboard', 'slug' => 'dashboard.view', 'group' => 'Dashboard'],
            ['name' => 'View Stats', 'slug' => 'stats.view', 'group' => 'Dashboard'],
            ['name' => 'Manage Chat', 'slug' => 'chat.manage', 'group' => 'Chat'],
            ['name' => 'Reply Chat', 'slug' => 'chat.reply', 'group' => 'Chat'],
        ];

        foreach ($permissions as $perm) {
            Permission::create($perm);
        }

        // Assign all permissions to admin role
        $allPermissionIds = Permission::pluck('id')->toArray();
        $admin->permissions()->sync($allPermissionIds);

        // Assign limited permissions to editor
        $editorPerms = Permission::whereIn('slug', ['users.view', 'dashboard.view', 'chat.reply'])->pluck('id');
        $editor->permissions()->sync($editorPerms);

        // Create Super Admin user
        $superAdminUser = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@resumeexpert.com',
            'password' => bcrypt('password'),
            'role_id' => $superAdmin->id,
            'is_active' => true,
        ]);

        // Create Admin user
        $adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@resumeexpert.com',
            'password' => bcrypt('password'),
            'role_id' => $admin->id,
            'is_active' => true,
        ]);

        // Create regular test users
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'is_active' => true,
        ]);

        User::factory(10)->create(['is_active' => true]);
    }
}
