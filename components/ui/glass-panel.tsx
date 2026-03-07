import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
    intensity?: "low" | "medium" | "high";
}

export function GlassPanel({ children, className, intensity = "medium" }: GlassPanelProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "glass-panel rounded-2xl relative overflow-hidden",
                "border-white/5 shadow-xl", // Fallback/Basic styles
                intensity === "low" && "backdrop-blur-sm",
                intensity === "medium" && "backdrop-blur-md",
                intensity === "high" && "backdrop-blur-xl",
                className
            )}
        >
            {/* Noise or gradient overlay could go here */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
