"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import {
  ShieldCheck,
  RefreshCw,
  Package,
  Cpu,
  Radio,
  Wifi,
  CheckCircle,
} from "lucide-react";

const STATUS_MESSAGES = [
  { text: "Network: Encrypted ✓", icon: ShieldCheck },
  { text: "Pages Synced: 12", icon: RefreshCw },
  { text: "New Products Available: 3", icon: Package },
  { text: "System Optimized ✓", icon: Cpu },
  { text: "Traffic Signals Active", icon: Radio },
  { text: "All Systems Online", icon: Wifi },
  { text: "Security Protocols: Active", icon: CheckCircle },
];

export function WelcomeBar() {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const userNameHandle = user?.email?.split("@")[0] || "Trader";
  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    userNameHandle.charAt(0).toUpperCase() + userNameHandle.slice(1);

  const rotateMessage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    const nextDelay = Math.random() * 12000 + 3000;
    return nextDelay;
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const schedule = () => {
      const delay = Math.random() * 12000 + 3000;
      timeout = setTimeout(() => {
        rotateMessage();
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeout);
  }, [rotateMessage]);

  const currentStatus = STATUS_MESSAGES[currentIndex];
  const StatusIcon = currentStatus.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-8 rounded-2xl border border-white/5 bg-black/30 backdrop-blur-sm"
    >
      <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-(family-name:--font-display)">
        Welcome back,{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-cyan-400 to-primary">
          {firstName}
        </span>
      </h2>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 min-w-[240px] justify-center">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <StatusIcon className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-sm text-gray-300 font-medium whitespace-nowrap">
              {currentStatus.text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
