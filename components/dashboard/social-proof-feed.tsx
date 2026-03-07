"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

const FIRST_NAMES = [
  "James", "Sarah", "Michael", "Emma", "David", "Olivia", "Daniel", "Sophia",
  "Chris", "Ava", "Matt", "Isabella", "Ryan", "Mia", "Alex", "Charlotte",
  "Jordan", "Amelia", "Tyler", "Harper", "Kevin", "Ella", "Brandon", "Grace",
  "Jason", "Lily", "Nathan", "Chloe", "Marcus", "Zoe", "Travis", "Nora",
  "Derek", "Hannah", "Kyle", "Aria", "Brian", "Luna", "Eric", "Layla",
  "Omar", "Fatima", "Raj", "Priya", "Wei", "Yuki", "Carlos", "Maria",
  "Andre", "Aisha", "Liam", "Ethan", "Mason", "Logan", "Lucas", "Aiden",
];

const LOCATIONS = [
  "New York, US", "London, UK", "Toronto, CA", "Sydney, AU", "Berlin, DE",
  "Miami, US", "Dallas, TX", "Los Angeles, US", "Chicago, US", "Vancouver, CA",
  "Dublin, IE", "Amsterdam, NL", "Stockholm, SE", "Singapore, SG", "Dubai, AE",
  "Melbourne, AU", "Paris, FR", "Munich, DE", "Austin, TX", "Denver, US",
  "Barcelona, ES", "Lisbon, PT", "Oslo, NO", "Helsinki, FI", "Zurich, CH",
  "Seoul, KR", "Tokyo, JP", "Mumbai, IN", "São Paulo, BR", "Cape Town, ZA",
];

const NICHES = [
  "Health & Fitness", "Personal Finance", "Self-Improvement", "Online Business",
  "Weight Loss", "Crypto Trading", "Manifestation", "Keto Diet",
  "Affiliate Marketing", "Mindfulness", "Relationship Coaching", "Productivity",
];

const EVENT_TEMPLATES = [
  { type: "commission" as const, template: "just earned a ${amount} commission" },
  { type: "commission" as const, template: "received a ${amount} payout" },
  { type: "milestone" as const, template: "hit ${amount} in total earnings" },
  { type: "sync" as const, template: "synced a new ${niche} page" },
  { type: "streak" as const, template: "is on a ${days}-day streak" },
];

interface ProofEvent {
  id: number;
  name: string;
  location: string;
  message: string;
  type: "commission" | "milestone" | "sync" | "streak";
  timestamp: number;
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min: number, max: number): string {
  const val = Math.random() * (max - min) + min;
  return val.toFixed(2);
}

function generateEvent(id: number): ProofEvent {
  const template = randomFrom(EVENT_TEMPLATES);
  const name = randomFrom(FIRST_NAMES);
  const initial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const location = randomFrom(LOCATIONS);
  let message = "";

  switch (template.type) {
    case "commission":
      message = template.template.replace("${amount}", `$${randomAmount(12, 247)}`);
      break;
    case "milestone":
      const milestones = ["$500", "$1,000", "$2,500", "$5,000", "$10,000"];
      message = template.template.replace("${amount}", randomFrom(milestones));
      break;
    case "sync":
      message = template.template.replace("${niche}", randomFrom(NICHES));
      break;
    case "streak":
      message = template.template.replace("${days}", String(Math.floor(Math.random() * 28) + 3));
      break;
  }

  return {
    id,
    name: `${name} ${initial}.`,
    location,
    message,
    type: template.type,
    timestamp: Date.now(),
  };
}

function timeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

const typeConfig = {
  commission: { icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  milestone: { icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  sync: { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  streak: { icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
};

function ProofCard({ event }: { event: ProofEvent }) {
  const [ago, setAgo] = useState(timeAgo(event.timestamp));
  const config = typeConfig[event.type];
  const Icon = config.icon;

  useEffect(() => {
    const interval = setInterval(() => setAgo(timeAgo(event.timestamp)), 5000);
    return () => clearInterval(interval);
  }, [event.timestamp]);

  const initials = event.name.split(" ")[0][0];

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
      animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
      className="will-change-auto"
    >
      <div
        className={`flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border ${config.border} hover:bg-white/[0.04] transition-colors duration-300 cursor-default`}
      >
      <div className={`w-10 h-10 rounded-full ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}>
        <span className={`text-sm font-bold ${config.color}`}>{initials}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-white">{event.name}</span>
          <span className={`text-sm ${config.color} font-medium`}>{event.message}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-gray-500">{event.location}</span>
          <span className="text-[11px] text-gray-600">·</span>
          <span className="text-[11px] text-gray-500">{ago}</span>
        </div>
      </div>

      <div className={`shrink-0 w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      </div>
    </motion.div>
  );
}

export function SocialProofFeed() {
  const [events, setEvents] = useState<ProofEvent[]>([]);
  const [totalToday, setTotalToday] = useState(847);
  const idRef = useRef(0);
  const initialized = useRef(false);

  const addEvent = useCallback(() => {
    idRef.current += 1;
    const newEvent = generateEvent(idRef.current);
    setEvents((prev) => [newEvent, ...prev].slice(0, 6));
    if (newEvent.type === "commission") {
      setTotalToday((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initial: ProofEvent[] = [];
    for (let i = 0; i < 4; i++) {
      idRef.current += 1;
      const ev = generateEvent(idRef.current);
      ev.timestamp = Date.now() - (i * 15000 + Math.random() * 10000);
      initial.push(ev);
    }
    setEvents(initial);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const schedule = () => {
      const delay = Math.random() * 2000 + 1500;
      timeout = setTimeout(() => {
        addEvent();
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeout);
  }, [addEvent]);

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center border border-emerald-400/20">
            <Users className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-(family-name:--font-display)">
              Live Community Activity
            </h3>
            <p className="text-sm text-gray-400">
              Real-time earnings from AI Wealth members
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-sm font-bold text-emerald-400 tabular-nums">
              {totalToday.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">payouts today</span>
          </div>
        </div>
      </div>

      <GlassPanel intensity="low" className="p-4 border-white/5 overflow-hidden">
        <div>
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <ProofCard key={event.id} event={event} />
            ))}
          </AnimatePresence>
        </div>
      </GlassPanel>
    </section>
  );
}
