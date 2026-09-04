import type { ExpectationPoint } from "@/lib/domain/types"

export function ExpectationChart({
  points,
}: {
  points: ExpectationPoint[]
}) {
  if (points.length < 2) {
    return (
      <p className="text-sm text-muted-foreground">
        Not enough history to plot an expectation path.
      </p>
    )
  }

  const width = 640
  const height = 160
  const pad = { top: 16, right: 12, bottom: 20, left: 36 }
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const times = points.map((point) => new Date(point.at).getTime())
  const minT = Math.min(...times)
  const maxT = Math.max(...times)
  const minP = 0
  const maxP = 100

  const x = (time: number) =>
    pad.left + ((time - minT) / Math.max(maxT - minT, 1)) * innerW
  const y = (probability: number) =>
    pad.top + (1 - (probability - minP) / (maxP - minP)) * innerH

  const line = points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L"
      return `${command}${x(new Date(point.at).getTime())} ${y(point.probability)}`
    })
    .join(" ")

  const area = `${line} L${x(times[times.length - 1])} ${y(0)} L${x(times[0])} ${y(0)} Z`
  const last = points[points.length - 1]

  return (
    <div className="space-y-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-40 w-full text-foreground"
        role="img"
        aria-label="Expectation path from first recorded probability to current"
      >
        {[25, 50, 75].map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(tick)}
              y2={y(tick)}
              className="stroke-foreground/10"
              strokeDasharray="2 4"
            />
            <text
              x={pad.left - 8}
              y={y(tick) + 3}
              textAnchor="end"
              className="fill-muted-foreground font-mono"
              fontSize="9"
            >
              {tick}
            </text>
          </g>
        ))}
        <path d={area} className="fill-foreground/8" />
        <path
          d={line}
          className="stroke-foreground"
          fill="none"
          strokeWidth="1.5"
        />
        {points.map((point) => (
          <circle
            key={point.at}
            cx={x(new Date(point.at).getTime())}
            cy={y(point.probability)}
            r="2.5"
            className="fill-background stroke-foreground"
            strokeWidth="1.25"
          />
        ))}
        <text
          x={x(new Date(last.at).getTime())}
          y={y(last.probability) - 8}
          textAnchor="end"
          className="fill-foreground font-mono"
          fontSize="10"
        >
          {last.probability.toFixed(0)}%
        </text>
      </svg>
      <ol className="grid gap-1.5 sm:grid-cols-2">
        {points.map((point) => (
          <li
            key={point.at}
            className="flex gap-2 font-mono text-[11px] text-muted-foreground"
          >
            <span className="text-foreground/80">
              {point.probability.toFixed(0)}%
            </span>
            <span>{new Date(point.at).toISOString().slice(0, 10)}</span>
            {point.note ? <span className="truncate">{point.note}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
