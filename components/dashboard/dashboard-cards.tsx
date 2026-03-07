"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import {
    Zap,
    Activity,
    Clock,
    ArrowUpRight,
    CheckCircle,
    AlertCircle,
    TrendingUp
} from "lucide-react";
import Link from "next/link";

const recentActivity: any[] = [];

const quickActions = [
    { label: "New Bridge", href: "/sync", icon: Zap, color: "primary" },
    { label: "View Traffic", href: "/traffic", icon: Activity, color: "purple" },
    { label: "My Bridges", href: "/bridges", icon: ArrowUpRight, color: "orange" },
];

const getActionColors = (color: string) => {
    switch (color) {
        case "primary":
            return {
                iconBg: "bg-primary/10 group-hover:bg-primary/20",
                iconColor: "text-primary",
                hoverBorder: "hover:border-primary/50",
                hoverShadow: "hover:shadow-[0_0_20px_rgba(0,255,170,0.15)]",
            };
        case "purple":
            return {
                iconBg: "bg-purple-500/10 group-hover:bg-purple-500/20",
                iconColor: "text-purple-400",
                hoverBorder: "hover:border-purple-500/50",
                hoverShadow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
            };
        case "orange":
            return {
                iconBg: "bg-orange-500/10 group-hover:bg-orange-500/20",
                iconColor: "text-orange-400",
                hoverBorder: "hover:border-orange-500/50",
                hoverShadow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
            };
        default:
            return {
                iconBg: "bg-primary/10 group-hover:bg-primary/20",
                iconColor: "text-primary",
                hoverBorder: "hover:border-primary/50",
                hoverShadow: "hover:shadow-[0_0_20px_rgba(0,255,170,0.15)]",
            };
    }
};

export function DashboardCards() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Recent Activity Card */}
            <GlassPanel
                intensity="medium"
                className="p-6 border-blue-500/20 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-(family-name:--font-display)">
                        Recent Activity
                    </h3>
                </div>

                <div className="space-y-3">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer"
                            >
                                <div className={`mt-0.5 ${item.status === 'success' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {item.status === 'success' ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate font-medium">{item.message}</p>
                                    <p className="text-xs text-gray-500">{item.time}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                            <Clock className="w-12 h-12 text-gray-700 mb-4 opacity-20" />
                            <p className="text-gray-400 font-bold text-lg">No recent activity found</p>
                            <p className="text-sm text-gray-600 mt-1">Activities will appear here as you sync and manage your bridges.</p>
                        </div>
                    )}
                </div>
            </GlassPanel>

            {/* Quick Actions Card */}
            <GlassPanel
                intensity="medium"
                className="p-6 border-primary/20 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,255,170,0.15)] transition-all duration-500"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-(family-name:--font-display)">
                        Quick Actions
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-6">
                    {quickActions.map((action) => {
                        const colors = getActionColors(action.color);
                        return (
                            <Link key={action.label} href={action.href}>
                                <div className={`flex items-center gap-3 p-4 rounded-lg bg-black/30 border border-white/5 ${colors.hoverBorder} ${colors.hoverShadow} hover:bg-black/40 transition-all duration-300 cursor-pointer group`}>
                                    <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center transition-colors`}>
                                        <action.icon className={`w-5 h-5 ${colors.iconColor}`} />
                                    </div>
                                    <span className="text-white font-medium">{action.label}</span>
                                    <ArrowUpRight className={`w-4 h-4 text-gray-500 ml-auto group-hover:${colors.iconColor} transition-colors`} />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Performance Tip */}
                <div className="p-4 rounded-lg bg-linear-to-r from-primary/10 to-purple-500/10 border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,255,170,0.1)] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pro Tip</span>
                    </div>
                    <p className="text-sm text-gray-300">
                        Sync your bridges daily for optimal traffic flow and maximum conversion rates.
                    </p>
                </div>
            </GlassPanel>
        </div>
    );
}
