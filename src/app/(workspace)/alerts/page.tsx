import type { Metadata } from "next"

import { UtilityScreen } from "@/components/screens/utility-screen"

export const metadata: Metadata = { title: "Alerts" }

export default function AlertsPage() {
  return (
    <UtilityScreen
      title="Alerts"
      description="Monitor probability thresholds, unexplained moves, and source arrivals."
      rows={[
        { label: "BoC Oct cut > 70%", value: "Armed" },
        { label: "Expected reaction missing", value: "Armed" },
        { label: "GPU license draft", value: "Triggered" },
      ]}
    />
  )
}
