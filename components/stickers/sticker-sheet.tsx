import type { Sheet } from "@/lib/data"
import { cn } from "@/lib/utils"
import { StickerArt } from "./sticker-art"

type Slot = { left: number; top: number; width: number; rotate: number }

/**
 * Sticker positions as % of the sheet (3:4). Slot 0 is the hero sticker.
 * The bottom ~18% is kept clear for the printed label.
 */
const LAYOUTS: Slot[][] = [
  [
    { left: 5, top: 4, width: 54, rotate: -6 },
    { left: 58, top: 5, width: 38, rotate: 8 },
    { left: 60, top: 33, width: 34, rotate: -5 },
    { left: 4, top: 46, width: 34, rotate: 7 },
    { left: 38, top: 44, width: 22, rotate: -12 },
    { left: 34, top: 61, width: 28, rotate: 10 },
    { left: 66, top: 60, width: 28, rotate: -8 },
  ],
  [
    { left: 26, top: 18, width: 48, rotate: 5 },
    { left: 4, top: 4, width: 32, rotate: -10 },
    { left: 62, top: 3, width: 32, rotate: 10 },
    { left: 3, top: 34, width: 30, rotate: 6 },
    { left: 72, top: 44, width: 24, rotate: -8 },
    { left: 6, top: 57, width: 32, rotate: -6 },
    { left: 44, top: 58, width: 30, rotate: 8 },
  ],
]

type StickerSheetProps = {
  sheet: Sheet
  /** Picks one of the layouts so neighbouring sheets don't look identical. */
  variant?: number
  className?: string
}

export function StickerSheet({ sheet, variant = 0, className }: StickerSheetProps) {
  const layout = LAYOUTS[variant % LAYOUTS.length]

  return (
    <div
      role="img"
      aria-label={`Plancha ${sheet.name} con ${sheet.stickers.length} calcos`}
      className={cn(
        "@container relative aspect-[3/4] w-full overflow-hidden rounded-[3cqw] shadow-[0_14px_30px_-14px_rgb(0_0_0/0.55)]",
        sheet.dark ? "text-white" : "text-ink",
        className
      )}
      style={{ backgroundColor: sheet.backing }}
    >
      <div aria-hidden className="absolute inset-[2.5cqw] rounded-[2cqw] border border-dashed border-current/20" />

      {sheet.stickers.slice(0, layout.length).map((kind, i) => {
        const slot = layout[i]
        return (
          <div
            key={`${kind}-${i}`}
            className="absolute"
            style={{
              left: `${slot.left}%`,
              top: `${slot.top}%`,
              width: `${slot.width}%`,
              transform: `rotate(${slot.rotate}deg)`,
            }}
          >
            <StickerArt kind={kind} shadow={false} className="kiss-cut h-auto w-full" />
          </div>
        )
      })}

      <div className="absolute inset-x-[5cqw] bottom-[4cqw] flex items-end justify-between gap-[2cqw]">
        <div className="min-w-0">
          <p className="font-mono text-[3.2cqw] tracking-[0.18em] uppercase opacity-60">
            Plancha N.º {sheet.code} · {sheet.stickers.length} calcos
          </p>
          <p className="truncate font-display text-[11cqw] leading-[0.95] uppercase">{sheet.name}</p>
        </div>
        <span
          aria-hidden
          className="mb-[1.5cqw] shrink-0 -rotate-6 rounded-[1.2cqw] bg-brand px-[1.8cqw] py-[0.6cqw] font-display text-[4.6cqw] leading-none text-ink"
        >
          UK
        </span>
      </div>
    </div>
  )
}
