"use client"

import { useRouter } from "next/navigation"

import { ChangeIndicator } from "@/components/events/change-indicator"
import { ProbabilityBadge } from "@/components/events/probability-badge"
import { SourceBadge } from "@/components/events/source-badge"
import { useWorkspace } from "@/components/layout/workspace-provider"
import type { AionEvent } from "@/types/event"

export function EventRow({ event }: { event: AionEvent }) {
  const router = useRouter()
  const { isWatched, toggleWatch } = useWorkspace()

  return (
    <div className="aion-event-row">
      <button
        type="button"
        className="aion-event-row-main"
        onClick={() => router.push(`/events/${event.id}`)}
      >
        <span>
          <span className="aion-watch-name">{event.title}</span>
          <span className="aion-watch-sub">
            {event.category} · {event.displayTime} · {event.status}
          </span>
        </span>
        <span>
          <ProbabilityBadge value={event.probability} size="sm" />
        </span>
        <span>
          <ChangeIndicator change={event.change} />
        </span>
        <span className="aion-event-row-meta">
          <SourceBadge tier={event.sourceTier} />
        </span>
        <span className="aion-mono aion-event-row-meta">{event.sigma.toFixed(1)}σ</span>
      </button>
      <button
        type="button"
        className="aion-button"
        data-quiet="true"
        aria-label={isWatched(event.id) ? `Unfollow ${event.title}` : `Follow ${event.title}`}
        aria-pressed={isWatched(event.id)}
        onClick={() => toggleWatch(event.id)}
      >
        {isWatched(event.id) ? "Following" : "Follow"}
      </button>
    </div>
  )
}
