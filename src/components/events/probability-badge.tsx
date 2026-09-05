import { formatProbability } from "@/lib/domain/scoring"

export function ProbabilityBadge({
  value,
  size = "md",
  muted,
}: {
  value: number
  size?: "sm" | "md"
  muted?: boolean
}) {
  return (
    <span
      className={`aion-mono ${muted ? "aion-card-from" : "aion-card-to"}`}
      style={size === "sm" ? { fontSize: 13 } : undefined}
    >
      {formatProbability(value)}
    </span>
  )
}
