export function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div className="aion-kv">
      <span>{label}</span>
      <span className="aion-mono">{value}</span>
    </div>
  )
}
