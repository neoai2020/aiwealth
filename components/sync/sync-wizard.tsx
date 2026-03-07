"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GlassInput } from "@/components/ui/glass-input";
import { NeonButton } from "@/components/ui/neon-button";
import { NeuralScan } from "./neural-scan";
import { BridgePreview } from "./bridge-preview";
import { Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

export function SyncWizard() {
    const { user } = useAuth();
    const [status, setStatus] = useState<"idle" | "scanning" | "complete">("idle");
    const [url, setUrl] = useState("");
    const [scrapedData, setScrapedData] = useState<{ title: string; description: string; image: string | null } | null>(null);
    const [bridgeId, setBridgeId] = useState<string | null>(null);
    const [backendReady, setBackendReady] = useState(false);

    // Main function: Starts Animation AND Backend Process
    const handleSync = async () => {
        if (!url) return;
        setStatus("scanning");
        setBackendReady(false); // Reset backend readiness

        // Kick off backend work immediately
        processBackendWork();
    };

    const processBackendWork = async () => {
        try {
            // A. Analyze URL
            const response = await fetch('/api/analyze-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            const result = await response.json();
            const data = result.success && result.data ? result.data : null;

            if (data) setScrapedData(data);

            // B. Prepare Data for Saving
            if (!user) throw new Error("User not authenticated");

            let title = data?.title || "Wealth Bridge";
            if (!data?.title) {
                try {
                    const hostname = new URL(url).hostname;
                    const domain = hostname.replace('www.', '').split('.')[0];
                    title = `Bridge - ${domain.charAt(0).toUpperCase() + domain.slice(1)}`;
                } catch (e) { }
            }

            const safeTitle = title.substring(0, 255);
            const safeDescription = (data?.description || "").substring(0, 1000);

            // C. Save Basic Bridge
            const { data: initialData, error: initialError } = await supabase.from('bridges').insert({
                user_id: user.id,
                title: safeTitle,
                description: safeDescription,
                image_url: data?.image || null,
                affiliate_url: url,
                status: 'indexing'
            }).select().single();

            if (initialError) throw initialError;

            const newBridgeId = initialData.id;
            setBridgeId(newBridgeId);

            // D. Generate AI Content (The long wait)
            console.log("Generating full AI review...");
            const aiResponse = await fetch('/api/generate-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, niche: "Tech/Business" })
            });
            const aiResult = await aiResponse.json();

            if (aiResult.success && aiResult.data) {
                const aiContent = aiResult.data;
                const aiNiche = aiContent.product_niche || "General Interests";

                // Update bridge with rich content and the detected niche
                await supabase
                    .from('bridges')
                    .update({
                        content: aiContent,
                        description: (aiContent.summary || safeDescription).substring(0, 1000),
                        niche: aiNiche
                    })
                    .eq('id', newBridgeId);
            }

            // E. Mark Backend as READY
            console.log("Backend work complete. Ready to finish scan.");
            setBackendReady(true);

        } catch (error: any) {
            console.error("Sync Process Failed:", error);
            // Log full error object for debugging
            try {
                console.error("Detailed Sync Error:", JSON.stringify(error, null, 2));
            } catch (e) {
                console.error("Could not stringify error:", error);
            }
            alert(`Sync Failed: ${error?.message || "Unknown error"}`);
            setStatus("idle"); // Reset on error so user doesn't get stuck
        }
    };

    // Called by NeuralScan ONLY when animation ends AND backendReady is true
    const handleScanComplete = () => {
        setStatus("complete");
    };

    return (
        <AnimatePresence mode="wait">
            {status === "scanning" && (
                <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <NeuralScan
                        onComplete={handleScanComplete}
                        canFinish={backendReady}
                    />
                </motion.div>
            )}

            {status === "complete" && (
                <motion.div
                    key="complete"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                >
                    <BridgePreview url={url} data={scrapedData} bridgeId={bridgeId} />
                </motion.div>
            )}

            {status === "idle" && (
                <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-2xl mx-auto"
                >
                    <GlassPanel intensity="medium" className="p-8 md:p-12 border-primary/20 bg-black/40">
                        <div className="flex flex-col gap-6">
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <GlassInput
                                    placeholder="Paste Affiliate URL here..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="h-20 pl-14 text-xl md:text-2xl tracking-wide bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:border-primary/50"
                                />
                            </div>

                            <NeonButton
                                variant="primary"
                                glow
                                className="h-16 text-lg md:text-xl w-full"
                                onClick={handleSync}
                                disabled={!url}
                            >
                                INITIATE SYNC
                            </NeonButton>

                            <div className="text-center text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-4 opacity-50 italic">
                                SECURE ASSET CONNECTION // ENCRYPTED SYNC ACTIVE
                            </div>
                        </div>
                    </GlassPanel>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
