import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Explicitly tell Vercel this is a serverless function
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const { bridgeId } = await request.json();

        if (!bridgeId) {
            return NextResponse.json({ success: false, error: 'Bridge ID is required' }, { status: 400 });
        }

        // HANDLE MOCK IDS FOR DEMO PURPOSES
        if (bridgeId === '1' || bridgeId === '2') {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Fake delay
            return NextResponse.json({
                success: true,
                data: {
                    title: `🔥 ${bridgeId === '1' ? 'EcoSlate Ops' : 'Crypto Masterclass'} (Optimized)`,
                    description: "This offer has been fully optimized by AI Wealth OS for maximum conversion. High intent keywords gathered.",
                    rating: 9.9
                }
            });
        }

        // Initialize Supabase Admin Client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error("Missing Env Vars:", { supabaseUrl: !!supabaseUrl, supabaseServiceKey: !!supabaseServiceKey });
            throw new Error("Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing in .env.local");
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // 1. Fetch current bridge data
        const { data: bridge, error: fetchError } = await supabase
            .from('bridges')
            .select('*')
            .eq('id', bridgeId)
            .single();

        if (fetchError || !bridge) {
            return NextResponse.json({ success: false, error: 'Bridge not found' }, { status: 404 });
        }

        // 2. Prepare Prompt for AI
        const prompt = `
        Act as a world-class Copywriter and SEO Specialist.
        Optimize the following affiliate product details to maximize click-through rates and conversions.

        CURRENT TITLE: "${bridge.title}"
        CURRENT PROJECT DESCRIPTION: "${bridge.description}"

        (If the description is empty, generate a compelling one based on the title).

        TASK:
        1. Write a punchy, high-converting TITLE (max 60 chars).
        2. Write a persuasive, benefit-driven DESCRIPTION (2-3 sentences).
        3. Identify 3 key selling points (Pros).
        4. Give a numerical rating between 9.2 and 9.9.

        OUTPUT FORMAT (JSON ONLY):
        {
            "title": "New Title",
            "description": "New Description",
            "pros": ["Pro 1", "Pro 2", "Pro 3"],
            "rating": 9.5
        }
        `;

        // 3. Call AI (RapidAPI GPT-4)
        const rapidApiKey = process.env.RAPIDAPI_KEY;
        if (!rapidApiKey) throw new Error("RAPIDAPI_KEY is missing");

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
            throw new Error(`AI API failed with status ${response.status}`);
        }

        const aiData = await response.json();
        const rawResult = aiData.result || aiData.message || aiData.choices?.[0]?.message?.content;

        // 4. Parse AI Result
        let optimizedData;
        try {
            // cleaning markdown code blocks if present
            const jsonStr = rawResult.replace(/```json/g, '').replace(/```/g, '').trim();
            optimizedData = JSON.parse(jsonStr);
        } catch (e) {
            console.error("Failed to parse AI response", rawResult);
            // Fallback if parsing fails
            optimizedData = {
                title: `🔥 ${bridge.title} (Verified)`,
                description: bridge.description + " [Optimized for high conversion]",
                rating: 9.8
            };
        }

        // 5. Update Supabase
        // We update the main fields AND the 'content' jsonb column for the detailed review page
        const { error: updateError } = await supabase
            .from('bridges')
            .update({
                title: optimizedData.title,
                description: optimizedData.description,
                status: 'live', // Ensure it's live after optimization
                // Merging into existing content or creating new
                content: {
                    ...(typeof bridge.content === 'object' ? bridge.content : {}),
                    pros: optimizedData.pros || ["High Quality", "Verified Offer", "Instant Access"],
                    rating: optimizedData.rating || 9.5,
                    summary: optimizedData.description // Sync summary with description
                }
            })
            .eq('id', bridgeId);

        if (updateError) throw updateError;

        return NextResponse.json({
            success: true,
            data: optimizedData
        });

    } catch (error: any) {
        console.error('Optimization Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
