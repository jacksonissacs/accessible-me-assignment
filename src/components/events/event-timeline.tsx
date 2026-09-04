"use client"

import { useState } from "react"

import type { TimelineItem } from "@/types/event"

export function EventTimeline({ items }: { items: readonly TimelineItem[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="aion-timeline">
      {items.map((item, index) => (
        <button
          type="button"
          key={`${item.time}-${item.text}`}
          className="aion-timeline-item"
          data-active={active === index}
          onClick={() => setActive(index)}
        >
          <div className="aion-timeline-time aion-mono">{item.time}</div>
          <div className="aion-timeline-text">
            {item.text}{" "}
            {item.type === "source" ? <span className="aion-chip">↗ source</span> : null}
            {item.delta ? (
              <span
                className={`aion-mono ${item.tone === "up" ? "aion-up" : item.tone === "down" ? "aion-down" : ""}`}
                style={{ marginLeft: 6, fontSize: 11 }}
              >
                {item.delta}
              </span>
            ) : null}
          </div>
        </button>
      ))}
    </div>
  )
}
