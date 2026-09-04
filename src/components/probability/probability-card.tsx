import Link from "next/link"

import { DeltaMark } from "@/components/shared/delta-mark"
import { SignificanceMark } from "@/components/shared/significance-mark"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  formatProbability,
  movementDirection,
  probabilityDelta,
} from "@/lib/domain/scoring"
import { formatDomain } from "@/lib/format"
import type { IntelligenceEvent } from "@/lib/domain/types"

export function ProbabilityCard({ event }: { event: IntelligenceEvent }) {
  const delta = probabilityDelta(
    event.currentProbability,
    event.previousProbability,
  )
  const direction = movementDirection(delta)

  return (
    <Link href={`/events/${event.id}`} className="block min-w-[16.5rem] flex-1">
      <Card
        size="sm"
        className={cn(
          "h-full rounded-lg bg-card/80 ring-foreground/8 transition-colors hover:bg-muted/40 hover:ring-foreground/16",
          direction === "up" && "bg-foreground/[0.035]",
        )}
      >
        <CardContent className="flex h-full flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {formatDomain(event.domain)}
            </span>
            <SignificanceMark value={event.significance} />
          </div>
          <p className="line-clamp-2 text-[13px] leading-snug text-foreground">
            {event.title}
          </p>
          <div className="mt-auto flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] text-muted-foreground">Now</p>
              <p className="tabular font-mono text-2xl leading-none tracking-tight">
                {formatProbability(event.currentProbability)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[11px] text-muted-foreground">
                from {formatProbability(event.previousProbability)}
              </p>
              <DeltaMark delta={delta} className="text-xs" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
