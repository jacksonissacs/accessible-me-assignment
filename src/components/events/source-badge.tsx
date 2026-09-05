import type { SourceTier } from "@/types/event"

export function SourceBadge({
  tier,
  label,
}: {
  tier: SourceTier
  label?: string
}) {
  return (
    <span className="aion-chip" data-tier={tier}>
      <span className="aion-chip-dot" />
      {label ?? `Tier ${tier} source`}
    </span>
  )
}
