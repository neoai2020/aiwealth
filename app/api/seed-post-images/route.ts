import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 600;

const NICHE_LIST = [
  "Health & Fitness",
  "Personal Finance",
  "Self-Improvement",
  "Online Business",
  "Weight Loss",
  "Crypto Trading",
  "Manifestation",
  "Relationship Coaching",
  "Productivity",
  "Spirituality",
];

const NICHE_IMAGE_SUBJECTS: Record<string, string[]> = {
  "Health & Fitness": [
    "yoga sunrise beach", "healthy meal bowl avocado", "runner scenic trail morning",
    "gym dumbbells natural light", "meditation garden peaceful", "green smoothie fruits",
    "stretching park golden hour", "swimming pool blue water", "group fitness energy",
    "hiking mountain landscape", "jumping rope workout", "healthy breakfast table",
    "cycling country road", "water bottle gym towel", "pilates studio bright",
    "fresh salad wooden bowl", "boxing training intense", "outdoor bootcamp sunrise",
    "protein shake ingredients", "rock climbing adventure", "tennis court action",
    "sleeping peacefully bedroom", "farmer market vegetables", "surfing ocean waves",
    "kettlebell workout outdoor", "spa relaxation wellness", "trail running forest",
    "pushups beach sand", "acai bowl tropical", "rowing machine gym",
    "basketball court sunset", "fruit platter colorful", "resistance bands workout",
    "morning jog city park", "herbal tea calm setting", "deadlift barbell gym",
    "yoga mat candles peaceful", "crossfit box jump", "avocado toast breakfast",
    "mountain bike trail", "dancing fitness class", "fresh juice bottles",
    "plank exercise beach", "staircase running stadium", "overnight oats berries",
    "martial arts training", "sunset walk nature", "coconut water tropical",
    "balance board exercise", "healthy dinner plate",
  ],
  "Personal Finance": [
    "gold coins stacked growing", "laptop financial charts", "luxury apartment view city",
    "piggy bank savings", "stock market green arrows", "real estate modern house",
    "wallet cash organized", "investment portfolio screen", "money tree growing",
    "credit cards premium gold", "financial planning notebook", "bitcoin gold digital",
    "retirement beach sunset", "compound interest graph", "briefcase success business",
    "safe deposit vault", "budget spreadsheet clean", "diamond luxury wealth",
    "passive income laptop beach", "bank building prestigious", "gold bars stacked",
    "calculator money planning", "yacht ocean luxury", "stock ticker green",
    "penthouse skyline view", "savings jar coins full", "financial freedom travel",
    "multiple income streams", "tax documents organized", "wealth management office",
    "sports car luxury", "dividend check mailbox", "cryptocurrency portfolio",
    "first class airplane seat", "real estate keys new", "mutual funds growth",
    "side hustle laptop coffee", "emergency fund concept", "net worth climbing",
    "financial advisor meeting", "watch luxury timepiece", "rooftop celebration success",
    "money growing garden", "private jet freedom", "business class travel",
    "golden handshake deal", "property investment keys", "wealth chart upward",
    "premium lifestyle travel", "financial milestone celebration",
  ],
  "Self-Improvement": [
    "journal coffee morning desk", "reading book cozy chair", "mountain summit sunrise",
    "minimalist desk clarity", "cliff overlook vast view", "bookshelf knowledge",
    "zen stones balanced", "forest sunrise path", "vision board goals",
    "morning coffee ritual", "meditation cushion peace", "writing pen inspiration",
    "library quiet study", "mirror reflection confident", "planner goals organized",
    "running alone determination", "podcast microphone growth", "painting creative art",
    "chess strategy thinking", "graduation cap achievement", "puzzle pieces connecting",
    "alarm clock early morning", "compass direction purpose", "weightlifting strength",
    "ted talk stage confidence", "lighthouse guidance hope", "seed sprouting growth",
    "staircase upward progress", "brain illustration creative", "trophy achievement gold",
    "mentoring conversation warm", "notebook brainstorming ideas", "eagle soaring freedom",
    "gym mirror determination", "candle focus concentration", "open road journey ahead",
    "tree growing strong roots", "diamond pressure beauty", "hands reaching skyward",
    "blank canvas potential", "butterfly transformation new", "rocket launch ambition",
    "sunrise new day fresh", "bridge crossing forward", "warrior pose strength",
    "spotlight courage stage", "key unlocking potential", "phoenix rising flames",
    "arrow target bullseye", "crown self mastery",
  ],
  "Online Business": [
    "home office multiple screens", "laptop beach palm trees", "workspace plants modern",
    "coffee shop remote work", "shipping packages ecommerce", "analytics dashboard screen",
    "video call team remote", "coworking space startup", "phone notifications income",
    "travel laptop freedom", "email marketing screen", "social media posting",
    "product photography studio", "online course creation", "website design screen",
    "payment notification phone", "podcast recording setup", "dropshipping warehouse",
    "affiliate marketing laptop", "seo rankings climbing", "brand logo design",
    "funnel diagram marketing", "customer reviews positive", "rooftop laptop sunset",
    "passive income sleeping", "content creation camera", "facebook ads dashboard",
    "webinar presentation live", "ebook digital product", "freelance workspace cozy",
    "shopify store screen", "youtube studio setup", "membership site premium",
    "automation workflow clean", "consulting call video", "influencer lifestyle",
    "print on demand products", "landing page design", "revenue graph climbing",
    "domain name purchase", "instagram business profile", "digital product launch",
    "copywriting desk focused", "networking event social", "testimonial wall happy",
    "global map connections", "multiple revenue streams", "entrepreneur morning routine",
    "scale business growth", "laptop poolside luxury",
  ],
  "Weight Loss": [
    "meal prep containers colorful", "jogging sunrise path", "vegetables cutting board",
    "measuring tape waist", "yoga mat water bottle", "kitchen scale healthy",
    "walking nature trail", "fruit infused water", "healthy breakfast spread",
    "stretching outdoor park", "weight scale progress", "salad bowl fresh greens",
    "running shoes ready", "portion plate balanced", "smoothie blender fruits",
    "cycling outdoor scenic", "healthy snack almonds", "jump rope cardio",
    "body transformation mirror", "grocery cart healthy", "hiking active lifestyle",
    "plank exercise beach", "grilled chicken vegetables", "swimming laps pool",
    "sleep restful bedroom", "protein shake gym", "farmers market fresh",
    "food journal tracking", "stair climbing exercise", "detox green juice",
    "resistance training gym", "cooking healthy kitchen", "walking dog park",
    "intermittent fasting clock", "yoga class peaceful", "fresh berries bowl",
    "outdoor workout sunshine", "skinny jeans fitting", "rowing exercise gym",
    "meal planning calendar", "confidence mirror smile", "pilates reformer studio",
    "water glass hydration", "sunrise morning routine", "healthy lunch box",
    "dancing fitness fun", "before after concept", "zumba class energy",
    "mindful eating table", "finish line celebration",
  ],
  "Crypto Trading": [
    "trading dashboard green charts", "bitcoin coin golden glow", "multi monitor setup trader",
    "blockchain network nodes", "bull statue gold market", "phone wallet digital",
    "candlestick chart profit", "futuristic city digital", "ethereum coin silver",
    "vault security crypto", "defi dashboard protocol", "nft digital art",
    "mining rig hardware", "portfolio allocation pie", "trading desk night",
    "altcoins various logos", "hardware wallet ledger", "market analysis charts",
    "whale splash ocean", "staking rewards growing", "metaverse virtual world",
    "bear to bull transition", "order book exchange", "lightning network fast",
    "diamond hands holding", "moon rocket launch", "smart contract code",
    "yield farming tractor", "airdrop parachute tokens", "liquidity pool water",
    "technical indicators screen", "crypto conference stage", "cold storage secure",
    "decentralized exchange dex", "tokenomics infographic", "market cap ranking",
    "crypto news breaking", "paper trading practice", "profit taking celebration",
    "blockchain explorer data", "cross chain bridge", "governance voting dao",
    "gas fees ethereum", "layer two scaling", "crypto tax calculator",
    "sentiment analysis gauge", "whale wallet tracking", "market cycle chart",
    "golden cross pattern", "futures contract trading",
  ],
  "Manifestation": [
    "sunrise ocean golden calm", "water droplet clarity", "galaxy stars universe",
    "butterfly emerging cocoon", "candle flame peaceful dark", "rainbow after rain",
    "lotus flower water bloom", "light rays through clouds", "journal crystals ritual",
    "garden flowing water zen", "vision board dreams", "gratitude journal pen",
    "moon phases night sky", "crystal grid sacred", "meditation golden light",
    "abundance fruit overflow", "mirror affirmation positive", "tree life growing",
    "compass finding direction", "feather floating gentle", "door opening bright",
    "seed sprouting earth", "birds flying free sky", "waterfall powerful flow",
    "star wish shooting night", "rose blooming beautiful", "hands receiving light",
    "sunrise mountain peak", "dreamcatcher hanging window", "prism rainbow light",
    "cherry blossom spring", "ocean wave powerful", "golden key unlocking",
    "spiral galaxy deep", "bridge fog crossing", "dove peace flying",
    "sunrise field flowers", "gem diamond sparkling", "river flowing smooth",
    "cloud silver lining", "nest eggs abundance", "crown golden royal",
    "fireworks celebration night", "hot air balloon rise", "coral reef colorful",
    "bamboo forest serene", "honey golden flowing", "silk fabric flowing",
    "aurora borealis sky", "diamond light refraction",
  ],
  "Relationship Coaching": [
    "couple beach sunset hands", "coffee date cozy warm", "laughing together outdoors",
    "candlelit dinner romantic", "rooftop sunset couple", "flowers love letter",
    "cooking together kitchen", "friends cafe laughing", "heart lock bridge",
    "adventure hike couple", "picnic park blanket", "dancing together moonlight",
    "sunrise walk together", "hands intertwined close", "wine cheers celebration",
    "movie night cozy couch", "wedding rings elegant", "kiss forehead gentle",
    "travel together airport", "garden walk peaceful", "photo booth fun couple",
    "ice cream date summer", "stargazing blanket night", "bicycle ride together",
    "bookstore browsing couple", "farmers market together", "hammock relaxing two",
    "road trip convertible", "kayaking together lake", "snowball fight playful",
    "concert crowd together", "breakfast bed tray", "art gallery date",
    "umbrella rain together", "swing set playful", "bonfire beach night",
    "yoga partner stretch", "dog walk park couple", "bowling alley fun",
    "sunset sailboat cruise", "spa day relaxation", "puzzle together cozy",
    "surprise gift wrapped", "phone call long distance", "reunion hug airport",
    "anniversary dinner special", "hand written note love", "balcony coffee morning",
    "game night board games", "future planning together",
  ],
  "Productivity": [
    "organized desk planner laptop", "hourglass golden sand time", "minimal workspace clean",
    "checklist completed tasks", "alarm clock sunrise early", "calendar planner system",
    "standing desk focused work", "bookshelf organized neat", "timer notebook pomodoro",
    "inbox zero screen clean", "whiteboard brainstorm ideas", "coffee laptop morning",
    "filing cabinet organized", "dual monitor workflow", "post it notes colorful",
    "headphones focus music", "bullet journal spread", "keyboard typing fast",
    "to do list pen check", "workspace plants minimal", "morning routine items",
    "app notifications managed", "desk lamp night work", "running early morning",
    "meal prep sunday batch", "folder tabs organized", "clock gears mechanism",
    "meditation break office", "water bottle desk hydrate", "walking meeting outdoor",
    "digital detox phone off", "goal tracker wall chart", "ergonomic chair setup",
    "speed reading book", "delegation handoff task", "automation robot workflow",
    "deep work sign door", "review meeting notes", "project timeline gantt",
    "energy levels chart", "priority matrix four box", "habit tracker monthly",
    "focus timer counting", "brainstorm sticky notes", "peak performance athlete",
    "shutdown ritual evening", "capture inbox system", "workspace declutter clean",
    "compound effect graph", "victory celebration finish",
  ],
  "Spirituality": [
    "meditation silhouette sunrise", "temple morning mist ancient", "incense smoke sunlight",
    "forest path peaceful walk", "prayer beads wooden mala", "lake reflection dawn mirror",
    "sacred geometry mandala", "candles dark room peace", "monastery clouds mountain",
    "hands prayer light soft", "tibetan singing bowl", "waterfall meditation nature",
    "chakra colors alignment", "yoga tree pose sunset", "crystal healing stones",
    "labyrinth walking path", "zen sand garden raked", "starry sky contemplation",
    "lotus position meditation", "ancient book wisdom", "sage smudge cleansing",
    "bells temple ringing", "moonlight meditation night", "om symbol golden",
    "third eye awakening", "guru teaching peaceful", "ashram courtyard serene",
    "prayer flags mountain", "gratitude sunrise morning", "healing hands energy",
    "holy water blessing", "zen bridge over water", "offering flowers altar",
    "deep breathing nature", "spiritual journal writing", "pilgrimage ancient path",
    "tree of life roots", "peace dove flying sky", "sound bath bowls",
    "awakening light burst", "compassion hands heart", "sacred fire ceremony",
    "cosmic consciousness stars", "earthing barefoot grass", "silence retreat nature",
    "rebirth phoenix concept", "inner child garden", "kundalini energy rising",
    "equinox sun balance", "namaste greeting peaceful",
  ],
};

