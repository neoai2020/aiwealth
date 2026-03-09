"use client";

import { useParams } from "next/navigation";
import { DFY_PAGES, NICHE_ACCENTS, DESIGN_ANGLES } from "@/lib/dfy-pages";
import { getNicheContent, type NicheContent } from "@/lib/dfy-niche-content";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  Zap,
  Play,
  ChevronRight,
  Quote,
  BarChart3,
  Award,
  Users,
  TrendingUp,
  Heart,
  Target,
  Sparkles,
  ChevronDown,
  AlertTriangle,
  Gift,
  X,
} from "lucide-react";

interface TemplateProps {
  page: (typeof DFY_PAGES)[number];
  accent: { primary: string; gradient: string; ring: string; badge: string };
  nc: NicheContent;
}

export default function DFYLandingPage() {
  const params = useParams();
  const id = Number(params.id);
  const page = DFY_PAGES.find((p) => p.id === id);

  if (!page) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Link href="/accelerator" className="text-cyan-400 underline">Back to Accelerator</Link>
        </div>
      </div>
    );
  }

  const accent = NICHE_ACCENTS[page.niche] || NICHE_ACCENTS["Health & Fitness"];
  const nc = getNicheContent(page.niche);
  const angleIndex = DESIGN_ANGLES.indexOf(page.designAngle);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      {angleIndex === 0 && <TestimonialLed page={page} accent={accent} nc={nc} />}
      {angleIndex === 1 && <StoryDriven page={page} accent={accent} nc={nc} />}
      {angleIndex === 2 && <UrgencyFunnel page={page} accent={accent} nc={nc} />}
      {angleIndex === 3 && <EducationalAuthority page={page} accent={accent} nc={nc} />}
      {angleIndex === 4 && <ComparisonReview page={page} accent={accent} nc={nc} />}
      {angleIndex === 5 && <VideoSalesLetter page={page} accent={accent} nc={nc} />}
      {angleIndex === 6 && <QuizEngagement page={page} accent={accent} nc={nc} />}
      {angleIndex === 7 && <MinimalistProduct page={page} accent={accent} nc={nc} />}
      {angleIndex === 8 && <SocialProofMega page={page} accent={accent} nc={nc} />}
      {angleIndex === 9 && <LongFormSalesLetter page={page} accent={accent} nc={nc} />}
      <PageFooter page={page} />
    </div>
  );
}

/* ─── Shared Components ─── */

