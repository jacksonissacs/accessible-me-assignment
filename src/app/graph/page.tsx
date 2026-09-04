import type { Metadata } from "next"

import { RelationshipGraph } from "@/components/graph/relationship-graph"
import { getRepository } from "@/lib/data/repository"

export const metadata: Metadata = {
  title: "Relationship graph",
}

export default function GraphPage() {
  const repository = getRepository()
  const graph = repository.getGraph()
  const events = repository.listEvents()

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-8">
      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          Book topology
        </p>
        <h1 className="text-xl font-medium tracking-tight md:text-2xl">
          Relationship graph
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Events, entities, markets, and regions from the mock catalog. The
          layout is a placeholder for a later graph engine.
        </p>
      </div>
      <RelationshipGraph
        nodes={graph.nodes}
        edges={graph.edges}
        events={events}
      />
    </div>
  )
}
