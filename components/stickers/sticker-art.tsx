import type { ReactNode, SVGProps } from "react"
import { cn } from "@/lib/utils"

export type StickerKind =
  | "sun"
  | "mate"
  | "che"
  | "heart"
  | "badge24"
  | "flower"
  | "butterfly"
  | "bolt"
  | "smiley"
  | "logo"
  | "spray"
  | "crown"
  | "flame"
  | "eye"
  | "star"
  | "tag"
  | "drip"
  | "skate"

const INK = "#1d1f26"
const LIME = "#c6f432"
const STROKE = { stroke: INK, strokeWidth: 5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const }
const DISPLAY_FONT = "var(--font-display), system-ui, sans-serif"

/** Shared SVG filter that adds the white die-cut border. Render once per page. */
export function StickerDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        <filter id="diecut" x="-15%" y="-15%" width="130%" height="130%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="spread" />
          <feFlood floodColor="#ffffff" />
          <feComposite in2="spread" operator="in" result="border" />
          <feMerge>
            <feMergeNode in="border" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

const radial = (count: number, inner: number, outer: number, cx = 100, cy = 100) =>
  Array.from({ length: count * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI * i) / count - Math.PI / 2
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(" ")

const Face = ({ y = 100 }: { y?: number }) => (
  <g>
    <circle cx="82" cy={y - 8} r="6" fill={INK} />
    <circle cx="118" cy={y - 8} r="6" fill={INK} />
    <circle cx="70" cy={y + 8} r="7" fill="#ff8fa3" opacity="0.7" />
    <circle cx="130" cy={y + 8} r="7" fill="#ff8fa3" opacity="0.7" />
    <path d={`M84 ${y + 10} Q100 ${y + 26} 116 ${y + 10}`} fill="none" {...STROKE} />
  </g>
)

const ART: Record<StickerKind, ReactNode> = {
  sun: (
    <g>
      <polygon points={radial(12, 58, 90)} fill="#ff9f1c" {...STROKE} />
      <circle cx="100" cy="100" r="54" fill="#ffd23f" {...STROKE} />
      <Face />
    </g>
  ),
  mate: (
    <g>
      <path d="M118 84 L146 22" stroke="#c9ced6" strokeWidth="9" strokeLinecap="round" />
      <path d="M118 84 L146 22" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <rect x="138" y="14" width="18" height="10" rx="4" fill="#c9ced6" {...STROKE} strokeWidth={4} />
      <path d="M54 92 Q48 172 100 176 Q152 172 146 92 Z" fill="#a0612f" {...STROKE} />
      <rect x="48" y="78" width="104" height="20" rx="8" fill="#d9dde3" {...STROKE} />
      <ellipse cx="100" cy="80" rx="44" ry="6" fill="#5a8f29" />
      <text x="100" y="146" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="800" fontSize="30" fill="#fff4e0">
        MATE
      </text>
    </g>
  ),
  che: (
    <g>
      <path
        d="M48 42 H152 Q182 42 182 72 V112 Q182 142 152 142 H82 L52 170 L58 142 H48 Q18 142 18 112 V72 Q18 42 48 42 Z"
        fill="#6cc3f0"
        {...STROKE}
      />
      <text x="100" y="112" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="800" fontSize="50" fill={INK}>
        ¡CHE!
      </text>
    </g>
  ),
  heart: (
    <g>
      <path
        d="M100 172 C40 132 14 96 34 60 C52 28 90 30 100 62 C110 30 148 28 166 60 C186 96 160 132 100 172 Z"
        fill="#ff5a5f"
        {...STROKE}
      />
      <path d="M52 66 Q58 50 74 48" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      <text x="100" y="114" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="800" fontSize="30" fill="#fff">
        AMOR
      </text>
    </g>
  ),
  badge24: (
    <g>
      <polygon points={radial(16, 72, 90)} fill="#ffd23f" {...STROKE} />
      <circle cx="100" cy="100" r="58" fill={INK} />
      <text x="100" y="84" textAnchor="middle" fontFamily={DISPLAY_FONT} fontSize="16" letterSpacing="3" fill="#ffd23f">
        CALIDAD
      </text>
      <text x="100" y="130" textAnchor="middle" fontFamily={DISPLAY_FONT} fontSize="48" letterSpacing="1" fill="#fff">
        PRO
      </text>
    </g>
  ),
  flower: (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="56"
          rx="22"
          ry="40"
          fill={i % 2 ? "#ff8fb8" : "#ffb3d0"}
          {...STROKE}
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="30" fill="#ffd23f" {...STROKE} />
      <circle cx="92" cy="94" r="4" fill={INK} />
      <circle cx="108" cy="94" r="4" fill={INK} />
      <path d="M92 108 Q100 116 108 108" fill="none" {...STROKE} strokeWidth={4} />
    </g>
  ),
  butterfly: (
    <g>
      <path d="M94 54 Q84 30 72 26 M106 54 Q116 30 128 26" fill="none" {...STROKE} strokeWidth={4} />
      <ellipse cx="62" cy="76" rx="44" ry="36" fill="#a78bfa" {...STROKE} transform="rotate(-20 62 76)" />
      <ellipse cx="138" cy="76" rx="44" ry="36" fill="#a78bfa" {...STROKE} transform="rotate(20 138 76)" />
      <ellipse cx="70" cy="132" rx="30" ry="26" fill="#ff9f1c" {...STROKE} transform="rotate(20 70 132)" />
      <ellipse cx="130" cy="132" rx="30" ry="26" fill="#ff9f1c" {...STROKE} transform="rotate(-20 130 132)" />
      <circle cx="58" cy="74" r="12" fill="#fff" opacity="0.65" />
      <circle cx="142" cy="74" r="12" fill="#fff" opacity="0.65" />
      <rect x="92" y="50" width="16" height="110" rx="8" fill={INK} />
    </g>
  ),
  bolt: (
    <g>
      <polygon points="112,14 46,108 94,108 80,186 154,82 106,82 124,14" fill="#ffe14d" {...STROKE} />
      <g transform="rotate(-10 100 150)">
        <rect x="34" y="132" width="132" height="36" rx="18" fill={INK} />
        <text x="100" y="158" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="800" fontSize="20" letterSpacing="1" fill="#fff">
          RE PIOLA
        </text>
      </g>
    </g>
  ),
  smiley: (
    <g>
      <circle cx="100" cy="100" r="80" fill="#ffd23f" {...STROKE} />
      <ellipse cx="74" cy="80" rx="9" ry="16" fill={INK} />
      <ellipse cx="126" cy="80" rx="9" ry="16" fill={INK} />
      <path d="M56 112 Q100 162 144 112" fill="none" {...STROKE} strokeWidth={7} />
    </g>
  ),
  logo: (
    <g>
      <rect x="20" y="40" width="160" height="120" rx="26" fill="#ffffff" {...STROKE} />
      <rect x="34" y="54" width="132" height="92" rx="16" fill="none" stroke="#6cc3f0" strokeWidth="4" strokeDasharray="10 8" />
      <text x="100" y="98" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="800" fontSize="30" fill={INK}>
        TU LOGO
      </text>
      <text x="100" y="128" textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight="700" fontSize="20" fill="#2a8fd0">
        ACÁ ✦
      </text>
    </g>
  ),
  spray: (
    <g>
      {[
        [138, 30, 5],
        [154, 20, 3],
        [158, 40, 6],
        [174, 30, 4],
        [176, 52, 3],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={LIME} stroke={INK} strokeWidth="2.5" />
      ))}
      <g transform="rotate(-14 100 110)">
        <rect x="64" y="62" width="68" height="120" rx="14" fill="#ff5a5f" {...STROKE} />
        <rect x="64" y="96" width="68" height="46" fill={INK} />
        <text x="98" y="130" textAnchor="middle" fontFamily={DISPLAY_FONT} fontSize="28" fill={LIME}>
          UK
        </text>
        <path d="M70 64 Q98 30 126 64 Z" fill="#c9ced6" {...STROKE} />
        <rect x="88" y="28" width="20" height="16" rx="4" fill={INK} />
        <path d="M78 156 V170" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
      </g>
    </g>
  ),
  crown: (
    <g>
      <path d="M32 150 L22 64 L68 102 L100 42 L132 102 L178 64 L168 150 Z" fill="#ffd23f" {...STROKE} />
      <rect x="26" y="144" width="148" height="28" rx="8" fill="#ff9f1c" {...STROKE} />
      {[
        [22, 60],
        [100, 38],
        [178, 60],
      ].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="11" fill="#ff5a5f" {...STROKE} />
      ))}
      <circle cx="100" cy="118" r="13" fill="#6cc3f0" {...STROKE} />
    </g>
  ),
  flame: (
    <g>
      <path
        d="M100 16 C122 58 164 76 160 126 C158 162 132 186 100 186 C68 186 40 162 40 128 C40 98 62 82 70 58 C80 82 86 90 94 94 C90 66 88 40 100 16 Z"
        fill="#ff5a1f"
        {...STROKE}
      />
      <path
        d="M100 94 C112 118 132 126 130 150 C128 170 116 180 100 180 C84 180 70 168 70 150 C70 134 82 128 86 114 C92 126 96 128 98 128 C96 114 96 104 100 94 Z"
        fill="#ffd23f"
        {...STROKE}
        strokeWidth={4}
      />
    </g>
  ),
  eye: (
    <g>
      <path d="M40 81 L28 66 M66 68 L58 50 M100 62 V42 M134 68 L142 50 M160 81 L172 66" fill="none" {...STROKE} />
      <path d="M14 100 Q100 24 186 100 Q100 176 14 100 Z" fill="#ffffff" {...STROKE} />
      <circle cx="100" cy="100" r="36" fill={LIME} {...STROKE} />
      <circle cx="100" cy="100" r="16" fill={INK} />
      <circle cx="90" cy="88" r="7" fill="#ffffff" />
    </g>
  ),
  star: (
    <g>
      <polygon points={radial(5, 44, 90)} fill={LIME} {...STROKE} />
      <Face y={104} />
    </g>
  ),
  tag: (
    <g transform="rotate(-8 100 100)">
      {[
        [64, 30],
        [104, 46],
        [142, 22],
      ].map(([x, len]) => (
        <g key={x}>
          <path d={`M${x} 112 V${112 + len}`} stroke={INK} strokeWidth="15" strokeLinecap="round" />
          <path d={`M${x} 112 V${112 + len}`} stroke="#ff5a5f" strokeWidth="7" strokeLinecap="round" />
        </g>
      ))}
      <text
        x="100"
        y="122"
        textAnchor="middle"
        fontFamily={DISPLAY_FONT}
        fontSize="64"
        fill="#ff5a5f"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        UKNOW
      </text>
      <polygon points={radial(4, 4, 14, 172, 52)} fill={LIME} stroke={INK} strokeWidth="3" />
      <polygon points={radial(4, 3, 10, 26, 62)} fill={LIME} stroke={INK} strokeWidth="3" />
    </g>
  ),
  drip: (
    <g>
      <path
        d="M24 96 A76 76 0 0 1 176 96 L176 120 Q176 132 166 132 Q158 132 158 144 L158 166 Q158 180 146 180 Q134 180 134 166 L134 150 Q134 140 124 140 Q114 140 114 152 L114 158 Q114 170 104 170 Q94 170 94 158 L94 146 Q94 136 82 136 Q70 136 70 150 L70 176 Q70 188 58 188 Q46 188 46 176 L46 142 Q46 132 36 132 Q24 132 24 120 Z"
        fill={LIME}
        {...STROKE}
      />
      <path d="M62 68 L82 88 M82 68 L62 88 M118 68 L138 88 M138 68 L118 88" fill="none" {...STROKE} strokeWidth={7} />
      <path d="M66 106 Q100 134 134 106" fill="none" {...STROKE} strokeWidth={7} />
    </g>
  ),
  skate: (
    <g transform="rotate(-32 100 100)">
      <rect x="40" y="122" width="26" height="9" rx="3" fill={INK} />
      <rect x="134" y="122" width="26" height="9" rx="3" fill={INK} />
      <circle cx="53" cy="140" r="13" fill="#ffd23f" {...STROKE} />
      <circle cx="147" cy="140" r="13" fill="#ffd23f" {...STROKE} />
      <rect x="14" y="74" width="172" height="52" rx="26" fill="#ff5a5f" {...STROKE} />
      <text x="100" y="112" textAnchor="middle" fontFamily={DISPLAY_FONT} fontSize="30" letterSpacing="2" fill="#ffffff">
        BARRIO
      </text>
    </g>
  ),
}

type StickerArtProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  kind: StickerKind
  title?: string
  /** Lift shadow; turn off when the sticker is printed flat on a sheet. */
  shadow?: boolean
}

export function StickerArt({ kind, title, shadow = true, className, ...props }: StickerArtProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn(shadow && "sticker-shadow", "overflow-visible", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g filter="url(#diecut)">{ART[kind]}</g>
    </svg>
  )
}
