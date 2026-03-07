"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { Play, Video } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FounderTransmission() {
    const [isPlaying, setIsPlaying] = useState(false);

    const videoId = "dQw4w9WgXcQ";

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
                        {!isPlaying ? (
                            <div
                                className="absolute inset-0 cursor-pointer group"
                                onClick={() => setIsPlaying(true)}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-size-[30px_30px] opacity-40" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-primary to-cyan-400 flex items-center justify-center shadow-[0_0_60px_rgba(0,242,255,0.4)] group-hover:shadow-[0_0_80px_rgba(0,242,255,0.6)] transition-all duration-500 group-hover:scale-110">
                                            <Play className="w-10 h-10 md:w-14 md:h-14 text-white fill-white ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                title="AI Wealth Introduction"
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                    </div>
                </GlassPanel>
            </motion.div>
        </section>
    );
}

