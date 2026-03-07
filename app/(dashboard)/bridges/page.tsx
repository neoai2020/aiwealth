"use client";

import { BridgeCard } from "@/components/bridges/bridge-card";
import { NeonButton } from "@/components/ui/neon-button";
import { ContextualDocs } from "@/components/ui/contextual-docs";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

interface Bridge {
    id: string;
    title: string;
    affiliate_url: string;
    status: "indexing" | "live" | "optimizing" | "paused";
    traffic: string;
    earnings: string;
}

export default function BridgesPage() {
    const [bridges, setBridges] = useState<Bridge[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        async function fetchBridges() {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('bridges')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching bridges:', error);
                    // Use mock data if table doesn't exist yet
                    setBridges([
                        {
                            id: "1",
                            title: "EcoSlate Roofing Offers",
                            affiliate_url: "ecoslate.com/ref/8821",
                            status: "live",
                            traffic: "2.4k/day",
                            earnings: "$482.50"
                        },
                        {
                            id: "2",
                            title: "Crypto Wealth Masterclass",
                            affiliate_url: "cryptomastery.io/join",
                            status: "indexing",
                            traffic: "142/day",
                            earnings: "$0.00"
                        },
                    ]);
                } else {
                    setBridges(data || []);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBridges();
    }, [user]);

    return (
        <div className="space-y-8 pb-20">
            <ContextualDocs title="Managing Your Bridges" variant="tips">
                <p>Each card below represents a synced affiliate link. Here&apos;s what you can do:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Analytics:</strong> Click to see detailed traffic and conversion data</li>
                    <li><strong>Optimize:</strong> Let the system improve your page performance</li>
                    <li><strong>New Asset:</strong> Use the button above to sync a new link</li>
                </ul>
            </ContextualDocs>

            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white font-(family-name:--font-display) tracking-tighter">
                        My Bridges
                    </h1>
                    <p className="text-gray-400">Manage and monitor your active income assets.</p>
                </div>
                <Link href="/sync">
                    <NeonButton variant="primary" glow className="px-6">
                        <Plus className="w-5 h-5 mr-2" /> New Asset
                    </NeonButton>
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : bridges.length === 0 ? (
                <GlassPanel className="p-12 text-center">
                    <div className="max-w-md mx-auto space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <Plus className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white">No Bridges Yet</h3>
                        <p className="text-gray-400">
                            Create your first bridge to start generating traffic and earnings.
                        </p>
                        <Link href="/sync">
                            <NeonButton variant="primary" glow className="mt-4">
                                Create Your First Bridge
                            </NeonButton>
                        </Link>
                    </div>
                </GlassPanel>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bridges.map((bridge) => (
                        <BridgeCard
                            key={bridge.id}
                            id={bridge.id}
                            title={bridge.title}
                            url={bridge.affiliate_url}
                            status={bridge.status}
                            traffic={bridge.traffic}
                            earnings={bridge.earnings}
                        />
                    ))}

                    {/* Add New Card Placeholder */}
                    <Link href="/sync" className="group block h-full min-h-[300px]">
                        <div className="h-full rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-primary/50 group-hover:scale-[1.01] group-hover:shadow-[0_0_30px_rgba(0,255,170,0.1)]">
                            <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Plus className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-gray-400 group-hover:text-white transition-colors font-(family-name:--font-display)">
                                    Deploy New Bridge
                                </h3>
                                <p className="text-sm text-gray-600">Sync a new affiliate URL</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}
