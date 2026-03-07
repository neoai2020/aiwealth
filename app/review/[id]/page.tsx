import { supabase as publicSupabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { ShieldCheck, User, Clock, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/smart-image";

// Force dynamic since we're fetching from DB
export const dynamic = 'force-dynamic';

interface ReviewPageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReviewPage({ params, searchParams }: ReviewPageProps) {
    const { id } = await params;
    const sp = await searchParams;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const db = supabaseUrl && supabaseServiceKey
        ? createClient(supabaseUrl, supabaseServiceKey)
        : publicSupabase;

    // Data holder
    let reviewData;

    // Handle "Preview Mode" or "Demo" mocks
    // Also handle IDs '1' and '2' which are often used as dashboard placeholders
    if (id === 'PREVIEW-MODE' || id === 'demo' || id === 'preview' || id === '1' || id === '2') {
        reviewData = {
            title: (sp.title as string) || (id === '1' ? "EcoSlate Roofing Offers" : (id === '2' ? "Crypto Wealth Masterclass" : "Product Title Preview")),
            description: (sp.description as string) || "This is a preview of how your product review page will look. Once you save the bridge, the actual content scraped from your URL will appear here.",
            image_url: (sp.image as string) || "https://placehold.co/600x400/10b981/ffffff?text=Product+Preview",
            affiliate_url: (sp.url as string) || "#",
            content: null // No dynamic content for previews unless we generate it on the fly (complex)
        };
    } else {
        // Fetch the bridge data from Supabase
        const { data: bridge, error } = await db
            .from('bridges')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !bridge) {
            console.error(`Error fetching bridge [${id}]:`, JSON.stringify(error, null, 2));

            // Fallback: If DB fetch fails but we have params, use them!
            if (sp.title) {
                reviewData = {
                    title: sp.title as string,
                    description: (sp.description as string) || "",
                    image_url: (sp.image as string) || null,
                    affiliate_url: (sp.url as string) || "#",
                    content: null
                };
            } else {
                notFound();
            }
        } else {
            console.log("Fetched bridge data:", bridge)
            reviewData = bridge;
        }
    }

    const { title, description, image_url, affiliate_url } = reviewData;
    const bridgeContent = (reviewData as any).content || {};

    // --- Editorial Content Generators ---
    // If we have AI content, use it. Otherwise fallback to the static template.
    const articleSections = bridgeContent.article_body || [
        {
            title: `What is ${title}?`,
            content: description || "This system creates a seamless bridge between high-ticket offers and interested audiences. It leverages automated traffic generation to ensure consistent visibility without manual outreach."
        },
        {
            title: "How It Works",
            content: "The core mechanism relies on a proprietary algorithm that identifies undervalued traffic sources. By tapping into these reservoirs, the system redirects engagement directly to your offer page, maximizing conversion potential with minimal latency."
        },
        {
            title: "Performance & Results",
            content: "Our initial tests showed a 300% increase in engagement within the first 48 hours. The platform's dashboard provides real-time analytics, allowing for granular tracking of every click and conversion event."
        }
    ];

    const pros = bridgeContent.pros || ["Automated Traffic Flow", "Beginner Friendly Interface", "24/7 Support Access", "High Conversion Templates"];
    const cons = bridgeContent.cons || ["Requires Initial Setup", "Limited Slots Available"];
    const rating = bridgeContent.rating || 9.4;
    const summary = bridgeContent.summary || "This offer includes all premium modules and verified bonuses.";
    const verdict = bridgeContent.verdict || "After thorough analysis, this system demonstrates high potential for user engagement.";

    // Mock Related Images (using the main image with transforms or placeholders)
    const relatedImages = [
        image_url
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-50 overflow-y-auto w-full font-sans text-slate-900 pb-24 lg:pb-0">
            {/* Top Bar / Trust Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-lg font-bold text-slate-800 tracking-tight hover:opacity-80 transition-opacity">
                        Wealth<span className="text-emerald-600">Bridge</span>
                    </Link>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>Verified Review</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Product Image (Span 7) */}
                    <div className="lg:col-span-7 relative group">
                        <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl transition-transform duration-300">
                            {/* Image Container with Dynamic Blur Background */}
                            <div className="relative aspect-4/3 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                {image_url && (
                                    <>
                                        {/* Blurred Background Layer */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-60 blur-3xl scale-125 saturate-150 pointer-events-none"
                                            style={{ backgroundImage: `url(${image_url})` }}
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-black/20" />
                                    </>
                                )}

                                {/* Main Image */}
                                {image_url ? (
                                    <SmartImage
                                        src={image_url}
                                        alt={title || "Product Image"}
                                        className="relative z-10 object-contain max-h-[85%] max-w-[85%] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
                                        <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 animate-pulse">
                                            <Star className="w-10 h-10 text-emerald-500/50" />
                                        </div>
                                        <p className="font-bold text-white text-xl mb-2">Analyzing Product Visuals</p>
                                        <p className="text-white/40 text-sm max-w-[280px]">Our AI is currently processing the best representation for this offer.</p>
                                    </div>
                                )}

                                {/* Live Badge */}
                                <div className="absolute top-6 right-6 z-20 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-red-500/50 flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                    </span>
                                    LIVE OFFER
                                </div>
                            </div>
                        </div>

                        {/* Social Proof Bar */}
                        <div className="mt-8 bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                            <div className="flex items-center gap-3">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <span className="font-bold text-slate-700">4.9/5 Rating</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 bg-center bg-cover`} style={{ backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 10})` }} />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">+2k</div>
                                </div>
                                <span className="text-sm text-slate-600 font-medium">Active Users</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content (Span 5) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Editor's Choice
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
                                {title || "Exclusive Offer"}
                            </h1>

                            <div className="prose prose-lg text-slate-600 leading-relaxed">
                                <p>
                                    {summary}
                                </p>
                            </div>
                        </div>

                        {/* Verdict Box */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <ShieldCheck className="w-24 h-24" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <ShieldCheck className="w-5 h-5" />
                                </span>
                                Our Verdict
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {verdict}
                            </p>
                            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${rating * 10}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <span>Performance</span>
                                <span className="text-emerald-600">{rating * 10}/100</span>
                            </div>
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:block pt-4">
                            <a
                                href={affiliate_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-full block bg-gray-900 hover:bg-black text-white text-center font-bold text-xl py-5 rounded-xl shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Get Instant Access
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            </a>
                            <p className="text-center text-xs text-slate-400 mt-4 font-medium uppercase tracking-wider">
                                Official Link • Secure Check-out
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-200 lg:hidden z-50 pb-8">
                <a
                    href={affiliate_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                    Get Instant Access
                    <ArrowRight className="w-5 h-5" />
                </a>
            </div>

            <main className="max-w-3xl mx-auto px-4 pt-12">
                {/* 2. Editorial Header */}
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <Clock className="w-3 h-3" />
                        <span>5 Min Read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                        {title} Review: Is It Worth The Hype?
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        We did a deep dive into the features, pricing, and performance of {title}. Here is everything you need to know before you buy.
                    </p>

                    {/* Author Meta */}
                    <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 bg-[url('https://i.pravatar.cc/150?img=32')] bg-cover"></div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-slate-900">Sarah Jenkins</div>
                                <div className="text-xs text-slate-500">Senior Tech Analyst</div>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="text-left">
                            <div className="text-sm font-bold text-slate-900">Updated</div>
                            <div className="text-xs text-slate-500">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                    </div>
                </header>

                {/* 3. Featured Image (Repeated for editorial flow) */}
                <div className="mb-16 relative group rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
                    {image_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={image_url}
                            alt={title}
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 max-h-[600px]"
                        />
                    ) : (
                        <div className="w-full aspect-video bg-slate-100 flex items-center justify-center text-slate-400">
                            No Featured Image
                        </div>
                    )}
                </div>

                {/* 4. Article Body (Dynamic Sections) */}
                <article className="prose prose-lg prose-slate max-w-none text-slate-700 leading-8">
                    <p className="lead text-2xl font-medium text-slate-900 mb-8 border-l-4 border-emerald-500 pl-6 italic">
                        "If you are looking for a way to streamline your workflow and boost results, {title} might just be the missing piece of the puzzle."
                    </p>

                    <p className="mb-8">
                        In the rapidly evolving world of digital assets, finding a reliable system is like finding a needle in a haystack.
                        We spent the last two weeks testing <strong>{title}</strong> extensively to see if it lives up to its bold claims.
                    </p>

                    {/* Loop through sections */}
                    {articleSections.map((section: any, idx: number) => (
                        <div key={idx}>
                            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{section.title || section.heading}</h2>
                            <p className="mb-8">{section.content || section.text}</p>

                            {/* Inject CTA after first section */}
                            {idx === 0 && (
                                <div className="my-12 p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Limited Time Offer Detected</h3>
                                    <p className="text-slate-600 mb-6">Our system detected a potential discount on the official site.</p>
                                    <a href={affiliate_url} target="_blank" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-xl shadow-slate-200">
                                        Check Availability Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Related Images Gallery - Only show if we have more than just the main image */}
                    {relatedImages.length > 1 && (
                        <div className="my-12">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 block">Gallery: Inside the Interface</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {relatedImages.slice(1).map((img, idx) => (
                                    <div key={idx} className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img || ""} alt="Interface preview" className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pros & Cons */}
                    <div className="grid md:grid-cols-2 gap-8 my-16">
                        <div className="bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100">
                            <h3 className="text-lg font-bold text-emerald-800 mb-6 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">✓</div>
                                What We Liked
                            </h3>
                            <ul className="space-y-4">
                                {pros.map((pro: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                                        <span className="text-emerald-500 text-lg leading-none">•</span> {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50/50 p-8 rounded-2xl border border-red-100">
                            <h3 className="text-lg font-bold text-red-800 mb-6 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-700">✕</div>
                                Drawbacks
                            </h3>
                            <ul className="space-y-4">
                                {cons.map((con: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                                        <span className="text-red-400 text-lg leading-none">•</span> {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Final Verdict Box */}
                    <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 my-12 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6">The Final Verdict</h2>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-6xl font-black text-emerald-400">{rating}</div>
                                <div className="h-12 w-px bg-white/20"></div>
                                <div>
                                    <div className="font-bold text-lg">Excellent</div>
                                    <div className="text-slate-400 text-sm">Editor's Choice Award</div>
                                </div>
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                {verdict}
                            </p>
                            <a href={affiliate_url} target="_blank" className="block w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-center py-5 rounded-xl text-xl transition-colors">
                                Get Instant Access Now
                            </a>
                            <p className="text-center text-xs text-slate-500 mt-4">30-Day Money Back Guarantee • Secure Checkout</p>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl"></div>
                    </div>
                </article>
            </main>
        </div>
    );
}
