import { cn } from "../../lib/utils";
import React from "react";

export function GlassCard({ children, className, neon = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { neon?: boolean }) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6",
        neon && "neon-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
