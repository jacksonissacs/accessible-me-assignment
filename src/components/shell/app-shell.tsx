"use client"

import { Suspense, type ReactNode } from "react"

import { CommandPalette } from "@/components/command/command-palette"
import { CommandProvider } from "@/components/command/command-context"
import { SidebarNav } from "@/components/shell/sidebar"
import { TopBar } from "@/components/shell/top-bar"
import { TooltipProvider } from "@/components/ui/tooltip"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <CommandProvider>
      <TooltipProvider>
        <div className="flex min-h-screen flex-col">
          <TopBar />
          <div className="flex flex-1">
            <aside className="sticky top-12 hidden h-[calc(100vh-3rem)] w-56 shrink-0 border-r bg-sidebar/80 px-3 py-5 md:block">
              <Suspense fallback={null}>
                <SidebarNav />
              </Suspense>
            </aside>
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        </div>
        <CommandPalette />
      </TooltipProvider>
    </CommandProvider>
  )
}
