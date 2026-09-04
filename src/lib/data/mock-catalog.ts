import type {
  GraphEdge,
  GraphNode,
  IntelligenceEvent,
  IntelligenceItem,
} from "@/lib/domain/types"

export const events: IntelligenceEvent[] = [
  {
    id: "evt-gpu-export",
    title: "Extra-territorial GPU license expansion",
    question:
      "Will the U.S. extend extra-territorial licensing to all >300-point AI accelerators shipped from third countries by 31 Dec 2026?",
    domain: "technology",
    status: "active",
    significance: "critical",
    currentProbability: 68.0,
    previousProbability: 51.0,
    changedAt: "2026-09-03T18:40:00.000Z",
    updatedAt: "2026-09-04T14:10:00.000Z",
    whatChanged:
      "Implied probability jumped 17.0 pp after a BIS interagency draft circulated with a performance-density threshold that captures current-generation datacenter parts.",
    narrative:
      "A BIS working draft seen by two trade counsel desks would apply the existing Entity List licensing logic to accelerators above a 300-point performance-density score, regardless of country of shipment. Language on 'foreign-produced direct products' is broader than the 2023–2025 rules and would pull in Malaysia, Mexico, and Israel assembly. The move is being read as a pre-emption of a Q4 cluster-build cycle rather than a China-only measure.",
    causes: [
      {
        id: "c-gpu-1",
        statement:
          "Interagency draft lowers the performance-density trigger and drops a prior 'training-only' carve-out.",
        confidence: 0.78,
        category: "policy",
      },
      {
        id: "c-gpu-2",
        statement:
          "Two hyperscalers pulled Q4 rack orders pending written guidance, tightening the spot market.",
        confidence: 0.64,
        category: "market",
      },
      {
        id: "c-gpu-3",
        statement:
          "Allied export-control working group scheduled an unannounced 11 Sep session in The Hague.",
        confidence: 0.55,
        category: "geopolitical",
      },
    ],
    uncertainty: [
      {
        id: "u-gpu-1",
        question: "Does the threshold capture inference-optimized parts or only training SKUs?",
        impact: "A carve-out would cut the effective universe of controlled units by roughly a third.",
        unresolved: true,
      },
      {
        id: "u-gpu-2",
        question: "Will the EU and Japan publish matching notices in the same week?",
        impact: "Unilateral U.S. action leaks volume into allied fabs; coordinated action does not.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-gpu-1",
        source: "BIS interagency working draft (counsel memo)",
        publishedAt: "2026-09-03T16:05:00.000Z",
        summary:
          "Draft §734.9 revision applies the foreign-direct-product rule to accelerators above a 300-point score.",
        stance: "supports",
        reliability: 0.72,
      },
      {
        id: "ev-gpu-2",
        source: "Two hyperscaler procurement notes",
        publishedAt: "2026-09-04T09:20:00.000Z",
        summary:
          "Q4 delivery slots for HBM-attached racks marked 'hold — license review' at two U.S. buyers.",
        stance: "supports",
        reliability: 0.61,
      },
      {
        id: "ev-gpu-3",
        source: "Commerce spokesperson, background",
        publishedAt: "2026-09-04T13:45:00.000Z",
        summary:
          "Officials say 'no final determination' and that existing licenses remain valid.",
        stance: "contradicts",
        reliability: 0.48,
      },
      {
        id: "ev-gpu-4",
        source: "TSMC capacity letter, Arizona",
        publishedAt: "2026-09-02T21:10:00.000Z",
        summary:
          "N2 risk-production letter flags 'export documentation' as a customer gating item for 2027 lots.",
        stance: "contextual",
        reliability: 0.7,
      },
    ],
    relatedEventIds: ["evt-asml-china", "evt-tsmc-az", "evt-frontier"],
    relatedMarkets: [
      {
        id: "mkt-nvda",
        name: "NVDA",
        venue: "NASDAQ",
        last: 178.4,
        unit: "USD",
        changePct: -4.6,
      },
      {
        id: "mkt-tsm",
        name: "TSM",
        venue: "NYSE",
        last: 162.1,
        unit: "USD",
        changePct: -2.1,
      },
    ],
    analogues: [
      {
        id: "an-gpu-1",
        title: "October 2022 semiconductor export interim final rule",
        year: 2022,
        similarity: 0.81,
        outcome:
          "Training-class GPUs to China collapsed within a quarter; grey-market third-country assembly rose.",
        lesson:
          "Threshold design and third-country coverage determine leakage more than the headline ban.",
      },
      {
        id: "an-gpu-2",
        title: "April 2024 advanced-node notification expansion",
        year: 2024,
        similarity: 0.66,
        outcome:
          "Allied alignment lagged 6–10 weeks; U.S. unilateral notices moved prices first.",
        lesson:
          "Price discovery happens on the U.S. notice; volume shifts wait for allied gazettes.",
      },
    ],
    expectationHistory: [
      { at: "2026-07-15T12:00:00.000Z", probability: 34, note: "Baseline after spring guidance." },
      { at: "2026-08-04T12:00:00.000Z", probability: 41, note: "Hill draft floated a density score." },
      { at: "2026-08-20T12:00:00.000Z", probability: 48 },
      { at: "2026-08-29T12:00:00.000Z", probability: 51, note: "Pre-draft consensus." },
      { at: "2026-09-03T18:40:00.000Z", probability: 68, note: "Working draft circulation." },
    ],
    tags: ["export-controls", "accelerators", "BIS", "HBM"],
    region: "United States / extra-territorial",
  },
  {
    id: "evt-tsmc-az",
    title: "TSMC Arizona N2 risk-production yield",
    question:
      "Will TSMC Arizona ship customer N2 risk-production wafers at ≥70% line yield before 31 Mar 2027?",
    domain: "supply_chain",
    status: "active",
    significance: "high",
    currentProbability: 44.0,
    previousProbability: 57.0,
    changedAt: "2026-09-02T21:10:00.000Z",
    updatedAt: "2026-09-04T11:00:00.000Z",
    whatChanged:
      "Probability fell 13.0 pp after the monthly yield letter showed N2 defect density still 1.8× Hsinchu reference.",
    narrative:
      "Fab 21 Phase 2 is in risk production. The August yield letter, shared with a subset of U.S. customers, shows defect density still well above the Hsinchu N2 reference and calls out metrology tool availability plus 'export documentation' as gating items. A successful 70% line-yield print by March is now a minority view. The letter also ties U.S. lots to the pending accelerator-license language, which is why this event moved with the BIS draft.",
    causes: [
      {
        id: "c-az-1",
        statement: "August defect density printed 1.8× the Hsinchu N2 reference.",
        confidence: 0.8,
        category: "technical",
      },
      {
        id: "c-az-2",
        statement: "Two EUV metrology tools remain in customs after a software-license hold.",
        confidence: 0.58,
        category: "operational",
      },
      {
        id: "c-az-3",
        statement:
          "Customer lots now require extra export documentation, adding a scheduling buffer.",
        confidence: 0.62,
        category: "policy",
      },
    ],
    uncertainty: [
      {
        id: "u-az-1",
        question: "Is the defect-density gap tool-limited or process-recipe-limited?",
        impact: "Tool-limited problems slip with the ASML/service calendar; recipe issues can close faster.",
        unresolved: true,
      },
      {
        id: "u-az-2",
        question: "Will Hsinchu transfer additional process-of-record engineers in Q4?",
        impact: "A transfer package was the 2025 recovery path at Fab 21 Phase 1.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-az-1",
        source: "TSMC Arizona August yield letter",
        publishedAt: "2026-09-02T21:10:00.000Z",
        summary:
          "N2 risk-production defect density 1.8× Hsinchu; 70% line-yield target marked 'at risk'.",
        stance: "supports",
        reliability: 0.84,
      },
      {
        id: "ev-az-2",
        source: "U.S. customer operations note",
        publishedAt: "2026-09-03T15:00:00.000Z",
        summary: "One U.S. fabless buyer shifted a 2027 N2 tape-out contingency back to Hsinchu.",
        stance: "supports",
        reliability: 0.6,
      },
      {
        id: "ev-az-3",
        source: "TSMC public Q2 remarks (archived)",
        publishedAt: "2026-07-17T13:00:00.000Z",
        summary: "Management still guided Arizona N2 risk production in 1H27.",
        stance: "contextual",
        reliability: 0.75,
      },
    ],
    relatedEventIds: ["evt-gpu-export", "evt-asml-china", "evt-frontier"],
    relatedMarkets: [
      {
        id: "mkt-tsm",
        name: "TSM",
        venue: "NYSE",
        last: 162.1,
        unit: "USD",
        changePct: -2.1,
      },
      {
        id: "mkt-asml",
        name: "ASML",
        venue: "AMS",
        last: 812.0,
        unit: "EUR",
        changePct: -1.4,
      },
    ],
    analogues: [
      {
        id: "an-az-1",
        title: "TSMC Arizona N4 yield ramp, 2024–2025",
        year: 2025,
        similarity: 0.74,
        outcome:
          "Line yield cleared the internal gate two quarters later than first customer letters implied.",
        lesson: "First customer letters are usually pessimistic on calendar, accurate on physics.",
      },
    ],
    expectationHistory: [
      { at: "2026-06-01T12:00:00.000Z", probability: 62 },
      { at: "2026-07-17T12:00:00.000Z", probability: 60, note: "Public guide unchanged." },
      { at: "2026-08-12T12:00:00.000Z", probability: 57 },
      { at: "2026-09-02T21:10:00.000Z", probability: 44, note: "August yield letter." },
    ],
    tags: ["TSMC", "N2", "Arizona", "yield"],
    region: "United States",
  },
  {
    id: "evt-fed-cut",
    title: "FOMC 25 bp cut in September",
    question:
      "Will the FOMC deliver at least a 25 bp cut at the 16–17 September 2026 meeting?",
    domain: "finance",
    status: "active",
    significance: "high",
    currentProbability: 71.0,
    previousProbability: 63.0,
    changedAt: "2026-09-04T12:35:00.000Z",
    updatedAt: "2026-09-04T16:05:00.000Z",
    whatChanged:
      "Probability rose 8.0 pp after the August employment report printed a third consecutive sub-80k payroll and a rise in the unemployment rate to 4.5%.",
    narrative:
      "The September meeting was already live. The August labor report removed the last 'higher for longer' dissent that desks were still pricing. Core PCE remains sticky at 2.7% but the labor path now dominates the reaction function in staff notes. A 25 bp cut is the modal outcome; 50 bp is still a tail. The yen-carry complex is treating the cut as a given and rotating the question toward the depth of the 2026–27 path.",
    causes: [
      {
        id: "c-fed-1",
        statement: "August payrolls +62k; unemployment rate 4.5%.",
        confidence: 0.9,
        category: "market",
      },
      {
        id: "c-fed-2",
        statement:
          "Two 2026 voters who had been 'hold' shifted to 'data-dependent cut' in on-record remarks this week.",
        confidence: 0.7,
        category: "policy",
      },
      {
        id: "c-fed-3",
        statement: "CRE refinance wall is now cited in two regional Fed notes as a financial-stability input.",
        confidence: 0.46,
        category: "market",
      },
    ],
    uncertainty: [
      {
        id: "u-fed-1",
        question: "Does a hot CPI print next week reopen a hold?",
        impact: "A 0.4% core month would likely pull the cut back toward a coin-flip.",
        unresolved: true,
      },
      {
        id: "u-fed-2",
        question: "Is 50 bp on the table if claims spike into the blackout?",
        impact: "Currently a tail; would reprice the yen-carry unwind event.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-fed-1",
        source: "BLS Employment Situation, August 2026",
        publishedAt: "2026-09-04T12:30:00.000Z",
        summary: "Payrolls +62k; U-rate 4.5%; hours worked down a tenth.",
        stance: "supports",
        reliability: 0.95,
      },
      {
        id: "ev-fed-2",
        source: "SOFR futures strip",
        publishedAt: "2026-09-04T13:10:00.000Z",
        summary: "September meeting implied cut rose from 19 bp to 27 bp.",
        stance: "supports",
        reliability: 0.88,
      },
      {
        id: "ev-fed-3",
        source: "Core PCE, July (released Aug)",
        publishedAt: "2026-08-29T12:30:00.000Z",
        summary: "Core PCE 2.7% y/y — still above target, limiting a 50 bp case.",
        stance: "contradicts",
        reliability: 0.9,
      },
    ],
    relatedEventIds: ["evt-yen-carry", "evt-cre"],
    relatedMarkets: [
      {
        id: "mkt-sofr",
        name: "SOFR Sep-26",
        venue: "CME",
        last: 96.28,
        unit: "price",
        changePct: 0.08,
      },
      {
        id: "mkt-ust10",
        name: "UST 10Y",
        venue: "OTC",
        last: 3.71,
        unit: "%",
        changePct: -0.09,
      },
    ],
    analogues: [
      {
        id: "an-fed-1",
        title: "September 2024 first cut of the cycle",
        year: 2024,
        similarity: 0.69,
        outcome:
          "Committee cut 50 bp after a weaker labor run; front-end overshot, then reversed.",
        lesson: "First cut size is where the committee surprises; direction is usually in the data.",
      },
    ],
    expectationHistory: [
      { at: "2026-07-01T12:00:00.000Z", probability: 28 },
      { at: "2026-08-01T12:00:00.000Z", probability: 46 },
      { at: "2026-08-15T12:00:00.000Z", probability: 55 },
      { at: "2026-08-29T12:00:00.000Z", probability: 63 },
      { at: "2026-09-04T12:35:00.000Z", probability: 71, note: "August labor report." },
    ],
    tags: ["FOMC", "rates", "labor", "SOFR"],
    region: "United States",
  },
  {
    id: "evt-yen-carry",
    title: "JPY carry-trade unwind",
    question:
      "Will USDJPY print below 138 before 31 Oct 2026 on a New York close?",
    domain: "finance",
    status: "active",
    significance: "high",
    currentProbability: 39.0,
    previousProbability: 27.0,
    changedAt: "2026-09-04T13:20:00.000Z",
    updatedAt: "2026-09-04T16:05:00.000Z",
    whatChanged:
      "Probability rose 12.0 pp as the Fed cut repriced and MoF verbal intervention shifted from 'watching' to 'prepared to act'.",
    narrative:
      "The 2024 August unwind is the working analogue: a U.S. easing impulse plus a Japanese official jawbone can force a fast covering rally in JPY. Positioning in leveraged yen-short books is lighter than 2024 but not light. A break of 138 on a New York close is still not base case — it requires both a Fed cut and a visible MoF operation — but the joint probability is now taken seriously on G10 desks.",
    causes: [
      {
        id: "c-jpy-1",
        statement: "Fed September cut now modal, compressing the U.S.–Japan yield gap.",
        confidence: 0.74,
        category: "market",
      },
      {
        id: "c-jpy-2",
        statement: "MoF language upgraded to 'prepared to act' after a 149 handle print.",
        confidence: 0.67,
        category: "policy",
      },
    ],
    uncertainty: [
      {
        id: "u-jpy-1",
        question: "Does BoJ follow with a hike, or only MoF intervene?",
        impact: "Intervention without a hike has a short half-life; both together can hold a break.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-jpy-1",
        source: "MoF remarks, background pool",
        publishedAt: "2026-09-04T01:15:00.000Z",
        summary: "Senior official: 'We are prepared to act against excessive moves.'",
        stance: "supports",
        reliability: 0.66,
      },
      {
        id: "ev-jpy-2",
        source: "CFTC leveraged JPY futures",
        publishedAt: "2026-09-01T20:00:00.000Z",
        summary: "Net short still present but 40% below the July 2024 extreme.",
        stance: "contextual",
        reliability: 0.8,
      },
      {
        id: "ev-jpy-3",
        source: "USDJPY spot",
        publishedAt: "2026-09-04T16:00:00.000Z",
        summary: "Spot 146.8 after the U.S. labor print; 138 remains a distant handle.",
        stance: "contradicts",
        reliability: 0.9,
      },
    ],
    relatedEventIds: ["evt-fed-cut"],
    relatedMarkets: [
      {
        id: "mkt-usdjpy",
        name: "USDJPY",
        venue: "OTC",
        last: 146.8,
        unit: "JPY",
        changePct: -1.1,
      },
    ],
    analogues: [
      {
        id: "an-jpy-1",
        title: "August 2024 yen squeeze",
        year: 2024,
        similarity: 0.83,
        outcome:
          "USDJPY fell more than 10 handles in three sessions as carry books covered into a U.S. easing scare.",
        lesson: "The first official phrase-change is the tell; the print follows positioning, not the phrase.",
      },
    ],
    expectationHistory: [
      { at: "2026-07-20T12:00:00.000Z", probability: 18 },
      { at: "2026-08-18T12:00:00.000Z", probability: 22 },
      { at: "2026-08-30T12:00:00.000Z", probability: 27 },
      { at: "2026-09-04T13:20:00.000Z", probability: 39, note: "Fed + MoF coincidence." },
    ],
    tags: ["JPY", "yen", "carry", "MoF", "G10"],
    region: "Japan / G10",
  },
  {
    id: "evt-rare-earth",
    title: "China heavy rare-earth magnet licenses",
    question:
      "Will China keep monthly heavy rare-earth magnet export licenses at or below 50% of the 2025 average through Q4 2026?",
    domain: "supply_chain",
    status: "active",
    significance: "critical",
    currentProbability: 61.0,
    previousProbability: 46.0,
    changedAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-03T10:30:00.000Z",
    whatChanged:
      "Probability rose 15.0 pp after the August license batch printed 47% of the 2025 monthly average and a new end-use questionnaire appeared for EV and wind buyers.",
    narrative:
      "The Ministry of Commerce added a second-round end-use questionnaire for sintered NdFeB magnets above a dysprosium threshold. Combined with the August license print, the working assumption on auto and wind desks is that the 2025 run-rate is no longer the baseline. Spot dysprosium oxide in Europe jumped. Japanese and Vietnamese separation capacity cannot close a Q4 gap. This event now sits on the same graph as the GPU and ASML nodes because the license logic is being read as a reciprocal control, not a pure environmental measure.",
    causes: [
      {
        id: "c-re-1",
        statement: "August license batch at 47% of the 2025 average.",
        confidence: 0.86,
        category: "policy",
      },
      {
        id: "c-re-2",
        statement: "New end-use questionnaire targeting EV traction and offshore wind.",
        confidence: 0.73,
        category: "policy",
      },
      {
        id: "c-re-3",
        statement: "Reciprocity language in two official commentaries after the BIS draft leak.",
        confidence: 0.5,
        category: "geopolitical",
      },
    ],
    uncertainty: [
      {
        id: "u-re-1",
        question: "Are Japanese and Korean automakers getting quiet allocations above the print?",
        impact: "A quiet channel would make the headline restriction less binding for allied OEMs.",
        unresolved: true,
      },
      {
        id: "u-re-2",
        question: "Does the cap apply to metals or only to finished magnets?",
        impact: "Metal-only leakage into third-country sintering is the 2010–11 analogue.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-re-1",
        source: "MOFCOM August license batch",
        publishedAt: "2026-09-01T08:00:00.000Z",
        summary: "Approved magnet tonnage 47% of 2025 monthly average.",
        stance: "supports",
        reliability: 0.82,
      },
      {
        id: "ev-re-2",
        source: "European Dy oxide spot",
        publishedAt: "2026-09-02T15:00:00.000Z",
        summary: "Spot +19% week-over-week; offer sheets withdrawn for October.",
        stance: "supports",
        reliability: 0.7,
      },
      {
        id: "ev-re-3",
        source: "Vietnam customs, sintered magnet exports",
        publishedAt: "2026-08-28T00:00:00.000Z",
        summary: "July exports up 11% — possible leakage, not yet large enough to offset China.",
        stance: "contradicts",
        reliability: 0.58,
      },
    ],
    relatedEventIds: ["evt-gpu-export", "evt-asml-china"],
    relatedMarkets: [
      {
        id: "mkt-dy",
        name: "Dy oxide (EU spot)",
        venue: "Physical",
        last: 412,
        unit: "USD/kg",
        changePct: 19.0,
      },
    ],
    analogues: [
      {
        id: "an-re-1",
        title: "2010–2011 rare-earth export halt",
        year: 2010,
        similarity: 0.71,
        outcome:
          "Prices spiked, third-country sintering appeared within two years, Japan accelerated stockpiles.",
        lesson: "The first two quarters are about price and allocation, not substitution.",
      },
    ],
    expectationHistory: [
      { at: "2026-06-15T12:00:00.000Z", probability: 29 },
      { at: "2026-07-20T12:00:00.000Z", probability: 38 },
      { at: "2026-08-10T12:00:00.000Z", probability: 46 },
      { at: "2026-09-01T08:00:00.000Z", probability: 61, note: "August licenses + questionnaire." },
    ],
    tags: ["rare-earths", "magnets", "MOFCOM", "EV"],
    region: "China / global magnets",
  },
  {
    id: "evt-taiwan",
    title: "Taiwan Strait exercise window",
    question:
      "Will a PLA exercise close a major commercial lane in the Taiwan Strait for ≥48 hours before 31 Oct 2026?",
    domain: "geopolitics",
    status: "watch",
    significance: "high",
    currentProbability: 24.0,
    previousProbability: 18.0,
    changedAt: "2026-09-03T02:15:00.000Z",
    updatedAt: "2026-09-04T08:00:00.000Z",
    whatChanged:
      "Probability rose 6.0 pp after NOTAMs and an Eastern Theater Command notice sketched a multi-zone drill overlapping two deep-water lanes.",
    narrative:
      "The working question is not 'will there be a drill' — there will — but whether the drill geometry closes a commercial lane for two days or more. That is the threshold that forces reroutes, insurance adders, and a TSMC/shipping mark. Current NOTAMs are larger than the 2025 median drill but still smaller than the 2022 closure analogue. The event is linked to the semiconductor and GPU nodes because a 48-hour close is the first insurance trigger many cargo books use.",
    causes: [
      {
        id: "c-tw-1",
        statement: "Eastern Theater Command notice lists four maritime zones, two overlapping TSS lanes.",
        confidence: 0.6,
        category: "geopolitical",
      },
      {
        id: "c-tw-2",
        statement: "NOTAM duration currently 36 hours — below the 48-hour question, but extendable.",
        confidence: 0.55,
        category: "operational",
      },
    ],
    uncertainty: [
      {
        id: "u-tw-1",
        question: "Will the notice be extended after the first 36 hours?",
        impact: "An extension is how 2022 crossed the commercial-lane threshold.",
        unresolved: true,
      },
      {
        id: "u-tw-2",
        question: "Are live-fire boxes advisory or exclusionary for commercial traffic?",
        impact: "Advisory boxes move insurance more than they move hulls.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-tw-1",
        source: "PRC Eastern Theater Command notice",
        publishedAt: "2026-09-03T02:15:00.000Z",
        summary: "Four maritime zones published; two intersect the northbound TSS.",
        stance: "supports",
        reliability: 0.77,
      },
      {
        id: "ev-tw-2",
        source: "AIS density, Taiwan Strait",
        publishedAt: "2026-09-04T06:00:00.000Z",
        summary: "Transit counts still within a 1σ band of the 30-day mean.",
        stance: "contradicts",
        reliability: 0.73,
      },
      {
        id: "ev-tw-3",
        source: "Marine hull underwriter note",
        publishedAt: "2026-09-03T17:40:00.000Z",
        summary: "War-risk adder discussed, not yet posted, for 7-day cover into Kaohsiung.",
        stance: "contextual",
        reliability: 0.64,
      },
    ],
    relatedEventIds: ["evt-tsmc-az", "evt-red-sea", "evt-hormuz"],
    relatedMarkets: [
      {
        id: "mkt-tsm",
        name: "TSM",
        venue: "NYSE",
        last: 162.1,
        unit: "USD",
        changePct: -2.1,
      },
    ],
    analogues: [
      {
        id: "an-tw-1",
        title: "August 2022 Strait closure after the Pelosi visit",
        year: 2022,
        similarity: 0.68,
        outcome:
          "Commercial lanes were effectively closed for several days; insurance adders persisted longer than the drill.",
        lesson: "Geometry and duration matter more than the press-conference language.",
      },
    ],
    expectationHistory: [
      { at: "2026-07-01T12:00:00.000Z", probability: 14 },
      { at: "2026-08-10T12:00:00.000Z", probability: 16 },
      { at: "2026-08-25T12:00:00.000Z", probability: 18 },
      { at: "2026-09-03T02:15:00.000Z", probability: 24, note: "NOTAM + ETC notice." },
    ],
    tags: ["Taiwan", "PLA", "shipping", "NOTAM"],
    region: "Taiwan Strait",
  },
  {
    id: "evt-red-sea",
    title: "Red Sea war-risk insurance spike",
    question:
      "Will the Joint War Committee list Bab el-Mandeb at a war-risk rate ≥0.75% of hull value before 30 Nov 2026?",
    domain: "geopolitics",
    status: "active",
    significance: "medium",
    currentProbability: 52.0,
    previousProbability: 40.0,
    changedAt: "2026-09-01T19:50:00.000Z",
    updatedAt: "2026-09-04T07:20:00.000Z",
    whatChanged:
      "Probability rose 12.0 pp after two attacks on associated vessels and a 40% week-on-week drop in southbound boxship transits.",
    narrative:
      "The 2023–24 diversion is the living memory. Carriers had quietly returned a fraction of services in 2025. Two incidents in eight days and a sharp AIS drop put the Joint War Committee back on a short calendar. A 0.75% hull-value rate is the level at which most Asia–Europe loops re-open the Cape discussion. Hormuz is a separate node; desks are treating them as correlated only through insurance capacity, not through the actors.",
    causes: [
      {
        id: "c-rs-1",
        statement: "Two associated-vessel incidents inside eight days.",
        confidence: 0.84,
        category: "geopolitical",
      },
      {
        id: "c-rs-2",
        statement: "Southbound boxship transits −40% week-on-week on AIS.",
        confidence: 0.8,
        category: "operational",
      },
    ],
    uncertainty: [
      {
        id: "u-rs-1",
        question: "Does the JWC wait for a third incident or reprice on two?",
        impact: "Historical practice is three or a fatality; 2024 was faster.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-rs-1",
        source: "UKMTO incident notes",
        publishedAt: "2026-09-01T19:50:00.000Z",
        summary: "Second associated-vessel attack in the southern Red Sea in eight days.",
        stance: "supports",
        reliability: 0.86,
      },
      {
        id: "ev-rs-2",
        source: "AIS southbound boxships, Bab el-Mandeb",
        publishedAt: "2026-09-03T00:00:00.000Z",
        summary: "Weekly transit count −40% versus the prior four-week mean.",
        stance: "supports",
        reliability: 0.83,
      },
      {
        id: "ev-rs-3",
        source: "JWC listed areas, last circular",
        publishedAt: "2026-08-14T00:00:00.000Z",
        summary: "Current listed rate 0.35% — still below the 0.75% question.",
        stance: "contextual",
        reliability: 0.9,
      },
    ],
    relatedEventIds: ["evt-hormuz", "evt-taiwan"],
    relatedMarkets: [
      {
        id: "mkt-fbx",
        name: "FBX Asia–N. Europe",
        venue: "Freightos",
        last: 2840,
        unit: "USD/FEU",
        changePct: 11.2,
      },
    ],
    analogues: [
      {
        id: "an-rs-1",
        title: "Q4 2023–Q1 2024 Red Sea diversion",
        year: 2024,
        similarity: 0.88,
        outcome:
          "Rates doubled, then settled at a higher plateau; some loops never fully returned.",
        lesson: "Insurance is the binding constraint, not the navy presence.",
      },
    ],
    expectationHistory: [
      { at: "2026-07-01T12:00:00.000Z", probability: 22 },
      { at: "2026-08-14T12:00:00.000Z", probability: 31 },
      { at: "2026-08-25T12:00:00.000Z", probability: 40 },
      { at: "2026-09-01T19:50:00.000Z", probability: 52, note: "Second incident." },
    ],
    tags: ["Red Sea", "insurance", "JWC", "container"],
    region: "Bab el-Mandeb",
  },
  {
    id: "evt-eu-ai",
    title: "EU AI Act GPAI enforcement actions",
    question:
      "Will the AI Office open a formal GPAI enforcement action against at least one frontier lab before 31 Mar 2027?",
    domain: "technology",
    status: "watch",
    significance: "medium",
    currentProbability: 58.0,
    previousProbability: 52.0,
    changedAt: "2026-08-28T09:00:00.000Z",
    updatedAt: "2026-09-02T16:40:00.000Z",
    whatChanged:
      "Probability rose 6.0 pp after the AI Office published a codes-of-practice compliance heatmap that marked two labs 'insufficient' on model documentation.",
    narrative:
      "The GPAI obligations are in force. The political question has moved from 'will they enforce' to 'who is first'. A public heatmap with two 'insufficient' marks is the first document that looks like a pre-action file. Labs are treating the next 90 days as a documentation race. This is linked to the frontier-training event because a formal action can delay a EU release window even if training itself completes.",
    causes: [
      {
        id: "c-eu-1",
        statement: "AI Office heatmap marked two labs insufficient on documentation.",
        confidence: 0.77,
        category: "policy",
      },
      {
        id: "c-eu-2",
        statement: "Parliament letter asking the Office to 'use the tools it already has'.",
        confidence: 0.5,
        category: "policy",
      },
    ],
    uncertainty: [
      {
        id: "u-eu-1",
        question: "Is the first action a fine, a disclosure order, or a deploy pause?",
        impact: "A disclosure order moves less product than a deploy pause.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-eu-1",
        source: "AI Office GPAI compliance heatmap",
        publishedAt: "2026-08-28T09:00:00.000Z",
        summary: "Two providers marked insufficient on model documentation and compute reporting.",
        stance: "supports",
        reliability: 0.8,
      },
      {
        id: "ev-eu-2",
        source: "Lab counsel note (secondary)",
        publishedAt: "2026-09-02T16:40:00.000Z",
        summary: "One lab opened an EU documentation sprint; no product delay acknowledged.",
        stance: "contextual",
        reliability: 0.45,
      },
    ],
    relatedEventIds: ["evt-frontier"],
    relatedMarkets: [],
    analogues: [
      {
        id: "an-eu-1",
        title: "First GDPR mega-enforcement wave, 2019–2021",
        year: 2019,
        similarity: 0.54,
        outcome:
          "First cases were documentation and lawful-basis files, not the most famous brands.",
        lesson: "The first file is often the one with the cleanest paper trail, not the largest model.",
      },
    ],
    expectationHistory: [
      { at: "2026-05-01T12:00:00.000Z", probability: 36 },
      { at: "2026-07-01T12:00:00.000Z", probability: 47 },
      { at: "2026-08-10T12:00:00.000Z", probability: 52 },
      { at: "2026-08-28T09:00:00.000Z", probability: 58, note: "Heatmap." },
    ],
    tags: ["EU", "AI Act", "GPAI", "compliance"],
    region: "European Union",
  },
  {
    id: "evt-frontier",
    title: "Frontier training-run completion slip",
    question:
      "Will any U.S. frontier lab publicly complete a ≥10^26 FLOP training run before 31 Jan 2027?",
    domain: "technology",
    status: "active",
    significance: "high",
    currentProbability: 36.0,
    previousProbability: 49.0,
    changedAt: "2026-09-03T22:00:00.000Z",
    updatedAt: "2026-09-04T14:10:00.000Z",
    whatChanged:
      "Probability fell 13.0 pp as GPU license risk and Arizona yield combined with a cluster-power interconnect delay at one known training site.",
    narrative:
      "Three labs were racing a 10^26-scale run. The binding constraints are no longer just algorithms. Export-license uncertainty froze a Q4 rack tranche; Arizona N2 risk production is not a 2026 input but it is a 2027 HBM/packaging tell; and one desert training site slipped a 400 kV interconnect. The January date is now a stretch. A quiet completion without a public claim would not resolve this question — the question is a public completion.",
    causes: [
      {
        id: "c-fr-1",
        statement: "Q4 accelerator racks on hold pending BIS guidance.",
        confidence: 0.7,
        category: "policy",
      },
      {
        id: "c-fr-2",
        statement: "400 kV interconnect at one training site slipped into 2027.",
        confidence: 0.62,
        category: "operational",
      },
      {
        id: "c-fr-3",
        statement: "EU documentation sprint pulling evaluation staff off run-prep.",
        confidence: 0.34,
        category: "policy",
      },
    ],
    uncertainty: [
      {
        id: "u-fr-1",
        question: "Can a lab finish on already-installed clusters without the Q4 tranche?",
        impact: "If yes, the January date is still live; if no, it is 2H27.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-fr-1",
        source: "Utility interconnection docket, secondary read",
        publishedAt: "2026-09-03T22:00:00.000Z",
        summary: "400 kV tap delayed; commercial operation moved off the 2026 calendar.",
        stance: "supports",
        reliability: 0.63,
      },
      {
        id: "ev-fr-2",
        source: "Hyperscaler rack hold notes",
        publishedAt: "2026-09-04T09:20:00.000Z",
        summary: "Same hold notes cited on the GPU-export event.",
        stance: "supports",
        reliability: 0.61,
      },
      {
        id: "ev-fr-3",
        source: "Lab research blog (July)",
        publishedAt: "2026-07-22T00:00:00.000Z",
        summary: "Publicly still pointed at a 2026-scale run.",
        stance: "contradicts",
        reliability: 0.4,
      },
    ],
    relatedEventIds: ["evt-gpu-export", "evt-tsmc-az", "evt-eu-ai"],
    relatedMarkets: [
      {
        id: "mkt-nvda",
        name: "NVDA",
        venue: "NASDAQ",
        last: 178.4,
        unit: "USD",
        changePct: -4.6,
      },
    ],
    analogues: [
      {
        id: "an-fr-1",
        title: "2022–2023 large-run slips after export rules and H100 allocation",
        year: 2023,
        similarity: 0.72,
        outcome:
          "Public completions lagged internal cluster plans by two to three quarters.",
        lesson: "Power and parts slip the date; the paper is written as if they will not.",
      },
    ],
    expectationHistory: [
      { at: "2026-06-01T12:00:00.000Z", probability: 64 },
      { at: "2026-07-22T12:00:00.000Z", probability: 58 },
      { at: "2026-08-20T12:00:00.000Z", probability: 49 },
      { at: "2026-09-03T22:00:00.000Z", probability: 36, note: "Power + license coincidence." },
    ],
    tags: ["frontier", "compute", "FLOP", "clusters"],
    region: "United States",
  },
  {
    id: "evt-cre",
    title: "U.S. office CRE refinance break",
    question:
      "Will the 30-day delinquency rate on U.S. office CMBS rise above 11% before 31 Dec 2026?",
    domain: "finance",
    status: "watch",
    significance: "medium",
    currentProbability: 47.0,
    previousProbability: 42.0,
    changedAt: "2026-09-04T14:55:00.000Z",
    updatedAt: "2026-09-04T16:05:00.000Z",
    whatChanged:
      "Probability rose 5.0 pp after a $4.1bn 2016-vintage office tower failed to refinance and was transferred to special servicing.",
    narrative:
      "The 2026 office wall is not a surprise. What changed is a single trophy-adjacent asset large enough to move the CMBS delinquency print. Regional-bank marks are still the slower tell. A September Fed cut helps the 2027 wall more than the 2026 wall — the failed refinance was already inside the lockout. Linked to the FOMC event only through the longer path, not this print.",
    causes: [
      {
        id: "c-cre-1",
        statement: "$4.1bn 2016-vintage tower transferred to special servicing.",
        confidence: 0.88,
        category: "market",
      },
      {
        id: "c-cre-2",
        statement: "Office attendance in that submarket still ~58% of 2019.",
        confidence: 0.7,
        category: "operational",
      },
    ],
    uncertainty: [
      {
        id: "u-cre-1",
        question: "Do servicers extend quietly through year-end to avoid the print?",
        impact: "Extensions can hold the rate under 11% even if economic delinquency is higher.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-cre-1",
        source: "CMBS servicer transfer notice",
        publishedAt: "2026-09-04T14:55:00.000Z",
        summary: "$4.1bn office loan moved to special servicing after a failed refinance.",
        stance: "supports",
        reliability: 0.9,
      },
      {
        id: "ev-cre-2",
        source: "Trepp office CMBS 30-day delinquency",
        publishedAt: "2026-09-02T00:00:00.000Z",
        summary: "Last print 9.6% — still below the 11% question.",
        stance: "contextual",
        reliability: 0.86,
      },
    ],
    relatedEventIds: ["evt-fed-cut"],
    relatedMarkets: [
      {
        id: "mkt-cmbx",
        name: "CMBX.NA.BBB",
        venue: "Markit",
        last: 68.2,
        unit: "price",
        changePct: -1.8,
      },
    ],
    analogues: [
      {
        id: "an-cre-1",
        title: "2023 regional-bank / CRE echo",
        year: 2023,
        similarity: 0.6,
        outcome:
          "Delinquency rose, but extensions and reserve releases kept a system-wide break from printing.",
        lesson: "The headline rate can lag the economic loss by two to four quarters.",
      },
    ],
    expectationHistory: [
      { at: "2026-06-01T12:00:00.000Z", probability: 33 },
      { at: "2026-08-01T12:00:00.000Z", probability: 42 },
      { at: "2026-09-04T14:55:00.000Z", probability: 47, note: "Special servicing transfer." },
    ],
    tags: ["CMBS", "office", "refi", "CRE"],
    region: "United States",
  },
  {
    id: "evt-asml-china",
    title: "ASML China service restrictions",
    question:
      "Will the Netherlands publish a service-and-parts restriction covering DUV immersion tools already installed in China before 31 Dec 2026?",
    domain: "technology",
    status: "active",
    significance: "high",
    currentProbability: 55.0,
    previousProbability: 43.0,
    changedAt: "2026-09-03T17:05:00.000Z",
    updatedAt: "2026-09-04T14:10:00.000Z",
    whatChanged:
      "Probability rose 12.0 pp after The Hague session was put on the calendar and a draft 'maintenance of installed base' clause circulated with the BIS package.",
    narrative:
      "The installed-base question is the one that matters more than new-tool shipments. A service-and-parts restriction on DUV immersion would degrade mature-node capacity with a lag, not a cliff. ASML has previously said it will follow the law of the jurisdictions it operates in. The Hague session and the BIS draft arriving in the same week is the coincidence that moved this event. Linked tightly to GPU export and Arizona yield via the same control theory.",
    causes: [
      {
        id: "c-asml-1",
        statement: "Draft clause on 'maintenance of installed base' attached to the BIS package.",
        confidence: 0.6,
        category: "policy",
      },
      {
        id: "c-asml-2",
        statement: "Unannounced allied working-group session in The Hague on 11 Sep.",
        confidence: 0.55,
        category: "geopolitical",
      },
    ],
    uncertainty: [
      {
        id: "u-asml-1",
        question: "Does the restriction cover parts, software, or on-site engineers?",
        impact: "Parts-only is leakable; software plus engineers is not.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-asml-1",
        source: "Allied working-group calendar (secondary)",
        publishedAt: "2026-09-03T17:05:00.000Z",
        summary: "The Hague session listed without a public agenda.",
        stance: "supports",
        reliability: 0.5,
      },
      {
        id: "ev-asml-2",
        source: "ASML public position (archived)",
        publishedAt: "2026-04-16T00:00:00.000Z",
        summary: "Company states it complies with applicable export and service law.",
        stance: "contextual",
        reliability: 0.7,
      },
    ],
    relatedEventIds: ["evt-gpu-export", "evt-tsmc-az", "evt-rare-earth"],
    relatedMarkets: [
      {
        id: "mkt-asml",
        name: "ASML",
        venue: "AMS",
        last: 812.0,
        unit: "EUR",
        changePct: -1.4,
      },
    ],
    analogues: [
      {
        id: "an-asml-1",
        title: "2023–2024 Dutch DUV shipment license regime",
        year: 2023,
        similarity: 0.76,
        outcome:
          "New shipments slowed; installed-base service continued and became the next ask.",
        lesson: "Service is the sequel to a shipment rule, usually 12–24 months later.",
      },
    ],
    expectationHistory: [
      { at: "2026-06-01T12:00:00.000Z", probability: 28 },
      { at: "2026-08-01T12:00:00.000Z", probability: 39 },
      { at: "2026-08-22T12:00:00.000Z", probability: 43 },
      { at: "2026-09-03T17:05:00.000Z", probability: 55, note: "Hague + draft clause." },
    ],
    tags: ["ASML", "DUV", "Netherlands", "installed-base"],
    region: "Netherlands / China",
  },
  {
    id: "evt-hormuz",
    title: "Strait of Hormuz disruption premium",
    question:
      "Will the Brent–Dubai EFS spread hold above $4.50/bbl for ten consecutive sessions before 31 Oct 2026?",
    domain: "supply_chain",
    status: "watch",
    significance: "high",
    currentProbability: 29.0,
    previousProbability: 21.0,
    changedAt: "2026-09-02T06:40:00.000Z",
    updatedAt: "2026-09-03T11:15:00.000Z",
    whatChanged:
      "Probability rose 8.0 pp after a naval incident report and a one-day VLCC fixture premium that did not fully reverse.",
    narrative:
      "Hormuz risk is chronic and usually mean-reverting. The question is written as a ten-session EFS hold so it cannot be resolved by a one-day scare. The latest incident was small. The fixture premium is the more interesting tell: it did not fully reverse, which is how 2019 and 2024 both started. Correlated with Red Sea only through hull insurance capacity. Not currently linked to the Taiwan node except via the same underwriters.",
    causes: [
      {
        id: "c-ho-1",
        statement: "Naval incident report near the traffic-separation scheme.",
        confidence: 0.5,
        category: "geopolitical",
      },
      {
        id: "c-ho-2",
        statement: "VLCC fixture premium held a residual after the incident day.",
        confidence: 0.58,
        category: "market",
      },
    ],
    uncertainty: [
      {
        id: "u-ho-1",
        question: "Was the residual premium risk or just a tight tonnage week?",
        impact: "Tonnage-driven residuals fade; risk-driven residuals persist.",
        unresolved: true,
      },
    ],
    evidence: [
      {
        id: "ev-ho-1",
        source: "Broker VLCC AG–East fixture sheet",
        publishedAt: "2026-09-02T06:40:00.000Z",
        summary: "Worldscale premium held ~8 points after the incident session.",
        stance: "supports",
        reliability: 0.68,
      },
      {
        id: "ev-ho-2",
        source: "Brent–Dubai EFS",
        publishedAt: "2026-09-03T11:15:00.000Z",
        summary: "Last 3.10 — below the 4.50 hold question.",
        stance: "contradicts",
        reliability: 0.9,
      },
    ],
    relatedEventIds: ["evt-red-sea", "evt-taiwan"],
    relatedMarkets: [
      {
        id: "mkt-brent",
        name: "Brent 1M",
        venue: "ICE",
        last: 81.4,
        unit: "USD/bbl",
        changePct: 1.6,
      },
    ],
    analogues: [
      {
        id: "an-ho-1",
        title: "May–June 2019 tanker attacks",
        year: 2019,
        similarity: 0.64,
        outcome:
          "Spreads jumped, then faded until a second incident reset the premium.",
        lesson: "One incident prices a day; two incidents price a month.",
      },
    ],
    expectationHistory: [
      { at: "2026-07-01T12:00:00.000Z", probability: 17 },
      { at: "2026-08-15T12:00:00.000Z", probability: 21 },
      { at: "2026-09-02T06:40:00.000Z", probability: 29, note: "Incident + residual fixture." },
    ],
    tags: ["Hormuz", "Brent", "VLCC", "energy"],
    region: "Persian Gulf",
  },
]

