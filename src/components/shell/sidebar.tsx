"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { DOMAINS, DOMAIN_LABEL, type Domain } from "@/lib/domain/types"

const NAV = [
  { href: "/", label: "Feed", match: "feed" },
  { href: "/graph", label: "Graph", match: "graph" },
] as const

export function SidebarNav({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const domain = searchParams.get("domain")

  return (
    <nav className={cn("flex flex-col gap-6", className)} aria-label="AION">
      <div>
        <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Surfaces
        </p>
        <ul className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active =
              item.match === "graph"
                ? pathname.startsWith("/graph")
                : pathname === "/"
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex h-8 items-center rounded-md px-2 text-sm transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Domains
        </p>
        <ul className="flex flex-col gap-0.5">
          <li>
            <DomainLink
              href="/"
              label="All books"
              active={pathname === "/" && !domain}
              onNavigate={onNavigate}
            />
          </li>
          {DOMAINS.map((value) => (
            <li key={value}>
              <DomainLink
                href={`/?domain=${value}`}
                label={DOMAIN_LABEL[value]}
                active={pathname === "/" && domain === value}
                onNavigate={onNavigate}
                domain={value}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function DomainLink({
  href,
  label,
  active,
  onNavigate,
  domain,
}: {
  href: string
  label: string
  active: boolean
  onNavigate?: () => void
  domain?: Domain
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      data-domain={domain}
      className={cn(
        "flex h-8 items-center justify-between rounded-md px-2 text-sm transition-colors",
        active
          ? "bg-muted text-foreground"
          : "text-foreground/65 hover:bg-muted/70 hover:text-foreground",
      )}
    >
      <span>{label}</span>
      {active ? (
        <span className="font-mono text-[10px] text-muted-foreground">LIVE</span>
      ) : null}
    </Link>
  )
}
