export default function PasswordStrength({ password = '' }) {
    const getStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;
        return score;
    };

    const strength = getStrength(password);

    if (!password) return null;

    const levels = [
        { label: 'Very Weak', color: 'bg-red-500', text: 'text-red-600' },
        { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-600' },
        { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600' },
        { label: 'Strong', color: 'bg-teal-500', text: 'text-teal-600' },
        { label: 'Very Strong', color: 'bg-green-500', text: 'text-green-600' },
    ];

    const level = levels[Math.min(strength, 4)];

    return (
        <div className="mt-2 space-y-1.5">
            <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength - 1 ? level.color : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
            <p className={`text-xs font-medium ${level.text} transition-colors duration-300`}>
                {level.label}
            </p>
        </div>
    );
}
