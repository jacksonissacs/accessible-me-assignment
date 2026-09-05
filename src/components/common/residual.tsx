export function Residual({ explained }: { explained: number }) {
  return (
    <div className="aion-residual">
      <div className="aion-residual-track">
        <span className="aion-residual-fill" style={{ width: `${explained}%` }} />
        <span
          className="aion-residual-unknown"
          style={{ width: `${100 - explained}%` }}
        />
      </div>
      <div className="aion-residual-legend">
        <span>Move explained · {explained}%</span>
        <span>Unexplained · {100 - explained}%</span>
      </div>
    </div>
  )
}
