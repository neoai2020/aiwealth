"use client";

import React from "react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { ContextualDocs } from "@/components/ui/contextual-docs";
import {
    Globe,
    Zap,
    ExternalLink,
    Copy,
    Check,
    Loader2,
    Sparkles,
    Search,
    MessageSquare,
    Database,
    ChevronDown,
    Edit2,
    X
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

// Bridge interface for real data
interface Bridge {
    id: string;
    title: string;
    affiliate_url: string;
    created_at: string;
    status: string;
    niche?: string;
}

interface ScrapedUrl {
    url: string;
    comment?: string;
    isGenerating?: boolean;
    copied?: boolean;
}

interface BridgeResults {
    [bridgeId: string]: {
        isLoading: boolean;
        urls: ScrapedUrl[];
        query?: string;
        niche?: string;
    };
}

const LinkifiedText = ({ text }: { text: string }) => {
    // Regex to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = text.split(urlRegex);

    return (
        <>
            {parts.map((part, i) => {
                if (part.match(urlRegex)) {
                    let displayUrl = part;
                    try {
                        // Decode URI components for better readability
                        displayUrl = decodeURIComponent(part);
                        // Shorten if extremely long for display
                        if (displayUrl.length > 50) {
                            const urlObj = new URL(displayUrl);
                            displayUrl = urlObj.hostname + (urlObj.pathname.length > 20 ? urlObj.pathname.substring(0, 15) + '...' : urlObj.pathname);
                        }
                    } catch (e) { }

                    return (
                        <a
                            key={i}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4 hover:text-blue-300 transition-colors group relative inline-block mx-1"
                            title={part}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {displayUrl}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-gray-400 font-mono">
                                Click to open link
                            </span>
                        </a>
                    );
                }
                return part;
            })}
        </>
    );
};

export default function TrafficHubPage() {
    const { user } = useAuth();
    const [bridges, setBridges] = useState<Bridge[]>([]);
    const [loading, setLoading] = useState(true);
    const [bridgeResults, setBridgeResults] = useState<BridgeResults>({});
    const [expandedBridges, setExpandedBridges] = useState<Set<string>>(new Set());
    const [editingNiche, setEditingNiche] = useState<{ id: string, value: string } | null>(null);
    const [savingNiche, setSavingNiche] = useState<string | null>(null);

    // Helper function to extract domain from URL
    const extractDomain = (url: string): string => {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            return domain;
        } catch {
            return url;
        }
    };

    // Helper function to clean and shorten URL for display
    const formatUrl = (url: string, maxLength: number = 60): string => {
        try {
            const urlObj = new URL(url);
            // Remove tracking parameters and query strings for cleaner display
            let path = urlObj.pathname;
            if (path.length > maxLength) {
                path = path.substring(0, maxLength) + '...';
            }
            return urlObj.hostname.replace('www.', '') + path;
        } catch {
            if (url.length > maxLength) {
                return url.substring(0, maxLength) + '...';
            }
            return url;
        }
    };


    useEffect(() => {
        const fetchBridges = async () => {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('bridges')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setBridges(data || []);
            } catch (error) {
                console.error('Error fetching bridges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBridges();
    }, [user]);

    const handleUpdateNiche = async (bridgeId: string, newValue: string) => {
        setSavingNiche(bridgeId);
        try {
            const { error } = await supabase
                .from('bridges')
                .update({ niche: newValue })
                .eq('id', bridgeId);

            if (error) throw error;

            // Update local state
            setBridges(prev => prev.map(b => b.id === bridgeId ? { ...b, niche: newValue } : b));
            setEditingNiche(null);
        } catch (error) {
            console.error('Error updating niche:', error);
            alert('Failed to update niche. Please try again.');
        } finally {
            setSavingNiche(null);
        }
    };

    const handleInstantTraffic = async (bridge: Bridge) => {
        // Set loading state
        setBridgeResults(prev => ({
            ...prev,
            [bridge.id]: { isLoading: true, urls: [] }
        }));

        // Expand the bridge to show loading state
        setExpandedBridges(prev => new Set(prev).add(bridge.id));

        let attempts = 0;
        const maxAttempts = 4;
        let success = false;

        while (attempts < maxAttempts && !success) {
            try {
                attempts++;
                if (attempts > 1) {
                    console.log(`Retry attempt ${attempts}/${maxAttempts} for ${bridge.title}...`);
                    // Small delay before retrying
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }

                // FIXED: Extract meaningful keywords from title, removing stop words
                let titleText = bridge.title.replace('Bridge - ', '').trim();

                // Remove common stop words
                const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
                const words = titleText.split(' ').filter(word =>
                    word.length > 2 && !stopWords.includes(word.toLowerCase())
                );

                // Use first 2-3 meaningful words, or full title if short
                const keywords = words.length <= 3
                    ? words.join(' ')
                    : words.slice(0, 2).join(' ') || "wealth";

                const response = await fetch('/api/scrape-urls', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        keywords: titleText,
                        niche: bridge.niche || ""
                    })
                });

                const data = await response.json();

                if (data.success) {
                    setBridgeResults(prev => ({
                        ...prev,
                        [bridge.id]: {
                            isLoading: false,
                            urls: data.urls.map((url: string) => ({ url })),
                            query: data.query,
                            niche: data.niche
                        }
                    }));
                    success = true;
                } else {
                    throw new Error(data.error || 'Failed to fetch results');
                }
            } catch (error) {
                console.error(`Attempt ${attempts} failed:`, error);
                if (attempts >= maxAttempts) {
                    setBridgeResults(prev => ({
                        ...prev,
                        [bridge.id]: { isLoading: false, urls: [] }
                    }));
                }
            }
        }
    };

    const toggleBridgeExpansion = (bridgeId: string) => {
        setExpandedBridges(prev => {
            const newSet = new Set(prev);
            if (newSet.has(bridgeId)) {
                newSet.delete(bridgeId);
            } else {
                newSet.add(bridgeId);
            }
            return newSet;
        });
    };


    const handleGenerateComment = async (bridgeId: string, urlIndex: number, bridge: Bridge) => {
        const results = bridgeResults[bridgeId];
        if (!results) return;

        // Set generating state
        const updatedUrls = [...results.urls];
        updatedUrls[urlIndex] = { ...updatedUrls[urlIndex], isGenerating: true };
        setBridgeResults(prev => ({
            ...prev,
            [bridgeId]: { ...prev[bridgeId], urls: updatedUrls }
        }));

        try {
            const response = await fetch('/api/generate-comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetUrl: results.urls[urlIndex].url,
                    bridgeUrl: bridge.affiliate_url,
                    niche: bridge.niche || bridge.title
                })
            });

            const data = await response.json();

            if (data.success) {
                const finalUrls = [...bridgeResults[bridgeId].urls];
                finalUrls[urlIndex] = {
                    ...finalUrls[urlIndex],
                    comment: data.comment,
                    isGenerating: false
                };
                setBridgeResults(prev => ({
                    ...prev,
                    [bridgeId]: { ...prev[bridgeId], urls: finalUrls }
                }));
            }
        } catch (error) {
            console.error('Error generating comment:', error);
            const finalUrls = [...bridgeResults[bridgeId].urls];
            finalUrls[urlIndex] = { ...finalUrls[urlIndex], isGenerating: false };
            setBridgeResults(prev => ({
                ...prev,
                [bridgeId]: { ...prev[bridgeId], urls: finalUrls }
            }));
        }
    };

    const handleCopyComment = (bridgeId: string, urlIndex: number) => {
        const comment = bridgeResults[bridgeId]?.urls[urlIndex]?.comment;
        if (comment) {
            navigator.clipboard.writeText(comment);

            const updatedUrls = [...bridgeResults[bridgeId].urls];
            updatedUrls[urlIndex] = { ...updatedUrls[urlIndex], copied: true };
            setBridgeResults(prev => ({
                ...prev,
                [bridgeId]: { ...prev[bridgeId], urls: updatedUrls }
            }));

            setTimeout(() => {
                const resetUrls = [...bridgeResults[bridgeId].urls];
                resetUrls[urlIndex] = { ...resetUrls[urlIndex], copied: false };
                setBridgeResults(prev => ({
                    ...prev,
                    [bridgeId]: { ...prev[bridgeId], urls: resetUrls }
                }));
            }, 2000);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <ContextualDocs title="Traffic Hub - Automated Outreach" variant="info">
                <p>Use this page to drive traffic to your bridges through smart comment marketing:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li><strong>Click &quot;Instant Traffic&quot;</strong> to find blogs in your niche that accept comments</li>
                    <li><strong>Generate AI comments</strong> that naturally include your bridge link</li>
                    <li><strong>Copy and paste</strong> the comment to the target blog</li>
                </ol>
            </ContextualDocs>

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/30">
                    <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Traffic Hub</h1>
                    <p className="text-gray-400 text-sm">Automated traffic generation through smart outreach</p>
                </div>
            </div>

            {/* Bridges Table */}
            <GlassPanel className="p-0 border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-linear-to-r from-white/5 to-primary/5">
                                <th className="text-left p-5 text-xs font-bold text-gray-300 uppercase tracking-wider w-12"></th>
                                <th className="text-left p-5 text-xs font-bold text-gray-300 uppercase tracking-wider whitespace-nowrap">Bridge Name</th>
                                <th className="text-left p-5 text-xs font-bold text-gray-300 uppercase tracking-wider whitespace-nowrap">Niche</th>
                                <th className="text-left p-5 text-xs font-bold text-gray-300 uppercase tracking-wider whitespace-nowrap">Date Created</th>
                                <th className="text-left p-5 text-xs font-bold text-gray-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="text-right p-5 text-xs font-bold text-gray-300 uppercase tracking-wider whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                        Loading your bridges...
                                    </td>
                                </tr>
                            ) : bridges.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No bridges found. Create one to start driving traffic.
                                    </td>
                                </tr>
                            ) : bridges.map((bridge) => {
                                const results = bridgeResults[bridge.id];
                                const isExpanded = expandedBridges.has(bridge.id);
                                const hasResults = results && results.urls.length > 0;

                                return (
                                    <React.Fragment key={bridge.id}>
                                        {/* Main Bridge Row */}
                                        <tr
                                            className="border-b border-white/5 hover:bg-linear-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                                        >
                                            {/* Expand/Collapse Button */}
                                            <td className="p-5">
                                                {hasResults && (
                                                    <button
                                                        onClick={() => toggleBridgeExpansion(bridge.id)}
                                                        className="text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        <ChevronDown
                                                            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                        />
                                                    </button>
                                                )}
                                            </td>

                                            <td className="p-5">
                                                <div className="font-semibold text-white group-hover:text-primary transition-colors">{bridge.title}</div>
                                                <a
                                                    href={bridge.affiliate_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-gray-500 font-mono truncate max-w-[250px] mt-1 block hover:text-primary transition-colors"
                                                >
                                                    {bridge.affiliate_url}
                                                </a>
                                            </td>
                                            <td className="p-5">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setEditingNiche({ id: bridge.id, value: bridge.niche || "" })}
                                                    className="group/niche flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all cursor-pointer"
                                                >
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/90 whitespace-nowrap">
                                                        {bridge.niche || "No Niche"}
                                                    </span>
                                                    <Edit2 className="w-3 h-3 text-primary/40 group-hover/niche:text-primary transition-colors" />
                                                </motion.button>
                                            </td>
                                            <td className="p-5 text-sm text-gray-400">{new Date(bridge.created_at).toLocaleDateString()}</td>
                                            <td className="p-5">
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase bg-linear-to-r from-primary/20 to-primary/10 text-primary border border-primary/40 shadow-lg shadow-primary/10 whitespace-nowrap">
                                                    <Sparkles className="w-3 h-3 animate-pulse" /> AI Optimized
                                                </span>
                                            </td>
                                            <td className="p-5 text-right">
                                                <button
                                                    onClick={() => handleInstantTraffic(bridge)}
                                                    disabled={bridgeResults[bridge.id]?.isLoading}
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-black text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
                                                >
                                                    {bridgeResults[bridge.id]?.isLoading ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" /> Searching...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Zap className="w-4 h-4" /> Instant Traffic
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Expandable Results Row */}
                                        <AnimatePresence>
                                            {isExpanded && hasResults && (
                                                <motion.tr
                                                    key={`${bridge.id}-results`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="bg-black/40 border-b border-white/5"
                                                >
                                                    <td colSpan={6} className="p-0">
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: "auto" }}
                                                            exit={{ height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="p-6 space-y-4">
                                                                {/* Results Header */}
                                                                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                                                    <div className="flex items-center gap-2">
                                                                        <Search className="w-4 h-4 text-primary" />
                                                                        <h3 className="font-bold text-white">
                                                                            Results for: <span className="text-primary italic">{results.niche || bridge.title}</span>
                                                                        </h3>
                                                                    </div>
                                                                    <div className="flex items-center gap-4">
                                                                        <span className="text-xs text-gray-400">{results.urls.length} URLs found</span>
                                                                    </div>
                                                                </div>

                                                                {/* URLs List */}
                                                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                                                    {results.urls.map((item, urlIndex) => (
                                                                        <div
                                                                            key={urlIndex}
                                                                            className="group/item p-4 rounded-xl bg-linear-to-r from-white/5 to-transparent border border-white/10 hover:border-primary/40 transition-all duration-300"
                                                                        >
                                                                            <div className="flex items-start justify-between gap-4">
                                                                                {/* URL Info */}
                                                                                <div className="flex-1 min-w-0">
                                                                                    {/* Domain Badge */}
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/30">
                                                                                            {extractDomain(item.url)}
                                                                                        </span>
                                                                                        <span className="text-[10px] text-gray-500">#{urlIndex + 1}</span>
                                                                                    </div>
                                                                                    {/* URL Link */}
                                                                                    <a
                                                                                        href={item.url}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="text-sm text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group/link"
                                                                                        title={item.url}
                                                                                    >
                                                                                        <ExternalLink className="w-3.5 h-3.5 shrink-0 text-gray-500 group-hover/link:text-primary" />
                                                                                        <span className="truncate">{formatUrl(item.url)}</span>
                                                                                    </a>
                                                                                </div>
                                                                                {/* Generate Button */}
                                                                                <button
                                                                                    onClick={() => handleGenerateComment(bridge.id, urlIndex, bridge)}
                                                                                    disabled={item.isGenerating}
                                                                                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wide bg-linear-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 text-primary border border-primary/40 hover:border-primary/60 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/5 hover:shadow-primary/10"
                                                                                >
                                                                                    {item.isGenerating ? (
                                                                                        <>
                                                                                            <Loader2 className="w-3 h-3 animate-spin" /> Generating...
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <MessageSquare className="w-3 h-3" /> Generate Comment
                                                                                        </>
                                                                                    )}
                                                                                </button>
                                                                            </div>

                                                                            {item.comment && (
                                                                                <motion.div
                                                                                    initial={{ opacity: 0, height: 0 }}
                                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                                    className="space-y-2"
                                                                                >
                                                                                    <div className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed min-h-[80px]">
                                                                                        <LinkifiedText text={item.comment || ""} />
                                                                                    </div>
                                                                                    <button
                                                                                        onClick={() => handleCopyComment(bridge.id, urlIndex)}
                                                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-primary transition-all group"
                                                                                    >
                                                                                        {item.copied ? (
                                                                                            <>
                                                                                                <Check className="w-3 h-3 text-green-400" />
                                                                                                <span className="text-green-400">Copied!</span>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <Copy className="w-3 h-3" />
                                                                                                <span>Copy to clipboard</span>
                                                                                            </>
                                                                                        )}
                                                                                    </button>
                                                                                </motion.div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </GlassPanel>

            {/* Global Niche Edit Modal */}
            <AnimatePresence>
                {editingNiche && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingNiche(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-black/90 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-primary/20 backdrop-blur-xl"
                        >
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight">Update Niche</h3>
                                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">Targeting Engine Configuration</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingNiche(null)}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all outline-none"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Proposed Niche</label>
                                        <input
                                            type="text"
                                            value={editingNiche.value}
                                            onChange={(e) => setEditingNiche({ ...editingNiche, value: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-lg font-medium"
                                            placeholder="e.g. Health & Fitness"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleUpdateNiche(editingNiche.id, editingNiche.value);
                                                if (e.key === 'Escape') setEditingNiche(null);
                                            }}
                                        />
                                    </div>

                                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-3">
                                        <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Updating the niche will recalibrate the AI targeting engine to find more relevant traffic sources for this specific market.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setEditingNiche(null)}
                                        className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleUpdateNiche(editingNiche.id, editingNiche.value)}
                                        disabled={savingNiche === editingNiche.id}
                                        className="flex-2 bg-primary hover:bg-primary/90 text-black text-sm font-bold py-4 rounded-2xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] outline-none"
                                    >
                                        {savingNiche === editingNiche.id ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </div>
                                        ) : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
