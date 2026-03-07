"use client";

import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function PromoBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mb-6"
        >
            <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 p-4 md:p-5">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-size-[20px_20px]" />
                </div>

                {/* Animated Glow */}
                <div className="absolute top-0 -left-full w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white font-(family-name:--font-display) flex items-center gap-2">
                                Want To Scale Your Traffic To 10,000+ Visitors A Day?
                                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 hidden md:block" />
                            </h3>
                            <p className="text-white/80 text-sm mt-1 max-w-2xl">
                                AI Wealth OS is powerful, but if you want to unlock the full potential and automate your entire income stream,
                                you need to see this exclusive training. Limited spots available for members.
                            </p>
                        </div>
                    </div>

                    <Link href="/upgrade" className="shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-black text-white font-bold rounded-lg text-sm hover:bg-gray-900 transition-colors flex items-center gap-2 shadow-lg"
                        >
                            Unlock Full Access
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
