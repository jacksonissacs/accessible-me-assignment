import type { Metadata } from "next"

import { AgentsScreen } from "@/components/screens/agents-screen"

export const metadata: Metadata = { title: "Agents" }

export default function AgentsPage() {
  return <AgentsScreen />
}
