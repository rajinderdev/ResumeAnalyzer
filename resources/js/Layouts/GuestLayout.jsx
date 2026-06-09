import Navbar from '@/Components/Navbar';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />

            <div className="flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
