"use client";

import { Info, Lightbulb, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContextualDocsProps {
    title: string;
    children: ReactNode;
    variant?: "info" | "tips" | "help";
    className?: string;
}

export function ContextualDocs({
    title,
    children,
    variant = "info",
    className
}: ContextualDocsProps) {
    const variants = {
        info: {
            icon: Info,
            bg: "bg-primary/5",
            border: "border-primary/30",
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
            titleColor: "text-primary",
        },
        tips: {
            icon: Lightbulb,
            bg: "bg-yellow-500/5",
            border: "border-yellow-500/30",
            iconBg: "bg-yellow-500/10",
            iconColor: "text-yellow-500",
            titleColor: "text-yellow-500",
        },
        help: {
            icon: HelpCircle,
            bg: "bg-purple-500/5",
            border: "border-purple-500/30",
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-500",
            titleColor: "text-purple-500",
        },
    };

    const config = variants[variant];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "rounded-2xl border p-4 md:p-5",
                config.bg,
                config.border,
                className
            )}
        >
            <div className="flex items-start gap-3 md:gap-4">
                <div className={cn(
                    "shrink-0 p-2 md:p-3 rounded-xl",
                    config.iconBg
                )}>
                    <Icon className={cn("w-5 h-5 md:w-6 md:h-6", config.iconColor)} />
                </div>
                <div className="space-y-1.5 min-w-0">
                    <h3 className={cn(
                        "text-sm md:text-base font-bold",
                        config.titleColor
                    )}>
                        {title}
                    </h3>
                    <div className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
