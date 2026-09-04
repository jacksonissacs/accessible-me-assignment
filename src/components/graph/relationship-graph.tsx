import Link from "next/link"
import type { CSSProperties } from "react"

import { Badge } from "@/components/ui/badge"
import type {
  GraphEdge,
  GraphNode,
  IntelligenceEvent,
  NodeKind,
} from "@/lib/domain/types"

interface LaidOutNode extends GraphNode {
  x: number
  y: number
}

const KIND_RING: Record<NodeKind, string> = {
  event: "border-foreground/70 bg-background",
  market: "border-foreground/35 bg-foreground/8",
  entity: "border-dashed border-foreground/40 bg-background",
  region: "border-foreground/25 bg-muted",
}

export function RelationshipGraph({
  nodes,
  edges,
  events,
  focusId,
  caption = "Placeholder layout. Topology is from the catalog; the engine is not a production graph yet.",
}: {
  nodes: GraphNode[]
  edges: GraphEdge[]
  events: IntelligenceEvent[]
  focusId?: string
  caption?: string
}) {
  const visible = focusId ? neighborhood(nodes, edges, focusId) : { nodes, edges }
  const laidOut = layoutNodes(visible.nodes, focusId)

  return (
    <section aria-labelledby="graph-heading" className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Topology
          </p>
          <h2 id="graph-heading" className="text-sm font-medium">
            Relationship graph
          </h2>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {visible.nodes.length} nodes · {visible.edges.length} edges
        </p>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-card/50">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(oklch(1_0_0/6%)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/6%)_1px,transparent_1px)] [background-size:28px_28px]" />
        <svg
          viewBox="0 0 1000 560"
          className="relative h-[22rem] w-full md:h-[28rem]"
          role="img"
          aria-label="Relationship graph placeholder"
        >
          {visible.edges.map((edge) => {
            const from = laidOut.find((node) => node.id === edge.source)
            const to = laidOut.find((node) => node.id === edge.target)
            if (!from || !to) return null
            return (
              <g key={edge.id} className="text-foreground/35">
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 6}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono"
                  fontSize="8"
                >
                  {edge.relation}
                </text>
              </g>
            )
          })}
        </svg>

        {laidOut.map((node) => (
          <GraphNodeCard
            key={node.id}
            node={node}
            event={events.find((event) => event.id === node.id)}
            focused={node.id === focusId}
          />
        ))}
      </div>

      <p className="text-[12px] leading-relaxed text-muted-foreground">
        {caption}
      </p>
    </section>
  )
}

function GraphNodeCard({
  node,
  event,
  focused,
}: {
  node: LaidOutNode
  event?: IntelligenceEvent
  focused: boolean
}) {
  const style: CSSProperties = {
    left: `${(node.x / 1000) * 100}%`,
    top: `${(node.y / 560) * 100}%`,
  }
  const inner = (
    <span
      className={`inline-flex max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${KIND_RING[node.kind]} ${focused ? "ring-2 ring-foreground" : ""}`}
    >
      <span className="truncate">{node.label}</span>
      {event ? (
        <Badge variant="outline" className="rounded-sm px-1 text-[9px]">
          {event.currentProbability.toFixed(0)}
        </Badge>
      ) : null}
    </span>
  )

  if (node.kind === "event") {
    return (
      <Link
        href={`/events/${node.id}`}
        className="absolute z-10"
        style={style}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className="absolute z-10" style={style}>
      {inner}
    </div>
  )
}

function neighborhood(
  nodes: GraphNode[],
  edges: GraphEdge[],
  focusId: string,
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const ids = new Set<string>([focusId])
  for (const edge of edges) {
    if (edge.source === focusId || edge.target === focusId) {
      ids.add(edge.source)
      ids.add(edge.target)
    }
  }
  const localNodes = nodes.filter((node) => ids.has(node.id))
  const localEdges = edges.filter(
    (edge) => ids.has(edge.source) && ids.has(edge.target),
  )
  return { nodes: localNodes, edges: localEdges }
}

function layoutNodes(nodes: GraphNode[], focusId?: string): LaidOutNode[] {
  if (nodes.length === 0) return []
  const center = nodes.find((node) => node.id === focusId) ?? nodes[0]
  const others = nodes.filter((node) => node.id !== center.id)
  const rings: GraphNode[][] = [[center]]
  const entities = others.filter((node) => node.kind !== "event")
  const events = others.filter((node) => node.kind === "event")
  if (events.length) rings.push(events)
  if (entities.length) rings.push(entities)

  const placed: LaidOutNode[] = []
  rings.forEach((ring, ringIndex) => {
    const radius = ringIndex === 0 ? 0 : 90 + ringIndex * 110
    ring.forEach((node, index) => {
      const angle =
        ring.length === 1
          ? -Math.PI / 2
          : (index / ring.length) * Math.PI * 2 - Math.PI / 2
      placed.push({
        ...node,
        x: 500 + Math.cos(angle) * radius,
        y: 280 + Math.sin(angle) * radius * 0.72,
      })
    })
  })
  return placed
}
