import { Badge } from "@/components/ui/badge"
import { formatDateTime, formatReliability } from "@/lib/format"
import type { EvidenceItem, EvidenceStance } from "@/lib/domain/types"

const STANCE_LABEL: Record<EvidenceStance, string> = {
  supports: "Supports",
  contradicts: "Contradicts",
  contextual: "Context",
}

export function EvidencePanel({ evidence }: { evidence: EvidenceItem[] }) {
  return (
    <section aria-labelledby="evidence-heading" className="space-y-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Sources
        </p>
        <h2 id="evidence-heading" className="text-sm font-medium">
          Evidence
        </h2>
      </div>
      <ol className="space-y-2">
        {evidence.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border bg-card/70 px-3 py-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={item.stance === "contradicts" ? "outline" : "secondary"}
                className="rounded-sm font-mono text-[10px] uppercase tracking-[0.12em]"
              >
                {STANCE_LABEL[item.stance]}
              </Badge>
              <span className="font-mono text-[10px] text-muted-foreground">
                rel {formatReliability(item.reliability)}
              </span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                {formatDateTime(item.publishedAt)}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-snug text-foreground">
              {item.source}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
            <ReliabilityBar value={item.reliability} />
          </li>
        ))}
      </ol>
    </section>
  )
}

function ReliabilityBar({ value }: { value: number }) {
  return (
    <div
      className="mt-3 h-px bg-foreground/10"
      role="meter"
      aria-label="Source reliability"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <div
        className="h-px bg-foreground/70"
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  )
}
