import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const getDomain = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return url;
    }
};

const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// --- STATIC FALLBACK DATABASE (FAIL-SAFE) ---
// High-authority targets for common niches that ALWAYS accept comments or discussion.
const FALLBACK_DATABASE: Record<string, string[]> = {
    wealth: [
        'https://www.entrepreneur.com/topic/wealth',
        'https://www.forbes.com/wealth/',
        'https://www.moneyunder30.com/investing',
        'https://www.ramseysolutions.com/wealth',
        'https://www.finviz.com/news.ashx',
        'https://wealthyhabit.com/blog/',
        'https://www.thepennyhoarder.com/',
        'https://www.wealthsimple.com/en-ca/magazine',
        'https://www.mrmoneymustache.com/blog/',
        'https://financialmentor.com/blog',
        'https://www.physicianonfire.com/',
        'https://earlyretirementextreme.com/',
        'https://www.getrichslowly.org/'
    ],
    tech: [
        'https://techcrunch.com/',
        'https://www.theverge.com/',
        'https://mashable.com/',
        'https://www.wired.com/',
        'https://gizmodo.com/',
        'https://www.engadget.com/',
        'https://www.digitaltrends.com/',
        'https://venturereat.com/',
        'https://www.zdnet.com/',
        'https://www.cnet.com/tech/'
    ],
    business: [
        'https://www.fastcompany.com/',
        'https://www.inc.com/',
        'https://hbr.org/',
        'https://www.businessinsider.com/',
        'https://vocal.media/journal',
        'https://www.sitepoint.com/blog/',
        'https://wp-rocket.me/blog/',
        'https://blog.hubspot.com/marketing'
    ],
    success: [
        'https://www.success.com/',
        'https://addicted2success.com/',
        'https://www.pickthebrain.com/blog/',
        'https://tinybuddha.com/',
        'https://zenhabits.net/',
        'https://www.lifehack.org/'
    ]
};

// Global junk configurations
// REMOVED: Reddit, Quora, and Medium from junk as they are great for manual traffic!
const JUNK_DOMAINS: string[] = [
    'google.com', 'gstatic.com', 'facebook.com', 'twitter.com', 'instagram.com',
    'pinterest.com', 'linkedin.com', 'x.com',
    'amazon.com', 'microsoft.com', 'apple.com', 'w3.org', 'schema.org',
    'doubleclick.net', 'googleadservices.com', 'shutterstock.com'
];

const JUNK_PATTERNS = ['wp-content/uploads', 'wp-json', 'xmlrpc', '/products/', '/search?'];
const JUNK_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.pdf', '.zip', '.mp4', '.mp3', '.webp', '.css', '.js'];

async function getNicheKeyword(productName: string, rapidApiKey: string): Promise<string> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision.p.rapidapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision.p.rapidapi.com'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "Extract the BROAD TOPIC of this product. Example: 'AI Wealth Strategy' -> 'Wealth'. ONLY 1 WORD."
                    },
                    {
                        role: "user",
                        content: productName
                    }
                ],
                model: "gpt-4o",
                max_tokens: 5
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim().toLowerCase().replace(/[".]/g, '') || "wealth";
    } catch (error) {
        return "wealth";
    }
}

export async function POST(request: NextRequest) {
    console.log('[TRAFFIC_ENGINE] Starting indestructible search...');
    try {
        const { keywords, niche: passedNiche } = await request.json();
        const apiKey = process.env.SCRAPER_API_KEY;
        const rapidApiKey = process.env.RAPIDAPI_KEY;

        // Ensure we have an API Key
        if (!apiKey) {
            console.error('[TRAFFIC_ENGINE] API KEY missing');
            return NextResponse.json({ success: false, error: 'Config missing' }, { status: 500 });
        }

        // 1. Clean Niche Keyword
        let niche: string = (passedNiche || "wealth").toLowerCase();
        if (!passedNiche && rapidApiKey && keywords) {
            niche = await getNicheKeyword(keywords, rapidApiKey);
        }

        console.log(`[TRAFFIC_ENGINE] Targeted Niche: ${niche}`);

        // 2. Build Intelligent Queries
        const queries = [
            `"${niche}" blog + "leave a comment"`,
            `"${niche}" discussion board`,
            `"${niche}" forum "post reply"`,
            `"${niche}" site:reddit.com`,
            `"${niche}" site:quora.com`,
            `how to make money with ${niche}`
        ];

        let results: string[] = [];
        const seenDomains = new Set<string>();

        // 3. Execution Phase (Looping through multiple strategies)
        for (const query of queries) {
            if (results.length >= 10) break;

            console.log(`[TRAFFIC_ENGINE] Phase: Testing Query -> ${query}`);
            try {
                // Try ScraperAPI (Structured first, as it is cheaper and cleaner)
                const url = `https://api.scraperapi.com/structured/google/search?api_key=${apiKey}&query=${encodeURIComponent(query)}&country_code=us&num=30`;
                const res = await fetch(url, { signal: AbortSignal.timeout(15000) });

                if (res.ok) {
                    const data = await res.json();
                    const organic = data.organic_results || [];
                    const matches = organic.map((r: any) => r.link || r.url).filter((u: any) => typeof u === 'string');

                    for (const u of matches) {
                        const lowU = u.toLowerCase();
                        if (JUNK_DOMAINS.some(d => lowU.includes(d))) continue;
                        if (JUNK_PATTERNS.some(p => lowU.includes(p))) continue;
                        if (JUNK_EXTENSIONS.some(ext => lowU.endsWith(ext))) continue;

                        const domain = getDomain(u);
                        if (!seenDomains.has(domain)) {
                            results.push(u);
                            seenDomains.add(domain);
                        }
                    }
                }
            } catch (err) {
                console.warn(`[TRAFFIC_ENGINE] Query failed, skipping: ${query}`);
            }
        }

        // 4. Fallback Injection (THE "TANK" STRATEGY)
        // If results are low, we inject high-quality static targets from our database.
        if (results.length < 10) {
            console.log('[TRAFFIC_ENGINE] Low results. Injecting Fail-Safe Database...');
            const failSafeNiche = FALLBACK_DATABASE[niche] ? niche : 'wealth';
            const targets = FALLBACK_DATABASE[failSafeNiche] || FALLBACK_DATABASE['wealth'];

            for (const t of targets) {
                const domain = getDomain(t);
                if (!seenDomains.has(domain)) {
                    results.push(t);
                    seenDomains.add(domain);
                }
                if (results.length >= 15) break;
            }
        }

        // 5. Final Safety: Return results no matter what
        console.log(`[TRAFFIC_ENGINE] Search completed. Count: ${results.length}`);

        const shuffled = shuffleArray(results);
        const finalResults = shuffled.slice(0, 15);

        return NextResponse.json({
            success: true,
            urls: finalResults,
            niche: niche,
            count: finalResults.length
        });

    } catch (error: any) {
        console.error('[TRAFFIC_ENGINE] Critical Error:', error);
        // Even on error, return something if possible (Very last resort)
        return NextResponse.json({
            success: true,
            urls: FALLBACK_DATABASE['wealth'].slice(0, 8),
            niche: 'wealth',
            note: 'Safe-mode active'
        });
    }
}
