import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { EventIntelligenceView } from "@/components/intelligence/event-intelligence-view"
import { getEvent } from "@/data/events"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const event = getEvent(id)
  if (!event) return { title: "Event not found" }
  return { title: event.title }
}

export default async function EventIntelligencePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = getEvent(id)
  if (!event) notFound()
  return <EventIntelligenceView event={event} />
}
