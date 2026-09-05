export function DataTable({
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
                  key={`${row[0]}-${headingSafe(cell, index)}`}
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

function headingSafe(cell: string, index: number) {
  return `${index}-${cell}`
}
