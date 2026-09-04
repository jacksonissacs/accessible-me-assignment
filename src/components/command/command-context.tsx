"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

interface CommandContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const CommandContext = createContext<CommandContextValue | null>(null)

export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((value) => !value), [])
  const value = useMemo(
    () => ({ open, setOpen, toggle }),
    [open, toggle],
  )
  return (
    <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
  )
}

export function useCommandPalette() {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error("useCommandPalette must be used within CommandProvider")
  }
  return context
}
