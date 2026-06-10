<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $admins = User::whereHas('role', fn ($q) => $q->where('slug', 'admin')->orWhere('slug', 'super-admin'))
            ->where('id', '!=', $user->id)
            ->get(['id', 'name', 'email']);

        return Inertia::render('Chat/Index', [
            'admins' => $admins,
            'currentUserId' => $user->id,
        ]);
    }

    public function adminIndex(): Response
    {
        $adminId = auth()->id();

        $sub = DB::table('chat_messages')
            ->selectRaw('IF(sender_id = ?, receiver_id, sender_id) as user_id, created_at as last_message_at, IF(receiver_id = ? AND is_read = 0, 1, 0) as unread_count', [$adminId, $adminId])
            ->where(function ($q) use ($adminId) {
                $q->where('sender_id', $adminId)
                  ->orWhere('receiver_id', $adminId);
            });

        $conversations = DB::query()
            ->selectRaw('user_id, MAX(last_message_at) as last_message_at, SUM(unread_count) as unread_count')
            ->fromSub($sub, 'sub')
            ->groupBy('user_id')
            ->orderByDesc('last_message_at')
            ->get();

        $userIds = $conversations->pluck('user_id');
        $users = User::whereIn('id', $userIds)->get(['id', 'name', 'email'])->keyBy('id');

        $conversationList = $conversations->map(fn ($c) => [
            'user_id' => $c->user_id,
            'user_name' => $users[$c->user_id]->name ?? 'Unknown',
            'user_email' => $users[$c->user_id]->email ?? '',
            'unread_count' => (int) $c->unread_count,
            'last_message_at' => $c->last_message_at,
        ]);

        return Inertia::render('Admin/Chat', [
            'conversations' => $conversationList,
            'currentUserId' => auth()->id(),
        ]);
    }

    public function getMessages(Request $request, User $user): JsonResponse
    {
        $messages = ChatMessage::conversation(auth()->id(), $user->id)
            ->with(['sender:id,name', 'receiver:id,name'])
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn ($m) => [
                'id' => $m->id,
                'sender_id' => $m->sender_id,
                'receiver_id' => $m->receiver_id,
                'sender_name' => $m->sender->name,
                'message' => $m->message,
                'is_read' => $m->is_read,
                'created_at' => $m->created_at->format('g:i A'),
                'created_date' => $m->created_at->format('M d, Y'),
            ]);

        // Mark messages as read
        ChatMessage::where('sender_id', $user->id)
            ->where('receiver_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true, 'read_at' => now()]);

        return response()->json(['messages' => $messages]);
    }

    public function sendMessage(Request $request): JsonResponse
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:2000',
        ]);

        $message = ChatMessage::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        $message->load('sender:id,name');

        return response()->json([
            'message' => [
                'id' => $message->id,
                'sender_id' => $message->sender_id,
                'receiver_id' => $message->receiver_id,
                'sender_name' => $message->sender->name,
                'message' => $message->message,
                'is_read' => false,
                'created_at' => $message->created_at->format('g:i A'),
                'created_date' => $message->created_at->format('M d, Y'),
            ],
        ]);
    }

    public function unreadCount(): JsonResponse
    {
        $count = ChatMessage::unread(auth()->id())->count();
        return response()->json(['count' => $count]);
    }
}
