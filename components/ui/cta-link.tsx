import type { AnchorHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const ctaVariants = cva(
  "group/cta inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg:last-child]:translate-x-0.5",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[4px_4px_0_0_var(--brand)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--brand)]",
        brand:
          "bg-brand text-brand-foreground shadow-[4px_4px_0_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--ink)]",
        outline: "border-2 border-foreground/80 text-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof ctaVariants>

export function CtaLink({ className, variant, size, ...props }: CtaLinkProps) {
  return <a className={cn(ctaVariants({ variant, size }), className)} {...props} />
}
