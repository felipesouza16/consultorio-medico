import { useState } from "react";
import "./datepicker.css";
import "react-day-picker/dist/style.css";
import pt from "date-fns/locale/pt-BR";
import { DayPicker } from "react-day-picker";

export const DatePicker = () => {
  const [selected, setSelected] = useState<Date>();
  return (
    <DayPicker
      mode="single"
      selected={selected}
      style={{ justifyContent: "center", display: "flex" }}
      onSelect={setSelected}
      today={new Date()}
      locale={pt}
    />
  );
};
