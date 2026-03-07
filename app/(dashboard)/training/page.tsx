"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { ContextualDocs } from "@/components/ui/contextual-docs";
import { Play, Clock, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const trainingVideos = [
    {
        id: "1",
        title: "Getting Started with AI Wealth OS",
        description: "Learn the basics of setting up your first bridge and understanding the dashboard.",
        duration: "8:45",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        category: "Beginner"
    },
    {
        id: "2",
        title: "Mastering the Sync Wizard",
        description: "Deep dive into optimizing your affiliate links for maximum traffic and conversions.",
        duration: "12:30",
        thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/JGwWNGJdvx8",
        category: "Intermediate"
    },
    {
        id: "3",
        title: "Traffic Hub Automation Secrets",
        description: "Unlock the power of automated traffic generation and smart comment marketing.",
        duration: "15:20",
        thumbnail: "https://img.youtube.com/vi/ZnHmskwqCCQ/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/ZnHmskwqCCQ",
        category: "Advanced"
    },
    {
        id: "4",
        title: "Analytics & Performance Tracking",
        description: "How to read your analytics data and make data-driven decisions.",
        duration: "10:15",
        thumbnail: "https://img.youtube.com/vi/0ND6KgDHfBQ/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/0ND6KgDHfBQ",
        category: "Intermediate"
    },
    {
        id: "5",
        title: "Scaling Your Income Bridges",
        description: "Advanced strategies for scaling your bridges to maximize passive income.",
        duration: "18:00",
        thumbnail: "https://img.youtube.com/vi/wDchsz8nmbo/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/wDchsz8nmbo",
        category: "Advanced"
    },
];

const categoryColors: Record<string, string> = {
    "Beginner": "bg-green-500/10 text-green-400 border-green-500/30",
    "Intermediate": "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    "Advanced": "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

export default function TrainingPage() {
    return (
        <div className="min-h-screen font-(family-name:--font-display) pb-20">
            <ContextualDocs title="Welcome to Training" variant="tips">
                <p>Watch these video tutorials to master AI Wealth OS:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Beginner:</strong> Start here if you&apos;re new to the platform</li>
                    <li><strong>Intermediate:</strong> Level up your bridge optimization skills</li>
                    <li><strong>Advanced:</strong> Learn scaling and automation strategies</li>
                </ul>
            </ContextualDocs>

            {/* Header */}
            <div className="mb-8 mt-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tighter">
                        Training
                    </h1>
                </div>
                <p className="text-gray-400 max-w-2xl">
                    Master the AI Wealth OS with our comprehensive video training library.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <div>
                            <div className="text-2xl font-bold text-white">64 min</div>
                            <div className="text-xs text-gray-500 uppercase">Total Duration</div>
                        </div>
                    </div>
                </GlassPanel>
                <GlassPanel intensity="low" className="p-4 border-white/5 col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-green-400" />
                        <div>
                            <div className="text-2xl font-bold text-white">3 Levels</div>
                            <div className="text-xs text-gray-500 uppercase">Skill Tracks</div>
                        </div>
                    </div>
                </GlassPanel>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingVideos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <GlassPanel
                            intensity="low"
                            className="overflow-hidden border-white/5 hover:border-primary/30 transition-colors group"
                        >
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video bg-black/50 overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                                    style={{
                                        backgroundImage: `url(${video.thumbnail})`,
                                        backgroundSize: 'cover'
                                    }}
                                />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 flex items-center justify-center group-hover:bg-primary/40 group-hover:scale-110 transition-all duration-300 cursor-pointer">
                                        <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded bg-black/70 text-xs text-white font-mono flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {video.duration}
                                </div>

                                {/* Category Badge */}
                                <div className={`absolute top-3 left-3 z-20 px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${categoryColors[video.category]}`}>
                                    {video.category}
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="p-4 space-y-2">
                                <h3 className="font-bold text-white text-sm leading-tight group-hover:text-primary transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-2">
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
