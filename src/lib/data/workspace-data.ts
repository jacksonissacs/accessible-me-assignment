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
    id: "evt-fed-cut",
    category: "Macro",
    time: "14:42 EDT",
    sourceTier: 1,
    title: "Federal Reserve cuts rates in September",
    previous: 58.4,
    current: 71,
    sigma: 4.7,
    duration: "18 min",
    catalystLabel: "Primary catalyst",
    catalyst: "BLS August employment report",
    catalystTime: "08:30:00",
    explained: 69,
    confidence: "High",
    analogues: 41,
  },
  {
    id: "evt-gpu-export",
    category: "AI",
    time: "11:07 EDT",
    sourceTier: 2,
    title: "Extra-territorial GPU license expansion",
    previous: 51,
    current: 68,
    sigma: 3.8,
    duration: "3.2 hrs",
    catalystLabel: "Likely catalyst",
    catalyst: "BIS interagency working draft",
    catalystTime: "10:48:12",
    explained: 61,
    confidence: "Medium",
    analogues: 12,
  },
]

export const timeline = [
  { time: "08:30:00", text: "BLS August employment report", type: "source" },
  { time: "08:30:42", text: "USD begins repricing", delta: "−0.4%", tone: "down" },
  { time: "08:31:08", text: "US 2Y yields move", delta: "−17 bps", tone: "down" },
  { time: "08:31:51", text: "AION detects abnormal movement" },
  { time: "08:32:07", text: "Probability rises", delta: "+4.2 pts", tone: "up" },
  { time: "08:34:16", text: "Related rate markets react", delta: "+6 pts", tone: "up" },
  { time: "08:38:42", text: "Move reaches", delta: "+12.6 pts", tone: "up" },
] as const

export const watchlist = [
  ["Federal Reserve", "Institution · 7 open markets", "Sep cut 71.0%", "+12.6 pts", "BLS employment", "Sep 17"],
  ["NVIDIA", "Entity · 6 open events", "Export rule 68.0%", "+17.0 pts", "BIS working draft", "Sep 11"],
  ["US monetary policy", "Event class · 11 markets", "Sep cut 71.0%", "+8.0 pts", "Payrolls", "Sep 17"],
  ["Taiwan shipping", "Topic · 4 markets", "Lane close 24.0%", "+6.0 pts", "PLA NOTAMs", "Sep 09"],
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
