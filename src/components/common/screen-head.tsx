export function ScreenHead({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="aion-screen-head">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
