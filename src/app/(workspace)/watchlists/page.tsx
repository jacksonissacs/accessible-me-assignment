import type { Metadata } from "next"

import { WatchlistsScreen } from "@/components/screens/watchlists-screen"

export const metadata: Metadata = { title: "Watchlists" }

export default function WatchlistsPage() {
  return <WatchlistsScreen />
}
