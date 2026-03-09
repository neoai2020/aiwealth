"use client";

import { cn } from "@/lib/utils";
import { Zap, LayoutDashboard, Globe, Layers, GraduationCap, Sparkles, Settings, LogOut, Vault, Rocket, RefreshCw, ShieldCheck, Calculator } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const navItems = [
    { name: "Wealth Dashboard", href: "/", icon: LayoutDashboard, color: "primary" },
    { name: "Sync Calculator", href: "/calculator", icon: Calculator, color: "cyan" },
    { name: "Wealth Sync", href: "/sync", icon: Zap, color: "yellow", highlight: true },
    { name: "My Synced Pages", href: "/bridges", icon: Layers, color: "purple" },
    { name: "Traffic Hub", href: "/traffic", icon: Globe, color: "blue" },
    { name: "Training", href: "/training", icon: GraduationCap, color: "orange" },
];

const premiumItems = [
    { name: "Accelerator", href: "/accelerator", icon: Zap },
    { name: "Recurring Wealth Streams", href: "/recurring-wealth", icon: RefreshCw },
    { name: "Social Payouts", href: "/social-payouts", icon: Globe },
    { name: "Wealth Protector", href: "/protector", icon: ShieldCheck },
];

const getNavGlow = (color: string) => {
    switch (color) {
        case "primary":
            return "hover:shadow-[0_0_20px_rgba(0,255,170,0.25)] hover:border-primary/50";
        case "yellow":
            return "hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:border-yellow-500/50";
        case "purple":
            return "hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:border-purple-500/50";
        case "cyan":
            return "hover:shadow-[0_0_20px_rgba(0,242,255,0.25)] hover:border-cyan-400/50";
        case "blue":
            return "hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:border-blue-500/50";
        case "orange":
            return "hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:border-orange-500/50";
        default:
            return "hover:shadow-[0_0_20px_rgba(0,255,170,0.25)] hover:border-primary/50";
    }
};

const getIconColor = (color: string, isActive: boolean) => {
    if (isActive) return "text-primary";
    switch (color) {
        case "primary": return "text-gray-500 group-hover:text-primary";
        case "yellow": return "text-gray-500 group-hover:text-yellow-400";
        case "purple": return "text-gray-500 group-hover:text-purple-400";
        case "cyan": return "text-gray-500 group-hover:text-cyan-400";
        case "blue": return "text-gray-500 group-hover:text-blue-400";
        case "orange": return "text-gray-500 group-hover:text-orange-400";
        default: return "text-gray-500 group-hover:text-white";
    }
};

export function Sidebar() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "US";
    const userEmail = user?.email || "user@example.com";

    return (
        <aside className="hidden md:flex flex-col w-72 border-r border-white/10 bg-black/20 backdrop-blur-md h-screen sticky top-0 z-50">
            <GlassPanel intensity="high" className="h-full border-r border-white/5 bg-black/60 flex flex-col relative z-20 rounded-none">
                <div className="p-6 pb-2 border-b border-white/5">
                    <Link href="/" className="block hover:opacity-80 transition-opacity">
                        <h1 className="text-2xl font-bold font-(family-name:--font-display) tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
                            AI WEALTH <span className="text-primary text-xs ml-1 align-top relative top-1">OS</span>
                        </h1>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href} className="block group">
                                <div className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent transition-all duration-300",
                                    isActive
                                        ? "bg-white/10 border-primary/50 shadow-[0_0_20px_rgba(0,255,170,0.2)]"
                                        : `hover:bg-white/5 ${getNavGlow(item.color)}`
                                )}>
                                    <item.icon className={cn(
                                        "w-5 h-5 shrink-0 transition-all duration-300",
                                        isActive ? "text-primary drop-shadow-[0_0_8px_rgba(0,255,170,0.8)]" : getIconColor(item.color, isActive)
                                    )} />
                                    <span className={cn(
                                        "font-medium text-sm tracking-wide font-(family-name:--font-display)",
                                        isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                                    )}>
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}

                    {/* Premium Features Section */}
                    <div className="mt-8 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)] transition-all duration-500">
                        <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles className="w-4 h-4" />
                            Premium Features
                        </div>
                        <div className="space-y-2">
                            {premiumItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.name} href={item.href} className="block group">
                                        <div className={cn(
                                            "flex items-center justify-center gap-3 px-4 py-3 rounded-full border transition-all duration-300",
                                            isActive
                                                ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                                                : "bg-black/30 border-white/10 text-gray-300 hover:bg-yellow-500/10 hover:border-yellow-500/30 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.15)]"
                                        )}>
                                            <item.icon className="w-4 h-4" />
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>


                </nav>

                <div className="p-4 mt-auto">
                    {/* User Profile Section */}
                    <div className="p-4 border-t border-white/5 bg-black/20 rounded-xl hover:shadow-[0_0_20px_rgba(0,255,170,0.1)] transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center font-bold text-black shadow-[0_0_15px_var(--primary-glow)]">
                                {userInitials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white font-(family-name:--font-display) truncate">{userEmail}</div>
                                <div className="text-xs text-gray-500">Active Member</div>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] rounded-lg transition-all duration-300"
                                title="Sign Out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="text-[10px] text-gray-400/60 font-black uppercase tracking-[0.25em] text-center mt-4 font-sans">AI WEALTH OS v1.0.4</div>
                </div>
            </GlassPanel>
        </aside>
    );
}
