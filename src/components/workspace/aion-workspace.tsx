"use client"

import {
  Activity,
  AlarmClock,
  Braces,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Database,
  History,
  KeyRound,
  List,
  LockKeyhole,
  Network,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react"

import {
  forecastHistory,
  ledgerCards,
  modelRankings,
  navItems,
  pulseEvents,
  timeline,
  watchlist,
  type PulseEvent,
  type WorkspaceView,
} from "@/lib/data/workspace-data"

const icons: Record<WorkspaceView, React.ComponentType<{ size?: number }>> = {
  pulse: Activity,
  watchlist: List,
  ledger: Database,
  archive: History,
  relations: Network,
  research: Braces,
  api: KeyRound,
  alerts: AlarmClock,
  team: Users,
  settings: Settings,
  event: CircleDot,
}

const headings: Record<WorkspaceView, string> = {
  pulse: "Pulse",
  event: "Federal Reserve cuts rates in September",
  watchlist: "Watchlist",
  ledger: "Ledger",
  archive: "Archive",
  relations: "Relations",
  research: "Research",
  api: "API",
  alerts: "Alerts",
  team: "Team",
  settings: "Settings",
}

export function AionWorkspace() {
  const [view, setView] = useState<WorkspaceView>("pulse")
  const [collapsed, setCollapsed] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<PulseEvent>(pulseEvents[0])
  const mainRef = useRef<HTMLElement>(null)

  const navigate = (next: WorkspaceView) => {
    setView(next)
    mainRef.current?.scrollTo?.({ top: 0 })
  }

  const openEvent = (event: PulseEvent) => {
    setSelectedEvent(event)
    navigate("event")
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen((value) => !value)
      }
      if (event.key === "Escape") {
        setPaletteOpen(false)
        setCallOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="aion-app" data-collapsed={collapsed}>
      <Sidebar
        view={view}
        collapsed={collapsed}
        navigate={navigate}
        toggleCollapsed={() => setCollapsed((value) => !value)}
      />
      <header className="aion-topbar">
        <div className="aion-crumb">
          {view === "event" ? (
            <>
              <span>Pulse</span>
              <span>/</span>
              <span>{selectedEvent.category}</span>
              <span>/</span>
            </>
          ) : null}
          <b>{headings[view]}</b>
        </div>
        <button
          type="button"
          className="aion-ask"
          onClick={() => setPaletteOpen(true)}
        >
          <Search size={13} />
          Ask AION…
          <span className="aion-kbd">⌘K</span>
        </button>
      </header>
      <main className="aion-main" ref={mainRef}>
        {view === "pulse" ? (
          <PulseScreen
            openEvent={openEvent}
            openCall={() => setCallOpen(true)}
            navigate={navigate}
          />
        ) : null}
        {view === "event" ? (
          <EventScreen
            event={selectedEvent}
            openCall={() => setCallOpen(true)}
            navigate={navigate}
          />
        ) : null}
        {view === "watchlist" ? <WatchlistScreen openEvent={openEvent} /> : null}
        {view === "ledger" ? <LedgerScreen /> : null}
        {view === "archive" ? <ArchiveScreen /> : null}
        {view === "relations" ? <RelationsScreen /> : null}
        {view === "research" ? <ResearchScreen /> : null}
        {view === "api" ? <ApiScreen /> : null}
        {view === "alerts" ? (
          <UtilityScreen
            title="Alerts"
            description="Monitor probability thresholds, unexplained moves, and source arrivals."
          />
        ) : null}
        {view === "team" ? (
          <UtilityScreen
            title="Team"
            description="Shared watchlists and analyst workspaces are staged for the persistence phase."
          />
        ) : null}
        {view === "settings" ? (
          <UtilityScreen
            title="Settings"
            description="Workspace density, display, and notification preferences."
          />
        ) : null}
      </main>
      {paletteOpen ? (
        <CommandPalette
          close={() => setPaletteOpen(false)}
          navigate={(next) => {
            navigate(next)
            setPaletteOpen(false)
          }}
          openEvent={() => {
            openEvent(pulseEvents[0])
            setPaletteOpen(false)
          }}
        />
      ) : null}
      {callOpen ? (
        <CallModal event={selectedEvent} close={() => setCallOpen(false)} />
      ) : null}
    </div>
  )
}

function Sidebar({
  view,
  collapsed,
  navigate,
  toggleCollapsed,
}: {
  view: WorkspaceView
  collapsed: boolean
  navigate: (view: WorkspaceView) => void
  toggleCollapsed: () => void
}) {
  return (
    <aside className="aion-sidebar" aria-label="Workspace navigation">
      <button
        className="aion-logo"
        type="button"
        onClick={() => navigate("pulse")}
        aria-label="AION home"
      >
        <AionMark />
        <span className="aion-logo-word">AION</span>
      </button>
      {navItems.map((item) => (
        <NavButton
          key={item.view}
          view={item.view}
          label={item.label}
          active={view === item.view || (view === "event" && item.view === "pulse")}
          onClick={() => navigate(item.view)}
        />
      ))}
      <div className="aion-nav-section">Workspace</div>
      <NavButton
        view="alerts"
        label="Alerts"
        active={view === "alerts"}
        onClick={() => navigate("alerts")}
      />
      <NavButton
        view="api"
        label="API"
        active={view === "api"}
        onClick={() => navigate("api")}
      />
      <NavButton
        view="team"
        label="Team"
        active={view === "team"}
        onClick={() => navigate("team")}
      />
      <div className="aion-sidebar-foot">
        <NavButton
          view="research"
          label="Alan · 1,847"
          active={view === "research"}
          onClick={() => navigate("research")}
        />
        <NavButton
          view="settings"
          label="Settings"
          active={view === "settings"}
          onClick={() => navigate("settings")}
        />
        <button type="button" className="aion-collapse" onClick={toggleCollapsed}>
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          <span className="aion-nav-label">{collapsed ? "" : "collapse"}</span>
        </button>
      </div>
    </aside>
  )
}

function AionMark() {
  return (
    <svg
      className="aion-logo-mark"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 15 9 2l7 13"
        stroke="#E7E9EC"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 15c4-3.5 10-3.5 14 0"
        stroke="#8194FF"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".9"
      />
    </svg>
  )
}

function NavButton({
  view,
  label,
  active,
  onClick,
}: {
  view: WorkspaceView
  label: string
  active: boolean
  onClick: () => void
}) {
  const Icon = icons[view]
  return (
    <button
      type="button"
      className="aion-nav-item"
      data-active={active}
      onClick={onClick}
      title={label}
    >
      <span className="aion-nav-icon">
        <Icon size={14} />
      </span>
      <span className="aion-nav-label">{label}</span>
    </button>
  )
}

function PulseScreen({
  openEvent,
  openCall,
  navigate,
}: {
  openEvent: (event: PulseEvent) => void
  openCall: () => void
  navigate: (view: WorkspaceView) => void
}) {
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("Largest move")
  const categories = ["All", "Macro", "Economics", "AI", "Technology", "Geopolitics"]
  const sorts = ["Largest move", "Most unusual", "Unexplained", "My watchlist"]
  const visible = pulseEvents.filter(
    (event) => category === "All" || event.category === category,
  )

  return (
    <section className="aion-screen">
      <ScreenHead
        title="Pulse"
        description="What changed in the world's expectations."
      />
      <div className="aion-filters" aria-label="Pulse filters">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            className="aion-filter"
            data-active={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
        <span className="aion-filter-divider" />
        {sorts.map((item) => (
          <button
            type="button"
            key={item}
            className="aion-filter"
            data-active={sort === item}
            onClick={() => setSort(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="aion-pulse-stream">
        {visible.map((event) => (
          <PulseCard
            key={event.id}
            event={event}
            openEvent={() => openEvent(event)}
            openCall={openCall}
          />
        ))}
        <article className="aion-pulse-card aion-anomaly">
          <div className="aion-card-meta">
          <span className="category">Economics</span>
            <span className="aion-mono">14:58 EDT</span>
          </div>
          <div className="aion-anomaly-flag">△ Expected reaction missing</div>
          <h2>Canadian housing correction by Q2 2027</h2>
          <p>
            Historically this market moves with Bank of Canada rate surprises
            in 78% of comparable shocks. No meaningful movement detected 26
            minutes after today&apos;s repricing.
          </p>
          <div className="aion-anomaly-interpretations">
            <span>Possible: pricing lag</span>
            <span>different interpretation</span>
            <span>liquidity</span>
            <span>relationship breakdown</span>
          </div>
          <div className="aion-card-actions">
            <button
              type="button"
              className="aion-button"
              data-quiet="true"
              onClick={() => navigate("relations")}
            >
              View relationship
            </button>
            <button type="button" className="aion-button" data-quiet="true">
              Follow
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}

function PulseCard({
  event,
  openEvent,
  openCall,
}: {
  event: PulseEvent
  openEvent: () => void
  openCall: () => void
}) {
  const delta = event.current - event.previous
  const stop = (callback: () => void) => (mouseEvent: MouseEvent) => {
    mouseEvent.stopPropagation()
    callback()
  }

  return (
    <article
      className="aion-pulse-card"
      onClick={openEvent}
      onKeyDown={(event) => event.key === "Enter" && openEvent()}
      role="button"
      tabIndex={0}
    >
      <div className="aion-card-meta">
        <span className="category">{event.category}</span>
        <span className="aion-mono">{event.time}</span>
        <span className="aion-chip" data-tier={event.sourceTier}>
          <span className="aion-chip-dot" />
          Tier {event.sourceTier} source
        </span>
      </div>
      <h2>{event.title}</h2>
      <div className="aion-card-move">
        <span className="aion-card-from aion-mono">
          {event.previous.toFixed(1)}%
        </span>
        <span className="aion-card-arrow">→</span>
        <span className="aion-card-to aion-mono">
          {event.current.toFixed(1)}%
        </span>
        <div className="aion-card-stats">
          <span>
            <b className="aion-up aion-mono">+{delta.toFixed(1)}</b> pts
          </span>
          <span>
            <b className="aion-mono">{event.sigma.toFixed(1)}σ</b> move
          </span>
          <span>
            over <b className="aion-mono">{event.duration}</b>
          </span>
        </div>
      </div>
      <div className="aion-card-body">
        <div className="aion-card-cause">
          <span className="aion-label">{event.catalystLabel}</span>
          <span>{event.catalyst}</span>{" "}
          <span className="aion-mono aion-label" style={{ display: "inline" }}>
            {event.catalystTime}
          </span>
          <Residual explained={event.explained} />
        </div>
        <div className="aion-card-confidence">
          <div>
            <span>Identification</span>
            <span>{event.confidence} confidence</span>
          </div>
          <div>
            <span>Data quality</span>
            <span>{event.confidence}</span>
          </div>
          <div>
            <span>Historical analogues</span>
            <span className="aion-mono">n = {event.analogues}</span>
          </div>
        </div>
      </div>
      <div className="aion-card-actions">
        <button
          type="button"
          className="aion-button"
          data-quiet="true"
          onClick={stop(openEvent)}
        >
          Open event
        </button>
        <button
          type="button"
          className="aion-button"
          data-quiet="true"
          onClick={stop(openCall)}
        >
          Make a call
        </button>
        <button
          type="button"
          className="aion-button"
          data-quiet="true"
          onClick={stop(() => undefined)}
        >
          Follow
        </button>
        <button
          type="button"
          className="aion-button"
          data-quiet="true"
          onClick={stop(openEvent)}
        >
          View evidence
        </button>
      </div>
    </article>
  )
}

function Residual({ explained }: { explained: number }) {
  return (
    <div className="aion-residual">
      <div className="aion-residual-track">
        <span className="aion-residual-fill" style={{ width: `${explained}%` }} />
        <span
          className="aion-residual-unknown"
          style={{ width: `${100 - explained}%` }}
        />
      </div>
      <div className="aion-residual-legend">
        <span>Move explained · {explained}%</span>
        <span>Unexplained · {100 - explained}%</span>
      </div>
    </div>
  )
}

function EventScreen({
  event,
  openCall,
  navigate,
}: {
  event: PulseEvent
  openCall: () => void
  navigate: (view: WorkspaceView) => void
}) {
  const [chartTab, setChartTab] = useState("Probability")
  const [range, setRange] = useState("1D")
  const [timelineIndex, setTimelineIndex] = useState(0)
  const [inspectorTab, setInspectorTab] = useState("Source")
  const delta = event.current - event.previous

  return (
    <section className="aion-screen">
      <div className="aion-event-head">
        <div className="aion-event-meta">
          <span style={{ letterSpacing: ".06em", color: "var(--a-tx-1)" }}>
            {event.category}
          </span>
          <span className="aion-chip" data-tier={event.sourceTier}>
            <span className="aion-chip-dot" />
            Tier {event.sourceTier} evidence
          </span>
          <span className="aion-chip">Resolves Oct 29 2026</span>
        </div>
        <h1>{event.title}</h1>
        <div className="aion-event-figures">
          <EventFigure label="Current consensus" value={`${event.current.toFixed(1)}%`} />
          <EventFigure
            label="Movement today"
            value={`+${delta.toFixed(1)} pts`}
            tone="up"
            small
          />
          <EventFigure
            label="AION estimate"
            value={`${Math.max(event.current - 2.6, 0).toFixed(1)}%`}
            muted
            small
          />
          <div className="aion-event-actions">
            <button
              type="button"
              className="aion-button"
              data-primary="true"
              onClick={openCall}
            >
              Make a call
            </button>
            <button type="button" className="aion-button">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="aion-event-layout">
        <div>
          <div className="aion-panel">
            <div className="aion-chart-bar">
              <TabGroup
                items={["Probability", "Volume", "Spread", "Related"]}
                value={chartTab}
                onChange={setChartTab}
              />
              <TabGroup
                items={["1H", "6H", "1D", "1W", "1M", "ALL"]}
                value={range}
                onChange={setRange}
                ranges
              />
            </div>
            <ProbabilityChart event={event} mode={chartTab} range={range} />
          </div>
          <div className="aion-panel">
            <h2>What happened?</h2>
            <div className="aion-timeline">
              {timeline.map((item, index) => (
                <button
                  type="button"
                  key={item.time}
                  className="aion-timeline-item"
                  data-active={timelineIndex === index}
                  onClick={() => setTimelineIndex(index)}
                >
                  <div className="aion-timeline-time aion-mono">{item.time}</div>
                  <div className="aion-timeline-text">
                    {item.text}{" "}
                    {"type" in item && item.type === "source" ? (
                      <span className="aion-chip">↗ source</span>
                    ) : null}
                    {"delta" in item ? (
                      <span
                        className={`aion-mono ${item.tone === "up" ? "aion-up" : "aion-down"}`}
                        style={{ marginLeft: 6, fontSize: 11 }}
                      >
                        {item.delta}
                      </span>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="aion-panel">
            <h2>Why did this move?</h2>
            <div className="aion-attribution-grid">
              <Attribute label="Primary trigger" value={event.catalyst} />
              <Attribute label="Identification confidence" value={`${event.explained + 20}%`} mono />
              <Attribute label="Coverage of move" value={`${event.explained}%`} mono />
              <Attribute label="Data quality" value={event.confidence} />
            </div>
            <Residual explained={event.explained} />
            <div className="aion-inspector-section">Additional signals</div>
            <div className="aion-signal-row">
              <span>Canadian 2Y yield</span>
              <span className="aion-up aion-mono">+17 bps</span>
            </div>
            <div className="aion-signal-row">
              <span>CAD / USD</span>
              <span className="aion-down aion-mono">−0.4%</span>
            </div>
            <div className="aion-signal-row">
              <span>Related rate market</span>
              <span className="aion-up aion-mono">+6 pts</span>
            </div>
            <p className="aion-note">
              We are confident the release triggered the repricing, but
              historically similar releases account for only about{" "}
              {event.explained}% of a move of this magnitude. The remainder is
              unexplained.
            </p>
          </div>
          <div className="aion-panel aion-anomaly">
            <div className="aion-anomaly-flag">△ Expected reaction missing</div>
            <p>
              <b style={{ color: "var(--a-tx-0)", fontWeight: 500 }}>
                Canadian housing correction by Q2 2027
              </b>{" "}
              historically move with this market in 78% of comparable shocks.
              Today: no meaningful movement detected.
            </p>
            <div className="aion-anomaly-interpretations">
              <span>Possible: pricing lag</span>
              <span>different interpretation</span>
              <span>liquidity issue</span>
            </div>
            <button
              type="button"
              className="aion-button"
              data-quiet="true"
              style={{ marginTop: 12 }}
              onClick={() => navigate("relations")}
            >
              View relationship
            </button>
          </div>
        </div>
        <aside className="aion-inspector">
          <div className="aion-inspector-tabs">
            {["Source", "Evidence", "Attribution", "Analogues"].map((item) => (
              <button
                type="button"
                className="aion-tab"
                data-active={inspectorTab === item}
                key={item}
                onClick={() => setInspectorTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <InspectorBody tab={inspectorTab} event={event} />
        </aside>
      </div>
    </section>
  )
}

function EventFigure({
  label,
  value,
  tone,
  muted,
  small,
}: {
  label: string
  value: string
  tone?: "up"
  muted?: boolean
  small?: boolean
}) {
  return (
    <div>
      <span className="aion-event-figure-label">{label}</span>
      <span
        className={`aion-event-figure aion-mono ${tone ? "aion-up" : ""}`}
        style={{
          fontSize: small ? 22 : undefined,
          color: muted ? "var(--a-tx-1)" : undefined,
        }}
      >
        {value}
      </span>
    </div>
  )
}

function TabGroup({
  items,
  value,
  onChange,
  ranges,
}: {
  items: string[]
  value: string
  onChange: (value: string) => void
  ranges?: boolean
}) {
  return (
    <div className="aion-tabs" data-ranges={ranges}>
      {items.map((item) => (
        <button
          type="button"
          className="aion-tab"
          data-active={value === item}
          key={item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function ProbabilityChart({
  event,
  mode,
  range,
}: {
  event: PulseEvent
  mode: string
  range: string
}) {
  const verticalShift = mode === "Volume" ? 18 : mode === "Spread" ? -10 : 0
  return (
    <svg
      viewBox="0 0 800 220"
      preserveAspectRatio="none"
      className="aion-chart"
      role="img"
      aria-label={`${mode} over ${range}`}
    >
      <g stroke="rgba(255,255,255,.045)">
        {[44, 88, 132, 176].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} />
        ))}
      </g>
      <text className="aion-axis" x="770" y="40">
        80%
      </text>
      <text className="aion-axis" x="770" y="84">
        70%
      </text>
      <text className="aion-axis" x="770" y="128">
        60%
      </text>
      <text className="aion-axis" x="770" y="172">
        50%
      </text>
      <path
        d={`M0,138 L60,136 L120,139 L180,135 L240,137 L300,134 L360,136 L420,133 L480,135 L520,134 L560,131 L600,128 L615,112 L628,96 L640,${84 + verticalShift} L660,${76 + verticalShift} L690,72 L730,70 L800,68`}
        fill="none"
        stroke="#8194FF"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="600"
        y1="10"
        x2="600"
        y2="210"
        stroke="rgba(255,255,255,.14)"
        strokeDasharray="2 4"
      />
      <circle cx="600" cy="128" r="3" fill="#0C0E11" stroke="#C9A96A" />
      <text className="aion-axis" x="584" y="20" fill="#C9A96A">
        {event.catalystTime.slice(0, 5)}
      </text>
      <circle cx="800" cy="68" r="3.2" fill="#8194FF" />
    </svg>
  )
}

function Attribute({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div>
      <span className="aion-label">{label}</span>
      <span className={`aion-attribution-value ${mono ? "aion-mono" : ""}`}>
        {value}
      </span>
    </div>
  )
}

function InspectorBody({ tab, event }: { tab: string; event: PulseEvent }) {
  const title =
    tab === "Analogues"
      ? "Comparable expectation shocks"
      : tab === "Attribution"
        ? "AION attribution"
        : tab === "Evidence"
          ? "Cross-market evidence"
          : event.catalyst
  return (
    <div className="aion-inspector-body">
      <div className="aion-inspector-title">{title}</div>
      <div className="aion-kv">
        <span>Published</span>
        <span className="aion-mono">{event.catalystTime}.000</span>
      </div>
      <div className="aion-kv">
        <span>First observed by AION</span>
        <span className="aion-mono">{event.catalystTime}.7</span>
      </div>
      <div className="aion-kv">
        <span>Source reliability</span>
        <span>Tier {event.sourceTier}</span>
      </div>
      <div className="aion-kv">
        <span>Historical relevance</span>
        <span>{event.confidence}</span>
      </div>
      <div className="aion-inspector-section">Entities</div>
      <div className="aion-entity-row">
        <span className="aion-chip">Canada</span>
        <span className="aion-chip">CPI</span>
        <span className="aion-chip">Bank of Canada</span>
      </div>
      <div className="aion-inspector-section">Historical analogues</div>
      <div className="aion-kv">
        <span>Comparable surprises</span>
        <span className="aion-mono">n = {event.analogues}</span>
      </div>
      <div className="aion-kv">
        <span>Median response</span>
        <span className="aion-mono">+8.9 pts</span>
      </div>
      <div className="aion-kv">
        <span>Median lag</span>
        <span className="aion-mono">1m 42s</span>
      </div>
      <button
        type="button"
        className="aion-button"
        data-quiet="true"
        style={{ color: "var(--a-accent)", marginTop: 12 }}
      >
        Open source ↗
      </button>
    </div>
  )
}

function WatchlistScreen({ openEvent }: { openEvent: (event: PulseEvent) => void }) {
  return (
    <section className="aion-screen">
      <ScreenHead
        title="Watchlist"
        description="Markets, entities and event classes you follow."
      />
      <div className="aion-watch-head">
        <span>Item</span>
        <span>Current state</span>
        <span>Largest recent move</span>
        <span>Last catalyst</span>
        <span>Next event</span>
      </div>
      {watchlist.map((row, index) => (
        <button
          type="button"
          className="aion-watch-row"
          key={row[0]}
          onClick={() => openEvent(pulseEvents[index % pulseEvents.length])}
        >
          <span>
            <span className="aion-watch-name">{row[0]}</span>
            <span className="aion-watch-sub">{row[1]}</span>
          </span>
          <span className="aion-mono">{row[2]}</span>
          <span className={row[3].startsWith("−") ? "aion-down" : "aion-up"}>
            {row[3]}
          </span>
          <span>{row[4]}</span>
          <span className="aion-mono">{row[5]}</span>
        </button>
      ))}
    </section>
  )
}

function LedgerScreen() {
  const [query, setQuery] = useState("")
  const filtered = ledgerCards.filter((card) =>
    card.name.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <section className="aion-screen">
      <ScreenHead
        title="Ledger"
        description="Who predicted what, when they predicted it, and how accurate they were."
      />
      <label className="aion-search-large">
        <Search size={14} color="var(--a-tx-2)" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search forecasters, institutions, models…"
        />
      </label>
      <div className="aion-ledger-grid">
        {filtered.map((card) => (
          <article className="aion-ledger-card" key={card.name}>
            <div className="aion-ledger-title">
              <h2>{card.name}</h2>
              <span className="aion-verified">
                <ShieldCheck size={11} style={{ display: "inline" }} />{" "}
                {card.verified}
              </span>
            </div>
            <div className="aion-ledger-kv">
              <span>Overall calibration</span>
              <span className="aion-mono">{card.calibration}</span>
              <span>Forecasts scored</span>
              <span className="aion-mono">{card.forecasts}</span>
              <span>Coverage</span>
              <span className="aion-mono">{card.coverage}</span>
              <span>Best category</span>
              <span>{card.best}</span>
              <span>Weakest category</span>
              <span>{card.weakest}</span>
            </div>
            <div style={{ color: "var(--a-accent)", fontSize: 12, marginTop: 12 }}>
              View record →
            </div>
          </article>
        ))}
      </div>
      <div className="aion-panel">
        <h2>Forecast model rankings</h2>
        <DataTable
          headings={["Model", "Calibration", "Brier", "Coverage", "30D", "90D", "1Y"]}
          rows={modelRankings}
        />
        <p className="aion-note">
          Scores computed on identical resolved questions. Methodology ↗
        </p>
      </div>
    </section>
  )
}

function ArchiveScreen() {
  const [pointInTime, setPointInTime] = useState(false)
  const [position, setPosition] = useState(38)
  const probability = (58.4 + position * 0.2).toFixed(1)
  return (
    <section className="aion-screen">
      <ScreenHead
        title="Archive"
        description="Reconstruct the information environment at any moment."
      />
      <div className="aion-rewind">
        <Field label="Rewind to — date">
          <input type="date" defaultValue="2026-08-17" />
        </Field>
        <Field label="Time">
          <input type="time" defaultValue="10:35:00" />
        </Field>
        <Field label="Timezone">
          <select defaultValue="EDT">
            <option>EDT</option>
            <option>UTC</option>
            <option>PST</option>
          </select>
        </Field>
        <button
          type="button"
          className="aion-button"
          data-primary="true"
          onClick={() => setPointInTime((value) => !value)}
        >
          {pointInTime ? "Exit point-in-time mode" : "Enter point-in-time mode"}
        </button>
      </div>
      {pointInTime ? (
        <div className="aion-point-frame">
          <p style={{ color: "var(--a-tx-2)", fontSize: 12, margin: "0 0 16px" }}>
            Viewing AION as it existed at{" "}
            <span className="aion-mono" style={{ color: "var(--a-accent)" }}>
              Aug 17 2026 · 10:35:00 EDT
            </span>
            . Everything below reflects only information available then.
          </p>
          <div className="aion-replay-state">
            <div className="aion-panel">
              <h2>Market probabilities then</h2>
              <Kv label="BoC October rate cut" value="58.4%" />
              <Kv label="Frontier model before Dec 1" value="41.0%" />
              <Kv label="US CPI above 3.0% (Aug)" value="37.2%" />
              <Kv label="AI regulation before January" value="59.1%" />
            </div>
            <div className="aion-panel" style={{ marginTop: 0 }}>
              <h2>Known at this moment</h2>
              <Kv label="News items observed" value="1,204" />
              <Kv label="Forecasts on record" value="312" />
              <Kv label="Model outputs available" value="7" />
              <Kv label="Not yet known" value="July CPI · BoC decision" />
            </div>
          </div>
          <h2 style={{ fontSize: 12.5, margin: "0 0 2px" }}>Replay</h2>
          <p style={{ color: "var(--a-tx-2)", fontSize: 11.5, margin: 0 }}>
            Drag through time and watch probabilities, news and forecasts arrive.
          </p>
          <input
            className="aion-scrub"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Replay position"
          />
          <p style={{ color: "var(--a-tx-1)", fontSize: 12.5 }}>
            At <span className="aion-mono">14:{Math.round(position / 3 + 29)}</span>{" "}
            — probability <span className="aion-mono">{probability}%</span> ·
            repricing underway · attribution not yet published
          </p>
        </div>
      ) : (
        <div className="aion-panel">
          <h2>Point-in-time analysis</h2>
          <p className="aion-note" style={{ border: 0, margin: 0, padding: 0 }}>
            Choose a historical moment to restore only the evidence, forecasts,
            and relationships available at that time.
          </p>
        </div>
      )}
    </section>
  )
}

function RelationsScreen() {
  const [tab, setTab] = useState("Edge")
  return (
    <section className="aion-screen">
      <ScreenHead
        title="Relations"
        description="Observed relationships across probabilities. Measured, not imagined."
      />
      <div className="aion-relations-layout">
        <RelationshipGraph />
        <aside className="aion-inspector">
          <div className="aion-inspector-tabs">
            {["Edge", "Node", "Cases"].map((item) => (
              <button
                type="button"
                className="aion-tab"
                data-active={tab === item}
                key={item}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="aion-inspector-body">
            <div className="aion-inspector-title">
              FOMC dovish surprise → US 10-Year rate expectations
            </div>
            <div className="aion-entity-row">
              <span className="aion-chip">Shock response</span>
              <span className="aion-chip">Lead / lag</span>
            </div>
            <Kv label="Historical response" value="0.73" />
            <Kv label="Confidence interval" value="0.62–0.81" />
            <Kv label="Median lag" value="1m 42s" />
            <Kv label="Observations" value="n = 84" />
            <Kv label="Regime differences" value="Weaker post-2024" />
            <p className="aion-note">
              Observed relationship. AION does not label edges causal without
              identification.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function RelationshipGraph() {
  const nodes = [
    [320, 220, 34, "FOMC dovish", "surprise", true],
    [470, 120, 27, "US 10Y rate", "expectations", false],
    [480, 300, 24, "USD index", "markets", false],
    [160, 130, 24, "GPU policy", "markets", false],
    [150, 310, 24, "EM rate", "markets", false],
  ] as const
  return (
    <div className="aion-graph">
      <svg viewBox="0 0 640 440" role="img" aria-label="Relationship graph">
        <path className="aion-graph-edge strong" d="M320 220 470 120" />
        <path className="aion-graph-edge" d="M320 220 480 300" />
        <path className="aion-graph-edge" d="M320 220 160 130" />
        <path className="aion-graph-edge" d="M320 220 150 310" />
        <text className="aion-axis" x="392" y="158">0.73 · n=84</text>
        <text className="aion-axis" x="398" y="276">0.41 · n=52</text>
        <text className="aion-axis" x="212" y="166">0.38 · n=67</text>
        <text className="aion-axis" x="208" y="282">0.29 · n=31</text>
        {nodes.map(([x, y, radius, line1, line2, center]) => (
          <g
            key={line1}
            className={`aion-graph-node ${center ? "center" : ""}`}
          >
            <circle cx={x} cy={y} r={radius} />
            <text x={x} y={y - 4} textAnchor="middle">{line1}</text>
            <text x={x} y={y + 9} textAnchor="middle">{line2}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function ResearchScreen() {
  return (
    <section className="aion-screen">
      <div className="aion-rating">
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 550, margin: "0 0 2px" }}>Alan</h1>
          <p style={{ color: "var(--a-tx-2)", fontSize: 12, margin: 0 }}>
            Forecasting since March 2026 · 128 resolved forecasts
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span className="aion-label">Forecast Rating</span>
          <span className="aion-rating-number aion-mono">1,847</span>{" "}
          <span className="aion-label" style={{ display: "inline" }}>± 126</span>
        </div>
      </div>
      <div className="aion-stat-grid">
        <Stat label="Calibration" value="Excellent" />
        <Stat label="Coverage" value="72%" />
        <Stat label="Brier score" value="0.142" />
        <Stat label="Against consensus — won" value="61%" />
      </div>
      <div className="aion-research-grid">
        <div className="aion-panel">
          <h2>Calibration</h2>
          <CalibrationChart />
          <p className="aion-note">
            Slight overconfidence above 80%. Well calibrated elsewhere.
          </p>
        </div>
        <div className="aion-panel" style={{ marginTop: 0 }}>
          <h2>Category scores</h2>
          {[
            ["AI", 82],
            ["Technology", 79],
            ["Macro", 71],
            ["Economics", 69],
            ["Geopolitics", 58],
          ].map(([name, score]) => (
            <div className="aion-category-row" key={name}>
              <span className="aion-category-name">{name}</span>
              <span className="aion-category-bar">
                <i style={{ width: `${score}%` }} />
              </span>
              <span className="aion-mono">{score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="aion-panel">
        <h2>Forecast history</h2>
        <DataTable
          headings={["Forecast", "You", "Consensus then", "Outcome", "Score", "Date"]}
          rows={forecastHistory}
        />
      </div>
    </section>
  )
}

function CalibrationChart() {
  const points = [[60, 150], [92, 131], [124, 116], [156, 94], [188, 72], [220, 55], [252, 32]]
  return (
    <svg viewBox="0 0 300 190" className="aion-calibration" role="img" aria-label="Calibration curve">
      <line x1="30" y1="165" x2="285" y2="10" stroke="rgba(255,255,255,.12)" strokeDasharray="3 4" />
      <path d="M30 163 60 150 92 131 124 116 156 94 188 72 220 55 252 32 285 13" fill="none" stroke="#8194FF" strokeWidth="1.6" />
      {points.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#8194FF" />)}
      <text className="aion-axis" x="118" y="185">Forecast probability</text>
    </svg>
  )
}

function ApiScreen() {
  return (
    <section className="aion-screen">
      <ScreenHead
        title="API"
        description="Typed event-intelligence contracts for downstream clients."
      />
      <div className="aion-panel">
        <h2>Available endpoints</h2>
          <Kv label="List events" value="GET /api/events" />
        <Kv label="Filter domain" value="GET /api/events?domain=finance" />
        <Kv label="Get event" value="GET /api/events/:id" />
        <p className="aion-note">
          Local mock repository. The port is ready for a persisted adapter; no
          API keys are stored in this application.
        </p>
      </div>
    </section>
  )
}

function UtilityScreen({ title, description }: { title: string; description: string }) {
  return (
    <section className="aion-screen">
      <ScreenHead title={title} description={description} />
      <div className="aion-panel">
        <h2>{title} workspace</h2>
        <p className="aion-note" style={{ border: 0, margin: 0, padding: 0 }}>
          This surface is interactive in the shell and intentionally local-only
          for the MVP. Production writes arrive with the persistence layer.
        </p>
      </div>
    </section>
  )
}

function ScreenHead({ title, description }: { title: string; description: string }) {
  return (
    <div className="aion-screen-head">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="aion-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div className="aion-kv">
      <span>{label}</span>
      <span className="aion-mono">{value}</span>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="aion-stat">
      <span className="aion-label">{label}</span>
      <span className="aion-stat-value aion-mono">{value}</span>
    </div>
  )
}

function DataTable({
  headings,
  rows,
}: {
  headings: string[]
  rows: readonly (readonly string[])[]
}) {
  return (
    <div className="aion-table-wrap">
      <table className="aion-table">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th className={index > 0 ? "num" : ""} key={heading}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${cell}`}
                  className={`${index > 0 ? "num aion-mono" : ""} ${cell.startsWith("+") ? "aion-up" : cell.startsWith("−") ? "aion-down" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CommandPalette({
  close,
  navigate,
  openEvent,
}: {
  close: () => void
  navigate: (view: WorkspaceView) => void
  openEvent: () => void
}) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => inputRef.current?.focus(), [])
  const items = useMemo(
    () => [
      { section: "Ask", label: "Why did rate-cut odds move today?", run: openEvent, icon: Sparkles },
      { section: "Ask", label: "Which related event normally reacts but hasn't moved?", run: () => navigate("relations"), icon: Sparkles },
      { section: "Rewind", label: "Rewind this event to August 17 at 10:35 AM", run: () => navigate("archive"), icon: History },
      { section: "Navigate", label: "Pulse", run: () => navigate("pulse"), icon: Activity },
      { section: "Navigate", label: "Ledger", run: () => navigate("ledger"), icon: Database },
      { section: "Navigate", label: "Your record", run: () => navigate("research"), icon: Braces },
      { section: "Create", label: "Alert if BoC October cut exceeds 70%", run: () => navigate("alerts"), icon: AlarmClock },
    ],
    [navigate, openEvent],
  )
  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  )
  const sections = [...new Set(filtered.map((item) => item.section))]
  return (
    <div className="aion-overlay" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="aion-palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <label className="aion-palette-input">
          <Search size={14} color="var(--a-tx-2)" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask AION, search, navigate, rewind…"
          />
        </label>
        <div className="aion-palette-body">
          {sections.map((section) => (
            <div key={section}>
              <div className="aion-palette-section">{section}</div>
              {filtered
                .filter((item) => item.section === section)
                .map((item) => {
                  const Icon = item.icon
                  return (
                    <button type="button" className="aion-palette-item" onClick={item.run} key={item.label}>
                      <Icon size={14} />
                      {item.label}
                    </button>
                  )
                })}
            </div>
          ))}
          {filtered.length === 0 ? (
            <div className="aion-palette-section">No matching intelligence.</div>
          ) : null}
        </div>
        <div className="aion-palette-footer">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}

function CallModal({ event, close }: { event: PulseEvent; close: () => void }) {
  const [probability, setProbability] = useState(67)
  const [locked, setLocked] = useState(false)
  return (
    <div className="aion-overlay" onMouseDown={(mouseEvent) => mouseEvent.target === mouseEvent.currentTarget && close()}>
      <div className="aion-call-modal" role="dialog" aria-modal="true" aria-label="Make a call">
        <h2>Will the Bank of Canada cut in October?</h2>
        <p className="aion-call-sub">
          Blind mode — market consensus, the AION estimate and other forecasters
          are hidden until you lock.
        </p>
        <div className="aion-slider-value aion-mono">
          {probability}%{" "}
          <span className="aion-label" style={{ display: "inline" }}>
            your probability
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="99"
          value={probability}
          disabled={locked}
          onChange={(inputEvent) => setProbability(Number(inputEvent.target.value))}
          aria-label="Your probability"
        />
        <label style={{ display: "block", marginTop: 16, color: "var(--a-tx-1)", fontSize: 12 }}>
          Why?
          <textarea
            defaultValue={`The ${event.catalyst.toLowerCase()} is significant, but the unexplained residual remains material.`}
            disabled={locked}
          />
        </label>
        <div className="aion-call-notice">
          <LockKeyhole size={13} style={{ display: "inline", marginRight: 7 }} />
          This forecast becomes immutable after submission. A correction must be
          a new forecast.
          <div className="aion-mono" style={{ marginTop: 4 }}>
            Timestamp 16:42:17 EDT · cryptographically recorded
          </div>
        </div>
        {locked ? (
          <div className="aion-reveal">
            <span className="aion-label">Locked. Now revealed:</span>
            <RevealRow label="You" value={`${probability}%`} />
            <RevealRow label="Market" value={`${event.current.toFixed(0)}%`} />
            <RevealRow label="AION model" value={`${Math.round(event.current - 2.6)}%`} />
            <RevealRow label="Community" value={`${Math.round(event.current - 1)}%`} />
          </div>
        ) : null}
        <div className="aion-call-actions">
          <button type="button" className="aion-button" onClick={close}>
            {locked ? "Close" : "Cancel"}
          </button>
          {!locked ? (
            <button
              type="button"
              className="aion-button"
              data-primary="true"
              onClick={() => setLocked(true)}
            >
              Lock prediction
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function RevealRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="aion-reveal-row">
      <span>{label}</span>
      <span className="aion-mono">{value}</span>
    </div>
  )
}
