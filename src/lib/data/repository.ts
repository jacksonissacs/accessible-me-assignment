import type {
  EventFilter,
  IntelligenceEvent,
  IntelligenceItem,
  RelationshipGraph,
  SearchHit,
} from "@/lib/domain/types"
import { MockIntelligenceRepository } from "@/lib/data/mock-repository"

export interface IntelligenceRepository {
  listEvents(filter?: EventFilter): IntelligenceEvent[]
  getEvent(id: string): IntelligenceEvent | undefined
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
