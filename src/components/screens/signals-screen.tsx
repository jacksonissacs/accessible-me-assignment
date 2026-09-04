"use client"

import { useMemo, useState } from "react"

import { ScreenHead } from "@/components/common/screen-head"
import { SignalCard } from "@/components/intelligence/signal-card"
import { events } from "@/data/events"
import { uniqueSignals } from "@/lib/events"
import { EVENT_CATEGORIES, type EventCategory } from "@/types/event"

export function SignalsScreen() {
  const [category, setCategory] = useState<EventCategory | "All">("All")
  const signals = useMemo(() => {
    const rows = uniqueSignals(events)
    return category === "All" ? rows : rows.filter((row) => row.category === category)
  }, [category])

  return (
    <section className="aion-screen">
      <ScreenHead
        title="Signals"
        description="Cross-market and source prints attached to open events."
      />
      <div className="aion-filters" aria-label="Signal filters">
        {(["All", ...EVENT_CATEGORIES] as const).map((item) => (
          <button
            type="button"
            key={item}
            className="aion-filter"
            data-active={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="aion-signal-grid">
        {signals.map((signal) => (
          <SignalCard
            key={`${signal.eventId}-${signal.id}`}
            signal={signal}
            eventId={signal.eventId}
            eventTitle={signal.eventTitle}
            category={signal.category}
            displayTime={signal.displayTime}
          />
        ))}
      </div>
    </section>
  )
}
