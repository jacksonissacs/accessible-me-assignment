export type WorkspaceView =
  | "pulse"
  | "event"
  | "watchlist"
  | "ledger"
  | "archive"
  | "relations"
  | "research"
  | "api"
  | "alerts"
  | "team"
  | "settings"

export interface PulseEvent {
  id: string
  category: string
  time: string
  sourceTier: 1 | 2
  title: string
  previous: number
  current: number
  sigma: number
  duration: string
  catalystLabel: string
  catalyst: string
  catalystTime: string
  explained: number
  confidence: "High" | "Medium"
  analogues: number
}

export const pulseEvents: PulseEvent[] = [
  {
    id: "evt-boc-cut",
    category: "Macro",
    time: "14:42 EDT",
    sourceTier: 1,
    title: "Bank of Canada cuts rates in October",
    previous: 61.2,
    current: 73.8,
    sigma: 4.7,
    duration: "18 min",
    catalystLabel: "Primary catalyst",
    catalyst: "Statistics Canada CPI release",
    catalystTime: "14:30:00",
    explained: 69,
    confidence: "High",
    analogues: 41,
  },
  {
    id: "evt-frontier-release",
    category: "AI",
    time: "11:07 EDT",
    sourceTier: 2,
    title: "Frontier model released before December 1",
    previous: 44,
    current: 52.5,
    sigma: 2.1,
    duration: "3.2 hrs",
    catalystLabel: "Possible catalyst",
    catalyst: "Compute-provider capacity disclosure",
    catalystTime: "10:48:12",
    explained: 61,
    confidence: "Medium",
    analogues: 12,
  },
]

export const timeline = [
  { time: "14:30:00", text: "Statistics Canada CPI release", type: "source" },
  { time: "14:30:42", text: "CAD begins repricing", delta: "−0.4%", tone: "down" },
  { time: "14:31:08", text: "Canadian 2Y yields move", delta: "+17 bps", tone: "up" },
  { time: "14:31:51", text: "AION detects abnormal movement" },
  { time: "14:32:07", text: "Probability rises", delta: "+4.2 pts", tone: "up" },
  { time: "14:34:16", text: "Related rate market reacts", delta: "+6 pts", tone: "up" },
  { time: "14:38:42", text: "Move reaches", delta: "+12.6 pts", tone: "up" },
] as const

export const watchlist = [
  ["Bank of Canada", "Institution · 4 open markets", "Oct cut 73.8%", "+12.6 pts", "CPI release", "Oct 29"],
  ["Anthropic", "Entity · 6 open markets", "Release 52.5%", "+8.5 pts", "Capacity disclosure", "—"],
  ["US monetary policy", "Event class · 11 markets", "Sep cut 44.1%", "−3.2 pts", "Fed minutes", "Sep 17"],
  ["Canadian housing", "Topic · 3 markets", "Correction 31.0%", "No move", "Expected reaction missing", "—"],
] as const

export const ledgerCards = [
  {
    name: "Federal Reserve",
    verified: "Verified institution",
    calibration: "78%",
    forecasts: "2,041",
    coverage: "86%",
    best: "US monetary policy",
    weakest: "Labor revisions",
  },
  {
    name: "AION consensus",
    verified: "Verified aggregate",
    calibration: "84%",
    forecasts: "12,407",
    coverage: "91%",
    best: "Technology",
    weakest: "Geopolitics",
  },
] as const

export const modelRankings = [
  ["Market consensus", "83%", "0.121", "96%", "+2.1", "+1.4", "+1.9"],
  ["AION ensemble", "82%", "0.125", "94%", "+2.0", "+2.3", "+1.4"],
  ["Frontier model aggregate", "79%", "0.134", "93%", "+1.2", "−0.3", "+0.8"],
  ["Human forecaster benchmark", "76%", "0.147", "71%", "+0.5", "+0.7", "+0.4"],
] as const

export const forecastHistory = [
  ["FOMC cut in July", "71%", "43%", "YES", "+21", "Jul 08"],
  ["Frontier run before October", "74%", "51%", "YES", "+18", "Jun 30"],
  ["US CPI above 3.1%", "38%", "44%", "NO", "+6", "Jun 11"],
  ["EU AI enforcement action", "62%", "58%", "Open", "—", "Aug 21"],
  ["Chip export rules expanded", "55%", "61%", "NO", "−9", "May 02"],
] as const

export const navItems: {
  view: WorkspaceView
  label: string
}[] = [
  { view: "pulse", label: "Pulse" },
  { view: "watchlist", label: "Watchlist" },
  { view: "ledger", label: "Ledger" },
  { view: "archive", label: "Archive" },
  { view: "relations", label: "Relations" },
  { view: "research", label: "Research" },
]
