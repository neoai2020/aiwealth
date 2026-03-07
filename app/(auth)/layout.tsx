"use client";

import { ParticleBackground } from "@/components/ui/particle-background";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
            {/* Background Effects */}
            <ParticleBackground />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,242,255,0.1),transparent_50%)]" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-4 py-8">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <h1 className="text-3xl font-bold font-(family-name:--font-display) tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
                            AI WEALTH <span className="text-primary text-sm ml-1 align-top relative top-1">OS</span>
                        </h1>
                    </Link>
                </div>

                {children}
            </div>
        </div>
    );
}
