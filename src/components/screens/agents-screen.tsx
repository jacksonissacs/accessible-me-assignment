"use client"

import { ShieldCheck } from "lucide-react"
import { useState } from "react"

import { DataTable } from "@/components/common/data-table"
import { ScreenHead } from "@/components/common/screen-head"
import { ledgerCards, modelRankings } from "@/data/workspace"

export function AgentsScreen() {
  const [query, setQuery] = useState("")
  const filtered = ledgerCards.filter((card) =>
    card.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section className="aion-screen">
      <ScreenHead
        title="Agents"
        description="Who predicted what, when they predicted it, and how accurate they were."
      />
      <label className="aion-search-large">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search forecasters, institutions, models…"
          aria-label="Search agents"
        />
      </label>
      <div className="aion-ledger-grid">
        {filtered.map((card) => (
          <article className="aion-ledger-card" key={card.name}>
            <div className="aion-ledger-title">
              <h2>{card.name}</h2>
              <span className="aion-verified">
                <ShieldCheck size={11} style={{ display: "inline" }} /> {card.verified}
              </span>
            </div>
            <div className="aion-ledger-kv">
              <span>Overall calibration</span>
              <span className="aion-mono">{card.calibration}</span>
              <span>Forecasts scored</span>
              <span className="aion-mono">{card.forecasts}</span>
              <span>Coverage</span>
              <span className="aion-mono">{card.coverage}</span>
              <span>Best category</span>
              <span>{card.best}</span>
              <span>Weakest category</span>
              <span>{card.weakest}</span>
            </div>
            <div style={{ color: "var(--a-accent)", fontSize: 12, marginTop: 12 }}>
              View record →
            </div>
          </article>
        ))}
      </div>
      <div className="aion-panel">
        <h2>Forecast model rankings</h2>
        <DataTable
          headings={["Model", "Calibration", "Brier", "Coverage", "30D", "90D", "1Y"]}
          rows={modelRankings}
        />
        <p className="aion-note">Scores computed on identical resolved questions.</p>
      </div>
    </section>
  )
}
