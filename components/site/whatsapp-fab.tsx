"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const SHOW_AFTER_PX = 600

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribinos por WhatsApp"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 45 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="group fixed right-5 bottom-5 z-50 flex h-14 items-center gap-2 rounded-full border-[3px] border-white bg-[#25d366] px-4 font-semibold text-ink shadow-[0_12px_28px_-10px_rgb(0_0_0/0.5)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <MessageCircle className="size-6" aria-hidden />
          <span className="hidden sm:inline">Escribinos</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
