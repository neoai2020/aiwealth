"use client";

import { useParams } from "next/navigation";
import { DFY_PAGES, NICHE_ACCENTS, DESIGN_ANGLES } from "@/lib/dfy-pages";
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
} from "lucide-react";

export default function DFYLandingPage() {
  const params = useParams();
  const id = Number(params.id);
  const page = DFY_PAGES.find((p) => p.id === id);

  if (!page) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Link href="/accelerator" className="text-cyan-400 underline">
            Back to Accelerator
          </Link>
        </div>
      </div>
    );
  }

  const accent = NICHE_ACCENTS[page.niche] || NICHE_ACCENTS["Health & Fitness"];
  const angleIndex = DESIGN_ANGLES.indexOf(page.designAngle);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      {angleIndex === 0 && <TestimonialDriven page={page} accent={accent} />}
      {angleIndex === 1 && <ProblemSolution page={page} accent={accent} />}
      {angleIndex === 2 && <UrgencyScarcity page={page} accent={accent} />}
      {angleIndex === 3 && <EducationalLeadIn page={page} accent={accent} />}
      {angleIndex === 4 && <ComparisonAuthority page={page} accent={accent} />}
      {angleIndex === 5 && <VideoSalesLetter page={page} accent={accent} />}
      {angleIndex === 6 && <QuizStyle page={page} accent={accent} />}
      {angleIndex === 7 && <MinimalistDirect page={page} accent={accent} />}
      {angleIndex === 8 && <SocialProofWall page={page} accent={accent} />}
      {angleIndex === 9 && <BenefitStacking page={page} accent={accent} />}
      <PageFooter page={page} />
    </div>
  );
}

/* ─── Shared Types ─── */
interface TemplateProps {
  page: (typeof DFY_PAGES)[number];
  accent: { primary: string; gradient: string; ring: string; badge: string };
}

