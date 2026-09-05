import { describe, expect, it } from "vitest"

import { events } from "@/lib/data/mock-catalog"
import { searchCatalog } from "@/lib/search/command-index"

describe("searchCatalog", () => {
  it("returns the navigation index when the query is empty", () => {
    const hits = searchCatalog("", events)
    expect(hits.some((hit) => hit.kind === "command")).toBe(true)
    expect(hits.some((hit) => hit.kind === "event")).toBe(true)
  })

  it("matches multi-token queries against title and tags", () => {
    const hits = searchCatalog("gpu export", events)
    expect(hits.some((hit) => hit.id === "evt-gpu-export")).toBe(true)
    expect(hits.every((hit) => hit.kind !== "event" || hit.id === "evt-gpu-export" || hit.title.toLowerCase().includes("gpu") || hit.subtitle.toLowerCase().includes("gpu"))).toBe(true)
  })

  it("can find a market from its ticker", () => {
    const hits = searchCatalog("sofr", events)
    expect(hits.some((hit) => hit.id === "mkt-sofr")).toBe(true)
  })
})
