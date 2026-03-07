"use client";

import { User, Menu, X, LayoutDashboard, Zap, Layers, Globe, GraduationCap, Sparkles, Vault, Rocket, Settings } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Command Center", href: "/", icon: LayoutDashboard },
    { name: "Sync Wizard", href: "/sync", icon: Zap, highlight: true },
    { name: "My Bridges", href: "/bridges", icon: Layers },
    { name: "Traffic Hub", href: "/traffic", icon: Globe },
    { name: "Training", href: "/training", icon: GraduationCap },
];

const premiumItems = [
    { name: "DFY Vault", href: "/upgrade/dfy-vault", icon: Vault },
    { name: "Instant Income", href: "/upgrade/instant-income", icon: Sparkles },
    { name: "Automated Income", href: "/upgrade/automated-profits", icon: Rocket },
];

export function TopBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <header className="sticky top-0 z-40 w-full md:hidden border-b border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex h-16 items-center px-4 justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold font-(family-name:--font-display) tracking-tighter text-white">
                            AI WEALTH
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-400">
                            <User className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl md:hidden flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <span className="font-bold font-(family-name:--font-display) text-xl tracking-tighter text-white">
                                AI WEALTH <span className="text-primary text-xs ml-1">OS</span>
                            </span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 mt-2">Navigation</div>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200",
                                            isActive
                                                ? "bg-white/10 text-white border border-white/5"
                                                : "text-gray-400 hover:text-white hover:bg-white/5",
                                            item.highlight && !isActive && "text-primary hover:text-primary hover:bg-primary/10"
                                        )}
                                    >
                                        <item.icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-current")} />
                                        <span className="font-medium tracking-wide text-lg font-(family-name:--font-display)">{item.name}</span>
                                    </Link>
                                );
                            })}

                            {/* Premium Features Section */}
                            <div className="mt-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
                                <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
                                    <Sparkles className="w-4 h-4" />
                                    Premium Features
                                </div>
                                <div className="space-y-2">
                                    {premiumItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <div className={cn(
                                                    "flex items-center gap-3 px-4 py-3 rounded-full border transition-all duration-300",
                                                    isActive
                                                        ? "bg-white/10 border-white/30 text-white"
                                                        : "bg-black/30 border-white/10 text-gray-300"
                                                )}>
                                                    <item.icon className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{item.name}</span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Settings */}
                            <div className="mt-6">
                                <Link
                                    href="/settings"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5"
                                >
                                    <Settings className="w-6 h-6" />
                                    <span className="font-medium tracking-wide text-lg font-(family-name:--font-display)">Calibration</span>
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center font-bold text-black">
                                    JD
                                </div>
                                <div>
                                    <div className="font-bold text-white font-(family-name:--font-display)">John Doe</div>
                                    <div className="text-xs text-gray-400 font-mono">Elite License</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
