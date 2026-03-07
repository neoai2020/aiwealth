"use client";

import { WelcomeBar } from "@/components/dashboard/welcome-bar";
import { FounderTransmission } from "@/components/dashboard/founder-transmission";
import { EarningsDashboard } from "@/components/dashboard/earnings-dashboard";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { SocialProofFeed } from "@/components/dashboard/social-proof-feed";

export default function Home() {
  return (
    <div className="min-h-screen font-(family-name:--font-display)">
      <h1 className="sr-only">AI Wealth OS — Command Center</h1>

      <div className="space-y-10 pb-20">
        <WelcomeBar />

        <FounderTransmission />

        <EarningsDashboard />

        <ProgressTracker />

        <SocialProofFeed />
      </div>
    </div>
  );
}
