"use client";

import { motion } from "framer-motion";
import { Check, Zap, Crown, Star } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { useRouter } from "next/navigation";

const tiers = [
    {
        name: "Basic Node",
        price: "$49",
        description: "Entry-level wealth generation for emerging traders.",
        features: [
            "Standard Market Analysis",
            "Single Bridge Connection",
            "Basic Portfolio Tracking",
            "Community Support"
        ],
        icon: Star,
        color: "text-blue-400",
        buttonText: "Start Basic"
    },
    {
        name: "Pro Node",
        price: "$199",
        description: "Advanced optimization for serious wealth builders.",
        features: [
            "High-Velocity Indexing",
            "Unlimited Bridge Sync",
            "AI Risk Mitigation (Shield)",
            "Priority Support Response"
        ],
        icon: Zap,
        color: "text-primary",
        featured: true,
        buttonText: "Go Pro"
    },
    {
        name: "Elite Node",
        price: "$499",
        description: "Maximum scaling for institutional-grade performance.",
        features: [
            "Neural Market Forecasting",
            "Custom Domain Mapping",
            "24/7 Dedicated Concierge",
            "Early Access to New Modules"
        ],
        icon: Crown,
        color: "text-purple-400",
        buttonText: "Become Elite"
    }
];

export default function UpgradePage() {
    const router = useRouter();

    return (
        <div className="space-y-12 pb-32">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic"
                >
                    Upgrade Your <span className="text-primary italic">Wealth Engine</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg"
                >
                    Select the node configuration that best matches your scaling objectives.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tiers.map((tier, i) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                    >
                        <GlassPanel
                            intensity={tier.featured ? "medium" : "low"}
                            className={`p-8 h-full flex flex-col border-white/10 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 ${tier.featured ? 'border-primary/30 ring-1 ring-primary/20 shadow-2xl shadow-primary/10' : ''}`}
                        >
                            {tier.featured && (
                                <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-[10px] font-black text-black uppercase tracking-widest rounded-bl-xl">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <tier.icon className={`w-10 h-10 ${tier.color} mb-4`} />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-4xl font-black text-white">{tier.price}</span>
                                    <span className="text-gray-500 font-bold uppercase text-[10px]">/ month</span>
                                </div>
                                <p className="text-gray-400 text-sm mt-4 italic">{tier.description}</p>
                            </div>

                            <div className="space-y-4 flex-1 mb-10">
                                {tier.features.map(feature => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Check className={`w-4 h-4 ${tier.color}`} />
                                        </div>
                                        <span className="text-xs text-gray-300 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <NeonButton
                                variant={tier.featured ? "primary" : "ghost"}
                                className="w-full py-4 text-xs font-black"
                                onClick={() => router.push("/")}
                            >
                                {tier.buttonText}
                            </NeonButton>
                        </GlassPanel>
                    </motion.div>
                ))}
            </div>

            <div className="pt-20 text-center">
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-6">Trusted by 10,000+ Scalers worldwide</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-200">
                    <div className="text-xl font-black text-white italic">STRIPE</div>
                    <div className="text-xl font-black text-white italic">PAYPAL</div>
                    <div className="text-xl font-black text-white italic">COINBASE</div>
                    <div className="text-xl font-black text-white italic">BINANCE</div>
                </div>
            </div>
        </div>
    );
}
