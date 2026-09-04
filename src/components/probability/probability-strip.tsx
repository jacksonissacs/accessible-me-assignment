import { ProbabilityCard } from "@/components/probability/probability-card"
import { probabilityDelta } from "@/lib/domain/scoring"
import type { IntelligenceEvent } from "@/lib/domain/types"

export function ProbabilityStrip({ events }: { events: IntelligenceEvent[] }) {
  const movers = events
    .slice()
    .sort((a, b) => {
      return (
        Math.abs(
          probabilityDelta(b.currentProbability, b.previousProbability),
        ) -
        Math.abs(
          probabilityDelta(a.currentProbability, a.previousProbability),
        )
      )
    })
    .slice(0, 6)

  return (
    <section aria-labelledby="movers-heading" className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Book
          </p>
          <h2 id="movers-heading" className="text-sm font-medium">
            Probability changes
          </h2>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {movers.length} movers
        </p>
      </div>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {movers.map((event) => (
          <ProbabilityCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
