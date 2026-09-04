export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="aion-stat">
      <span className="aion-label">{label}</span>
      <span className="aion-stat-value aion-mono">{value}</span>
    </div>
  )
}
