import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-bl-md">
                <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot" />
                </div>
            </div>
        </div>
    );
}

function EmptyChatState() {
    return (
        <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center max-w-xs">
                <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <p className="text-base font-medium text-gray-500">Select a conversation</p>
                <p className="text-sm mt-1.5 text-gray-400 leading-relaxed">Choose a user from the list to view and respond to their messages</p>
            </div>
        </div>
    );
}

export default function Chat({ conversations: initialConversations, currentUserId }) {
    const [conversations, setConversations] = useState(initialConversations);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [searchConv, setSearchConv] = useState('');
    const messagesEndRef = useRef(null);
    const pollRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async (userId) => {
        try {
            const res = await axios.get(route('admin.chat.messages', userId));
            setMessages(res.data.messages);
        } catch (err) {
            console.error('Failed to load messages', err);
        }
    };

    const selectConversation = (conv) => {
        setSelectedUser(conv);
        setLoading(true);
        loadMessages(conv.user_id).then(() => {
            setLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        });

        if (pollRef.current) clearInterval(pollRef.current);
        pollRef.current = setInterval(() => loadMessages(conv.user_id), 5000);
    };

    useEffect(() => {
        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser || sending) return;

        setSending(true);
        try {
            const res = await axios.post(route('admin.chat.send'), {
                receiver_id: selectedUser.user_id,
                message: newMessage.trim(),
            });
            setMessages(prev => [...prev, res.data.message]);
            setNewMessage('');
            inputRef.current?.focus();
        } catch (err) {
            console.error('Failed to send message', err);
        }
        setSending(false);
    };

    const groupByDate = (msgs) => {
        const groups = {};
        msgs.forEach((msg) => {
            const date = msg.created_date;
            if (!groups[date]) groups[date] = [];
            groups[date].push(msg);
        });
        return groups;
    };

    const filteredConversations = searchConv
        ? conversations.filter(c => c.user_name.toLowerCase().includes(searchConv.toLowerCase()) || c.user_email.toLowerCase().includes(searchConv.toLowerCase()))
        : conversations;

    const groupedMessages = groupByDate(messages);
    const totalUnread = conversations.reduce((sum, c) => sum + c.unread_count, 0);

    return (
        <AdminLayout>
            <Head title="Chat Support" />

            <div className="h-[calc(100vh-8rem)]">
                <div className="flex items-center justify-between mb-4 animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Chat Support</h1>
                        <p className="text-sm text-gray-500">
                            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
                            {totalUnread > 0 && <span className="text-teal-600 font-medium"> &middot; {totalUnread} unread</span>}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex h-[calc(100%-4rem)] overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    {/* Conversation List */}
                    <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50/30">
                        {/* Search conversations */}
                        <div className="p-3 border-b border-gray-100">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchConv}
                                    onChange={(e) => setSearchConv(e.target.value)}
                                    placeholder="Search conversations..."
                                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto chat-scroll">
                            {filteredConversations.length > 0 ? filteredConversations.map((conv, i) => (
                                <button
                                    key={conv.user_id}
                                    onClick={() => selectConversation(conv)}
                                    className={`w-full text-left px-4 py-3.5 border-b border-gray-50 transition-all duration-200 ${
                                        selectedUser?.user_id === conv.user_id
                                            ? 'bg-teal-50 border-l-[3px] border-l-teal-500'
                                            : 'hover:bg-white border-l-[3px] border-l-transparent'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                                                {conv.user_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white online-pulse" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className={`text-sm truncate ${conv.unread_count > 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                    {conv.user_name}
                                                </p>
                                                {conv.unread_count > 0 && (
                                                    <span className="w-5 h-5 bg-teal-600 rounded-full text-white text-[9px] flex items-center justify-center flex-shrink-0 font-bold animate-pop-in">
                                                        {conv.unread_count}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-gray-400 truncate">{conv.user_email}</p>
                                        </div>
                                    </div>
                                </button>
                            )) : (
                                <div className="p-8 text-center">
                                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">{searchConv ? 'No matches' : 'No conversations'}</p>
                                    <p className="text-xs text-gray-400 mt-1">{searchConv ? 'Try a different search' : 'Messages will appear here'}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-white">
                        {selectedUser ? (
                            <>
                                {/* Chat Header */}
                                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                                {selectedUser.user_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full ring-2 ring-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{selectedUser.user_name}</p>
                                            <p className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                                                <span className="w-1 h-1 bg-green-500 rounded-full" />
                                                Online
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400">{selectedUser.user_email}</p>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-5 space-y-3 chat-scroll bg-gray-50/30">
                                    {loading ? (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="text-center">
                                                <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                                                <p className="text-xs text-gray-400 mt-3">Loading messages...</p>
                                            </div>
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="text-center">
                                                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                                    <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-gray-500 font-medium">Start of conversation</p>
                                                <p className="text-xs text-gray-400 mt-1">Send a message to begin</p>
                                            </div>
                                        </div>
                                    ) : (
                                        Object.entries(groupedMessages).map(([date, msgs]) => (
                                            <div key={date}>
                                                <div className="flex items-center justify-center my-4">
                                                    <div className="flex-1 border-t border-gray-200/50" />
                                                    <span className="text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full mx-3 font-medium">{date}</span>
                                                    <div className="flex-1 border-t border-gray-200/50" />
                                                </div>
                                                <div className="space-y-2">
                                                    {msgs.map((msg, i) => (
                                                        <div
                                                            key={msg.id}
                                                            className={`flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'} animate-message-bubble`}
                                                            style={{ animationDelay: `${i * 30}ms` }}
                                                        >
                                                            <div className={`max-w-[70%] px-4 py-2.5 text-sm shadow-sm ${
                                                                msg.sender_id === currentUserId
                                                                    ? 'bg-gradient-to-br from-teal-600 to-teal-500 text-white rounded-2xl rounded-br-md'
                                                                    : 'bg-white text-gray-900 rounded-2xl rounded-bl-md border border-gray-100'
                                                            }`}>
                                                                <p className="leading-relaxed">{msg.message}</p>
                                                                <p className={`text-[10px] mt-1.5 flex items-center gap-1 ${msg.sender_id === currentUserId ? 'text-teal-200 justify-end' : 'text-gray-400'}`}>
                                                                    {msg.created_at}
                                                                    {msg.sender_id === currentUserId && (
                                                                        <span className={`${msg.is_read ? 'text-teal-100' : 'text-teal-300'}`}>
                                                                            {msg.is_read ? '✓✓' : '✓'}
                                                                        </span>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Message Input */}
                                <form onSubmit={sendMessage} className="p-4 border-t border-gray-100 bg-white">
                                    <div className="flex gap-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your reply..."
                                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim() || sending}
                                            className="px-5 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl text-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                        >
                                            {sending ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <EmptyChatState />
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
