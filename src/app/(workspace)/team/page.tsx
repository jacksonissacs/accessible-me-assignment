import type { Metadata } from "next"

import { UtilityScreen } from "@/components/screens/utility-screen"

export const metadata: Metadata = { title: "Team" }

export default function TeamPage() {
  return (
    <UtilityScreen
      title="Team"
      description="Shared watchlists and analyst workspaces are staged for the persistence phase."
    />
  )
}
