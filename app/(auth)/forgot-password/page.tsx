"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await resetPassword(email);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <GlassPanel intensity="medium" className="p-8 border-green-500/20 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white font-(family-name:--font-display) mb-2">
                        Check Your Email
                    </h2>
                    <p className="text-gray-400 text-sm mb-6">
                        We&apos;ve sent a password reset link to <span className="text-white">{email}</span>.
                        Click the link to reset your password.
                    </p>
                    <Link href="/login">
                        <NeonButton variant="ghost" className="w-full">
                            Back to Login
                        </NeonButton>
                    </Link>
                </GlassPanel>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <GlassPanel intensity="medium" className="p-8 border-white/10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white font-(family-name:--font-display) tracking-tight">
                        Reset Password
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Enter your email and we&apos;ll send you a reset link
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <NeonButton
                        type="submit"
                        variant="primary"
                        glow
                        className="w-full py-3 text-base font-bold"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </span>
                        ) : (
                            "Send Reset Link"
                        )}
                    </NeonButton>
                </form>

                {/* Back to Login Link */}
                <div className="mt-6">
                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </GlassPanel>
        </motion.div>
    );
}
