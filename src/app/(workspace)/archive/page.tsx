import type { Metadata } from "next"

import { ArchiveScreen } from "@/components/screens/archive-screen"

export const metadata: Metadata = { title: "Archive" }

export default function ArchivePage() {
  return <ArchiveScreen />
}
