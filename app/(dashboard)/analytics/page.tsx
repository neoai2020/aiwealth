"use client";

import { AnalyticsContent } from "@/components/analytics/analytics-content";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";

function AnalyticsPageContent() {
    const searchParams = useSearchParams();
    const bridgeId = searchParams.get("id") || "1";

    return <AnalyticsContent bridgeId={bridgeId} />;
}

export default function AnalyticsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
                <GlassPanel intensity="low" className="p-8 text-center">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 font-mono">Loading Analytics Data...</p>
                </GlassPanel>
            </div>
        }>
            <AnalyticsPageContent />
        </Suspense>
    );
}
