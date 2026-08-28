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
          <tr key={row.key}>
            <th
              scope="row"
              className="hairline w-40 whitespace-nowrap py-2.5 pr-2 pl-2 text-left align-top font-mono font-normal text-[12.5px] text-primary max-sm:w-auto"
            >
              {row.key}
            </th>
            <td className="hairline px-2 py-2.5 align-top">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
