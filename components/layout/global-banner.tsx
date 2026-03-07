"use client";

import { Smartphone, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function GlobalBanner() {
    return (
        <div className="w-full bg-[#00BFA5] border border-white/10 rounded-2xl relative overflow-hidden mb-8">
            <div className="max-w-7xl mx-auto px-4 py-3 md:px-8 lg:px-12 flex flex-col md:flex-row items-center gap-4 relative z-10">

                {/* Icon Section */}
                <div className="shrink-0 relative">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
                    >
                        <Smartphone className="w-12 h-12 text-white stroke-[1.5]" />
                    </motion.div>
                    <div className="absolute -top-1 -right-1 bg-transparent">
                        <DollarSign className="w-8 h-8 text-yellow-400 fill-yellow-400 stroke-yellow-500 drop-shadow-md" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center md:text-left space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                        Want To Multiply Your Earnings To $1,000 - $5,000 A Day?
                    </h3>
                    <div className="space-y-2 text-white/90 text-xs md:text-sm font-medium leading-relaxed max-w-4xl">
                        <p>
                            AI Wealth OS is powerful, but if you want to scale to truly life-changing income, you need to watch this training which shows how to automate your entire workflow. And guess what?
                        </p>
                        <p>
                            This training is free for all AI Wealth members. So, if you want to unlock your full potential, just tap the yellow button below.
                        </p>
                    </div>

                    {/* CTA Button - Mobile only placement or Desktop separate? 
                        In the image, the button is below text. Let's put it here for mobile alignment, 
                        or keep it side-by-side on desktop if space permits. 
                        The image shows a tall banner, so placing button below text is fine.
                    */}
                    <div className="pt-2">
                        <Link href="https://www.skool.com/hustlegames/about?ref=5569e92387434b31bedbebb4c08d4a02" className="inline-block" target="_blank" rel="noopener noreferrer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-[#FFC107] hover:bg-[#FFD54F] text-black text-sm md:text-base font-bold rounded-lg shadow-lg transition-colors"
                            >
                                Click Here To Learn How
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