export const feed: IntelligenceItem[] = [
  {
    id: "feed-1",
    eventId: "evt-fed-cut",
    occurredAt: "2026-09-04T12:35:00.000Z",
    kind: "probability_shift",
    headline: "September cut moves to 71% after a third weak payrolls print",
    detail:
      "BLS +62k / U-rate 4.5%. SOFR strip now prices 27 bp at the 16–17 Sep meeting.",
    deltaPp: 8.0,
  },
  {
    id: "feed-2",
    eventId: "evt-yen-carry",
    occurredAt: "2026-09-04T13:20:00.000Z",
    kind: "probability_shift",
    headline: "USDJPY-below-138 rises to 39% as MoF language hardens",
    detail:
      "Fed cut is now modal and MoF shifted from 'watching' to 'prepared to act'.",
    deltaPp: 12.0,
  },
  {
    id: "feed-3",
    eventId: "evt-cre",
    occurredAt: "2026-09-04T14:55:00.000Z",
    kind: "new_evidence",
    headline: "$4.1bn office tower transferred to special servicing",
    detail:
      "Failed refinance on a 2016-vintage CMBS loan. Delinquency question now 47%.",
    deltaPp: 5.0,
  },
  {
    id: "feed-4",
    eventId: "evt-gpu-export",
    occurredAt: "2026-09-03T18:40:00.000Z",
    kind: "probability_shift",
    headline: "Extra-territorial GPU rule jumps 17 pp on a BIS working draft",
    detail:
      "300-point density threshold and a broader foreign-direct-product clause.",
    deltaPp: 17.0,
  },
  {
    id: "feed-5",
    eventId: "evt-frontier",
    occurredAt: "2026-09-03T22:00:00.000Z",
    kind: "probability_shift",
    headline: "Public 10^26 run before Jan 2027 falls to 36%",
    detail:
      "Q4 racks on hold and a 400 kV interconnect slip at one training site.",
    deltaPp: -13.0,
  },
  {
    id: "feed-6",
    eventId: "evt-asml-china",
    occurredAt: "2026-09-03T17:05:00.000Z",
    kind: "relationship",
    headline: "Hague session linked to the BIS installed-base clause",
    detail:
      "Service-and-parts restriction on DUV immersion now a 55% event.",
    deltaPp: 12.0,
  },
  {
    id: "feed-7",
    eventId: "evt-taiwan",
    occurredAt: "2026-09-03T02:15:00.000Z",
    kind: "uncertainty",
    headline: "Strait NOTAMs overlap TSS lanes — 48-hour close still open",
    detail:
      "Published duration is 36 hours. Extension is the unresolved question.",
    deltaPp: 6.0,
  },
  {
    id: "feed-8",
    eventId: "evt-tsmc-az",
    occurredAt: "2026-09-02T21:10:00.000Z",
    kind: "probability_shift",
    headline: "Arizona N2 March yield gate drops to 44%",
    detail: "August letter: defect density 1.8× Hsinchu reference.",
    deltaPp: -13.0,
  },
  {
    id: "feed-9",
    eventId: "evt-hormuz",
    occurredAt: "2026-09-02T06:40:00.000Z",
    kind: "new_evidence",
    headline: "VLCC residual premium holds after a Hormuz incident session",
    detail: "EFS still 3.10. Ten-session $4.50 hold remains a watch item.",
    deltaPp: 8.0,
  },
  {
    id: "feed-10",
    eventId: "evt-rare-earth",
    occurredAt: "2026-09-01T08:00:00.000Z",
    kind: "probability_shift",
    headline: "Heavy RE magnet licenses print at 47% of the 2025 average",
    detail: "New end-use questionnaire for EV and wind. Event now 61%.",
    deltaPp: 15.0,
  },
  {
    id: "feed-11",
    eventId: "evt-red-sea",
    occurredAt: "2026-09-01T19:50:00.000Z",
    kind: "new_evidence",
    headline: "Second Red Sea attack in eight days; AIS transits −40%",
    detail: "JWC 0.75% question moved to 52%.",
    deltaPp: 12.0,
  },
  {
    id: "feed-12",
    eventId: "evt-eu-ai",
    occurredAt: "2026-08-28T09:00:00.000Z",
    kind: "analogue_match",
    headline: "GPAI heatmap rhymes with the first GDPR documentation cases",
    detail:
      "Two labs marked insufficient. First formal action now a 58% event.",
    deltaPp: 6.0,
  },
  {
    id: "feed-13",
    eventId: "evt-gpu-export",
    occurredAt: "2026-09-04T09:20:00.000Z",
    kind: "new_evidence",
    headline: "Two hyperscalers mark Q4 racks 'hold — license review'",
    detail: "Spot HBM-attached capacity tightened the same morning.",
  },
  {
    id: "feed-14",
    eventId: "evt-fed-cut",
    occurredAt: "2026-09-04T13:10:00.000Z",
    kind: "new_evidence",
    headline: "SOFR September contract prices a full 25 bp cut",
    detail: "Implied 27 bp. 50 bp remains a tail unless claims spike into blackout.",
  },
]

