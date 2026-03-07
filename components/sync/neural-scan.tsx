"use client";

import { useEffect, useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Search, BrainCircuit, Target, PenTool, Globe, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface NeuralScanProps {
    onComplete: () => void;
    canFinish: boolean;
}

const steps = [
    { label: "Link Authentication", icon: ShieldCheck, color: "text-blue-400" },
    { label: "Merchant Site Deconstruction", icon: Search, color: "text-cyan-400" },
    { label: "Pain Point Extraction", icon: Target, color: "text-red-400" },
    { label: "Offer Mapping", icon: BrainCircuit, color: "text-purple-400" },
    { label: "Persuasion Synthesis", icon: PenTool, color: "text-yellow-400" },
    { label: "SEO Structuring", icon: Globe, color: "text-green-400" },
    { label: "Finalizing & Saving", icon: Rocket, color: "text-orange-400" },
];

export function NeuralScan({ onComplete, canFinish }: NeuralScanProps) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // If we've passed the last step, check if we can actually finish
        if (currentStep >= steps.length) {
            if (canFinish) {
                const timer = setTimeout(onComplete, 800);
                return () => clearTimeout(timer);
            }
            // If not canFinish, just wait here (effectively pauses on last step completion)
            return;
        }

        // Advance step
        const timer = setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
        }, 1500); // Slightly slower for better perception

        return () => clearTimeout(timer);
    }, [currentStep, onComplete, canFinish]);

    // Calculate progress
    // If not finished, max out at 95% to show "almost done"
    const progress = Math.min(canFinish ? 100 : 95, Math.round(((currentStep + 1) / steps.length) * 100));

    const currentStepData = steps[Math.min(currentStep, steps.length - 1)];

    return (
        <GlassPanel intensity="high" className="w-full max-w-3xl mx-auto py-20 px-8 relative overflow-hidden bg-black/60 border-primary/30 shadow-[0_0_50px_rgba(0,242,255,0.1)]">
            {/* Background Grid Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,242,255,0.05)_1px,transparent_1px)] bg-size-[20px_20px] opacity-20" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 mb-10 relative flex items-center justify-center">
                    {/* Spinning/Pulsing Rings */}
                    <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-[spin_8s_linear_infinite]" />
                    <div className="absolute inset-2 border-2 border-dashed border-primary/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-[spin_2s_linear_infinite]" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStepData.label}
                            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className={cn("bg-white/5 p-5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl", currentStepData.color)}
                        >
                            <currentStepData.icon className="w-10 h-10" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <h2 className="text-3xl font-bold font-(family-name:--font-display) mb-4 text-white tracking-widest uppercase text-glow-primary">
                    Neural Scan Active
                </h2>

                <div className="h-12 mb-8 overflow-hidden relative w-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStepData.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute text-lg text-gray-300 font-mono tracking-wider"
                        >
                            {currentStepData.label}...
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden max-w-lg mx-auto relative mb-4">
                    <motion.div
                        className="h-full bg-primary shadow-[0_0_15px_var(--primary)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <div className="text-xs text-center text-primary/70 font-mono">
                    SYSTEM CALIBRATION: {progress}% COMPLETED
                </div>
            </div>
        </GlassPanel>
    );
}
