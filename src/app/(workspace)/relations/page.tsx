import type { Metadata } from "next"

import { RelationsScreen } from "@/components/screens/relations-screen"

export const metadata: Metadata = { title: "Relations" }

export default function RelationsPage() {
  return <RelationsScreen />
}
