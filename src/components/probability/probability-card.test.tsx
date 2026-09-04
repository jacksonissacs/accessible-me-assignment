import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProbabilityCard } from "@/components/probability/probability-card"
import { events } from "@/lib/data/mock-catalog"

describe("ProbabilityCard", () => {
  it("renders the event title, probability, and signed move", () => {
    const event = events.find((item) => item.id === "evt-gpu-export")
    if (!event) throw new Error("fixture missing")

    render(<ProbabilityCard event={event} />)

    expect(screen.getByText("Extra-territorial GPU license expansion")).toBeInTheDocument()
    expect(screen.getByText("68.0%")).toBeInTheDocument()
    expect(screen.getByText("+17.0 pp")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "/events/evt-gpu-export")
  })
})
