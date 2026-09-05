import type { ConfidenceLevel } from "@/types/event"

export function ConfidenceIndicator({
  label = "Identification",
  value,
}: {
  label?: string
  value: ConfidenceLevel
}) {
  return (
    <div>
      <span>{label}</span>
      <span>{value} confidence</span>
    </div>
  )
}
