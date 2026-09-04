import { describe, expect, it } from "vitest"

import {
  clampProbability,
  formatProbability,
  formatSignedPp,
  movementDirection,
  probabilityDelta,
  significanceFromAbsDelta,
} from "@/lib/domain/scoring"

describe("probabilityDelta", () => {
  it("returns a one-decimal signed move", () => {
    expect(probabilityDelta(68, 51)).toBe(17)
    expect(probabilityDelta(44, 57)).toBe(-13)
  })
})

describe("formatSignedPp", () => {
  it("formats up, down, and flat moves", () => {
    expect(formatSignedPp(17)).toBe("+17.0 pp")
    expect(formatSignedPp(-13)).toBe("-13.0 pp")
    expect(formatSignedPp(0)).toBe("0.0 pp")
  })
})

describe("movementDirection", () => {
  it("classifies direction with a small dead zone", () => {
    expect(movementDirection(0.2)).toBe("up")
    expect(movementDirection(-0.2)).toBe("down")
    expect(movementDirection(0)).toBe("flat")
  })
})

describe("significanceFromAbsDelta", () => {
  it("maps absolute moves onto the four-level scale", () => {
    expect(significanceFromAbsDelta(17)).toBe("critical")
    expect(significanceFromAbsDelta(8)).toBe("high")
    expect(significanceFromAbsDelta(4)).toBe("medium")
    expect(significanceFromAbsDelta(1)).toBe("low")
  })
})

describe("probability helpers", () => {
  it("clamps and formats displayed probabilities", () => {
    expect(clampProbability(120)).toBe(99.9)
    expect(clampProbability(-2)).toBe(0.1)
    expect(formatProbability(68)).toBe("68.0%")
  })
})
