import Link from "next/link"

import { DeltaMark } from "@/components/shared/delta-mark"
import { FEED_KIND_LABEL, type IntelligenceEvent, type IntelligenceItem } from "@/lib/domain/types"
import { formatDateTime, formatDomain } from "@/lib/format"

export function EventFeed({
  items,
  events,
}: {
  items: IntelligenceItem[]
  events: IntelligenceEvent[]
}) {
  const byId = new Map(events.map((event) => [event.id, event]))

  return (
    <section aria-labelledby="feed-heading" className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Intelligence
          </p>
          <h2 id="feed-heading" className="text-sm font-medium">
            What changed
          </h2>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {items.length} items
        </p>
      </div>

      <ol className="divide-y divide-border/80 rounded-lg border bg-card/60">
        {items.map((item) => {
          const event = byId.get(item.eventId)
          return (
            <li key={item.id}>
              <Link
                href={`/events/${item.eventId}`}
                className="grid gap-2 px-3 py-3.5 transition-colors hover:bg-muted/40 sm:grid-cols-[7.5rem_5.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-4"
              >
                <time
                  dateTime={item.occurredAt}
                  className="font-mono text-[11px] text-muted-foreground"
                >
                  {formatDateTime(item.occurredAt)}
                </time>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55">
                  {FEED_KIND_LABEL[item.kind]}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] leading-snug text-foreground">
                    {item.headline}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                  {event ? (
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                      {formatDomain(event.domain)} · {event.region}
                    </p>
                  ) : null}
                </div>
                <div className="sm:pt-0.5 sm:text-right">
                  {item.deltaPp !== undefined ? (
                    <DeltaMark delta={item.deltaPp} />
                  ) : (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      —
                    </span>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
