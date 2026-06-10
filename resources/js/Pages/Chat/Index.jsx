import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Index({ admins, currentUserId }) {
    const [selectedAdmin, setSelectedAdmin] = useState(admins.length > 0 ? admins[0] : null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const messagesEndRef = useRef(null);
    const pollRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async (adminId) => {
        try {
            const res = await axios.get(route('chat.messages', adminId));
            setMessages(res.data.messages);
            if (res.data.messages.length > 0) setChatStarted(true);
        } catch (err) {
            console.error('Failed to load messages', err);
        }
    };

    const startChat = () => {
        setChatStarted(true);
        if (selectedAdmin) {
            setLoading(true);
            loadMessages(selectedAdmin.id).then(() => {
                setLoading(false);
                setTimeout(() => inputRef.current?.focus(), 100);
            });
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = setInterval(() => loadMessages(selectedAdmin.id), 5000);
        }
    };

    useEffect(() => {
        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, []);

    useEffect(() => {
        if (selectedAdmin && chatStarted) {
            setLoading(true);
            loadMessages(selectedAdmin.id).then(() => setLoading(false));
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = setInterval(() => loadMessages(selectedAdmin.id), 5000);
        }
    }, [selectedAdmin]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedAdmin || sending) return;

        setSending(true);
        try {
            const res = await axios.post(route('chat.send'), {
                receiver_id: selectedAdmin.id,
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

    const groupedMessages = groupByDate(messages);

    return (
        <AuthenticatedLayout>
            <Head title="Chat Support" />

            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="mb-6 animate-fade-in-up">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Support Chat</h1>
                            <p className="text-sm text-gray-500">Get help from our team</p>
                        </div>
                    </div>
                </div>

                {admins.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center animate-fade-in-up">
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414 1 1 0 01-1.414-1.414z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 font-medium text-lg">No agents available</p>
                        <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">Our support team is currently offline. Please try again later and we'll be happy to help.</p>
                    </div>
                ) : !chatStarted ? (
                    /* Welcome / Start Chat Screen */
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="p-12 text-center">
                            <div className="flex justify-center mb-6">
                                <div className="flex -space-x-3">
                                    {admins.slice(0, 3).map((admin) => (
                                        <div key={admin.id} className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold ring-4 ring-white shadow-lg">
                                            {admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Need help?</h2>
                            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                                Our support team is online and ready to assist you with any questions about your resume analysis.
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-600">
                                <span className="w-2 h-2 bg-green-500 rounded-full online-pulse" />
                                <span className="font-medium">{admins.length} agent{admins.length > 1 ? 's' : ''} available</span>
                            </div>
                            <button
                                onClick={startChat}
                                className="mt-8 px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-teal-500/25 transition-all hover:-translate-y-0.5"
                            >
                                Start a Conversation
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        {/* Agent Selection */}
                        {admins.length > 1 && (
                            <div className="px-5 py-3 border-b border-gray-100 flex gap-2 overflow-x-auto bg-gray-50/50">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold self-center mr-1">Agent:</span>
                                {admins.map((admin) => (
                                    <button
                                        key={admin.id}
                                        onClick={() => setSelectedAdmin(admin)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                                            selectedAdmin?.id === admin.id
                                                ? 'bg-teal-100 text-teal-700 font-semibold shadow-sm'
                                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                    >
                                        <div className="relative">
                                            <div className="w-5 h-5 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-[8px] font-bold">
                                                {admin.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full ring-1 ring-white" />
                                        </div>
                                        {admin.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Chat Header */}
                        {selectedAdmin && (
                            <div className="px-6 py-3.5 border-b border-gray-100 flex items-center gap-3 bg-white">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                                        {selectedAdmin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-white online-pulse" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{selectedAdmin.name}</p>
                                    <p className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                                        <span className="w-1 h-1 bg-green-500 rounded-full" />
                                        Support Agent &middot; Typically replies instantly
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-5 space-y-3 chat-scroll bg-gray-50/30">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
                                        <p className="text-xs text-gray-400 mt-3">Loading messages...</p>
                                    </div>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <div className="text-center">
                                        <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-gray-500">Start your conversation</p>
                                        <p className="text-xs mt-1 text-gray-400">Type a message below to begin</p>
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
                                                    {msg.sender_id !== currentUserId && (
                                                        <div className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-[8px] font-bold mr-2 mt-1 flex-shrink-0">
                                                            {msg.sender_name.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div className={`max-w-[70%] px-4 py-2.5 text-sm shadow-sm ${
                                                        msg.sender_id === currentUserId
                                                            ? 'bg-gradient-to-br from-teal-600 to-teal-500 text-white rounded-2xl rounded-br-md'
                                                            : 'bg-white text-gray-900 rounded-2xl rounded-bl-md border border-gray-100'
                                                    }`}>
                                                        {msg.sender_id !== currentUserId && (
                                                            <p className="text-[10px] font-semibold text-teal-600 mb-0.5">{msg.sender_name}</p>
                                                        )}
                                                        <p className="leading-relaxed">{msg.message}</p>
                                                        <p className={`text-[10px] mt-1.5 flex items-center gap-1 ${msg.sender_id === currentUserId ? 'text-teal-200 justify-end' : 'text-gray-400'}`}>
                                                            {msg.created_at}
                                                            {msg.sender_id === currentUserId && (
                                                                <span>{msg.is_read ? '✓✓' : '✓'}</span>
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
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || sending}
                                    className="px-5 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl text-sm hover:shadow-lg hover:shadow-teal-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center gap-2 font-medium"
                                >
                                    {sending ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
