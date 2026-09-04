import type { ReactNode } from "react"

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="aion-field">
      <span>{label}</span>
      {children}
    </label>
  )
}
