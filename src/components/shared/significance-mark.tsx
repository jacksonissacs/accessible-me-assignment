import { cn } from "@/lib/utils"
import {
  SIGNIFICANCE_LABEL,
  type Significance,
} from "@/lib/domain/types"

const WEIGHT: Record<Significance, string> = {
  critical: "text-foreground tracking-[0.18em]",
  high: "text-foreground/80 tracking-[0.16em]",
  medium: "text-foreground/55 tracking-[0.14em]",
  low: "text-muted-foreground tracking-[0.12em]",
}

export function SignificanceMark({
  value,
  className,
}: {
  value: Significance
  className?: string
}) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase",
        WEIGHT[value],
        className,
      )}
    >
      {SIGNIFICANCE_LABEL[value]}
    </span>
  )
}
