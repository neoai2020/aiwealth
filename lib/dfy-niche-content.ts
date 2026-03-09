export interface NicheTestimonial {
  name: string;
  role: string;
  quote: string;
  result: string;
}

export interface NicheFeature {
  title: string;
  desc: string;
}

export interface NicheFAQ {
  q: string;
  a: string;
}

export interface NicheContent {
  problems: string[];
  agitate: string;
  solutionIntro: string;
  features: NicheFeature[];
  testimonials: NicheTestimonial[];
  faq: NicheFAQ[];
  stats: { label: string; value: string }[];
  guarantee: string;
  howItWorks: { step: string; desc: string }[];
  bonuses: { title: string; value: string }[];
}

const CONTENT: Record<string, NicheContent> = {
  "Health & Fitness": {
    problems: [
      "You wake up exhausted even after 8 hours of sleep",
      "You've tried dozens of diets and workout plans — nothing sticks",
      "You feel overwhelmed by conflicting health advice everywhere",
      "Your energy crashes by 2pm every single day",
      "You've spent hundreds on supplements that didn't work",
    ],
    agitate: "Every day you wait, your metabolism slows further, your energy drops lower, and the gap between where you are and where you want to be gets wider. The fitness industry profits from keeping you confused — cycling between programs that were never designed for YOUR body.",
    solutionIntro: "What if you had a system built around YOUR body type, YOUR schedule, and YOUR goals — that adapts as you progress, so you never plateau again?",
    features: [
      { title: "Personalized Training Plans", desc: "AI-generated workouts that adapt to your fitness level, available equipment, and time constraints — updated weekly." },
      { title: "Custom Nutrition Blueprint", desc: "Meal plans with grocery lists tailored to your dietary preferences, allergies, and caloric needs." },
      { title: "Progress Tracking Dashboard", desc: "Track your body measurements, workout performance, and health markers all in one place." },
      { title: "Expert Coaching Access", desc: "Direct messaging with certified fitness coaches who answer your questions within 24 hours." },
      { title: "Private Community", desc: "Join 50,000+ members sharing tips, motivation, and accountability in our members-only community." },
      { title: "Supplement Guide", desc: "Science-backed supplement recommendations with exact brands, doses, and timing — no filler." },
    ],
    testimonials: [
      { name: "Sarah M.", role: "Working Mom, 34", quote: "I've tried everything — keto, CrossFit, Weight Watchers. This is the first program that actually fit into my life. The workouts are 25 minutes and I do them while my kids nap.", result: "Lost 32 lbs in 14 weeks" },
      { name: "James K.", role: "Office Worker, 42", quote: "My doctor told me I was pre-diabetic. 90 days later, my bloodwork came back perfect. My doctor actually asked what I was doing.", result: "Reversed pre-diabetes markers" },
      { name: "Priya T.", role: "College Student, 22", quote: "I gained 40 lbs freshman year and hated how I looked. This program gave me the structure I needed without the gym intimidation. I work out in my dorm room.", result: "Lost 40 lbs, gained confidence" },
      { name: "Robert L.", role: "Retired, 58", quote: "At my age, I didn't think transformation was possible. I just wanted to keep up with my grandkids. Now I'm outrunning them.", result: "More energy than in his 30s" },
      { name: "Michelle D.", role: "Nurse, 29", quote: "Working 12-hour shifts made me think I had no time for fitness. The quick workouts and meal prep guides changed everything.", result: "Down 3 dress sizes in 8 weeks" },
    ],
    faq: [
      { q: "How quickly will I see results?", a: "Most members report increased energy within the first week. Visible body changes typically appear within 2-4 weeks depending on consistency." },
      { q: "Do I need a gym membership?", a: "No. Every workout has a home-friendly version using minimal or no equipment. Gym variations are included if you prefer." },
      { q: "What if I have dietary restrictions?", a: "The nutrition system accommodates vegetarian, vegan, gluten-free, dairy-free, keto, and other dietary preferences." },
      { q: "Is this suitable for beginners?", a: "Absolutely. The system assesses your current level and starts you at the right intensity. You'll progress safely." },
      { q: "What if it doesn't work for me?", a: "You're covered by a full 60-day money-back guarantee. If you don't see results, you get a complete refund — no questions asked." },
    ],
    stats: [
      { label: "Active Members", value: "50,000+" },
      { label: "Average Rating", value: "4.9/5" },
      { label: "Avg. Weight Lost", value: "23 lbs" },
      { label: "Success Rate", value: "94%" },
    ],
    guarantee: "Try it completely risk-free for 60 days. If you don't see measurable results — more energy, better sleep, visible body changes — we'll refund every penny. No hoops. No questions. Just email us.",
    howItWorks: [
      { step: "Take the Assessment", desc: "Answer a few questions about your goals, body type, schedule, and preferences. Takes under 3 minutes." },
      { step: "Get Your Custom Plan", desc: "Receive your personalized workout and nutrition plan instantly — tailored to your exact situation." },
      { step: "Follow the System", desc: "Complete your daily workouts (15-30 min) and follow your meal plan. The app guides you step by step." },
      { step: "Track & Adapt", desc: "Log your progress and watch the system adapt. As you improve, your plan evolves with you." },
    ],
    bonuses: [
      { title: "Quick-Start Recipe Book", value: "$47" },
      { title: "Sleep Optimization Guide", value: "$29" },
      { title: "Stress Management Masterclass", value: "$67" },
    ],
  },

  "Personal Finance": {
    problems: [
      "You're living paycheck to paycheck despite earning a decent salary",
      "You have no idea where your money actually goes each month",
      "The thought of retirement makes you anxious instead of excited",
      "You've tried budgeting apps but always quit after a few weeks",
      "Investment feels like gambling and you're afraid of losing money",
    ],
    agitate: "Every year you delay, you lose tens of thousands in potential compound growth. The average person retires with less than $250K — barely enough for 5 years. Meanwhile, the wealthy use simple systems you were never taught to grow money while they sleep.",
    solutionIntro: "What if you had a proven, step-by-step financial system that automates your savings, grows your investments, and eliminates money stress — all in under 15 minutes per week?",
    features: [
      { title: "Automated Budget System", desc: "Set it up once and your money flows to the right places automatically — savings, investments, bills, and fun money." },
      { title: "Investment Portfolio Builder", desc: "AI-optimized portfolio allocation based on your age, risk tolerance, and goals. No financial degree required." },
      { title: "Debt Elimination Accelerator", desc: "Custom payoff plan that shows exactly when you'll be debt-free and saves you thousands in interest." },
      { title: "Tax Optimization Strategies", desc: "Legal tax reduction strategies that most accountants never mention. Average member saves $3,200/year." },
      { title: "Retirement Calculator & Planner", desc: "See your exact retirement date, projected income, and what to adjust if you want to retire earlier." },
      { title: "Weekly Market Briefings", desc: "Plain-English market updates so you always know what's happening with your money — without the jargon." },
    ],
    testimonials: [
      { name: "Michael R.", role: "Teacher, 38", quote: "On a teacher's salary, I never thought investing was for me. In 18 months, I paid off $47K in student loans and started a portfolio that's already at $12K.", result: "Paid off $47K in 18 months" },
      { name: "Lisa T.", role: "Freelancer, 31", quote: "As a freelancer, my income was unpredictable. This system taught me to manage irregular income and I've saved more in 6 months than the previous 3 years combined.", result: "Saved $22K in 6 months" },
      { name: "David W.", role: "Engineer, 45", quote: "I was on track to retire at 67 with barely enough. After restructuring everything with this system, I'm now on track for 55 with double the income.", result: "Retiring 12 years early" },
      { name: "Amanda J.", role: "Single Mom, 36", quote: "I went from -$15K net worth to positive in 8 months. For the first time in my life, I have an emergency fund AND investments.", result: "From negative to $20K net worth" },
      { name: "Kevin C.", role: "Uber Driver, 29", quote: "I thought you needed a high salary to build wealth. This proved me wrong. I invest $200/month and my portfolio is already generating passive income.", result: "$18K portfolio from $200/month" },
    ],
    faq: [
      { q: "How much money do I need to start?", a: "You can start with as little as $50/month. The system adapts to your income level and grows with you." },
      { q: "Do I need investment experience?", a: "Zero experience needed. Everything is explained in plain English with step-by-step instructions." },
      { q: "Is my money safe?", a: "You maintain full control of your accounts at all times. We never touch your money — we just show you where to put it." },
      { q: "How much time does this take?", a: "Initial setup takes about 2 hours. After that, 15 minutes per week to review and adjust." },
      { q: "What if I'm in debt?", a: "The system includes a dedicated debt elimination module. Many members start while in debt and use the system to pay it off faster." },
    ],
    stats: [
      { label: "Members Worldwide", value: "75,000+" },
      { label: "Avg. Saved per Year", value: "$8,400" },
      { label: "Total Debt Eliminated", value: "$142M" },
      { label: "Satisfaction Rate", value: "97%" },
    ],
    guarantee: "Take 60 full days to implement the system. If you don't save more, stress less, and feel completely in control of your finances, email us for a full refund. We've helped 75,000+ people — we're confident it'll work for you too.",
    howItWorks: [
      { step: "Financial Assessment", desc: "Complete a quick snapshot of your income, expenses, debts, and goals. This takes about 10 minutes." },
      { step: "Get Your Custom Plan", desc: "Receive your personalized budget, debt payoff schedule, and investment strategy — all automated." },
      { step: "Set Up Automation", desc: "Follow the guided setup to connect your accounts and automate your money flow. Takes about 2 hours." },
      { step: "Watch Your Wealth Grow", desc: "Check in weekly for 15 minutes. Watch your savings grow, debt shrink, and investments compound." },
    ],
    bonuses: [
      { title: "Tax Deduction Checklist", value: "$37" },
      { title: "Negotiation Scripts (Salary, Bills, Rates)", value: "$47" },
      { title: "Passive Income Starter Guide", value: "$67" },
    ],
  },

  "Online Business": {
    problems: [
      "You're stuck trading time for money in a job that doesn't fulfill you",
      "You've tried starting online businesses before but never gained traction",
      "Information overload has you jumping between strategies without finishing any",
      "You don't have technical skills and feel left behind in the digital economy",
      "You see others building successful online businesses and wonder what they know that you don't",
    ],
    agitate: "Every month you stay in your 9-to-5, you leave money and freedom on the table. The barrier to starting an online business has never been lower — yet most people waste years on the wrong strategies because they don't have a proven system to follow.",
    solutionIntro: "What if you had the exact blueprint, tools, and support system that's already helped thousands of complete beginners build profitable online businesses — even without tech skills or a large starting budget?",
    features: [
      { title: "Step-by-Step Business Builder", desc: "Follow the proven 8-week roadmap from zero to your first online sale. Every action is mapped out for you." },
      { title: "Done-For-You Templates", desc: "Website templates, email sequences, ad creatives, and sales pages — just fill in the blanks and launch." },
      { title: "Traffic Generation System", desc: "Learn both free and paid traffic methods. Detailed tutorials for social media, SEO, and paid ads." },
      { title: "Weekly Live Coaching", desc: "Join live Q&A calls every week with 7-figure mentors who review your progress and answer questions." },
      { title: "Private Mastermind Community", desc: "Network with 15,000+ entrepreneurs at every level. Find partners, get feedback, and stay accountable." },
      { title: "Tool Stack & Resources", desc: "Get access to the exact tools, software, and resources used by top earners — many with exclusive discounts." },
    ],
    testimonials: [
      { name: "Chris P.", role: "Ex-Barista, 26", quote: "I was making $2,400/month serving coffee. 6 months after starting, I hit $15K in a single month. I quit my job at month 4 and never looked back.", result: "$15K/month in 6 months" },
      { name: "Nina S.", role: "Ex-Corporate, 34", quote: "I spent 10 years climbing the corporate ladder and hated every minute. This system gave me the clarity and structure to build my own thing. I replaced my salary in 90 days.", result: "Replaced $8K salary in 90 days" },
      { name: "Marco D.", role: "Side Hustler, 29", quote: "I built my entire business on nights and weekends while keeping my full-time job. When my side income hit $12K/month, I finally handed in my notice.", result: "$12K/month while employed" },
      { name: "Tasha R.", role: "Single Mom, 37", quote: "As a single mom, I needed flexibility. I started with no audience, no product, and no clue. Now I run a $6K/month business from my laptop while my kids are at school.", result: "$6K/month from home" },
      { name: "Derek H.", role: "Retired Military, 44", quote: "After 20 years in the military, civilian jobs felt pointless. This gave me a mission again. Built a $200K/year business in my first year.", result: "$200K in first year" },
    ],
    faq: [
      { q: "Do I need any technical skills?", a: "None at all. If you can send an email and browse the web, you have enough skills. Everything else is taught step by step." },
      { q: "How much startup capital do I need?", a: "You can start with as little as $100-200 for basic tools. Many of our most successful members started with under $500 total." },
      { q: "How long until I make money?", a: "Many members make their first sale within the first 2-4 weeks. Consistent income typically builds over 2-3 months." },
      { q: "What if I don't know what niche to choose?", a: "The system includes a niche selection module that helps you find the perfect match for your skills, interests, and market demand." },
      { q: "Can I do this alongside my full-time job?", a: "Absolutely. The system is designed for 1-2 hours per day. Most members build their business on evenings and weekends." },
    ],
    stats: [
      { label: "Students Enrolled", value: "35,000+" },
      { label: "Total Revenue Generated", value: "$47M+" },
      { label: "Avg. Monthly Income", value: "$4,700" },
      { label: "Countries Represented", value: "120+" },
    ],
    guarantee: "Enroll today with zero risk. If you follow the system for 60 days and don't see real progress toward your income goals, we'll refund your investment in full. We've helped 35,000+ people — we stand behind our system completely.",
    howItWorks: [
      { step: "Choose Your Path", desc: "Select your business model: affiliate marketing, digital products, services, or e-commerce. We'll guide the decision." },
      { step: "Build Your Foundation", desc: "Set up your online presence using our templates. Website, email list, and content — done in days, not months." },
      { step: "Launch & Get Traffic", desc: "Follow our traffic playbooks to get your first visitors and customers. Both free and paid methods included." },
      { step: "Scale & Automate", desc: "Once profitable, use our scaling frameworks to grow income while reducing your time investment." },
    ],
    bonuses: [
      { title: "50 Plug-and-Play Email Templates", value: "$97" },
      { title: "Ad Creative Swipe File (200+ Winners)", value: "$67" },
      { title: "Outsourcing & Automation Playbook", value: "$47" },
    ],
  },

  "Weight Loss": {
    problems: [
      "You've lost weight before — and gained it all back every single time",
      "You're exhausted from counting calories and restricting foods you love",
      "Your metabolism feels broken no matter what you try",
      "You're embarrassed to look in the mirror or try on clothes",
      "You've wasted thousands on supplements, programs, and gym memberships that didn't work",
    ],
    agitate: "Yo-yo dieting doesn't just waste your time and money — it actively damages your metabolism, making each attempt harder than the last. The $72 billion diet industry is designed to keep you failing so you keep buying. It's time for a different approach entirely.",
    solutionIntro: "What if weight loss wasn't about willpower, restriction, or spending hours at the gym — but about working WITH your body's natural systems to burn fat effortlessly and keep it off permanently?",
    features: [
      { title: "Metabolic Type Assessment", desc: "Discover your unique metabolic profile and get a plan designed for YOUR body — not a generic one-size-fits-all template." },
      { title: "Flexible Meal System", desc: "Eat foods you actually enjoy. No banned foods, no counting macros. Just simple guidelines that work with your lifestyle." },
      { title: "20-Minute Home Workouts", desc: "Short, effective workouts you can do at home in your pajamas. No gym, no equipment, no excuses." },
      { title: "Hormone Optimization Protocol", desc: "Address the hormonal imbalances (cortisol, leptin, insulin) that are secretly keeping you overweight." },
      { title: "24/7 Coach Access", desc: "Message your personal weight loss coach anytime. Get answers, adjustments, and encouragement when you need it." },
      { title: "Weekly Accountability Check-ins", desc: "Stay on track with structured weekly reviews. Celebrate wins and course-correct quickly." },
    ],
    testimonials: [
      { name: "Karen S.", role: "Teacher, 52", quote: "I've been on every diet since my 20s. This is the first time I've lost weight and kept it off for over a year. I don't even feel like I'm dieting.", result: "Lost 45 lbs — kept it off 14 months" },
      { name: "Mike T.", role: "Truck Driver, 34", quote: "My job has me sitting 10+ hours a day. I thought weight loss was impossible with my lifestyle. I was wrong. Down 38 lbs and my back pain is gone.", result: "Lost 38 lbs with a sedentary job" },
      { name: "Jessica R.", role: "New Mom, 28", quote: "Post-pregnancy weight felt impossible to lose. This program worked around my crazy schedule and I'm back to my pre-baby weight in 4 months.", result: "Lost all baby weight in 4 months" },
      { name: "Tom H.", role: "Business Owner, 41", quote: "I was 260 lbs and pre-diabetic. My wife begged me to try one more thing. 6 months later, I'm 205 lbs and my doctor says I'm healthier than most 30-year-olds.", result: "Lost 55 lbs, reversed pre-diabetes" },
      { name: "Grace L.", role: "Retiree, 63", quote: "At 63, I thought my best years were behind me. I've lost 28 lbs, I walk 3 miles a day, and I just went on my first hike in 20 years.", result: "Lost 28 lbs at age 63" },
    ],
    faq: [
      { q: "Is this another restrictive diet?", a: "No. This system teaches you to eat in a way that satisfies you while naturally creating fat loss. No foods are banned." },
      { q: "I have a medical condition. Is this safe?", a: "The program is designed to work with common conditions like thyroid issues, PCOS, and diabetes. Always consult your doctor, but our approach is health-first." },
      { q: "How much exercise is required?", a: "Just 20 minutes, 3-4 times per week. All workouts can be done at home with no equipment. Walking also counts." },
      { q: "I'm over 50. Will this work for me?", a: "Many of our most successful members are over 50. The metabolic approach actually works better for mature adults than traditional dieting." },
      { q: "What if I've failed at everything else?", a: "That's exactly who this is designed for. If traditional diets worked, you wouldn't be here. This is a completely different approach." },
    ],
    stats: [
      { label: "Members Transformed", value: "82,000+" },
      { label: "Average Weight Lost", value: "31 lbs" },
      { label: "Keep-It-Off Rate", value: "89%" },
      { label: "Average Rating", value: "4.8/5" },
    ],
    guarantee: "Follow the program for 60 days. If you don't lose weight, feel more energetic, and finally feel in control of your body — we'll give you a full refund plus let you keep all the materials. That's how confident we are.",
    howItWorks: [
      { step: "Take the Metabolic Quiz", desc: "Discover your metabolic type, hormonal profile, and the specific approach your body responds to best." },
      { step: "Get Your Personalized Plan", desc: "Receive custom meal guidelines and workout routines built for your body type, schedule, and food preferences." },
      { step: "Follow the Daily System", desc: "Simple daily actions: eat your meals, do your short workout, track your progress. The app makes it effortless." },
      { step: "See Results That Last", desc: "Unlike crash diets, this approach builds habits that keep the weight off permanently. No rebounding." },
    ],
    bonuses: [
      { title: "100 Quick & Easy Recipes Cookbook", value: "$37" },
      { title: "Emotional Eating Breakthrough Guide", value: "$47" },
      { title: "Metabolism Reboot Supplement Protocol", value: "$29" },
    ],
  },

  "Self-Improvement": {
    problems: [
      "You feel stuck — like you're going through the motions without real growth or purpose",
      "Procrastination and self-doubt are silently sabotaging your potential",
      "You set goals every January and abandon them by February",
      "You know you're capable of more but can't figure out what's holding you back",
      "You consume self-help content constantly but nothing actually changes in your life",
    ],
    agitate: "Here's the uncomfortable truth: reading books and watching motivational videos feels productive, but without a SYSTEM to implement what you learn, you're just entertaining yourself. The gap between who you are and who you could be grows wider every day you stay in consumption mode.",
    solutionIntro: "What if you had a structured system that turns personal development from a hobby into a daily practice — with clear actions, built-in accountability, and measurable progress toward the life you actually want?",
    features: [
      { title: "Morning & Evening Protocols", desc: "Scientifically-designed routines that prime your mind for peak performance in the morning and deep recovery at night." },
      { title: "Goal Architecture System", desc: "Transform vague wishes into concrete, achievable milestones with our proprietary goal-setting framework." },
      { title: "Mindset Reprogramming", desc: "Identify and replace the limiting beliefs that have been running your life on autopilot. Based on CBT and NLP principles." },
      { title: "Habit Stacking Engine", desc: "Build powerful daily habits by attaching them to existing routines. Small changes that compound into massive results." },
      { title: "Accountability Partnership", desc: "Get matched with an accountability partner at your level. Weekly check-ins keep you both on track." },
      { title: "Monthly Masterclasses", desc: "Live sessions with world-class speakers on leadership, emotional intelligence, productivity, and more." },
    ],
    testimonials: [
      { name: "Alex K.", role: "Software Engineer, 31", quote: "I was technically successful but deeply unhappy. This program helped me redesign my entire life — new habits, new mindset, new direction. I'm now building a business I love.", result: "Complete career and life pivot" },
      { name: "Samira B.", role: "Grad Student, 25", quote: "Social anxiety controlled my life for years. The mindset modules gave me frameworks I'd never encountered in therapy. I now speak publicly and lead group projects.", result: "Overcame lifelong social anxiety" },
      { name: "Jordan M.", role: "Sales Manager, 37", quote: "I doubled my income within 6 months — not by working harder, but by changing how I think about value, negotiation, and self-worth. This was the missing piece.", result: "Doubled income in 6 months" },
      { name: "Patricia N.", role: "Empty Nester, 52", quote: "With my kids grown, I felt purposeless. This program helped me discover a passion I never knew I had. I'm now certified as a life coach and helping others.", result: "Found new purpose and career at 52" },
      { name: "Daniel F.", role: "Entrepreneur, 40", quote: "I was a high performer with terrible habits — no sleep, poor diet, zero work-life balance. The daily protocols transformed not just my productivity but my relationships.", result: "10x productivity, better relationships" },
    ],
    faq: [
      { q: "How is this different from reading self-help books?", a: "Books give you information. This gives you implementation. Every concept comes with specific daily actions, tracking, and accountability." },
      { q: "How much time does it take per day?", a: "The core practices take 30-45 minutes per day — a morning routine (20 min) and evening reflection (10-15 min). Most members say it saves them time overall." },
      { q: "I've tried self-improvement programs before. Why would this work?", a: "Most programs focus on motivation, which fades. This focuses on systems, habits, and identity — the three things that create lasting change." },
      { q: "Is this based on actual science?", a: "Yes. Every module is grounded in cognitive behavioral therapy, positive psychology, neuroscience, and habit research. No pseudoscience." },
      { q: "Can I go at my own pace?", a: "Absolutely. While there's a recommended 8-week core track, all materials are available immediately and you can revisit them anytime." },
    ],
    stats: [
      { label: "Students Worldwide", value: "42,000+" },
      { label: "Countries", value: "95+" },
      { label: "Completion Rate", value: "91%" },
      { label: "Would Recommend", value: "98%" },
    ],
    guarantee: "Join risk-free for 60 days. Complete the core program, do the daily practices, and if you don't feel a genuine shift in your mindset, habits, and direction — request a full refund. We're that confident because the data proves it works.",
    howItWorks: [
      { step: "Self-Assessment", desc: "Complete our Life Audit to identify your starting point across 8 life dimensions: career, health, relationships, purpose, and more." },
      { step: "Design Your Blueprint", desc: "Based on your audit, receive a personalized growth plan with specific daily actions for your top priority areas." },
      { step: "Build Daily Practices", desc: "Implement morning and evening protocols. Start with just 10 minutes and scale up as habits solidify." },
      { step: "Compound Your Growth", desc: "Track weekly progress, attend masterclasses, and watch small daily improvements compound into a transformed life." },
    ],
    bonuses: [
      { title: "The Focus Toolkit (Meditation + Breathwork)", value: "$47" },
      { title: "Relationship Communication Playbook", value: "$37" },
      { title: "Career Acceleration Framework", value: "$67" },
    ],
  },
};

export function getNicheContent(niche: string): NicheContent {
  return CONTENT[niche] || CONTENT["Health & Fitness"];
}
