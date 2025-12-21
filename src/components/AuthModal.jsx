import { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
    const [role, setRole] = useState('founder'); // 'founder' or 'affiliate'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
            const body = mode === 'login'
                ? { email: formData.email, password: formData.password }
                : { ...formData, role };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Call success callback
            if (onSuccess) {
                onSuccess(data.user, data.token);
            }

            // Close modal
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md animate-slide-up-fade">
                <div className="glass-card">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <span className="text-gray-400 hover:text-white">✕</span>
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                            {mode === 'login' ? 'Welcome Back' : 'Join Proovd'}
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {mode === 'login'
                                ? 'Enter your credentials to access your account'
                                : 'Start your journey with Proovd today'}
                        </p>
                    </div>

                    {/* Role Selection (Signup Only) */}
                    {mode === 'signup' && (
                        <div className="mb-6">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">
                                I am a
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('founder')}
                                    className={`p-4 rounded-xl border-2 transition-all ${role === 'founder'
                                            ? 'border-violet-500 bg-violet-500/10'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🚀</div>
                                    <div className="font-bold text-white text-sm">Founder</div>
                                    <div className="text-xs text-gray-500 mt-1">Launch ideas</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('affiliate')}
                                    className={`p-4 rounded-xl border-2 transition-all ${role === 'affiliate'
                                            ? 'border-cyan-500 bg-cyan-500/10'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">💎</div>
                                    <div className="font-bold text-white text-sm">Affiliate</div>
                                    <div className="text-xs text-gray-500 mt-1">Earn & promote</div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Fields (Signup Only) */}
                        {mode === 'signup' && (
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-gray-400 mb-2 block">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="input-premium h-12"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-400 mb-2 block">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="input-premium h-12"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="text-xs font-medium text-gray-400 mb-2 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-premium h-12"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-medium text-gray-400 mb-2 block">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="input-premium h-12"
                                placeholder="••••••••"
                            />
                            {mode === 'signup' && (
                                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                                </span>
                            ) : (
                                mode === 'login' ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Switch Mode */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                            {' '}
                            <button
                                type="button"
                                onClick={switchMode}
                                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                            >
                                {mode === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
