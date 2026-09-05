import { DOMAIN_LABEL, type Domain } from "@/lib/domain/types"

const datetime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
})

const dateOnly = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export function formatDateTime(iso: string): string {
  return `${datetime.format(new Date(iso))} UTC`
}

export function formatDate(iso: string): string {
  return dateOnly.format(new Date(iso))
}

export function formatDomain(domain: Domain): string {
  return DOMAIN_LABEL[domain]
}

export function formatPercent(value: number, digits = 1): string {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(digits)}%`
}

export function formatReliability(value: number): string {
  return `${Math.round(value * 100)}`
}
