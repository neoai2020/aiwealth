"use client";

import { Headphones } from "lucide-react";
import Link from "next/link";

export function SupportDesk() {
    return (
        <div className="w-full mt-12 mb-8">
            <div className="bg-[#0D1117] border border-primary/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left Section: Icon and Text */}
                <div className="flex items-center gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white">Need Help?</h3>
                        <p className="text-sm text-gray-400">Our support team is here to assist you 24/7</p>
                    </div>
                </div>

                {/* Right Section: Button */}
                <Link href="mailto:AzonempireAI@neoai.freshdesk.com" className="shrink-0" target="_blank" rel="noopener noreferrer">
                    <button className="px-6 py-2.5 bg-primary hover:bg-primary/80 text-black text-sm font-semibold rounded-full transition-colors shadow-lg hover:shadow-primary/25">
                        Contact Support
                    </button>
                </Link>
            </div>
        </div>
    );
}