/* ─── Shared CTA Button ─── */
function CTAButton({ text, accent }: { text: string; accent: TemplateProps["accent"] }) {
  return (
    <button
      className={`group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r ${accent.gradient} text-black font-extrabold text-lg uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300`}
    >
      {text}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${accent.gradient} opacity-30 blur-xl -z-10`}
      />
    </button>
  );
}

/* ─── Shared Footer ─── */
function PageFooter({ page }: { page: (typeof DFY_PAGES)[number] }) {
  return (
    <footer className="border-t border-white/5 bg-black/40 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <div className="flex items-center justify-center gap-3 text-gray-500 text-sm">
          <Shield className="w-4 h-4" />
          <span>Secure Checkout</span>
          <span className="text-white/10">|</span>
          <span>30-Day Money Back Guarantee</span>
          <span className="text-white/10">|</span>
          <span>24/7 Support</span>
        </div>
        <p className="text-gray-600 text-xs">
          {page.pageName} — {page.niche} &bull; AI Wealth OS
        </p>
        <Link
          href="/accelerator"
          className="inline-block text-xs text-gray-600 hover:text-gray-400 transition-colors underline"
        >
          &larr; Back to Accelerator
        </Link>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 1: Testimonial-Driven Landing Page    */
/* ═══════════════════════════════════════════════ */
function TestimonialDriven({ page, accent }: TemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-5`} />
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center relative">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-gray-400 text-sm">4.9/5 from 10,000+ reviews</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            {page.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            {page.subheadline}
          </p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>

      {/* Testimonial Cards */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {page.bodyPoints.map((point, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
            >
              <Quote className="w-8 h-8 text-white/10 mb-4" />
              <p className="text-gray-300 text-lg leading-relaxed mb-4">{point}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 2: Problem-Solution Story Page        */
/* ═══════════════════════════════════════════════ */
function ProblemSolution({ page, accent }: TemplateProps) {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}>
          <Heart className="w-3.5 h-3.5" /> Personal Story
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8 tracking-tight">
          {page.headline}
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed mb-16">{page.subheadline}</p>

        <div className="space-y-8">
          {page.bodyPoints.map((point, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div
                className={`shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-bold text-sm`}
              >
                {i + 1}
              </div>
              <div>
                <p className="text-gray-300 text-lg leading-relaxed">{point}</p>
                {i < page.bodyPoints.length - 1 && (
                  <div className="w-px h-8 bg-white/10 ml-5 mt-4" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center">
          <p className="text-gray-400 mb-6">Ready to write your own success story?</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 3: Urgency & Scarcity Funnel          */
/* ═══════════════════════════════════════════════ */
function UrgencyScarcity({ page, accent }: TemplateProps) {
  return (
    <>
      {/* Sticky Urgency Bar */}
      <div className={`sticky top-0 z-50 bg-gradient-to-r ${accent.gradient} py-3 text-center`}>
        <div className="flex items-center justify-center gap-3 text-black font-bold text-sm">
          <Clock className="w-4 h-4" />
          <span>LIMITED TIME OFFER — Enrollment closes soon</span>
          <span className="px-2 py-0.5 bg-black/20 rounded-md font-mono text-xs">23:59:47</span>
        </div>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Zap className="w-3.5 h-3.5" /> Limited Availability
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            {page.headline}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">{page.subheadline}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {page.bodyPoints.map((point, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">{point}</p>
              </div>
            ))}
          </div>

          <CTAButton text={page.ctaText} accent={accent} />
          <p className="text-gray-500 text-sm mt-4">
            <Shield className="w-3.5 h-3.5 inline mr-1" />
            30-day money-back guarantee. No risk.
          </p>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 4: Educational Lead-In Page           */
/* ═══════════════════════════════════════════════ */
function EducationalLeadIn({ page, accent }: TemplateProps) {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}>
          <Award className="w-3.5 h-3.5" /> Educational Guide
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
          {page.headline}
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed mb-16">{page.subheadline}</p>

        <div className="space-y-6 mb-16">
          {page.bodyPoints.map((point, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${accent.gradient} flex items-center justify-center`}>
                  <ChevronRight className="w-4 h-4 text-black" />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{point}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`p-8 rounded-2xl border-2 border-dashed ${accent.ring} bg-white/[0.02] text-center`}>
          <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: accent.primary }} />
          <h3 className="text-xl font-bold mb-2">Ready to go deeper?</h3>
          <p className="text-gray-400 mb-6">
            Get the complete guide with step-by-step instructions, tools, and support.
          </p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 5: Comparison & Authority Page        */
/* ═══════════════════════════════════════════════ */
function ComparisonAuthority({ page, accent }: TemplateProps) {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}>
            <BarChart3 className="w-3.5 h-3.5" /> Independent Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            {page.headline}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{page.subheadline}</p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden mb-16">
          <div className={`bg-gradient-to-r ${accent.gradient} p-4 text-center`}>
            <span className="text-black font-bold text-sm uppercase tracking-wider">
              Key Findings
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {page.bodyPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-4 p-5 hover:bg-white/[0.02] transition-colors">
                <div className={`shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black font-bold text-sm`}>
                  {i + 1}
                </div>
                <p className="text-gray-300">{point}</p>
                {i === page.bodyPoints.length - 1 && (
                  <div className="ml-auto shrink-0">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                      TOP PICK
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 6: Video Sales Letter Page            */
/* ═══════════════════════════════════════════════ */
function VideoSalesLetter({ page, accent }: TemplateProps) {
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
          {page.headline}
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-12">{page.subheadline}</p>

        {/* Video Placeholder */}
        <div className={`relative aspect-video rounded-2xl bg-black/60 border border-white/10 ${accent.ring} ring-1 overflow-hidden mb-12`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform`}>
              <Play className="w-8 h-8 text-black ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <div className={`h-1 flex-1 rounded-full bg-white/10`}>
              <div className={`h-1 rounded-full bg-gradient-to-r ${accent.gradient} w-0`} />
            </div>
            <span className="text-gray-500 text-xs font-mono">7:23</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {page.bodyPoints.map((point, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <CheckCircle className="w-5 h-5 mx-auto mb-2" style={{ color: accent.primary }} />
              <p className="text-sm text-gray-400">{point}</p>
            </div>
          ))}
        </div>

        <CTAButton text={page.ctaText} accent={accent} />
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 7: Quiz-Style Engagement Page         */
/* ═══════════════════════════════════════════════ */
function QuizStyle({ page, accent }: TemplateProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,100,255,0.05),transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center relative">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}>
            <Target className="w-3.5 h-3.5" /> Free Assessment
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            {page.headline}
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto mb-16">{page.subheadline}</p>

          {/* Quiz Preview */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 text-left space-y-6 mb-12">
            {page.bodyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`shrink-0 w-8 h-8 rounded-full border-2 ${i === 0 ? `border-current bg-gradient-to-br ${accent.gradient}` : "border-white/20"} flex items-center justify-center`}>
                  {i === 0 ? (
                    <CheckCircle className="w-4 h-4 text-black" />
                  ) : (
                    <span className="text-xs text-gray-500">{i + 1}</span>
                  )}
                </div>
                <p className={`text-lg ${i === 0 ? "text-white font-medium" : "text-gray-500"}`}>
                  {point}
                </p>
              </div>
            ))}
          </div>

          <CTAButton text={page.ctaText} accent={accent} />
          <p className="text-gray-600 text-sm mt-4">Takes less than 2 minutes. 100% free.</p>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 8: Minimalist Direct-Offer Page       */
/* ═══════════════════════════════════════════════ */
function MinimalistDirect({ page, accent }: TemplateProps) {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl mx-auto text-center">
          <div
            className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${accent.gradient} mx-auto mb-10 flex items-center justify-center shadow-2xl`}
          >
            <Zap className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            {page.headline}
          </h1>
          <p className="text-lg text-gray-400 mb-12">{page.subheadline}</p>

          <div className="space-y-4 mb-12 text-left max-w-sm mx-auto">
            {page.bodyPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" style={{ color: accent.primary }} />
                <span className="text-gray-300">{point}</span>
              </div>
            ))}
          </div>

          <CTAButton text={page.ctaText} accent={accent} />

          <div className="flex items-center justify-center gap-6 mt-8 text-gray-600 text-xs">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Secure
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Instant Access
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Guaranteed
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 9: Social Proof Wall Page             */
/* ═══════════════════════════════════════════════ */
function SocialProofWall({ page, accent }: TemplateProps) {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users className="w-6 h-6" style={{ color: accent.primary }} />
            <span className="text-gray-400 text-sm font-medium">Community Results</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            {page.headline}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{page.subheadline}</p>
        </div>

        {/* Results Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {page.bodyPoints.map((point, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-black text-xs font-bold`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Verified Member</div>
                  <div className="text-xs text-gray-600">Active User</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════ */
/* Template 10: Benefit-Stacking Long-Form Page   */
/* ═══════════════════════════════════════════════ */
function BenefitStacking({ page, accent }: TemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.gradient} opacity-[0.03]`} />
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center relative">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${accent.badge} border text-xs font-bold uppercase tracking-widest mb-8`}>
            <Sparkles className="w-3.5 h-3.5" /> Complete System
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            {page.headline}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">{page.subheadline}</p>
          <CTAButton text={page.ctaText} accent={accent} />
        </div>
      </section>

      {/* Benefit Stack */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Everything You Get:</h2>
        <div className="space-y-4">
          {page.bodyPoints.map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
            >
              <div
                className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg`}
              >
                <CheckCircle className="w-5 h-5 text-black" />
              </div>
              <p className="text-gray-300 text-lg">{point}</p>
              <span className="ml-auto text-xs text-emerald-400 font-bold shrink-0">INCLUDED</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands who already have access to the complete system.
          </p>
          <CTAButton text={page.ctaText} accent={accent} />
          <div className="flex items-center justify-center gap-6 mt-6 text-gray-600 text-xs">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> 30-Day Guarantee
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Instant Access
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> 24/7 Support
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
