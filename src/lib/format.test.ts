import { describe, expect, it } from "vitest"

import { formatDate, formatDomain, formatPercent, formatReliability } from "@/lib/format"

describe("format helpers", () => {
  it("formats domains and signed percents", () => {
    expect(formatDomain("supply_chain")).toBe("Supply chain")
    expect(formatPercent(-2.1)).toBe("-2.1%")
    expect(formatPercent(11.2)).toBe("+11.2%")
    expect(formatReliability(0.84)).toBe("84")
  })

  it("formats UTC dates consistently", () => {
    expect(formatDate("2026-09-04T12:35:00.000Z")).toMatch(/4 Sept 2026|04 Sept 2026|4 Sep 2026|04 Sep 2026/)
  })
})
