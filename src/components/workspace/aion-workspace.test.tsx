import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { AionWorkspace } from "@/components/workspace/aion-workspace"

describe("AionWorkspace", () => {
  it("navigates between the reference workspaces", async () => {
    const user = userEvent.setup()
    render(<AionWorkspace />)

    expect(
      screen.getByRole("heading", { name: "Pulse", level: 1 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Archive" }))
    expect(
      screen.getByRole("heading", { name: "Archive", level: 1 }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole("button", { name: "Enter point-in-time mode" }),
    )
    expect(screen.getByText(/Viewing AION as it existed/)).toBeInTheDocument()
  })

  it("opens an event and locks a blind prediction", async () => {
    const user = userEvent.setup()
    render(<AionWorkspace />)

    await user.click(
      screen.getByText("Bank of Canada cuts rates in October"),
    )
    expect(screen.getByText("Current consensus")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Make a call" }))
    expect(
      screen.getByRole("dialog", { name: "Make a call" }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Lock prediction" }))
    expect(screen.getByText("Locked. Now revealed:")).toBeInTheDocument()
  })

  it("opens the Ask AION command palette with the keyboard", async () => {
    const user = userEvent.setup()
    render(<AionWorkspace />)

    await user.keyboard("{Control>}k{/Control}")
    expect(
      screen.getByRole("dialog", { name: "Command palette" }),
    ).toBeInTheDocument()

    await user.keyboard("{Escape}")
    expect(
      screen.queryByRole("dialog", { name: "Command palette" }),
    ).not.toBeInTheDocument()
  })
})
