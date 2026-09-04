"use client"

import { MenuIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useCommandPalette } from "@/components/command/command-context"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarNav } from "@/components/shell/sidebar"

export function TopBar() {
  const { setOpen } = useCommandPalette()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-12 items-center gap-3 border-b bg-background/85 px-3 backdrop-blur-md md:px-4">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label="Open navigation"
            />
          }
        >
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-sidebar">
          <SheetHeader>
            <SheetTitle className="font-mono text-xs tracking-[0.28em]">
              AION
            </SheetTitle>
            <SheetDescription>Event intelligence</SheetDescription>
          </SheetHeader>
          <SidebarNav
            className="px-2"
            onNavigate={() => setSheetOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <Link href="/" className="flex items-baseline gap-2">
        <span className="font-mono text-[13px] font-medium tracking-[0.32em]">
          AION
        </span>
        <span className="hidden text-[11px] text-muted-foreground sm:inline">
          Event intelligence
        </span>
      </Link>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ml-auto flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border border-border/80 bg-muted/40 px-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:max-w-md"
      >
        <SearchIcon className="size-3.5 shrink-0" />
        <span className="truncate">Search the book…</span>
        <span className="ml-auto hidden items-center gap-1 sm:flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      <LiveClock />
    </header>
  )
}

function LiveClock() {
  const [now, setNow] = useState<string>("")

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
        day: "2-digit",
        month: "short",
      }).format(new Date())

    const tick = () => setNow(format())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="hidden items-center gap-2 font-mono text-[11px] tracking-wide text-muted-foreground md:flex">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
      </span>
      <span>LIVE</span>
      <span className="tabular text-foreground/80">{now || "—"}</span>
      <span>UTC</span>
    </div>
  )
}
