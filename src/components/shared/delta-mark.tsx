import { cn } from "@/lib/utils"
import {
  formatSignedPp,
  movementDirection,
} from "@/lib/domain/scoring"

export function DeltaMark({
  delta,
  className,
}: {
  delta: number
  className?: string
}) {
  const direction = movementDirection(delta)
  return (
    <span
      data-direction={direction}
      className={cn(
        "tabular inline-flex items-center gap-1 font-mono text-[11px] tracking-tight",
        direction === "up" && "text-foreground",
        direction === "down" && "text-foreground/45",
        direction === "flat" && "text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden>
        {direction === "up" ? "▲" : direction === "down" ? "▼" : "–"}
      </span>
      {formatSignedPp(delta)}
    </span>
  )
}
