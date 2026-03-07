"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { ContextualDocs } from "@/components/ui/contextual-docs";
import {
    Vault,
    FolderOpen,
    ChevronDown,
    ChevronRight,
    Copy,
    Check,
    FileText,
    Sparkles,
    Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

// Content categories for all vaults
const vaultCategories = [
    {
        id: "dfy-vault",
        name: "DFY Vault",
        description: "Done-For-You Digital Assets",
        icon: "🗄️",
        color: "from-purple-500 to-pink-500",
        borderColor: "border-purple-500/30",
        categories: [
            {
                title: "Landing Pages",
                count: 50,
                icon: "📄",
                items: [
                    { name: "Weight Loss Landing Page", content: "<!DOCTYPE html>\n<html>\n<head><title>Lose Weight Fast</title></head>\n<body>\n  <h1>Transform Your Body in 30 Days</h1>\n  <p>Discover the secret that helped 10,000+ people lose weight...</p>\n  <button>Get Started Now</button>\n</body>\n</html>" },
                    { name: "Crypto Course Landing", content: "<!DOCTYPE html>\n<html>\n<head><title>Crypto Mastery</title></head>\n<body>\n  <h1>Master Cryptocurrency Trading</h1>\n  <p>Learn from experts who made millions...</p>\n  <button>Enroll Now</button>\n</body>\n</html>" },
                    { name: "VPN Affiliate Page", content: "<!DOCTYPE html>\n<html>\n<head><title>Secure VPN</title></head>\n<body>\n  <h1>Protect Your Privacy Online</h1>\n  <p>Military-grade encryption for your data...</p>\n  <button>Get Protected</button>\n</body>\n</html>" },
                ]
            },
            {
                title: "Email Templates",
                count: 30,
                icon: "📧",
                items: [
                    { name: "Welcome Email", content: "Subject: Welcome to [Brand]! 🎉\n\nHey [Name],\n\nThank you for joining us! We're thrilled to have you.\n\nHere's what happens next:\n1. Check your inbox for exclusive content\n2. Follow us on social media\n3. Start earning today!\n\nBest,\n[Your Name]" },
                    { name: "Follow-Up Email", content: "Subject: Did you see this? 👀\n\nHey [Name],\n\nI noticed you haven't taken action yet...\n\nHere's a quick reminder of what you're missing:\n- Exclusive strategies\n- Proven templates\n- 24/7 support\n\nDon't miss out!\n\n[Your Name]" },
                    { name: "Sales Email", content: "Subject: Last Chance: 70% OFF ends tonight ⏰\n\nHey [Name],\n\nThis is your FINAL reminder...\n\nThe biggest sale of the year ends at midnight.\n\n🔥 70% OFF everything\n🔥 Bonus materials included\n🔥 Lifetime access\n\nClick here to claim your spot!\n\n[Your Name]" },
                ]
            },
            {
                title: "Social Media Posts",
                count: 100,
                icon: "📱",
                items: [
                    { name: "Engagement Post #1", content: "🚀 POV: You finally started that side hustle everyone's talking about...\n\n6 months later:\n✅ Extra $2K/month\n✅ Work from anywhere\n✅ Be your own boss\n\nDM me 'START' to learn how 👇" },
                    { name: "Value Post #1", content: "5 things I wish I knew before starting affiliate marketing:\n\n1. Start with ONE product\n2. Email list > social followers\n3. Consistency beats perfection\n4. Track everything\n5. Invest in yourself\n\nSave this for later 📌" },
                    { name: "Story Hook", content: "I went from $0 to $10K/month in 90 days.\n\nHere's the exact blueprint I used:\n\n🧵 Thread 👇" },
                ]
            },
        ]
    },
    {
        id: "instant-income",
        name: "Instant Income",
        description: "Fast-Track Your Earnings",
        icon: "⚡",
        color: "from-yellow-500 to-orange-500",
        borderColor: "border-yellow-500/30",
        categories: [
            {
                title: "24-Hour Profit Blueprints",
                count: 10,
                icon: "📋",
                items: [
                    { name: "Day 1 Action Plan", content: "HOUR 1-2: Pick your niche (health, wealth, relationships)\nHOUR 3-4: Sign up for affiliate programs\nHOUR 5-6: Create your first bridge page\nHOUR 7-8: Set up email capture\nHOUR 9-12: Launch first traffic campaign\nHOUR 13-24: Optimize and scale\n\n✅ Expected result: First commissions within 24 hours" },
                    { name: "Quick Win Strategy", content: "THE QUICK WIN METHOD:\n\n1. Find a product paying $50+ commission\n2. Create a simple review video\n3. Post on YouTube, TikTok, Instagram\n4. Add your affiliate link in bio\n5. Engage with comments\n\nRepeat daily. Results compound." },
                ]
            },
            {
                title: "High-Commission Products",
                count: 20,
                icon: "💰",
                items: [
                    { name: "Top 5 Software Products", content: "1. ClickFunnels - $100/sale recurring\n2. Kartra - $80/sale recurring\n3. Semrush - $200/sale\n4. Shopify - $58/sale\n5. HubSpot - $1000+/sale" },
                    { name: "Top 5 Course Products", content: "1. Legendary Marketer - $1000+/sale\n2. Authority Hacker - $500/sale\n3. Income School - $300/sale\n4. Smart Passive Income - $200/sale\n5. Affiliate Lab - $400/sale" },
                ]
            },
            {
                title: "Ad Templates",
                count: 25,
                icon: "📢",
                items: [
                    { name: "Facebook Ad Copy #1", content: "🔥 ATTENTION: [Target Audience]\n\nAre you tired of [Pain Point]?\n\nWhat if I told you there's a way to [Desired Outcome] in just [Timeframe]?\n\n✅ No experience needed\n✅ Works even if [Objection]\n✅ Proven by [Social Proof]\n\n👉 Click the link to learn more!" },
                    { name: "TikTok Script #1", content: "[HOOK - 0-3 sec]: 'This one thing changed everything for me...'\n\n[STORY - 4-15 sec]: Share quick transformation\n\n[VALUE - 16-45 sec]: Explain the method\n\n[CTA - 46-60 sec]: 'Link in bio to get started'" },
                ]
            },
        ]
    },
    {
        id: "automated-profits",
        name: "Automated Profits",
        description: "Set It & Forget It",
        icon: "🤖",
        color: "from-cyan-500 to-blue-500",
        borderColor: "border-cyan-500/30",
        categories: [
            {
                title: "Automation Scripts",
                count: 15,
                icon: "⚙️",
                items: [
                    { name: "Auto-DM Script", content: "// Instagram Auto-DM Script\n\nconst message = `Hey {username}! 👋\n\nI noticed you're interested in {topic}.\n\nI put together a free guide that shows exactly how to get started.\n\nWant me to send it over?`;\n\nconst sendDM = async (userId) => {\n  await api.sendMessage(userId, message);\n  await delay(randomBetween(30, 60) * 1000);\n}" },
                    { name: "Email Sequence Automation", content: "// Automated Email Sequence\n\nDay 0: Welcome + Free Gift\nDay 1: Story + Value\nDay 3: Case Study\nDay 5: Soft Pitch\nDay 7: Hard Pitch + Urgency\nDay 10: Last Chance\nDay 14: Downsell/Alternative" },
                ]
            },
            {
                title: "AI Prompts",
                count: 50,
                icon: "🧠",
                items: [
                    { name: "Content Generation Prompt", content: "You are an expert copywriter specializing in affiliate marketing.\n\nWrite a [content type] about [topic] that:\n- Hooks the reader in the first line\n- Addresses [pain point]\n- Provides actionable value\n- Naturally leads to [product/offer]\n- Ends with a clear CTA\n\nTone: Conversational, authoritative, friendly\nLength: [X words]" },
                    { name: "Ad Copy Prompt", content: "Create 5 variations of ad copy for [product].\n\nTarget audience: [demographic]\nMain benefit: [benefit]\nUnique angle: [angle]\n\nEach ad should:\n- Start with a scroll-stopping hook\n- Address the main pain point\n- Present the solution\n- Include social proof\n- End with urgency + CTA" },
                ]
            },
            {
                title: "Scheduling Templates",
                count: 12,
                icon: "📅",
                items: [
                    { name: "Weekly Content Calendar", content: "MONDAY: Educational post + Story engagement\nTUESDAY: Behind-the-scenes + DM outreach\nWEDNESDAY: Value carousel + Reel\nTHURSDAY: Testimonial/case study\nFRIDAY: Promotional post + Story poll\nSATURDAY: User-generated content\nSUNDAY: Planning + Batch content creation" },
                    { name: "Launch Week Schedule", content: "DAY 1: Announce coming soon\nDAY 2: Share sneak peek\nDAY 3: Early bird waitlist\nDAY 4: Social proof/testimonials\nDAY 5: LAUNCH DAY\nDAY 6: FAQ + objection handling\nDAY 7: Cart close countdown" },
                ]
            },
        ]
    },
];

interface VaultItem {
    name: string;
    content: string;
}

interface VaultCategory {
    title: string;
    count: number;
    icon: string;
    items: VaultItem[];
}

interface VaultData {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    borderColor: string;
    categories: VaultCategory[];
}

export function ContentVault({ vaultId }: { vaultId: string }) {
    const vault = vaultCategories.find(v => v.id === vaultId);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    if (!vault) {
        return <div>Vault not found</div>;
    }

    const handleCopy = (content: string, itemName: string) => {
        navigator.clipboard.writeText(content);
        setCopiedItem(itemName);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const toggleCategory = (title: string) => {
        setExpandedCategory(expandedCategory === title ? null : title);
        setExpandedItem(null);
    };

    const toggleItem = (name: string) => {
        setExpandedItem(expandedItem === name ? null : name);
    };

    return (
        <div className="space-y-8 pb-20">
            <ContextualDocs title={`Welcome to ${vault.name}`} variant="info">
                <p>This vault contains all your unlocked content. Here&apos;s how to use it:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Click a category</strong> to expand and see all items</li>
                    <li><strong>Click an item</strong> to view and copy the content</li>
                    <li><strong>Copy button</strong> copies content to your clipboard instantly</li>
                </ul>
            </ContextualDocs>

            {/* Header */}
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${vault.color} flex items-center justify-center text-2xl shadow-xl`}>
                    {vault.icon}
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{vault.name}</h1>
                    <p className="text-gray-400 text-sm">{vault.description}</p>
                </div>
                <div className="ml-auto">
                    <span className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase border border-green-500/30 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Unlocked
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GlassPanel className="p-4">
                    <div className="text-2xl font-bold text-white">
                        {vault.categories.length}
                    </div>
                    <div className="text-xs text-gray-500 uppercase">Categories</div>
                </GlassPanel>
                <GlassPanel className="p-4">
                    <div className="text-2xl font-bold text-primary">
                        {vault.categories.reduce((acc, cat) => acc + cat.count, 0)}+
                    </div>
                    <div className="text-xs text-gray-500 uppercase">Total Items</div>
                </GlassPanel>
                <GlassPanel className="p-4">
                    <div className="text-2xl font-bold text-green-400">∞</div>
                    <div className="text-xs text-gray-500 uppercase">Access</div>
                </GlassPanel>
                <GlassPanel className="p-4">
                    <div className="text-2xl font-bold text-yellow-400">⭐</div>
                    <div className="text-xs text-gray-500 uppercase">Premium</div>
                </GlassPanel>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                {vault.categories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassPanel className={`overflow-hidden ${vault.borderColor}`}>
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category.title)}
                                className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{category.icon}</span>
                                    <div className="text-left">
                                        <h3 className="font-bold text-white">{category.title}</h3>
                                        <p className="text-xs text-gray-500">{category.count} items available</p>
                                    </div>
                                </div>
                                {expandedCategory === category.title ? (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {/* Category Items */}
                            <AnimatePresence>
                                {expandedCategory === category.title && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-white/10"
                                    >
                                        <div className="p-4 space-y-2">
                                            {category.items.map((item) => (
                                                <div key={item.name} className="rounded-xl bg-black/30 overflow-hidden">
                                                    {/* Item Header */}
                                                    <button
                                                        onClick={() => toggleItem(item.name)}
                                                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="w-4 h-4 text-gray-500" />
                                                            <span className="text-sm text-white">{item.name}</span>
                                                        </div>
                                                        {expandedItem === item.name ? (
                                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                                        ) : (
                                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                                        )}
                                                    </button>

                                                    {/* Item Content */}
                                                    <AnimatePresence>
                                                        {expandedItem === item.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="border-t border-white/5"
                                                            >
                                                                <div className="p-4 space-y-3">
                                                                    <pre className="p-4 rounded-lg bg-black/50 text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap font-mono border border-white/5">
                                                                        {item.content}
                                                                    </pre>
                                                                    <button
                                                                        onClick={() => handleCopy(item.content, item.name)}
                                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
                                                                    >
                                                                        {copiedItem === item.name ? (
                                                                            <>
                                                                                <Check className="w-4 h-4" />
                                                                                Copied!
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Copy className="w-4 h-4" />
                                                                                Copy to Clipboard
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}

                                            {/* More items indicator */}
                                            {category.count > category.items.length && (
                                                <div className="text-center py-3 text-xs text-gray-500">
                                                    + {category.count - category.items.length} more items in full vault
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </GlassPanel>
                    </motion.div>
                ))}
            </div>

            {/* Back Link */}
            <Link
                href="/upgrade"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                ← Back to All Vaults
            </Link>
        </div>
    );
}

// Export vault data for use in main upgrade page
export { vaultCategories };
