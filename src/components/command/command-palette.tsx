"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useCommandPalette } from "@/components/command/command-context"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { getRepository } from "@/lib/data/repository"
import type { SearchHit } from "@/lib/domain/types"

const KIND_LABEL: Record<SearchHit["kind"], string> = {
  event: "Events",
  market: "Markets",
  command: "Commands",
}

export function CommandPalette() {
  const router = useRouter()
  const { open, setOpen } = useCommandPalette()
  const hits = getRepository().search("")

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(!open)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, setOpen])

  const run = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <CommandPaletteInner
      open={open}
      onOpenChange={setOpen}
      initialHits={hits}
      onRun={run}
    />
  )
}

function CommandPaletteInner({
  open,
  onOpenChange,
  initialHits,
  onRun,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialHits: SearchHit[]
  onRun: (href: string) => void
}) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="AION command palette"
      description="Search events, markets, and navigation."
      className="sm:max-w-xl"
    >
      <LiveCommand initialHits={initialHits} onRun={onRun} />
    </CommandDialog>
  )
}

function LiveCommand({
  initialHits,
  onRun,
}: {
  initialHits: SearchHit[]
  onRun: (href: string) => void
}) {
  const grouped = groupHits(initialHits)

  return (
    <Command
      className="rounded-none bg-transparent"
      filter={(value, search) => {
        const hay = value.toLowerCase()
        const tokens = search.toLowerCase().split(/\s+/).filter(Boolean)
        return tokens.every((token) => hay.includes(token)) ? 1 : 0
      }}
    >
      <CommandInput placeholder="Search events, markets, analogues…" />
      <CommandList>
        <CommandEmpty>No matching intelligence.</CommandEmpty>
        {grouped.map((group, index) => (
          <div key={group.kind}>
            {index > 0 ? <CommandSeparator /> : null}
            <CommandGroup heading={KIND_LABEL[group.kind]}>
              {group.hits.map((hit) => (
                <CommandItem
                  key={hit.id}
                  value={`${hit.title} ${hit.subtitle} ${hit.kind}`}
                  onSelect={() => onRun(hit.href)}
                >
                  <span className="min-w-0 flex-1 truncate">{hit.title}</span>
                  <CommandShortcut>{hit.subtitle}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </Command>
  )
}

function groupHits(hits: SearchHit[]): { kind: SearchHit["kind"]; hits: SearchHit[] }[] {
  const order: SearchHit["kind"][] = ["event", "market", "command"]
  return order
    .map((kind) => ({ kind, hits: hits.filter((hit) => hit.kind === kind) }))
    .filter((group) => group.hits.length > 0)
}
