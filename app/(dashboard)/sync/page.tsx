"use client";

import { useState, useEffect } from "react";
import { SyncWizard } from "@/components/sync/sync-wizard";
import { GlassPanel } from "@/components/ui/glass-panel";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  UserPlus,
  Search,
  MousePointerClick,
  Copy,
  ClipboardPaste,
} from "lucide-react";

const STEPS = [
  {
    number: 1,
    text: "Go to Digistore24.com and create a free account",
    icon: UserPlus,
    link: "https://www.digistore24.com",
    linkLabel: "Open Digistore24",
  },
  {
    number: 2,
    text: "Navigate to the Marketplace and find your product",
    icon: Search,
  },
  {
    number: 3,
    text: 'Click "Promote Now" to get your unique affiliate link',
    icon: MousePointerClick,
  },
  {
    number: 4,
    text: "Copy your affiliate link",
    icon: Copy,
  },
  {
    number: 5,
    text: 'Paste it below and click "Sync Product"',
    icon: ClipboardPaste,
  },
];

export default function SyncPage() {
  const [instructionsOpen, setInstructionsOpen] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("sync_visited");
    if (hasVisited) {
      setInstructionsOpen(false);
    } else {
      localStorage.setItem("sync_visited", "true");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start py-10 md:py-16">
      <div className="w-full max-w-3xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 tracking-tighter uppercase">
            WEALTH SYNC
          </h1>
          <p className="text-base text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            Paste any Digistore24 affiliate link below. The system will sync,
            optimize, and deploy it as your personal income page.
          </p>
        </div>

        {/* A. Instructions Panel */}
        <GlassPanel
          intensity="low"
          className="mb-8 border-white/5 overflow-hidden"
        >
          <button
            onClick={() => setInstructionsOpen(!instructionsOpen)}
            className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ClipboardPaste className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                How to Get Your Affiliate Link
              </span>
            </div>
            <motion.div
              animate={{ rotate: instructionsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {instructionsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-5 pb-5 space-y-3">
                  {STEPS.map((step, i) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-black/30 border border-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <step.icon className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span className="text-sm text-gray-300">
                            {step.text}
                          </span>
                        </div>
                        {step.link && (
                          <a
                            href={step.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-primary hover:text-cyan-300 transition-colors"
                          >
                            {step.linkLabel}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassPanel>

        {/* B & C. Sync Input + Post-Sync Feedback */}
        <SyncWizard />
      </div>
    </div>
  );
}
