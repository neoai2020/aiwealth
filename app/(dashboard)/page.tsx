"use client";

import { WelcomeBar } from "@/components/dashboard/welcome-bar";
import { FounderTransmission } from "@/components/dashboard/founder-transmission";
import { EarningsDashboard } from "@/components/dashboard/earnings-dashboard";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { NicheRecommendations } from "@/components/dashboard/niche-recommendations";
import { SupportDesk } from "@/components/layout/support-desk";

export default function Home() {
  return (
    <div className="min-h-screen font-(family-name:--font-display)">
      <h1 className="sr-only">AI Wealth OS — Command Center</h1>

      <div className="space-y-10 pb-20">
        {/* A. Welcome Bar with rotating status ticker */}
        <WelcomeBar />

        {/* B. Video Section */}
        <FounderTransmission />

        {/* C. Earnings Dashboard — 4 stat cards */}
        <EarningsDashboard />

        {/* D. Progress Tracker / Gamification */}
        <ProgressTracker />

        {/* E. Niche Recommendation Engine */}
        <NicheRecommendations />

        {/* F. Contact Support */}
        <SupportDesk />
      </div>
    </div>
  );
}
