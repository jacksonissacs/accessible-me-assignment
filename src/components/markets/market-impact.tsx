import type { RelatedMarket } from "@/types/event"

export function MarketImpact({ markets }: { markets: RelatedMarket[] }) {
  if (markets.length === 0) {
    return <p className="aion-note">No linked markets are moving with this event.</p>
  }

  return (
    <div>
      {markets.map((market) => (
        <div className="aion-signal-row" key={market.id}>
          <span>
            {market.name}
            <span className="aion-label" style={{ display: "inline", marginLeft: 8 }}>
              {market.venue}
            </span>
          </span>
          <span className={`aion-mono ${market.changePct > 0 ? "aion-up" : market.changePct < 0 ? "aion-down" : ""}`}>
            {market.changePct > 0 ? "+" : ""}
            {market.changePct.toFixed(1)}
            {market.unit === "%" || market.unit === "USD" ? "%" : ""}
          </span>
        </div>
      ))}
    </div>
  )
}
