import type { ReactNode } from "react";

interface KvRow {
  key: string;
  value: ReactNode;
}

interface KvTableProps {
  rows: KvRow[];
}

export function KvTable({ rows }: KvTableProps) {
  return (
    <table className="w-full border-collapse text-[14px]">
      <tbody>
        {rows.map((row) => (
          // No rule between rows: the mono key in primary is already the thing
          // that starts a row, so a line under each one only adds weight.
          <tr key={row.key}>
            <th
              className="w-40 whitespace-nowrap py-3 pr-2 pl-2 text-left align-top font-mono font-normal text-[12.5px] text-primary max-sm:w-auto"
              scope="row"
            >
              {row.key}
            </th>
            <td className="px-2 py-3 align-top">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
