import { Pen } from "@/src/assets/pen";
import { Columns } from "@/src/types/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type DataTableProps = {
  data: any[];
  columns: Columns[];
  onClickAction?: (value: any) => void;
};

export const DataTable = ({ data, columns, onClickAction }: DataTableProps) => {
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
            {columns.map((column, columnIndex) => {
              if (column.key === "actions" && onClickAction) {
                return (
                  <td key={columnIndex}>
                    <button
                      className="btn btn-light d-flex"
                      style={{ borderRadius: "9999px" }}
                      type="button"
                      onClick={() => onClickAction(value)}
                    >
                      <Pen />
                    </button>
                  </td>
                );
              }
              return <td key={columnIndex}>{value[column.key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