export const graphNodes: GraphNode[] = [
  { id: "evt-gpu-export", label: "GPU licenses", kind: "event", domain: "technology" },
  { id: "evt-tsmc-az", label: "Arizona N2", kind: "event", domain: "supply_chain" },
  { id: "evt-fed-cut", label: "FOMC cut", kind: "event", domain: "finance" },
  { id: "evt-yen-carry", label: "JPY carry", kind: "event", domain: "finance" },
  { id: "evt-rare-earth", label: "RE magnets", kind: "event", domain: "supply_chain" },
  { id: "evt-taiwan", label: "Strait drill", kind: "event", domain: "geopolitics" },
  { id: "evt-red-sea", label: "Red Sea", kind: "event", domain: "geopolitics" },
  { id: "evt-eu-ai", label: "EU AI Act", kind: "event", domain: "technology" },
  { id: "evt-frontier", label: "Frontier run", kind: "event", domain: "technology" },
  { id: "evt-cre", label: "Office CRE", kind: "event", domain: "finance" },
  { id: "evt-asml-china", label: "ASML service", kind: "event", domain: "technology" },
  { id: "evt-hormuz", label: "Hormuz", kind: "event", domain: "supply_chain" },
  { id: "ent-bis", label: "BIS", kind: "entity" },
  { id: "ent-tsmc", label: "TSMC", kind: "entity" },
  { id: "ent-asml", label: "ASML", kind: "entity" },
  { id: "ent-mof", label: "MoF Japan", kind: "entity" },
  { id: "ent-fed", label: "FOMC", kind: "entity" },
  { id: "ent-mofcom", label: "MOFCOM", kind: "entity" },
  { id: "ent-pla", label: "ETC / PLA", kind: "entity" },
  { id: "ent-jwc", label: "JWC", kind: "entity" },
  { id: "mkt-nvda", label: "NVDA", kind: "market" },
  { id: "mkt-sofr", label: "SOFR", kind: "market" },
  { id: "mkt-usdjpy", label: "USDJPY", kind: "market" },
  { id: "mkt-brent", label: "Brent", kind: "market" },
  { id: "reg-strait", label: "Taiwan Strait", kind: "region" },
  { id: "reg-mandeb", label: "Bab el-Mandeb", kind: "region" },
  { id: "reg-hormuz", label: "Hormuz", kind: "region" },
]