function CTAButton({ text, accent }: { text: string; accent: TemplateProps["accent"] }) {
  return (
    <button className={`group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r ${accent.gradient} text-black font-extrabold text-lg uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300`}>
      {text}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

function PageFooter({ page }: { page: (typeof DFY_PAGES)[number] }) {
  return (
    <footer className="border-t border-white/5 bg-black/40 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-3 text-gray-500 text-sm">
          <Shield className="w-4 h-4" />
          <span>Secure Checkout</span>
          <span className="text-white/10">|</span>
          <span>60-Day Money Back Guarantee</span>
          <span className="text-white/10">|</span>
          <span>24/7 Support</span>
        </div>
        <p className="text-gray-600 text-xs">{page.pageName} — {page.niche}</p>
        <Link href="/accelerator" className="inline-block text-xs text-gray-600 hover:text-gray-400 transition-colors underline">&larr; Back to Accelerator</Link>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 1: Testimonial-Led Affiliate Page     */
/* ═══════════════════════════════════════════════ */
function TestimonialLed({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-5`} />
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-36 text-center relative">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
            <span className="ml-3 text-gray-400 text-sm font-medium">{nc.stats[1]?.value} from {nc.stats[0]?.value} users</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">{page.headline}</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">{page.subheadline}</p>
          <CTAButton text={page.ctaText} accent={accent} />
          <p className="text-gray-600 text-sm mt-5 flex items-center justify-center gap-2"><Shield className="w-4 h-4" /> Risk-free — 100% money-back guarantee</p>
        </div>
      </section>

      <section className="border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {nc.stats.map((s, i) => (
              <div key={i}><div className="text-3xl md:text-4xl font-extrabold text-white">{s.value}</div><div className="text-sm text-gray-400 mt-1">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-red-400 text-sm font-bold uppercase tracking-widest mb-4"><AlertTriangle className="w-4 h-4" /> Sound Familiar?</span>
          <h2 className="text-3xl md:text-4xl font-extrabold">The Struggles That Keep You Stuck</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nc.problems.map((p, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-red-500/[0.04] border border-red-500/10">
              <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /><p className="text-gray-300 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-6`}><Sparkles className="w-3.5 h-3.5" /> There&apos;s A Better Way</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">The Solution You&apos;ve Been Searching For</h2>
        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">{nc.solutionIntro}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">What Real People Are Saying</h2>
        <p className="text-gray-500 text-center mb-14">Verified reviews from actual members</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nc.testimonials.map((t, i) => (
            <div key={i} className="flex flex-col p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <Quote className="w-8 h-8 text-white/10 mb-4" />
              <p className="text-gray-300 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className={`mt-5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${accent.gradient} self-start`}><span className="text-xs font-bold text-black">{t.result}</span></div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black text-sm font-bold`}>{t.name.charAt(0)}</div>
                <div><div className="text-sm font-bold text-white">{t.name}</div><div className="text-xs text-gray-500">{t.role}</div></div>
                <div className="ml-auto flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Everything Inside</h2>
        <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">A complete system designed to get you from where you are to where you want to be.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nc.features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center mb-4`}><CheckCircle className="w-6 h-6 text-black" /></div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {nc.howItWorks.map((h, i) => (
            <div key={i} className="text-center">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-extrabold text-xl mx-auto mb-4`}>{i + 1}</div>
              <h3 className="font-bold text-lg mb-2">{h.step}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {nc.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl bg-white/[0.03] border border-white/5">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none"><span className="font-bold text-lg pr-4">{f.q}</span><ChevronDown className="w-5 h-5 text-gray-500 shrink-0 group-open:rotate-180 transition-transform" /></summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" style={{ color: accent.primary }} />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Our Iron-Clad Guarantee</h2>
          <p className="text-gray-400 leading-relaxed max-w-xl mx-auto mb-10">{nc.guarantee}</p>
          <CTAButton text={page.ctaText} accent={accent} />
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-600 text-xs">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Checkout</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Instant Access</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 24/7 Support</span>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 2: Story-Driven Sales Page            */
/* ═══════════════════════════════════════════════ */
function StoryDriven({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.03),transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-36 relative">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}><Heart className="w-3.5 h-3.5" /> A Personal Story</div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">{page.headline}</h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-10">{page.subheadline}</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">I Know Exactly How You Feel</h2>
        <p className="text-gray-500 mb-12 text-lg">Because I&apos;ve been there. These are the thoughts that used to keep me up at night:</p>
        <div className="space-y-6">
          {nc.problems.map((p, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="shrink-0 w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">{i + 1}</div>
              <div><p className="text-gray-300 text-lg leading-relaxed">{p}</p>{i < nc.problems.length - 1 && <div className="w-px h-6 bg-white/10 ml-0 mt-4" />}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex gap-4 items-start">
            <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0 mt-1" />
            <div><h3 className="text-xl font-bold text-amber-400 mb-4">Here&apos;s The Hard Truth</h3><p className="text-gray-300 text-lg leading-relaxed italic">{nc.agitate}</p></div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-6" style={{ color: accent.primary }} />
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Then Everything Changed</h2>
        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">{nc.solutionIntro}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nc.stats.map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-extrabold" style={{ color: accent.primary }}>{s.value}</div><div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">The Simple Path Forward</h2>
        <div className="relative">
          <div className={`absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b ${accent.gradient} opacity-30`} />
          <div className="space-y-10">
            {nc.howItWorks.map((h, i) => (
              <div key={i} className="flex gap-6 items-start relative">
                <div className={`shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-bold text-sm z-10`}>{i + 1}</div>
                <div className="pb-2"><h3 className="text-xl font-bold mb-1">{h.step}</h3><p className="text-gray-400 leading-relaxed">{h.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">What You Get Inside</h2>
        <div className="space-y-8">
          {nc.features.map((f, i) => (
            <div key={i} className={`flex flex-col md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""} gap-6 items-center p-6 rounded-2xl bg-white/[0.02] border border-white/5`}>
              <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center`}><Zap className="w-8 h-8 text-black" /></div>
              <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}><h3 className="text-xl font-bold mb-2">{f.title}</h3><p className="text-gray-400 leading-relaxed">{f.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Stories Like Mine</h2>
        <div className="space-y-6">
          {nc.testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-white/10 shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black text-xs font-bold`}>{t.name.charAt(0)}</div>
                      <div><span className="text-sm font-bold">{t.name}</span><span className="text-gray-600 text-sm"> · {t.role}</span></div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${accent.gradient} text-black`}>{t.result}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Questions I Had Too</h2>
        <div className="space-y-4">
          {nc.faq.map((f, i) => (
            <details key={i} className="group rounded-xl border border-white/5 bg-white/[0.02]">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none"><span className="font-bold pr-4">{f.q}</span><ChevronDown className="w-5 h-5 text-gray-500 shrink-0 group-open:rotate-180 transition-transform" /></summary>
              <div className="px-5 pb-5 text-gray-400 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-white/10 overflow-hidden">
          <div className={`bg-gradient-to-r ${accent.gradient} p-6 text-center`}><Shield className="w-10 h-10 text-black mx-auto mb-2" /><h3 className="text-xl font-extrabold text-black">Zero-Risk Guarantee</h3></div>
          <div className="p-8 md:p-12 text-center bg-white/[0.02]">
            <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-8">{nc.guarantee}</p>
            <CTAButton text={page.ctaText} accent={accent} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 3: Urgency / Scarcity Funnel          */
/* ═══════════════════════════════════════════════ */
function UrgencyFunnel({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-orange-500 py-2.5 text-center">
        <div className="flex items-center justify-center gap-3 text-white font-bold text-sm">
          <Clock className="w-4 h-4 animate-pulse" /><span>ENROLLMENT CLOSING SOON — Limited spots remaining</span>
          <span className="px-2.5 py-1 bg-black/30 rounded-md font-mono text-xs tracking-wider">23:59:47</span>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-36 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse"><Zap className="w-3.5 h-3.5" /> Only A Few Spots Left</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">{page.headline}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">{page.subheadline}</p>
          <CTAButton text={page.ctaText} accent={accent} />
          <p className="text-gray-500 text-sm mt-5"><Shield className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />30-day money-back guarantee — zero risk</p>
        </div>
      </section>

      <section className="border-y border-white/5 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {nc.stats.map((s, i) => (<div key={i}><div className="text-3xl font-extrabold" style={{ color: accent.primary }}>{s.value}</div><div className="text-sm text-gray-500 mt-1">{s.label}</div></div>))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Everything That&apos;s Included</h2>
        <p className="text-gray-500 text-center mb-14 max-w-lg mx-auto">Instant access to the full system — nothing held back.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {nc.features.map((f, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${i === 0 ? `${accent.ring} ring-2 bg-white/[0.04]` : "border-white/5 bg-white/[0.02]"} hover:bg-white/[0.04] transition-colors`}>
              <div className="flex items-center gap-3 mb-3"><CheckCircle className="w-5 h-5" style={{ color: accent.primary }} /><h3 className="font-bold text-lg">{f.title}</h3></div>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              {i === 0 && <span className="inline-block mt-3 px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-500/10 text-red-400 border border-red-500/20">MOST POPULAR</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Members Who Acted Fast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nc.testimonials.slice(0, 4).map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/5">
                <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-gray-300 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black text-xs font-bold`}>{t.name.charAt(0)}</div>
                  <div className="flex-1"><div className="text-sm font-bold">{t.name}</div><div className="text-xs text-gray-500">{t.role}</div></div>
                  <span className="text-xs font-bold text-emerald-400">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Get Started in Minutes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nc.howItWorks.map((h, i) => (
            <div key={i} className="relative text-center">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-extrabold text-lg mx-auto mb-4`}>{i + 1}</div>
              <h3 className="font-bold mb-2">{h.step}</h3><p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
              {i < nc.howItWorks.length - 1 && <ChevronRight className="hidden lg:block absolute top-5 -right-3 w-6 h-6 text-white/10" />}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Got Questions?</h2>
        <div className="space-y-3">
          {nc.faq.map((f, i) => (
            <details key={i} className="group rounded-xl border border-white/5 bg-white/[0.02]">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none"><span className="font-bold pr-4">{f.q}</span><ChevronDown className="w-5 h-5 text-gray-500 shrink-0 group-open:rotate-180 transition-transform" /></summary>
              <div className="px-5 pb-5 text-gray-400 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-widest mb-4"><Gift className="w-5 h-5" /> Exclusive Bonuses</div>
          <h2 className="text-3xl md:text-4xl font-extrabold">Act Now &amp; Get These Free</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {nc.bonuses.map((b, i) => (
            <div key={i} className="p-6 rounded-2xl bg-amber-500/[0.04] border border-amber-500/10 text-center">
              <Gift className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-1">{b.title}</h3>
              <p className="text-amber-400 text-sm font-bold">Value: {b.value}</p>
              <span className="inline-block mt-2 text-xs text-emerald-400 font-bold uppercase">Free Today</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="rounded-3xl overflow-hidden border border-red-500/20">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 text-center"><Clock className="w-8 h-8 text-white mx-auto mb-2" /><h3 className="text-2xl font-extrabold text-white">Don&apos;t Miss Out</h3><p className="text-white/80 text-sm mt-1">This offer won&apos;t last — secure your spot now</p></div>
          <div className="p-10 md:p-16 text-center bg-[#0a0a0f]">
            <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-8">{nc.guarantee}</p>
            <CTAButton text={page.ctaText} accent={accent} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 4: Educational Authority Page         */
/* ═══════════════════════════════════════════════ */
function EducationalAuthority({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(100,100,255,0.04),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-36 relative">
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}><Award className="w-3.5 h-3.5" /> Free Expert Guide</div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight">{page.headline}</h1>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">{page.subheadline}</p>
              <CTAButton text={page.ctaText} accent={accent} />
            </div>
            <div className="shrink-0 hidden md:block"><div className={`w-56 h-72 rounded-2xl bg-gradient-to-br ${accent.gradient} opacity-10 flex items-center justify-center`}><Award className="w-20 h-20 text-white/20" /></div></div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">What You Need to Know</h2>
        <p className="text-gray-500 mb-12 text-lg">Here&apos;s what the experts don&apos;t want you to figure out on your own:</p>
        <div className="space-y-6">
          {page.bodyPoints.map((point, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-extrabold text-sm`}>{i + 1}</div>
                <p className="text-gray-300 text-lg leading-relaxed">{point}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">The Common Pitfalls</h2>
          <div className="space-y-4">
            {nc.problems.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg"><AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /><p className="text-gray-300 leading-relaxed">{p}</p></div>
            ))}
          </div>
          <div className="mt-10 p-6 rounded-xl bg-amber-500/[0.04] border border-amber-500/10"><p className="text-gray-300 leading-relaxed italic">{nc.agitate}</p></div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center mx-auto mb-8`}><Sparkles className="w-10 h-10 text-black" /></div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Want the Complete System?</h2>
        <p className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">{nc.solutionIntro}</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">The Full Curriculum</h2>
        <div className="space-y-4">
          {nc.features.map((f, i) => (
            <div key={i} className="flex items-start gap-5 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all">
              <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center`}><CheckCircle className="w-6 h-6 text-black" /></div>
              <div className="flex-1"><h3 className="text-lg font-bold mb-1">{f.title}</h3><p className="text-gray-400 leading-relaxed">{f.desc}</p></div>
              <span className="hidden md:block shrink-0 text-xs text-emerald-400 font-bold mt-1">INCLUDED</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {nc.stats.map((s, i) => (<div key={i}><div className="text-3xl md:text-4xl font-extrabold" style={{ color: accent.primary }}>{s.value}</div><div className="text-sm text-gray-500 mt-1">{s.label}</div></div>))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nc.testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black text-sm font-bold`}>{t.name.charAt(0)}</div>
                <div><div className="font-bold text-sm">{t.name}</div><div className="text-xs text-gray-500">{t.role}</div></div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400" /><span className="text-sm text-emerald-400 font-bold">{t.result}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Common Questions</h2>
        <div className="space-y-4">
          {nc.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl bg-white/[0.03] border border-white/5">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none"><span className="font-bold text-lg pr-4">{f.q}</span><ChevronDown className="w-5 h-5 text-gray-500 shrink-0 group-open:rotate-180 transition-transform" /></summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 text-center">
          <Shield className="w-14 h-14 mx-auto mb-6" style={{ color: accent.primary }} />
          <h2 className="text-3xl font-extrabold mb-4">Try It Risk-Free</h2>
          <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-10">{nc.guarantee}</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 5: Comparison / Review Page           */
/* ═══════════════════════════════════════════════ */
function ComparisonReview({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(100,100,255,0.04),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-36 text-center relative">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}><BarChart3 className="w-3.5 h-3.5" /> Independent Review · 2026</div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">{page.headline}</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">{page.subheadline}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> Verified Testing</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {nc.stats[0]?.value} Users Surveyed</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Updated March 2026</span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center shrink-0">
              <div className="text-6xl font-extrabold" style={{ color: accent.primary }}>4.9</div>
              <div className="flex gap-0.5 justify-center mt-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
              <p className="text-gray-500 text-sm mt-2">Overall Rating</p>
            </div>
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nc.stats.map((s, i) => (<div key={i} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5"><div className="text-2xl font-extrabold">{s.value}</div><div className="text-xs text-gray-500 mt-1">{s.label}</div></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">The Problem &amp; The Solution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-6"><X className="w-5 h-5 text-red-400" /><h3 className="text-xl font-bold text-red-400">Without This System</h3></div>
            <div className="space-y-3">
              {nc.problems.map((p, i) => (<div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-500/[0.04] border border-red-500/10"><X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /><p className="text-gray-400 text-sm leading-relaxed">{p}</p></div>))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-6"><CheckCircle className="w-5 h-5 text-emerald-400" /><h3 className="text-xl font-bold text-emerald-400">With This System</h3></div>
            <div className="space-y-3">
              {nc.features.slice(0, nc.problems.length).map((f, i) => (<div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><p className="text-gray-400 text-sm leading-relaxed">{f.title} — {f.desc}</p></div>))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Full Feature Breakdown</h2>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className={`grid grid-cols-3 bg-gradient-to-r ${accent.gradient} text-black font-bold text-sm uppercase tracking-wider`}><div className="p-4">Feature</div><div className="p-4 text-center">Others</div><div className="p-4 text-center">This System</div></div>
          {nc.features.map((f, i) => (
            <div key={i} className={`grid grid-cols-3 items-center ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.01]"} border-t border-white/5`}>
              <div className="p-4"><span className="font-bold text-sm">{f.title}</span></div>
              <div className="p-4 text-center"><X className="w-5 h-5 text-red-400/60 mx-auto" /></div>
              <div className="p-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></div>
            </div>
          ))}
          <div className="grid grid-cols-3 items-center bg-white/[0.04] border-t border-white/10">
            <div className="p-4 font-bold">Our Verdict</div><div className="p-4 text-center text-red-400 text-sm font-bold">Limited</div>
            <div className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${accent.gradient} text-black`}>TOP PICK</span></div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Verified User Reviews</h2>
        <p className="text-gray-500 text-center mb-14">Real feedback from real people — unedited</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {nc.testimonials.map((t, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black text-sm font-bold`}>{t.name.charAt(0)}</div>
                <div className="flex-1"><div className="text-sm font-bold">{t.name}</div><div className="text-xs text-gray-500">{t.role}</div></div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs text-emerald-400 font-bold">{t.result}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14">Questions &amp; Answers</h2>
        <div className="space-y-4">
          {nc.faq.map((f, i) => (
            <details key={i} className="group rounded-xl border border-white/5 bg-white/[0.02]">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none"><span className="font-bold pr-4">{f.q}</span><ChevronDown className="w-5 h-5 text-gray-500 shrink-0 group-open:rotate-180 transition-transform" /></summary>
              <div className="px-5 pb-5 text-gray-400 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-white/10 overflow-hidden">
          <div className={`bg-gradient-to-r ${accent.gradient} p-8 text-center`}>
            <Award className="w-12 h-12 text-black mx-auto mb-3" /><h2 className="text-3xl font-extrabold text-black">Our Final Verdict</h2>
            <div className="flex items-center justify-center gap-1 mt-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-black/30 text-black" />)}<span className="ml-2 text-black/80 font-bold">4.9/5 — Highly Recommended</span></div>
          </div>
          <div className="p-10 md:p-16 text-center bg-white/[0.02]">
            <p className="text-gray-400 leading-relaxed max-w-lg mx-auto mb-4">After extensive testing and analysis, this is the system we recommend most. It delivers on its promises, has transparent pricing, and the guarantee removes all risk.</p>
            <p className="text-gray-500 text-sm mb-10">{nc.guarantee}</p>
            <CTAButton text={page.ctaText} accent={accent} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 6: Video Sales Letter Page            */
/* ═══════════════════════════════════════════════ */
function VideoSalesLetter({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <section className="relative py-20 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <p className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${accent.badge} border`}><Play className="w-4 h-4 inline mr-1.5 -mt-0.5" /> Watch This Short Presentation</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">{page.headline}</h1>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">{page.subheadline}</p>
          <div className={`relative aspect-video max-w-3xl mx-auto rounded-2xl bg-black/50 border border-white/10 overflow-hidden shadow-2xl ring-1 ${accent.ring}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg`}><Play className="w-8 h-8 text-black ml-1" /></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"><div className={`h-full w-1/3 bg-gradient-to-r ${accent.gradient} rounded-full`} /></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Duration: 12 minutes — No email required</p>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">What You&apos;ll Discover In This Video</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {page.bodyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-bold text-sm`}>{i + 1}</div>
                <p className="text-gray-300 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-red-950/10 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-8">Sound Familiar?</h2>
          <div className="space-y-4 text-left">
            {nc.problems.map((problem, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/10"><X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /><p className="text-gray-300">{problem}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="w-10 h-10 mx-auto mb-4" style={{ color: accent.primary }} />
          <h2 className="text-3xl font-bold mb-4">The Solution</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">{nc.solutionIntro}</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Everything You Get</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nc.features.map((feature, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <CheckCircle className="w-5 h-5 mb-3" style={{ color: accent.primary }} />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">What Viewers Are Saying</h2>
          <div className="space-y-6">
            {nc.testimonials.map((t, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl border border-white/5">
                <Quote className="w-6 h-6 shrink-0 mt-1" style={{ color: accent.primary }} />
                <div>
                  <p className="text-gray-300 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-3 text-sm font-semibold">{t.name} <span className="text-gray-500 font-normal">— {t.role}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {nc.faq.map((item, i) => (
              <details key={i} className="group p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold list-none">{item.q}<ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" /></summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className={`max-w-3xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-br ${accent.gradient} text-black`}>
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold mb-3">Our Guarantee</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">{nc.guarantee}</p>
          <button className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-black text-white font-extrabold text-lg uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300">
            {page.ctaText}<ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 7: Quiz / Interactive Engagement Page */
/* ═══════════════════════════════════════════════ */
function QuizEngagement({ page, accent, nc }: TemplateProps) {
  const quizIcons = [Target, BarChart3, Heart, Sparkles];
  const quizLabels = ["Your Goals", "Experience Level", "Preferences", "Your Match"];
  return (
    <>
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br ${accent.gradient} opacity-[0.06] blur-3xl`} />
        <div className="relative max-w-3xl mx-auto">
          <p className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${accent.badge} border`}><Zap className="w-4 h-4 inline mr-1 -mt-0.5" /> 60-Second Assessment</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">{page.headline}</h1>
          <p className="text-lg text-gray-400 mb-10">{page.subheadline}</p>
          <CTAButton text="Start the Quiz" accent={accent} />
          <p className="text-sm text-gray-500 mt-4">Takes less than 60 seconds — 100% free</p>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quizIcons.map((Icon, i) => (
              <div key={i} className="relative text-center">
                {i < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />}
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${i === 3 ? `bg-gradient-to-br ${accent.gradient}` : "bg-white/5 border border-white/10"}`}>
                  <Icon className={`w-7 h-7 ${i === 3 ? "text-black" : ""}`} style={i < 3 ? { color: accent.primary } : undefined} />
                </div>
                <p className="font-semibold text-sm">Step {i + 1}</p>
                <p className="text-xs text-gray-500 mt-1">{quizLabels[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: accent.primary }}>Based On Your Results</p>
            <h2 className="text-3xl md:text-4xl font-bold">Here&apos;s What We Recommend</h2>
          </div>
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className={`shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center`}><Award className="w-12 h-12 text-black" /></div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{nc.solutionIntro}</h3>
                <p className="text-gray-400 leading-relaxed mb-4">{page.description}</p>
                <div className="flex flex-wrap gap-2">{nc.features.slice(0, 4).map((f, i) => <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10">{f.title}</span>)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">People Who Score Similarly Often Struggle With…</h2>
          <p className="text-gray-500 mb-10">You&apos;re not alone — these are the top challenges.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {nc.problems.map((problem, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10"><AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /><p className="text-gray-300 text-sm">{problem}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Why This Solution Scores #1</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {nc.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <CheckCircle className="w-6 h-6 shrink-0" style={{ color: accent.primary }} />
                <div><h3 className="font-semibold mb-1">{feature.title}</h3><p className="text-sm text-gray-400">{feature.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Others With Your Profile Loved It</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {nc.testimonials.map((t, i) => (
              <div key={i} className={`p-6 rounded-2xl border border-white/5 bg-white/[0.02] ${i === 0 ? "md:col-span-2" : ""}`}>
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-gray-300 italic leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold">{t.name} <span className="text-gray-500 font-normal">— {t.role}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Common Questions</h2>
          <div className="space-y-3">
            {nc.faq.map((item, i) => (
              <details key={i} className="group p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold list-none">{item.q}<ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" /></summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: accent.primary }} />
          <p className="text-gray-400 text-sm mb-6">{nc.guarantee}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to See Your Results?</h2>
          <p className="text-gray-400 mb-8">Join thousands who&apos;ve already discovered their perfect match.</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 8: Minimalist Product Page            */
/* ═══════════════════════════════════════════════ */
function MinimalistProduct({ page, accent, nc }: TemplateProps) {
  const benefitIcons = [Zap, Shield, TrendingUp];
  return (
    <>
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-8 bg-gradient-to-br ${accent.gradient} flex items-center justify-center`}><Sparkles className="w-8 h-8 text-black" /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5">{page.headline}</h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-10">{page.subheadline}</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {nc.features.slice(0, 3).map((feature, i) => {
            const Icon = benefitIcons[i % benefitIcons.length];
            return (<div key={i}><Icon className="w-8 h-8 mx-auto mb-4" style={{ color: accent.primary }} /><h3 className="text-lg font-bold mb-2">{feature.title}</h3><p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p></div>);
          })}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">The Problem</h2>
          <div className="space-y-3">{nc.problems.map((problem, i) => <p key={i} className="text-gray-400 leading-relaxed">{problem}</p>)}</div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">The Solution</h2>
          <p className="text-gray-400 leading-relaxed">{nc.solutionIntro}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-16">How It Works</h2>
          <div className="space-y-16">
            {nc.howItWorks.slice(0, 3).map((s, i) => (
              <div key={i} className="flex items-start gap-8">
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-black ${i === 0 ? `bg-gradient-to-br ${accent.gradient} text-black` : "bg-white/5 text-gray-400 border border-white/10"}`}>{i + 1}</div>
                <div><h3 className="text-lg font-bold mb-1">{s.step}</h3><p className="text-gray-400 leading-relaxed">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {nc.testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-sm text-gray-300 italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-semibold text-gray-500">{t.name} — {t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">What&apos;s Included</h2>
          <div className="space-y-4">
            {nc.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                <CheckCircle className="w-5 h-5 shrink-0" style={{ color: accent.primary }} />
                <div><span className="font-semibold">{feature.title}</span><span className="text-gray-500 ml-2 text-sm">— {feature.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-8">
            {nc.faq.map((item, i) => (<div key={i}><h3 className="font-semibold mb-2">{item.q}</h3><p className="text-sm text-gray-400 leading-relaxed">{item.a}</p></div>))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-gray-500 text-sm">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> 60-Day Guarantee</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Instant Access</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {nc.stats[0]?.value} Users</span>
          </div>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 9: Social Proof Mega Page             */
/* ═══════════════════════════════════════════════ */
function SocialProofMega({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <section className={`py-6 px-6 bg-gradient-to-r ${accent.gradient}`}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16 text-black">
          {nc.stats.map((s, i) => (<div key={i} className="text-center"><p className="text-3xl font-extrabold">{s.value}</p><p className="text-xs font-semibold uppercase tracking-wider opacity-70">{s.label}</p></div>))}
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}<span className="ml-2 text-sm text-gray-400">Rated {nc.stats[1]?.value} by {nc.stats[0]?.value} users</span></div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">{page.headline}</h1>
          <p className="text-lg text-gray-400 mb-10">{page.subheadline}</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Don&apos;t Just Take Our Word For It</h2>
          <p className="text-gray-500 text-center mb-12">Real reviews from real people</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {nc.testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-bold text-sm`}>{t.name.charAt(0)}</div>
                  <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p></div>
                  <div className="ml-auto flex gap-0.5">{[...Array(5)].map((_, s) => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2 pt-3 border-t border-white/5"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs text-emerald-400 font-bold">{t.result}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Challenges Our Community Conquered</h2>
          <p className="text-gray-500 text-center mb-12">Every success story started with these struggles</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {nc.problems.map((problem, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-emerald-400" /></div>
                <div><p className="text-gray-300 text-sm">{problem}</p><p className="text-xs text-emerald-400 mt-1 font-medium">Solved by thousands of members</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">What Makes It Work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {nc.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-white/5">
                <Zap className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent.primary }} />
                <div><h3 className="font-semibold mb-1">{feature.title}</h3><p className="text-sm text-gray-400">{feature.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Your Path to Success</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {nc.howItWorks.map((s, i) => (
              <div key={i} className="text-center">
                <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${accent.gradient} text-black font-extrabold text-xl`}>{i + 1}</div>
                <h3 className="font-bold mb-2">{s.step}</h3><p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Questions &amp; Answers</h2>
          <div className="space-y-3">
            {nc.faq.map((item, i) => (
              <details key={i} className="group p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold list-none">{item.q}<ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" /></summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"><Shield className="w-4 h-4 text-emerald-400" /> 60-Day Guarantee</span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"><Users className="w-4 h-4" style={{ color: accent.primary }} /> {nc.stats[0]?.value} Community</span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"><Star className="w-4 h-4 text-yellow-400" /> {nc.stats[1]?.value} Rating</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Join the Movement</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Thousands have already transformed their results. You&apos;re next.</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 10: Long-Form Sales Letter            */
/* ═══════════════════════════════════════════════ */
function LongFormSalesLetter({ page, accent, nc }: TemplateProps) {
  return (
    <>
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-8 ${accent.badge} border`}><Clock className="w-4 h-4 inline mr-1.5 -mt-0.5" /> Limited Availability</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">{page.headline}</h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">{page.subheadline}</p>
          <div className="w-16 h-px bg-white/20 mx-auto my-8" />
          <p className="text-gray-500 italic">Read this page carefully — it could change everything.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Let Me Ask You Something…</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            {nc.problems.map((problem, i) => <p key={i} className="pl-6 border-l-2 border-red-500/30">{problem}</p>)}
          </div>
          <p className="text-gray-400 mt-8 text-center">If any of that resonated, keep reading…</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-red-950/10 to-transparent">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Here&apos;s The Hard Truth</h2>
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-red-500/10"><p className="text-gray-300 leading-relaxed text-lg">{nc.agitate}</p></div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-px bg-white/20 mx-auto mb-8" />
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: accent.primary }}>Introducing</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{nc.solutionIntro}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{page.description}</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Here&apos;s Exactly What You Get</h2>
          <p className="text-gray-500 text-center mb-12">Every detail, laid out for you</p>
          <div className="space-y-8">
            {nc.features.map((feature, i) => (
              <div key={i} className={`p-6 rounded-2xl border border-white/5 bg-white/[0.02] ${i === 0 ? `ring-1 ${accent.ring}` : ""}`}>
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${i === 0 ? `bg-gradient-to-br ${accent.gradient} text-black` : "bg-white/5 text-gray-400"}`}>{i + 1}</div>
                  <div><h3 className="text-lg font-bold mb-2">{feature.title}</h3><p className="text-gray-400 leading-relaxed">{feature.desc}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12"><Gift className="w-10 h-10 mx-auto mb-4" style={{ color: accent.primary }} /><h2 className="text-3xl font-bold">But Wait — You Also Get These Bonuses</h2></div>
          <div className="space-y-4">
            {nc.bonuses.map((bonus, i) => (
              <div key={i} className="flex items-center gap-4 p-6 rounded-xl border-2 border-dashed border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent">
                <div className={`shrink-0 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${accent.gradient} text-black`}>Bonus {i + 1}</div>
                <div className="flex-1"><h3 className="font-bold">{bonus.title}</h3></div>
                <span className="text-sm font-bold text-emerald-400">Value: {bonus.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Success Stories</h2>
          <div className="space-y-6">
            {nc.testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <Quote className="w-6 h-6 mb-3" style={{ color: accent.primary }} />
                <p className="text-gray-300 italic leading-relaxed text-lg mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-bold text-xs`}>{t.name.charAt(0)}</div>
                  <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p></div>
                  <span className="ml-auto text-xs text-emerald-400 font-bold">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Getting Started Is Simple</h2>
          <div className="space-y-8">
            {nc.howItWorks.map((s, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br ${accent.gradient} text-black`}>{i + 1}</div>
                  {i < nc.howItWorks.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2" />}
                </div>
                <div className="pb-8"><h3 className="font-bold text-lg mb-1">{s.step}</h3><p className="text-gray-400 leading-relaxed">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {nc.faq.map((item, i) => (
              <details key={i} className="group p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold list-none">{item.q}<ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" /></summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-14 h-14 mx-auto mb-4" style={{ color: accent.primary }} />
          <h2 className="text-2xl font-bold mb-3">Our Guarantee</h2>
          <p className="text-gray-400 leading-relaxed">{nc.guarantee}</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className={`max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-r ${accent.gradient} text-black text-center`}>
          <div className="flex items-center justify-center gap-2 mb-2"><AlertTriangle className="w-5 h-5" /><p className="font-extrabold text-lg uppercase tracking-wider">Don&apos;t Wait</p></div>
          <p className="text-black/70">This offer and bonuses may not be available tomorrow. Act now while everything is still included.</p>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">You&apos;ve Read This Far For A Reason</h2>
          <p className="text-gray-400 mb-8 text-lg">Trust your instinct. Take the leap today.</p>
          <CTAButton text={page.ctaText} accent={accent} />
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Guaranteed</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Instant Access</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> {nc.stats[1]?.value} Stars</span>
          </div>
        </div>
      </section>
    </>
  );
}
