"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import { ScreenHead } from "@/components/common/screen-head"
import { events } from "@/data/events"
import { uniqueMarkets } from "@/lib/events"

export function MarketsScreen() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return uniqueMarkets(events).filter(({ market }) =>
      q ? `${market.name} ${market.venue}`.toLowerCase().includes(q) : true,
    )
  }, [query])

  return (
    <section className="aion-screen">
      <ScreenHead
        title="Markets"
        description="Instruments moving with the current event book."
      />
      <label className="aion-search-large">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search markets and venues…"
          aria-label="Search markets"
        />
      </label>
      <div className="aion-watch-head">
        <span>Market</span>
        <span>Last</span>
        <span>Change</span>
        <span>Linked events</span>
        <span>Venue</span>
      </div>
      {rows.map(({ market, eventIds }) => (
        <button
          type="button"
          className="aion-watch-row"
          key={market.id}
          onClick={() => router.push(`/events/${eventIds[0]}`)}
        >
          <span>
            <span className="aion-watch-name">{market.name}</span>
            <span className="aion-watch-sub">{market.unit}</span>
          </span>
          <span className="aion-mono">{market.last}</span>
          <span className={market.changePct < 0 ? "aion-down" : "aion-up"}>
            {market.changePct > 0 ? "+" : ""}
            {market.changePct.toFixed(1)}
          </span>
          <span>{eventIds.length}</span>
          <span className="aion-mono">{market.venue}</span>
        </button>
      ))}
    </section>
  )
}
