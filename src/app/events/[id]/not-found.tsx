import Link from "next/link"

export default function EventNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-16">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-2 text-2xl font-medium">Event not in the book</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        That identifier is not in the current catalog. Return to the feed or
        search from the command palette.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-8 w-fit items-center rounded-md bg-foreground px-3 text-sm text-background"
      >
        Back to feed
      </Link>
    </div>
  )
}
