import { DataChart } from "@/src/types/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartsProps = {
  data: DataChart[];
};

export const Charts = ({ data }: ChartsProps) => {
  return (
    <ResponsiveContainer width={520} height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip labelStyle={{ color: "#000" }} />
        <Bar dataKey="Consultas" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
