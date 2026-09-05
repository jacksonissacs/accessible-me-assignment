import { events } from "@/data/events"
import { feed, graphEdges, graphNodes } from "@/lib/data/mock-catalog"
import type { IntelligenceRepository } from "@/lib/data/repository"
import { domainCategories } from "@/lib/domain/categories"
import { probabilityDelta } from "@/lib/domain/scoring"
import type { Domain, EventFilter, RelationshipGraph, SearchHit } from "@/lib/domain/types"
import { searchCatalog } from "@/lib/search/command-index"
import type { AionEvent } from "@/types/event"

function matchesFilter(event: AionEvent, filter?: EventFilter): boolean {
  if (filter?.domain && filter.domain !== "all") {
    if (!domainCategories(filter.domain).includes(event.category)) {
      return false
    }
  }
  if (filter?.query) {
    const q = filter.query.trim().toLowerCase()
    if (!q) return true
    const haystack = [
      event.title,
      event.question,
      event.summary,
      event.region,
      event.category,
      ...event.tags,
    ]
      .join(" ")
      .toLowerCase()
    return haystack.includes(q)
  }
  return true
}

export class MockIntelligenceRepository implements IntelligenceRepository {
  listEvents(filter?: EventFilter): AionEvent[] {
    return events
      .filter((event) => matchesFilter(event, filter))
      .slice()
      .sort((a, b) => {
        const aMove = Math.abs(probabilityDelta(a.probability, a.previousProbability))
        const bMove = Math.abs(probabilityDelta(b.probability, b.previousProbability))
        return bMove - aMove || b.timestamp.localeCompare(a.timestamp)
      })
  }

  getEvent(id: string): AionEvent | undefined {
    return events.find((event) => event.id === id)
  }

  listFeed(filter?: EventFilter) {
    const allowed = new Set(this.listEvents(filter).map((event) => event.id))
    return feed
      .filter((item) => allowed.has(item.eventId))
      .slice()
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
  }

  getGraph(): RelationshipGraph {
    const known = new Set(events.map((event) => event.id))
    return {
      nodes: graphNodes,
      edges: graphEdges.filter(
        (edge) => known.has(edge.source) && known.has(edge.target),
      ),
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
