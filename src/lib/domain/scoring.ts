import type { Significance } from "@/lib/domain/types"

export type MovementDirection = "up" | "down" | "flat"

export function probabilityDelta(
  current: number,
  previous: number,
): number {
  return Number((current - previous).toFixed(1))
}

export function formatSignedPp(delta: number): string {
  if (Object.is(delta, -0) || delta === 0) {
    return "0.0 pp"
  }
  const sign = delta > 0 ? "+" : ""
  return `${sign}${delta.toFixed(1)} pp`
}

export function movementDirection(delta: number): MovementDirection {
  if (delta > 0.05) return "up"
  if (delta < -0.05) return "down"
  return "flat"
}

export function significanceFromAbsDelta(absDelta: number): Significance {
  if (absDelta >= 10) return "critical"
  if (absDelta >= 6) return "high"
  if (absDelta >= 3) return "medium"
  return "low"
}

export function clampProbability(value: number): number {
  return Math.min(99.9, Math.max(0.1, Number(value.toFixed(1))))
}

export function formatProbability(value: number): string {
  return `${value.toFixed(1)}%`
}
