import type {
  EventFilter,
  IntelligenceItem,
  RelationshipGraph,
  SearchHit,
} from "@/lib/domain/types"
import { MockIntelligenceRepository } from "@/lib/data/mock-repository"
import type { AionEvent } from "@/types/event"

export interface IntelligenceRepository {
  listEvents(filter?: EventFilter): AionEvent[]
  getEvent(id: string): AionEvent | undefined
  listFeed(filter?: EventFilter): IntelligenceItem[]
  getGraph(): RelationshipGraph
  search(query: string): SearchHit[]
}

let instance: IntelligenceRepository | undefined

export function getRepository(): IntelligenceRepository {
  instance ??= new MockIntelligenceRepository()
  return instance
}

export function __resetRepositoryForTests(
  next?: IntelligenceRepository,
): void {
  instance = next
}
