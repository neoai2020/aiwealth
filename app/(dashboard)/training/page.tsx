"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const trainingVideos = [
    {
        id: "1",
        title: "Sync Calculator",
        description: "Learn how to set your income target and get a personalized plan to reach your goals.",
        vimeoId: "1171450893",
    },
    {
        id: "2",
        title: "Synced Pages",
        description: "How to manage your synced product pages, track performance, and maximize earnings.",
        vimeoId: "1171450915",
    },
    {
        id: "3",
        title: "Traffic Hub",
        description: "Master automated traffic generation and smart outreach to drive visitors to your pages.",
        vimeoId: "1171450941",
    },
    {
        id: "4",
        title: "Wealth Sync",
        description: "Step-by-step guide to syncing new products and setting up your affiliate links.",
        vimeoId: "1171450956",
    },
    {
        id: "5",
        title: "Premium Feature 1 : Accelerator",
        description: "Learn how to use the Accelerator — 50 done-for-you landing pages across 5 niches to fast-track your earnings.",
        vimeoId: "1171736991",
    },
    {
        id: "6",
        title: "Premium Feature 2 : Recurring Wealth Streams",
        description: "Discover how to leverage top recurring income products that pay you every month for every customer you refer.",
        vimeoId: "1171738844",
    },
];

export default function TrainingPage() {
    return (
        <div className="min-h-screen font-(family-name:--font-display) pb-20">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tighter">
                        Training
                    </h1>
                </div>
                <p className="text-gray-400 max-w-2xl">
                    Watch these tutorials to master every feature of AI Wealth OS.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <GlassPanel intensity="low" className="p-4 border-white/5">
                    <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <div>
                            <div className="text-2xl font-bold text-white">{trainingVideos.length}</div>
                            <div className="text-xs text-gray-500 uppercase">Total Videos</div>
                        </div>
                    </div>
                </GlassPanel>
                <GlassPanel intensity="low" className="p-4 border-white/5">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-green-400" />
                        <div>
                            <div className="text-2xl font-bold text-white">All Features</div>
                            <div className="text-xs text-gray-500 uppercase">Covered</div>
                        </div>
                    </div>
                </GlassPanel>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainingVideos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <GlassPanel
                            intensity="low"
                            className="overflow-hidden border-white/5 hover:border-primary/30 transition-colors"
                        >
                            <div className="relative w-full aspect-video bg-black/80">
                                <iframe
                                    src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
                                    title={video.title}
                                    className="absolute inset-0 w-full h-full"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            <div className="p-5 space-y-2">
                                <h3 className="font-bold text-white text-base">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {video.description}
                                </p>
                            </div>
                        </GlassPanel>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
