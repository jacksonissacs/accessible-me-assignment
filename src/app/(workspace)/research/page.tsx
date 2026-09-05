import type { Metadata } from "next"

import { ResearchScreen } from "@/components/screens/research-screen"

export const metadata: Metadata = { title: "Research" }

export default function ResearchPage() {
  return <ResearchScreen />
}
