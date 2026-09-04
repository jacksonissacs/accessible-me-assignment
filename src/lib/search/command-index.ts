import { DOMAIN_LABEL, type IntelligenceEvent, type SearchHit } from "@/lib/domain/types"

const STATIC_COMMANDS: SearchHit[] = [
  {
    id: "cmd-feed",
    kind: "command",
    title: "Open intelligence feed",
    subtitle: "Dashboard",
    href: "/",
  },
  {
    id: "cmd-graph",
    kind: "command",
    title: "Open relationship graph",
    subtitle: "Graph",
    href: "/graph",
  },
  {
    id: "cmd-tech",
    kind: "command",
    title: "Filter technology",
    subtitle: "Domain",
    href: "/?domain=technology",
  },
  {
    id: "cmd-fin",
    kind: "command",
    title: "Filter finance",
    subtitle: "Domain",
    href: "/?domain=finance",
  },
  {
    id: "cmd-geo",
    kind: "command",
    title: "Filter geopolitics",
    subtitle: "Domain",
    href: "/?domain=geopolitics",
  },
  {
    id: "cmd-sup",
    kind: "command",
    title: "Filter supply chain",
    subtitle: "Domain",
    href: "/?domain=supply_chain",
  },
]

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function tokens(query: string): string[] {
  return normalize(query).split(/\s+/).filter(Boolean)
}

function matches(haystack: string, queryTokens: string[]): boolean {
  const hay = haystack.toLowerCase()
  return queryTokens.every((token) => hay.includes(token))
}

export function searchCatalog(
  query: string,
  catalog: IntelligenceEvent[],
): SearchHit[] {
  const queryTokens = tokens(query)
  const commands = STATIC_COMMANDS.filter((command) =>
    queryTokens.length === 0
      ? true
      : matches(`${command.title} ${command.subtitle}`, queryTokens),
  )

  const eventHits: SearchHit[] = catalog
    .filter((event) =>
      queryTokens.length === 0
        ? true
        : matches(
            [
              event.title,
              event.question,
              event.region,
              event.domain,
              DOMAIN_LABEL[event.domain],
              ...event.tags,
            ].join(" "),
            queryTokens,
          ),
    )
    .map((event) => ({
      id: event.id,
      kind: "event" as const,
      title: event.title,
      subtitle: `${DOMAIN_LABEL[event.domain]} · ${event.currentProbability.toFixed(1)}%`,
      href: `/events/${event.id}`,
      domain: event.domain,
    }))

  const marketHits: SearchHit[] = []
  const seenMarkets = new Set<string>()
  for (const event of catalog) {
    for (const market of event.relatedMarkets) {
      if (seenMarkets.has(market.id)) continue
      const hay = `${market.name} ${market.venue} ${event.title} ${event.tags.join(" ")}`
      if (queryTokens.length > 0 && !matches(hay, queryTokens)) continue
      seenMarkets.add(market.id)
      marketHits.push({
        id: market.id,
        kind: "market",
        title: market.name,
        subtitle: `${market.venue} · linked from ${event.title}`,
        href: `/events/${event.id}`,
      })
    }
  }

  return [...eventHits, ...marketHits, ...commands]
}
