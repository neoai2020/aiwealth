import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";

// Inter - للأرقام والنص العادي (clear and readable)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Poppins - للعناوين الكبيرة (Bold titles like "Welcome")
const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Montserrat - للأرقام والعناوين الثانوية
const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AI Wealth | Income Sync OS",
  description: "Transform affiliate links into fully deployed, conversion-optimized digital assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          poppins.variable,
          montserrat.variable,
          "antialiased min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200"
        )}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

