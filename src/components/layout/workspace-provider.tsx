"use client"

import { useRouter } from "next/navigation"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { events, getEvent } from "@/data/events"
import { defaultWatchlistIds } from "@/data/workspace"
import type { AionEvent } from "@/types/event"

interface WorkspaceContextValue {
  collapsed: boolean
  toggleCollapsed: () => void
  paletteOpen: boolean
  setPaletteOpen: (open: boolean) => void
  callEvent: AionEvent | null
  openCall: (event: AionEvent) => void
  closeCall: () => void
  watchlist: Set<string>
  isWatched: (id: string) => boolean
  toggleWatch: (id: string) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [callEvent, setCallEvent] = useState<AionEvent | null>(null)
  const [watchlist, setWatchlist] = useState<Set<string>>(
    () => new Set(defaultWatchlistIds),
  )
  const toggleCollapsed = useCallback(() => {
    setCollapsed((value) => !value)
  }, [])

  const openCall = useCallback((event: AionEvent) => {
    setCallEvent(event)
  }, [])

  const closeCall = useCallback(() => {
    setCallEvent(null)
  }, [])

  const isWatched = useCallback((id: string) => watchlist.has(id), [watchlist])

  const toggleWatch = useCallback((id: string) => {
    setWatchlist((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen((value) => !value)
      }
      if (event.key === "Escape") {
        setPaletteOpen(false)
        setCallEvent(null)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const value = useMemo(
    () => ({
      collapsed,
      toggleCollapsed,
      paletteOpen,
      setPaletteOpen,
      callEvent,
      openCall,
      closeCall,
      watchlist,
      isWatched,
      toggleWatch,
    }),
    [
      collapsed,
      toggleCollapsed,
      paletteOpen,
      callEvent,
      openCall,
      closeCall,
      watchlist,
      isWatched,
      toggleWatch,
    ],
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider")
  }
  return context
}

export function useOptionalWorkspace() {
  return useContext(WorkspaceContext)
}

export function useEventFromBook(id?: string | null) {
  const router = useRouter()
  return {
    event: id ? getEvent(id) : events[0],
    open: (eventId: string) => router.push(`/events/${eventId}`),
    catalog: events,
  }
}
