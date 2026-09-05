import { formatSignedPp, movementDirection } from "@/lib/domain/scoring"

export function ChangeIndicator({
  change,
  unit = "pts",
}: {
  change: number
  unit?: "pts" | "pp" | "pct"
}) {
  const direction = movementDirection(change)
  const label =
    unit === "pp"
      ? formatSignedPp(change)
      : unit === "pct"
        ? `${change > 0 ? "+" : ""}${change.toFixed(1)}%`
        : `${change > 0 ? "+" : ""}${change.toFixed(1)} ${unit}`

  return (
    <b
      className={`aion-mono ${direction === "up" ? "aion-up" : direction === "down" ? "aion-down" : ""}`}
    >
      {label}
    </b>
  )
}
