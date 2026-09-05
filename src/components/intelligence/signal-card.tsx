"use client"

import { useRouter } from "next/navigation"

import type { EventCategory, EventSignal } from "@/types/event"

export function SignalCard({
  signal,
  eventId,
  eventTitle,
  category,
  displayTime,
}: {
  signal: EventSignal
  eventId: string
  eventTitle: string
  category: EventCategory
  displayTime: string
}) {
  const router = useRouter()
  return (
    <button
      type="button"
      className="aion-signal-card"
      onClick={() => router.push(`/events/${eventId}`)}
    >
      <div className="aion-card-meta">
        <span className="category">{category}</span>
        <span className="aion-mono">{displayTime}</span>
      </div>
      <h2>{signal.label}</h2>
      <p>{eventTitle}</p>
      <span
        className={`aion-mono ${signal.direction === "up" ? "aion-up" : signal.direction === "down" ? "aion-down" : ""}`}
        style={{ fontSize: 18 }}
      >
        {signal.value}
      </span>
    </button>
  )
}
