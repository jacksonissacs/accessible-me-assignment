import {
  events,
  feed,
  graphEdges,
  graphNodes,
} from "@/lib/data/mock-catalog"
import type { IntelligenceRepository } from "@/lib/data/repository"
import { probabilityDelta } from "@/lib/domain/scoring"
import type {
  Domain,
  EventFilter,
  IntelligenceEvent,
  IntelligenceItem,
  RelationshipGraph,
  SearchHit,
} from "@/lib/domain/types"
import { searchCatalog } from "@/lib/search/command-index"

function matchesFilter(
  event: IntelligenceEvent,
  filter?: EventFilter,
): boolean {
  if (filter?.domain && filter.domain !== "all" && event.domain !== filter.domain) {
    return false
  }
  if (filter?.query) {
    const q = filter.query.trim().toLowerCase()
    if (!q) return true
    const haystack = [
      event.title,
      event.question,
      event.narrative,
      event.region,
      ...event.tags,
    ]
      .join(" ")
      .toLowerCase()
    return haystack.includes(q)
  }
  return true
}

export class MockIntelligenceRepository implements IntelligenceRepository {
  listEvents(filter?: EventFilter): IntelligenceEvent[] {
    return events
      .filter((event) => matchesFilter(event, filter))
      .slice()
      .sort((a, b) => {
        const aMove = Math.abs(
          probabilityDelta(a.currentProbability, a.previousProbability),
        )
        const bMove = Math.abs(
          probabilityDelta(b.currentProbability, b.previousProbability),
        )
        return bMove - aMove || b.updatedAt.localeCompare(a.updatedAt)
      })
  }

  getEvent(id: string): IntelligenceEvent | undefined {
    return events.find((event) => event.id === id)
  }

  listFeed(filter?: EventFilter): IntelligenceItem[] {
    const allowed = new Set(this.listEvents(filter).map((event) => event.id))
    return feed
      .filter((item) => allowed.has(item.eventId))
      .slice()
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
  }

  getGraph(): RelationshipGraph {
    return {
      nodes: graphNodes,
      edges: graphEdges,
    }
  }

  search(query: string): SearchHit[] {
    return searchCatalog(query, events)
  }
}

export function isDomain(value: string | undefined | null): value is Domain {
  return (
    value === "technology" ||
    value === "finance" ||
    value === "geopolitics" ||
    value === "supply_chain"
  )
}
