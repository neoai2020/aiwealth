"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { Video } from "lucide-react";
import { motion } from "framer-motion";

export function FounderTransmission() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Video className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white font-(family-name:--font-display)">
                    Watch This Video to Start Making Money Using AI Wealth
                </h3>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full relative z-20"
            >
                <GlassPanel
                    intensity="low"
                    className="relative border-primary/20 p-0 overflow-hidden"
                >
                    <div className="relative w-full aspect-video bg-black/80">
                        <iframe
                            src="https://player.vimeo.com/video/1171448002?autoplay=0&title=0&byline=0&portrait=0"
                            title="AI Wealth Introduction"
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </GlassPanel>
            </motion.div>
        </section>
    );
}

