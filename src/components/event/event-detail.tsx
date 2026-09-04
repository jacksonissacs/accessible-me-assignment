import Link from "next/link"

import { EvidencePanel } from "@/components/event/evidence-panel"
import { ExpectationChart } from "@/components/event/expectation-chart"
import { RelationshipGraph } from "@/components/graph/relationship-graph"
import { DeltaMark } from "@/components/shared/delta-mark"
import { SignificanceMark } from "@/components/shared/significance-mark"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  formatProbability,
  probabilityDelta,
} from "@/lib/domain/scoring"
import { formatDateTime, formatDomain, formatPercent } from "@/lib/format"
import type {
  IntelligenceEvent,
  RelationshipGraph as GraphData,
} from "@/lib/domain/types"

export function EventDetail({
  event,
  related,
  graph,
}: {
  event: IntelligenceEvent
  related: IntelligenceEvent[]
  graph: GraphData
}) {
  const delta = probabilityDelta(
    event.currentProbability,
    event.previousProbability,
  )

  return (
    <article className="space-y-6">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>{formatDomain(event.domain)}</span>
          <span>·</span>
          <span>{event.region}</span>
          <span>·</span>
          <span>{event.status}</span>
          <SignificanceMark value={event.significance} className="ml-auto" />
        </div>
        <h1 className="max-w-4xl text-2xl font-medium tracking-tight text-balance md:text-3xl">
          {event.title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {event.question}
        </p>
        <div className="flex flex-wrap items-end gap-6 rounded-lg border bg-card/70 px-4 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Current
            </p>
            <p className="tabular font-mono text-4xl tracking-tight">
              {formatProbability(event.currentProbability)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Previous
            </p>
            <p className="tabular font-mono text-xl text-foreground/55">
              {formatProbability(event.previousProbability)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Move
            </p>
            <DeltaMark delta={delta} className="text-sm" />
          </div>
          <div className="ml-auto text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Changed
            </p>
            <p className="font-mono text-[12px] text-foreground/80">
              {formatDateTime(event.changedAt)}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <Tabs defaultValue="brief">
            <TabsList variant="line" className="w-full justify-start">
              <TabsTrigger value="brief">Brief</TabsTrigger>
              <TabsTrigger value="causes">Causes</TabsTrigger>
              <TabsTrigger value="path">Expectations</TabsTrigger>
              <TabsTrigger value="analogues">Analogues</TabsTrigger>
            </TabsList>
            <TabsContent value="brief" className="space-y-4 pt-4">
              <section>
                <h2 className="mb-2 text-sm font-medium">What changed</h2>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {event.whatChanged}
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-sm font-medium">Narrative</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {event.narrative}
                </p>
              </section>
              <section>
                <h2 className="mb-2 text-sm font-medium">
                  Remaining uncertainty
                </h2>
                <ul className="space-y-2">
                  {event.uncertainty.map((factor) => (
                    <li
                      key={factor.id}
                      className="rounded-md border px-3 py-2.5"
                    >
                      <p className="text-[13px] text-foreground">
                        {factor.question}
                      </p>
                      <p className="mt-1 text-[12px] text-muted-foreground">
                        {factor.impact}
                      </p>
                      {factor.unresolved ? (
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/50">
                          Unresolved
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            </TabsContent>
            <TabsContent value="causes" className="space-y-3 pt-4">
              {event.causes.map((cause) => (
                <div key={cause.id} className="rounded-md border px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <Badge
                      variant="outline"
                      className="rounded-sm font-mono text-[10px] uppercase"
                    >
                      {cause.category}
                    </Badge>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      conf {(cause.confidence * 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{cause.statement}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="path" className="pt-4">
              <ExpectationChart points={event.expectationHistory} />
            </TabsContent>
            <TabsContent value="analogues" className="space-y-3 pt-4">
              {event.analogues.map((analogue) => (
                <div key={analogue.id} className="rounded-md border px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{analogue.title}</p>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {analogue.year} · sim{" "}
                      {(analogue.similarity * 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] text-foreground/85">
                    {analogue.outcome}
                  </p>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    {analogue.lesson}
                  </p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          <EvidencePanel evidence={event.evidence} />
          <Separator />
          <section className="space-y-2">
            <h2 className="text-sm font-medium">Related events</h2>
            <ul className="space-y-1.5">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/events/${item.id}`}
                    className="flex items-center justify-between gap-3 rounded-md border px-2.5 py-2 text-[13px] hover:bg-muted/50"
                  >
                    <span className="truncate">{item.title}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {item.currentProbability.toFixed(0)}%
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {event.relatedMarkets.length > 0 ? (
            <section className="space-y-2">
              <h2 className="text-sm font-medium">Related markets</h2>
              <ul className="space-y-1.5">
                {event.relatedMarkets.map((market) => (
                  <li
                    key={market.id}
                    className="flex items-center justify-between gap-3 rounded-md border px-2.5 py-2"
                  >
                    <div>
                      <p className="text-[13px]">{market.name}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {market.venue}
                      </p>
                    </div>
                    <div className="text-right font-mono text-[12px]">
                      <p>
                        {market.last} {market.unit}
                      </p>
                      <p className="text-muted-foreground">
                        {formatPercent(market.changePct)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>

      <RelationshipGraph
        nodes={graph.nodes}
        edges={graph.edges}
        events={[event, ...related]}
        focusId={event.id}
        caption="Local neighborhood only. Open the graph surface for the full book."
      />
    </article>
  )
}
