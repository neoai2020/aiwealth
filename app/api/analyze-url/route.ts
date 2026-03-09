import { NextRequest, NextResponse } from 'next/server';
import { generateNicheImage } from '@/lib/generate-image';

// Explicitly tell Vercel this is a serverless function
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
        }

        // Get API key
        const apiKey = process.env.SCRAPER_API_KEY;
        let html = '';
        let usingScraperApi = false;

        if (apiKey) {
            try {
                // Use ScraperAPI if available
                const scraperUrl = `http://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(url)}&render=true`;
                const response = await fetch(scraperUrl);
                if (response.ok) {
                    html = await response.text();
                    usingScraperApi = true;
                }
            } catch (e) {
                console.warn("ScraperAPI failed, falling back to local fetch", e);
            }
        }

        // Fallback: Local Fetch (Native Scraper)
        if (!html) {
            console.log("Attempting local fetch for:", url);
            try {
                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.5'
                    }
                });
                if (response.ok) {
                    html = await response.text();
                } else {
                    throw new Error(`Local fetch failed: ${response.status}`);
                }
            } catch (error) {
                console.error("Local scraping failed:", error);
                // Final Fallback if everything fails
                const fallbackTitle = `Bridge - ${new URL(url).hostname}`;
                return NextResponse.json({
                    success: true,
                    data: {
                        title: fallbackTitle,
                        description: "Could not scrape content securely. Please verify the URL or try manually entering details.",
                        image: generateNicheImage(fallbackTitle)
                    }
                });
            }
        }

        // --- Intelligent Parsing Logic ---

        // 1. Extract Title
        const titleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
            html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : `Bridge - ${new URL(url).hostname}`;

        // 2. Extract Description
        const descMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
            html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const description = descMatch ? descMatch[1] : "Discover the hidden system generating wealth on autopilot.";

        // 3. Extract Image (Priority: OG Image > Twitter Image > JSON-LD > Itemprop > First Large Image)
        let image = null;

        // Try OG/Twitter/Schema tags first
        const imgMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
            html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
            html.match(/<meta[^>]*itemprop=["']image["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
            html.match(/<link[^>]*rel=["']image_src["'][^>]*href=["']([^"']*)["'][^>]*>/i);

        if (imgMatch) {
            image = imgMatch[1];
        } else {
            // Specialized Amazon/Souq/E-commerce extraction
            if (url.includes('amazon') || url.includes('souq') || url.includes('ebay')) {
                const ecomMatch = html.match(/id=["']landingImage["'][^>]*src=["']([^"']*)["']/i) ||
                    html.match(/id=["']main-image["'][^>]*src=["']([^"']*)["']/i) ||
                    html.match(/id=["']icImg["'][^>]*src=["']([^"']*)["']/i) || // eBay
                    html.match(/data-old-hires=["']([^"']*)["']/i) ||
                    html.match(/["']highRes["']\s*:\s*["']([^"']*)["']/i);

                if (ecomMatch) {
                    image = ecomMatch[1];
                }

                // If still no image, try the dynamic image JSON
                if (!image) {
                    const dynImgMatch = html.match(/data-a-dynamic-image=["']([^"']*)["']/i);
                    if (dynImgMatch) {
                        try {
                            const dynData = JSON.parse(dynImgMatch[1].replace(/&quot;/g, '"'));
                            const urls = Object.keys(dynData);
                            if (urls.length > 0) image = urls[urls.length - 1]; // Get largest one
                        } catch (e) { }
                    }
                }
            }

            // If still no image, try JSON-LD (common in e-commerce)
            if (!image) {
                const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
                if (jsonLdMatch) {
                    try {
                        const data = JSON.parse(jsonLdMatch[1]);
                        const findImage = (obj: any): string | null => {
                            if (!obj) return null;
                            if (typeof obj === 'string' && (obj.match(/\.(jpeg|jpg|png|webp|avif)/i) || obj.includes('image') || obj.includes('img'))) return obj;
                            if (obj.image) return typeof obj.image === 'string' ? obj.image : (Array.isArray(obj.image) ? obj.image[0] : (obj.image.url || obj.image.contentUrl));
                            if (Array.isArray(obj)) {
                                for (const item of obj) {
                                    const found = findImage(item);
                                    if (found) return found;
                                }
                            }
                            if (typeof obj === 'object') {
                                for (const key in obj) {
                                    if (key === 'image' || key === 'thumbnailUrl') return typeof obj[key] === 'string' ? obj[key] : findImage(obj[key]);
                                }
                            }
                            return null;
                        };
                        image = findImage(data);
                    } catch (e) {
                        console.log("JSON-LD parse error", e);
                    }
                }
            }
        }

        // Final fallback image if extraction completely fails but page load succeeded
        if (!image || image.length < 5) {
            const anyImgMatch = html.match(/<img[^>]*src=["']([^"']*(?:\.jpg|\.png|\.webp)[^"']*)["'][^>]*>/i);
            image = anyImgMatch ? anyImgMatch[1] : generateNicheImage(title || 'Product Preview');
        }

        // Handle relative URLs for images
        if (image && image.startsWith('/')) {
            try {
                const urlObj = new URL(url);
                if (image.startsWith('//')) {
                    image = `${urlObj.protocol}${image}`;
                } else {
                    image = `${urlObj.protocol}//${urlObj.host}${image}`;
                }
            } catch (e) { }
        }

        return NextResponse.json({
            success: true,
            data: {
                title: (title || "").replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"'),
                description: (description || "").replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"'),
                image
            }
        });

    } catch (error) {
        console.error('Analyze URL error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to analyze URL' },
            { status: 500 }
        );
    }
}
