import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const GlassInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-14 w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-lg",
                    "text-white placeholder:text-white/30 focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary",
                    "transition-all duration-300 hover:bg-white/10",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
GlassInput.displayName = "GlassInput";

export { GlassInput };
