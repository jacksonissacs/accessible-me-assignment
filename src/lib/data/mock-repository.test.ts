import { describe, expect, it } from "vitest"

import { MockIntelligenceRepository } from "@/lib/data/mock-repository"

describe("MockIntelligenceRepository", () => {
  const repository = new MockIntelligenceRepository()

  it("returns the full book sorted by absolute probability move", () => {
    const events = repository.listEvents()
    expect(events.length).toBeGreaterThanOrEqual(8)
    expect(events[0]?.id).toBe("evt-gpu-export")
  })

  it("filters by domain", () => {
    const finance = repository.listEvents({ domain: "finance" })
    expect(finance.every((event) => event.domain === "finance")).toBe(true)
    expect(finance.some((event) => event.id === "evt-fed-cut")).toBe(true)
  })

  it("loads a complete event object", () => {
    const event = repository.getEvent("evt-rare-earth")
    expect(event?.evidence.length).toBeGreaterThan(0)
    expect(event?.analogues.length).toBeGreaterThan(0)
    expect(event?.uncertainty.length).toBeGreaterThan(0)
    expect(event?.expectationHistory.length).toBeGreaterThan(2)
  })

  it("returns a feed that only references known events", () => {
    const ids = new Set(repository.listEvents().map((event) => event.id))
    const items = repository.listFeed()
    expect(items.length).toBeGreaterThan(0)
    expect(items.every((item) => ids.has(item.eventId))).toBe(true)
  })

  it("returns a connected graph", () => {
    const graph = repository.getGraph()
    const nodeIds = new Set(graph.nodes.map((node) => node.id))
    expect(graph.edges.length).toBeGreaterThan(0)
    expect(
      graph.edges.every(
        (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target),
      ),
    ).toBe(true)
  })

  it("searches events, markets, and commands", () => {
    const hits = repository.search("yen")
    expect(hits.some((hit) => hit.id === "evt-yen-carry")).toBe(true)
    expect(hits.some((hit) => hit.kind === "market")).toBe(true)
  })
})