export const graphEdges: GraphEdge[] = [
  { id: "e1", source: "ent-bis", target: "evt-gpu-export", relation: "drafts" },
  { id: "e2", source: "evt-gpu-export", target: "evt-frontier", relation: "constrains compute" },
  { id: "e3", source: "evt-gpu-export", target: "evt-asml-china", relation: "same control theory" },
  { id: "e4", source: "evt-gpu-export", target: "mkt-nvda", relation: "reprices" },
  { id: "e5", source: "ent-tsmc", target: "evt-tsmc-az", relation: "operates" },
  { id: "e6", source: "evt-tsmc-az", target: "evt-frontier", relation: "2027 packaging tell" },
  { id: "e7", source: "evt-asml-china", target: "ent-asml", relation: "binds" },
  { id: "e8", source: "ent-fed", target: "evt-fed-cut", relation: "decides" },
  { id: "e9", source: "evt-fed-cut", target: "evt-yen-carry", relation: "compresses carry" },
  { id: "e10", source: "evt-fed-cut", target: "mkt-sofr", relation: "sets" },
  { id: "e11", source: "ent-mof", target: "evt-yen-carry", relation: "may intervene" },
  { id: "e12", source: "evt-yen-carry", target: "mkt-usdjpy", relation: "targets" },
  { id: "e13", source: "ent-mofcom", target: "evt-rare-earth", relation: "licenses" },
  { id: "e14", source: "evt-rare-earth", target: "evt-gpu-export", relation: "reciprocal read" },
  { id: "e15", source: "ent-pla", target: "evt-taiwan", relation: "conducts" },
  { id: "e16", source: "evt-taiwan", target: "reg-strait", relation: "closes?" },
  { id: "e17", source: "evt-taiwan", target: "evt-tsmc-az", relation: "insurance trigger" },
  { id: "e18", source: "ent-jwc", target: "evt-red-sea", relation: "lists" },
  { id: "e19", source: "evt-red-sea", target: "reg-mandeb", relation: "prices" },
  { id: "e20", source: "evt-hormuz", target: "reg-hormuz", relation: "prices" },
  { id: "e21", source: "evt-hormuz", target: "mkt-brent", relation: "widens EFS" },
  { id: "e22", source: "evt-red-sea", target: "evt-hormuz", relation: "shared hull capacity" },
  { id: "e23", source: "evt-eu-ai", target: "evt-frontier", relation: "may delay EU release" },
  { id: "e24", source: "evt-cre", target: "evt-fed-cut", relation: "stability input" },
]
