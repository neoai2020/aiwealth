import { NextRequest, NextResponse } from 'next/server';

// Explicitly tell Vercel this is a serverless function
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const { targetUrl, bridgeUrl, niche } = await request.json();

        // Get API keys from environment
        const rapidApiKey = process.env.RAPIDAPI_KEY;
        const scraperApiKey = process.env.SCRAPER_API_KEY;

        if (!rapidApiKey) {
            console.error('RAPIDAPI_KEY not configured');
            return NextResponse.json(
                { success: false, error: 'API key not configured' },
                { status: 500 }
            );
        }

        // STEP 1: Scrape the target URL to get actual page content
        let pageContext = '';
        let hasGoodContent = false;

        if (scraperApiKey && targetUrl) {
            try {
                console.log('[CommentGen] Scraping URL:', targetUrl);

                const scraperUrl = `http://api.scraperapi.com/?api_key=${scraperApiKey}&url=${encodeURIComponent(targetUrl)}`;
                const scraperResponse = await fetch(scraperUrl);

                if (scraperResponse.ok) {
                    const html = await scraperResponse.text();

                    // Extract title
                    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
                    const title = titleMatch ? titleMatch[1].trim() : '';

                    // Extract meta description
                    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
                    const description = descMatch ? descMatch[1].trim() : '';

                    // Extract visible text (remove HTML tags, scripts, styles)
                    let cleanText = html
                        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim();

                    // Combine and truncate to ~1500 chars for token efficiency
                    pageContext = `Title: ${title}\nDescription: ${description}\nContent: ${cleanText.substring(0, 1500)}`;

                    // Validate content quality
                    const totalContentLength = title.length + description.length + cleanText.length;
                    hasGoodContent = totalContentLength > 100; // At least 100 chars of actual content

                    console.log('[CommentGen] Content quality - Length:', totalContentLength, 'Good:', hasGoodContent);
                } else {
                    console.warn('[CommentGen] Failed to scrape, status:', scraperResponse.status);
                }
            } catch (scrapeError) {
                console.warn('[CommentGen] Scraping error:', scrapeError);
            }
        }

        // STEP 2: Build the prompt with actual page context OR fallback
        let prompt = '';

        if (hasGoodContent && pageContext) {
            // We have good content - use detailed prompt
            prompt = `Act as an industry expert in "${niche}". Write a highly valuable, insightful comment for a blog post.

GOAL: Gently recommend this specific resource: ${bridgeUrl}

PAGE CONTENT:
${pageContext}

STRICT RULES:
1. VALUE FIRST: Start with a specific, helpful insight related to the ACTUAL CONTENT above. Reference something from the article.
2. NO GREETINGS: Do NOT start with "Hello", "Hi", "Great post", or "Thanks". Start DIRECTLY with the insight.
3. NATURAL RECOMMENDATION: After the insight, mention the resource naturally.
   - Example: "I found a framework that automates this: ${bridgeUrl} - helped me [specific benefit]."
4. TONE: Professional, helpful, peer-to-peer. NOT a salesperson.
5. LENGTH: 2-3 sentences maximum.
6. RELEVANCE: Your comment MUST relate to the page content above.

Write ONLY the comment text. No greetings, no pleasantries.`;
        } else {
            // No good content - use general niche-based prompt
            console.warn('[CommentGen] Using fallback prompt (no page content)');

            prompt = `Act as an industry expert in "${niche}". Write a valuable, professional comment for a blog post in this niche.

GOAL: Naturally recommend this resource: ${bridgeUrl}

STRICT RULES:
1. Start with ONE specific insight or tip about ${niche} (no greetings, no "great post").
2. Then naturally mention: "I found this resource helpful: ${bridgeUrl}"
3. Professional tone, 2 sentences max.
4. NO generic phrases like "Hello", "How are you", "Want to roleplay" etc.

Write ONLY the comment text.`;
        }

        console.log('[CommentGen] Calling ChatGPT API...');

        const response = await fetch('https://chatgpt-42.p.rapidapi.com/gpt4', {
            method: 'POST',
            headers: {
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                web_access: false
            })
        });

        console.log('[CommentGen] API Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[CommentGen] ChatGPT API error:', errorText);
            throw new Error(`ChatGPT API error: ${response.status}`);
        }

        const data = await response.json();
        console.log('[CommentGen] Full API Response:', JSON.stringify(data).substring(0, 500));

        const comment = data.result || data.message || data.choices?.[0]?.message?.content || 'Failed to generate comment';

        console.log('[CommentGen] Extracted comment:', comment);

        return NextResponse.json({
            success: true,
            comment
        });

    } catch (error) {
        console.error('Comment generation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate comment' },
            { status: 500 }
        );
    }
}
