import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EventDetail } from "@/components/event/event-detail"
import { getRepository } from "@/lib/data/repository"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const event = getRepository().getEvent(id)
  if (!event) return { title: "Event not found" }
  return { title: event.title }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const repository = getRepository()
  const event = repository.getEvent(id)
  if (!event) notFound()

  const related = event.relatedEventIds
    .map((relatedId) => repository.getEvent(relatedId))
    .filter((item) => item !== undefined)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <EventDetail
        event={event}
        related={related}
        graph={repository.getGraph()}
      />
    </div>
  )
}
