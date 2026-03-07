"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";

export function SupportWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            // Here you would send the message to your support system
            window.open(`mailto:AzonempireAI@neoai.freshdesk.com?subject=Support Request&body=${encodeURIComponent(message)}`, '_blank');
            setMessage("");
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:shadow-[0_0_40px_rgba(0,242,255,0.6)] transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6" />
                )}
            </motion.button>

            {/* Support Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-80"
                    >
                        <GlassPanel intensity="high" className="p-0 overflow-hidden border-primary/20">
                            {/* Header */}
                            <div className="bg-primary/10 p-4 border-b border-primary/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Headphones className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white font-(family-name:--font-display)">Support</h3>
                                        <p className="text-xs text-gray-400">We&apos;re here to help</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-4">
                                <p className="text-sm text-gray-400">
                                    Need help? Send us a message and we&apos;ll get back to you as soon as possible.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Describe your issue..."
                                        className="w-full h-24 px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 resize-none text-sm"
                                    />
                                    <NeonButton
                                        type="submit"
                                        variant="primary"
                                        glow
                                        className="w-full py-2 text-sm"
                                        disabled={!message.trim()}
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </NeonButton>
                                </form>

                                {/* Quick Links */}
                                <div className="pt-3 border-t border-white/10">
                                    <p className="text-xs text-gray-500 mb-2">Quick Links</p>
                                    <div className="flex flex-wrap gap-2">
                                        <a href="#" className="text-xs text-primary hover:underline">FAQ</a>
                                        <span className="text-gray-600">•</span>
                                        <a href="#" className="text-xs text-primary hover:underline">Documentation</a>
                                        <span className="text-gray-600">•</span>
                                        <a href="#" className="text-xs text-primary hover:underline">Community</a>
                                    </div>
                                </div>
                            </div>
                        </GlassPanel>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
