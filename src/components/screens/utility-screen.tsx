import { Kv } from "@/components/common/kv"
import { ScreenHead } from "@/components/common/screen-head"

export function UtilityScreen({
  title,
  description,
  rows,
}: {
  title: string
  description: string
  rows?: { label: string; value: string }[]
}) {
  return (
    <section className="aion-screen">
      <ScreenHead title={title} description={description} />
      <div className="aion-panel">
        <h2>{title} workspace</h2>
        {rows?.map((row) => (
          <Kv key={row.label} label={row.label} value={row.value} />
        ))}
        <p className="aion-note" style={{ border: 0, margin: rows ? undefined : 0, padding: 0 }}>
          This surface is interactive in the shell and intentionally local-only
          for the MVP. Production writes arrive with the persistence layer.
        </p>
      </div>
    </section>
  )
}
