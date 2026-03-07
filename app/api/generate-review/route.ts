import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const { url, niche } = await request.json();

        if (!url) {
            return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
        }

        const rapidApiKey = process.env.RAPIDAPI_KEY;
        const scraperApiKey = process.env.SCRAPER_API_KEY;

        if (!rapidApiKey) {
            console.error('RAPIDAPI_KEY missing');
            return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
        }

        // 1. Scrape the content (simplified reuse of logic)
        let pageContent = "";
        let pageTitle = "";

        if (scraperApiKey) {
            try {
                const scraperUrl = `http://api.scraperapi.com/?api_key=${scraperApiKey}&url=${encodeURIComponent(url)}`;
                const response = await fetch(scraperUrl);
                if (response.ok) {
                    const html = await response.text();
                    pageTitle = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || "";
                    // Simple text extraction
                    pageContent = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .substring(0, 3000); // Limit context for token usage
                }
            } catch (e) {
                console.error("Scraping failed:", e);
            }
        }

        // 2. Generate Review using LLM
        const prompt = `
        You are a senior tech editor at a premium review site.
        Write a comprehensive, professional review for this product/url: ${url}
        
        Context Title: ${pageTitle}
        Context extracted from page: ${pageContent}
        
        Your Goal: Write a convincing, balanced, and high-quality review article that encourages the user to click the affiliate link.
        
        OUTPUT FORMAT: strictly valid JSON.
        {
            "summary": "2-3 sentences hook summary.",
            "product_niche": "Return ONLY the broad market category/niche (1-2 words in English). Example: 'Homesteading', 'Weight Loss', 'Dog Training'.",
            "article_body": [
                { "heading": "What is [Product]?", "content": "Detailed paragraphs explaining the core proposition." },
                { "heading": "Key Features Breakdown", "content": "Analysis of features." },
                { "heading": "Who Is This For?", "content": "Target audience analysis." }
            ],
            "pros": ["Pro 1", "Pro 2", "Pro 3", "Pro 4"],
            "cons": ["Con 1", "Con 2"],
            "rating": 9.5,
            "verdict": "Final concluding paragraph recommending the product."
        }
        
        Tone: Professional, authoritative, enthusiastic but balanced.
        Do not output markdown code blocks, just the raw JSON string.
        `;

        const response = await fetch('https://chatgpt-42.p.rapidapi.com/gpt4', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: prompt }],
                web_access: false
            })
        });

        if (!response.ok) {
            throw new Error(`LLM API error: ${response.status}`);
        }

        const data = await response.json();
        let rawContent = data.result || data.message || data.choices?.[0]?.message?.content || "{}";

        // Clean markdown blocks if present
        rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

        let reviewJson;
        try {
            reviewJson = JSON.parse(rawContent);
        } catch (e) {
            console.error("Failed to parse JSON", rawContent);
            // Fallback
            reviewJson = {
                summary: "We analyzed this product in depth.",
                article_body: [
                    { heading: "Overview", content: "AI generation failed to parse. Please edit manually." }
                ],
                pros: ["High Potential"],
                cons: ["Needs Review"],
                rating: 8.5,
                verdict: "Recommended."
            };
        }

        return NextResponse.json({ success: true, data: reviewJson });

    } catch (error) {
        console.error('Generate review error:', error);
        return NextResponse.json({ success: false, error: 'Failed to generate review' }, { status: 500 });
    }
}