function buildMarketingPrompt(_niche: string, subject: string): string {
  return `Professional photo of ${subject}, beautiful lighting, high quality, no text no logos`;
}

async function generateImage(prompt: string): Promise<Buffer | null> {
  const rapidKey = process.env.RAPIDAPI_KEY;
  if (rapidKey) {
    const buf = await tryRapidApi(prompt, rapidKey);
    if (buf) return buf;
    console.log("[seed] RapidAPI failed, falling back to Pollinations");
  }
  return tryPollinations(prompt);
}

async function tryRapidApi(prompt: string, apiKey: string): Promise<Buffer | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    const apiHost = process.env.RAPIDAPI_HOST || "google-nano-banana4.p.rapidapi.com";
    const body = new URLSearchParams({
      prompt,
      aspect_ratio: "1:1",
      resolution: "1K",
      model: process.env.RAPIDAPI_NANO_MODEL || "google/nano-banana-2",
    });

    const res = await fetch(`https://${apiHost}/index.php`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
      body: body.toString(),
    });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const raw = await res.text();
    try {
      const data = JSON.parse(raw);
      if (data?.status === "error") return null;
      const b64 = data?.image_base64 || data?.data?.[0]?.b64_json || data?.image || data?.output;
      return b64 ? Buffer.from(b64 as string, "base64") : null;
    } catch {
      return raw.length > 1000 ? Buffer.from(raw, "base64") : null;
    }
  } catch {
    return null;
  }
}

