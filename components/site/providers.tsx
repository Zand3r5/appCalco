"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { MotionConfig } from "framer-motion"
import { CartProvider } from "./cart-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <CartProvider>{children}</CartProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
