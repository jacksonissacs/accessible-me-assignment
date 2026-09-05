import type { Metadata } from "next"

import { SignalsScreen } from "@/components/screens/signals-screen"

export const metadata: Metadata = { title: "Signals" }

export default function SignalsPage() {
  return <SignalsScreen />
}
