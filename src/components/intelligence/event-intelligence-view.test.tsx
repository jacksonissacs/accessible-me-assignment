import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import "@/test/next-navigation"

import { EventIntelligenceView } from "@/components/intelligence/event-intelligence-view"
import { AppShell } from "@/components/layout/app-shell"
import { getEvent } from "@/data/events"

describe("EventIntelligenceView", () => {
  it("answers the core intelligence questions for a seeded event", async () => {
    const user = userEvent.setup()
    const event = getEvent("evt-boc-cut")
    if (!event) throw new Error("fixture missing")

    render(
      <AppShell>
        <EventIntelligenceView event={event} />
      </AppShell>,
    )

    expect(screen.getByRole("heading", { name: event.title })).toBeInTheDocument()
    expect(screen.getByText("What changed?")).toBeInTheDocument()
    expect(screen.getByText("When did it change?")).toBeInTheDocument()
    expect(screen.getByText("How significant?")).toBeInTheDocument()
    expect(screen.getByText("What likely caused it?")).toBeInTheDocument()
    expect(screen.getByText("Current probability")).toBeInTheDocument()
    expect(screen.getByText("Previous probability")).toBeInTheDocument()
    expect(screen.getByText("What did the system previously believe?")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Make a call" }))
    expect(screen.getByRole("dialog", { name: "Make a call" })).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Lock prediction" }))
    expect(screen.getByText("Locked. Now revealed:")).toBeInTheDocument()
  })

  it("toggles the watchlist from the intelligence view", async () => {
    const user = userEvent.setup()
    const event = getEvent("evt-gpu-export")
    if (!event) throw new Error("fixture missing")

    render(
      <AppShell>
        <EventIntelligenceView event={event} />
      </AppShell>,
    )

    const follow = screen.getByRole("button", { name: "Follow" })
    await user.click(follow)
    expect(screen.getByRole("button", { name: "Following" })).toBeInTheDocument()
  })
})
