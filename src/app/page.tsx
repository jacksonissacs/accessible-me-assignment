import { EventFeed } from "@/components/feed/event-feed"
import { ProbabilityStrip } from "@/components/probability/probability-strip"
import { isDomain } from "@/lib/data/mock-repository"
import { getRepository } from "@/lib/data/repository"
import { DOMAIN_LABEL } from "@/lib/domain/types"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string | string[] }>
}) {
  const params = await searchParams
  const domainValue = Array.isArray(params.domain)
    ? params.domain[0]
    : params.domain
  const domain = isDomain(domainValue) ? domainValue : undefined
  const repository = getRepository()
  const events = repository.listEvents(domain ? { domain } : undefined)
  const items = repository.listFeed(domain ? { domain } : undefined)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 md:px-6 md:py-8">
      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          Operating picture
        </p>
        <h1 className="text-xl font-medium tracking-tight md:text-2xl">
          {domain ? DOMAIN_LABEL[domain] : "All domains"}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          What changed, when it changed, the size of the move, and the evidence
          behind it. Mock book — no live venues, no paid APIs.
        </p>
      </div>
      <ProbabilityStrip events={events} />
      <EventFeed items={items} events={events} />
    </div>
  )
}
