"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

type CartContextValue = {
  count: number
  lastAdded: string | null
  add: (name: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const [lastAdded, setLastAdded] = useState<string | null>(null)

  const add = useCallback((name: string) => {
    setCount((c) => c + 1)
    setLastAdded(name)
  }, [])

  const value = useMemo(() => ({ count, lastAdded, add }), [count, lastAdded, add])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>")
  return ctx
}
