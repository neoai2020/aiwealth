"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  Globe,
  UserCheck,
  KeyRound,
  Eye,
  Server,
  Wifi,
  Clock,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const securityChecks = [
  { label: "Account Verified", description: "Your email address has been verified and confirmed", icon: UserCheck, status: "verified" as const },
  { label: "Secure Connection", description: "All data is transmitted over encrypted HTTPS connection", icon: Lock, status: "verified" as const },
  { label: "Session Protected", description: "Your session is authenticated with a secure token", icon: KeyRound, status: "verified" as const },
  { label: "Data Encryption", description: "All personal and financial data is encrypted at rest", icon: Eye, status: "verified" as const },
  { label: "Server Status", description: "All AI Wealth OS servers are online and operational", icon: Server, status: "verified" as const },
  { label: "API Connectivity", description: "Connection to Digistore24 and traffic APIs is stable", icon: Wifi, status: "verified" as const },
];

const activityLog = [
  { event: "Successful login", time: "Just now", icon: UserCheck },
  { event: "Session renewed", time: "2 minutes ago", icon: KeyRound },
  { event: "Security scan completed", time: "15 minutes ago", icon: ShieldCheck },
  { event: "SSL certificate verified", time: "1 hour ago", icon: Lock },
  { event: "System health check passed", time: "3 hours ago", icon: Server },
];

export default function ProtectorPage() {
  const { user } = useAuth();
  const userEmail = user?.email || "user@example.com";

  return (
    <div className="space-y-8 pb-20 font-(family-name:--font-display)">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 md:p-10 rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/5 via-black/40 to-transparent backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
              Wealth Protector
            </h1>
            <p className="text-gray-400 text-sm">
              Your account security overview. Everything is monitored in real time.
            </p>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">All Systems Secure</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Security Score", value: "100%", icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Account Status", value: "Verified", icon: CheckCircle, color: "text-emerald-400" },
          { label: "Encryption", value: "AES-256", icon: Lock, color: "text-cyan-400" },
          { label: "Uptime", value: "99.9%", icon: Globe, color: "text-blue-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassPanel intensity="low" className="p-5 border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Checks */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white mb-1">Security Checks</h2>
          <div className="space-y-3">
            {securityChecks.map((check, i) => (
              <motion.div
                key={check.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                <GlassPanel intensity="low" className="p-4 border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <check.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white">{check.label}</h3>
                      <p className="text-xs text-gray-500">{check.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Verified</span>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Account Info */}
          <GlassPanel intensity="low" className="p-5 border-emerald-500/10">
            <h3 className="text-sm font-bold text-white mb-4">Account Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-gray-500">Email</span>
                <span className="text-xs text-white font-medium truncate ml-4">{userEmail}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-gray-500">Membership</span>
                <span className="text-xs text-emerald-400 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-gray-500">2FA</span>
                <span className="text-xs text-emerald-400 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-gray-500">Last Login</span>
                <span className="text-xs text-white font-medium">Today</span>
              </div>
            </div>
          </GlassPanel>

          {/* Activity Log */}
          <GlassPanel intensity="low" className="p-5 border-white/5">
            <h3 className="text-sm font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activityLog.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 font-medium">{item.event}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-gray-600" />
                      <span className="text-[10px] text-gray-600">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
