import type { EventCategory } from "@/types/event"
import type { Domain } from "@/lib/domain/types"

export const CATEGORY_DOMAIN: Record<EventCategory, Domain> = {
  AI: "technology",
  Technology: "technology",
  Companies: "technology",
  Regulation: "technology",
  Economics: "finance",
  Markets: "finance",
  Crypto: "finance",
  Geopolitics: "geopolitics",
  Energy: "supply_chain",
  Science: "supply_chain",
}

export function domainCategories(domain: Domain): EventCategory[] {
  return (Object.entries(CATEGORY_DOMAIN) as [EventCategory, Domain][])
    .filter(([, value]) => value === domain)
    .map(([category]) => category)
}