async function tryPollinations(prompt: string): Promise<Buffer | null> {
  try {
    const seed = Math.floor(Math.random() * 999999);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=768&seed=${seed}&nologo=true`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 180000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error("[seed] Pollinations error", res.status);
      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("image")) {
      console.error("[seed] Pollinations returned non-image:", contentType);
      return null;
    }

    const arrayBuf = await res.arrayBuffer();
    const buf = Buffer.from(arrayBuf);
    if (buf.length < 5000) {
      console.error("[seed] Pollinations image too small:", buf.length);
      return null;
    }
    console.log("[seed] Pollinations OK, size:", buf.length);
    return buf;
  } catch (err) {
    console.error("[seed] Pollinations error:", err);
    return null;
  }
}

function getFilePath(niche: string, postIndex: number): string {
  return `post-images/${niche.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}/${postIndex}.jpg`;
}

async function persistImage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  niche: string,
  postIndex: number,
  imageBuffer: Buffer
): Promise<string | null> {
  const filePath = getFilePath(niche, postIndex);
  const isPng = imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50;
  const contentType = isPng ? "image/png" : "image/jpeg";
  const { error: uploadError } = await supabase.storage
    .from("social-posts")
    .upload(filePath, imageBuffer, { contentType, upsert: true });

  if (uploadError) return null;

  const { data: publicUrlData } = supabase.storage
    .from("social-posts")
    .getPublicUrl(filePath);

  const imageUrl = publicUrlData.publicUrl;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing, error: existingError } = await (supabase.from as any)("social_post_images")
    .select("id")
    .eq("niche", niche)
    .eq("post_index", postIndex)
    .maybeSingle();

  if (existingError) return null;

  if (existing?.id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateError } = await (supabase.from as any)("social_post_images")
      .update({ image_url: imageUrl, updated_at: new Date().toISOString() })
      .eq("id", existing.id);

    if (updateError) return null;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: insertError } = await (supabase.from as any)("social_post_images").insert({
      niche,
      post_index: postIndex,
      image_url: imageUrl,
    });

    if (insertError) return null;
  }

  return imageUrl;
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await request.json().catch(() => ({}));
    const requestedNiche = body.niche as string | undefined;
    const nichesToProcess = requestedNiche ? [requestedNiche] : NICHE_LIST;
    const batchSize = body.batch_size || 5;
    const startIndex = body.start_index || 0;
    const fillMissing = Boolean(body.fill_missing);
    const overwriteExisting = Boolean(body.overwrite_existing);

    if (body.debug_test) {
      const testPrompt = buildMarketingPrompt("Health & Fitness", "yoga sunrise beach");
      const buf = await generateImage(testPrompt);
      return NextResponse.json({
        success: !!buf,
        buffer_size: buf?.length ?? 0,
        has_rapidapi: !!process.env.RAPIDAPI_KEY,
        provider: process.env.RAPIDAPI_KEY ? "rapidapi+pollinations" : "pollinations",
      });
    }

    const results: { niche: string; generated: number; failed: number; skipped: number }[] = [];

    for (const niche of nichesToProcess) {
      const subjects = NICHE_IMAGE_SUBJECTS[niche];
      if (!subjects) continue;

      let generated = 0;
      let failed = 0;
      let skipped = 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existingRows, error: existingError } = await (supabase.from as any)("social_post_images")
        .select("post_index")
        .eq("niche", niche);

      if (existingError) {
        results.push({ niche, generated, failed: subjects.length, skipped });
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingIndexes = new Set((existingRows || []).map((row: any) => row.post_index));
      const candidateIndexes = overwriteExisting
        ? subjects.slice(startIndex, Math.min(startIndex + batchSize, subjects.length)).map((_, offset) => startIndex + offset)
        : fillMissing
        ? subjects.map((_, idx) => idx).filter((idx) => !existingIndexes.has(idx)).slice(0, batchSize)
        : Array.from(
            { length: Math.max(0, Math.min(startIndex + batchSize, subjects.length) - startIndex) },
            (_, offset) => startIndex + offset
          );

      const toProcess = candidateIndexes.filter((i) => {
        if (!fillMissing && !overwriteExisting && existingIndexes.has(i)) {
          skipped++;
          return false;
        }
        return true;
      });

      for (const i of toProcess) {
        const subject = subjects[i];
        const prompt = buildMarketingPrompt(niche, subject);
        let imageBuffer: Buffer | null = null;

        for (let attempt = 0; attempt < 2; attempt++) {
          imageBuffer = await generateImage(prompt);
          if (imageBuffer) break;
          await new Promise((r) => setTimeout(r, 2000));
        }

        if (!imageBuffer) { failed++; continue; }

        const savedUrl = await persistImage(supabase, niche, i, imageBuffer);
        if (savedUrl) generated++;
        else failed++;

        if (toProcess.indexOf(i) < toProcess.length - 1) {
          await new Promise((r) => setTimeout(r, 1500));
        }
      }

      results.push({ niche, generated, failed, skipped });
    }

    return NextResponse.json({
      success: true,
      results,
      message: overwriteExisting
        ? `Regenerated up to ${batchSize} images per niche`
        : fillMissing
        ? `Processed up to ${batchSize} missing images per niche`
        : `Processed batch starting at index ${startIndex} with size ${batchSize}`,
      next_start_index: fillMissing ? null : startIndex + batchSize < 50 ? startIndex + batchSize : null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.from as any)("social_post_images")
      .select("niche, post_index, image_url")
      .order("niche")
      .order("post_index");

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const byNiche: Record<string, Record<number, string>> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const row of (data || []) as any[]) {
      if (!byNiche[row.niche]) byNiche[row.niche] = {};
      byNiche[row.niche][row.post_index] = row.image_url;
    }

    return NextResponse.json({ success: true, images: byNiche, total: (data || []).length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
