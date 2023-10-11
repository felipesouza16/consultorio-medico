import { Columns } from "@/src/types/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type DataTableProps = {
  data: any[];
  columns: Columns[];
};

export const DataTable = ({ data, columns }: DataTableProps) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th scope="col" key={index}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((value, index) => (
          <tr key={index}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{value[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
