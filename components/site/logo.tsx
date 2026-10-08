import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.brandName}, inicio`}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-lg font-display text-xl tracking-tight focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className
      )}
    >
      <span>UKNOW</span>
      <span className="inline-block -rotate-6 rounded-lg border-2 border-white bg-brand px-1.5 leading-tight text-ink shadow-[0_2px_6px_rgb(0_0_0/0.18)] transition-transform duration-200 group-hover:rotate-3">
        calcos
      </span>
    </Link>
  )
}
